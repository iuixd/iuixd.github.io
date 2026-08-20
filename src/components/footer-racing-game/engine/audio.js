// Simulated 1000cc inline-four engine — idle ~1,400rpm, redline ~14,000rpm. RPM is *not*
// speed directly (a real bike's RPM depends on gear + throttle, not just road speed): a
// small virtual gearbox tracks a target RPM that climbs under throttle, falls faster under
// braking than it climbs, and cuts briefly on a simulated upshift once it crosses a shift
// point — the "rise → cut → pulls again" pattern of a real bike accelerating hard.
const IDLE_RPM = 1400;
const REDLINE_RPM = 14000;
const RPM_RISE_RATE = 4.5;
const RPM_FALL_RATE = 1.8;
const UPSHIFT_RPM = 11000;
const DOWNSHIFT_RPM = 5200;
const SHIFT_COOLDOWN_S = 0.18;
const SHIFT_CUT_DURATION_S = 0.11;
const REV_MATCH_DURATION_S = 0.18;
const MAX_GEAR = 5;

// Road speed (normalised to the bike's maximum speed) at redline in each gear. RPM is
// derived from road speed through the selected ratio, rather than rebuilt on a timer.
// The last ratio is deliberately taller than top speed, leaving the engine below redline
// while cruising flat-out.
const GEAR_REDLINE_SPEED = [0.2, 0.38, 0.58, 0.79, 1.08];
const UPSHIFT_SPEED = [0.15, 0.29, 0.44, 0.6];
// Considerably lower than the matching upshift points: this hysteresis prevents gear
// hunting when the rider holds a nearly constant speed around a boundary.
const DOWNSHIFT_SPEED = [0, 0.11, 0.25, 0.41, 0.57];

// Three layers combined so it doesn't read as "one oscillator": a fundamental + a detuned
// harmonic for growl, plus filtered noise for mechanical/intake texture — all Web Audio,
// no samples.
// A four-stroke inline-four produces two firing events per crank revolution. Mapping
// that pulse rate gives the engine its characteristic high-revving inline-four sound.
const FUNDAMENTAL_MIN_FREQ = IDLE_RPM / 30;
const FUNDAMENTAL_MAX_FREQ = REDLINE_RPM / 30;
const FIRING_CYCLE_MIN_FREQ = IDLE_RPM / 120;
const FIRING_CYCLE_MAX_FREQ = REDLINE_RPM / 120;
const HARMONIC_RATIO = 2.02;
const WHINE_RATIO = 3.01;
const NOISE_FILTER_MIN_FREQ = 500;
const NOISE_FILTER_MAX_FREQ = 4800;

const ENGINE_IDLE_GAIN = 0.028;
const ENGINE_MAX_GAIN = 0.075;
const HARMONIC_GAIN_MIN_RATIO = 0.15;
const HARMONIC_GAIN_MAX_RATIO = 0.55;
const NOISE_GAIN_MAX = 0.02;

const PARAM_SMOOTH_S = 0.06; // setTargetAtTime time-constant used throughout — no clicks
const MASTER_FADE_S = 0.16;
function makeSaturationCurve(amount = 2.4) {
  const samples = 1024;
  const curve = new Float32Array(samples);
  const normalizer = Math.tanh(amount);
  for (let index = 0; index < samples; index += 1) {
    const x = (index / (samples - 1)) * 2 - 1;
    curve[index] = Math.tanh(x * amount) / normalizer;
  }
  return curve;
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function clamp01(value) {
  return Math.min(1, Math.max(0, value));
}

// A crossplane crank completes its firing pattern over 720 crank degrees. These four
// impulses reproduce the characteristic 270°–180°–90°–180° spacing without a recording.
// Fourier synthesis keeps the pulse train band-limited, so cadence stays lumpy down low
// and naturally fuses into a continuous exhaust note as cycle frequency rises.
function createCrossplaneWave(ctx) {
  const firingPhases = [0, 270 / 720, 450 / 720, 540 / 720];
  const harmonicCount = 32;
  const real = new Float32Array(harmonicCount + 1);
  const imag = new Float32Array(harmonicCount + 1);
  for (let harmonic = 1; harmonic <= harmonicCount; harmonic += 1) {
    const rolloff = 1 / Math.pow(harmonic, 0.68);
    firingPhases.forEach((phase) => {
      const angle = 2 * Math.PI * harmonic * phase;
      real[harmonic] += Math.cos(angle) * rolloff;
      imag[harmonic] -= Math.sin(angle) * rolloff;
    });
  }
  return ctx.createPeriodicWave(real, imag);
}

/**
 * Optional, muted-by-default procedural inline-four engine and short gameplay effect
 * tones. The continuous engine graph contains no gear-shift recording: shift audio is a
 * separate one-shot created exclusively by playShiftTransient(). The AudioContext is only
 * ever created from setMuted(false), itself only ever called from the mute button's click
 * handler, so this never runs into autoplay restrictions.
 */
export class AudioController {
  constructor() {
    this.ctx = null;
    this.muted = true;
    this.noiseBuffer = null;

    this.masterGain = null;
    this.bodyOsc = null;
    this.bodyGain = null;
    this.fundamentalOsc = null;
    this.fundamentalGain = null;
    this.harmonicOsc = null;
    this.harmonicGain = null;
    this.whineOsc = null;
    this.whineGain = null;
    this.noiseSource = null;
    this.noiseFilter = null;
    this.noiseGain = null;
    this.engineFilter = null;
    this.saturator = null;
    this.compressor = null;
    this.workletNode = null;
    this.workletGain = null;
    this.workletLoadPromise = null;
    this.workletGeneration = 0;
    this.rpm = IDLE_RPM;
    this.gear = 1;
    this.shiftCooldownRemaining = 0;
    this.shiftCutRemaining = 0;
    this.previousSpeedPercent = 0;
    this.previousThrottle = false;
    this.crackleBand = -1;
    this.crackleCooldownRemaining = 0;
    this.revMatchRemaining = 0;
    this.engineLoad = 0;

    this.timeouts = [];
  }

  ensureContext() {
    if (this.ctx) return this.ctx;
    if (typeof window === "undefined") return null;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    this.ctx = new AudioContextClass();
    return this.ctx;
  }

  getNoiseBuffer(ctx) {
    if (this.noiseBuffer) return this.noiseBuffer;
    const length = Math.floor(ctx.sampleRate * 1.5);
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i += 1) {
      data[i] = Math.random() * 2 - 1;
    }
    this.noiseBuffer = buffer;
    return buffer;
  }

  setMuted(muted) {
    this.muted = muted;
    if (muted) {
      this.stopEngine();
    } else {
      const ctx = this.ensureContext();
      if (ctx?.state === "suspended") ctx.resume();
      this.startEngine();
      this.startCrossplaneWorklet();
    }
  }

  async startCrossplaneWorklet() {
    const ctx = this.ctx;
    if (!ctx?.audioWorklet || this.workletNode || this.muted) return;
    const generation = ++this.workletGeneration;
    try {
      this.workletLoadPromise ??= ctx.audioWorklet.addModule("/assets/audio/crossplane-engine-processor.js");
      await this.workletLoadPromise;
      if (generation !== this.workletGeneration || this.muted || !this.masterGain) return;
      const WorkletNode = window.AudioWorkletNode;
      if (!WorkletNode) return;
      this.workletNode = new WorkletNode(ctx, "crossplane-engine", {
        numberOfInputs: 0,
        numberOfOutputs: 1,
        outputChannelCount: [1],
      });
      this.workletGain = ctx.createGain();
      this.workletGain.gain.value = 0;
      this.workletNode.connect(this.workletGain).connect(this.masterGain);
      this.workletGain.gain.setTargetAtTime(0.82, ctx.currentTime, 0.18);
    } catch {
      // The oscillator graph below remains a complete fallback for browsers that do not
      // support AudioWorklet or refuse to load a module in the current context.
      this.workletLoadPromise = null;
    }
  }

  startEngine() {
    const ctx = this.ensureContext();
    if (!ctx || this.fundamentalOsc) return;

    this.masterGain = ctx.createGain();
    this.masterGain.gain.value = 0;
    this.engineFilter = ctx.createBiquadFilter();
    this.engineFilter.type = "lowpass";
    this.engineFilter.frequency.value = 1800;
    this.engineFilter.Q.value = 0.7;

    this.saturator = ctx.createWaveShaper();
    this.saturator.curve = makeSaturationCurve();
    this.saturator.oversample = "2x";

    this.compressor = ctx.createDynamicsCompressor();
    this.compressor.threshold.value = -18;
    this.compressor.knee.value = 16;
    this.compressor.ratio.value = 5;
    this.compressor.attack.value = 0.006;
    this.compressor.release.value = 0.12;

    this.masterGain.connect(this.engineFilter).connect(this.saturator).connect(this.compressor).connect(ctx.destination);

    // Half firing-frequency exhaust body. This is strongest under load in the lower
    // gears, supplying the deep litre-bike "WROOOM" beneath the high-RPM harmonics.
    this.bodyOsc = ctx.createOscillator();
    this.bodyOsc.setPeriodicWave(createCrossplaneWave(ctx));
    this.bodyOsc.frequency.value = FIRING_CYCLE_MIN_FREQ;
    this.bodyGain = ctx.createGain();
    this.bodyGain.gain.value = 0.035;
    this.bodyOsc.connect(this.bodyGain).connect(this.masterGain);
    this.bodyOsc.start();

    this.fundamentalOsc = ctx.createOscillator();
    this.fundamentalOsc.type = "sawtooth";
    this.fundamentalOsc.frequency.value = FUNDAMENTAL_MIN_FREQ;
    this.fundamentalGain = ctx.createGain();
    this.fundamentalGain.gain.value = ENGINE_IDLE_GAIN;
    this.fundamentalOsc.connect(this.fundamentalGain).connect(this.masterGain);
    this.fundamentalOsc.start();

    this.harmonicOsc = ctx.createOscillator();
    this.harmonicOsc.type = "sawtooth";
    this.harmonicOsc.frequency.value = FUNDAMENTAL_MIN_FREQ * HARMONIC_RATIO;
    this.harmonicGain = ctx.createGain();
    this.harmonicGain.gain.value = ENGINE_IDLE_GAIN * HARMONIC_GAIN_MIN_RATIO;
    this.harmonicOsc.connect(this.harmonicGain).connect(this.masterGain);
    this.harmonicOsc.start();

    // A quieter upper partial progressively emerges near redline, creating the smooth,
    // urgent inline-four scream without baking a rev sweep into a recording.
    this.whineOsc = ctx.createOscillator();
    this.whineOsc.type = "sawtooth";
    this.whineOsc.frequency.value = FUNDAMENTAL_MIN_FREQ * WHINE_RATIO;
    this.whineGain = ctx.createGain();
    this.whineGain.gain.value = 0;
    this.whineOsc.connect(this.whineGain).connect(this.masterGain);
    this.whineOsc.start();

    this.noiseSource = ctx.createBufferSource();
    this.noiseSource.buffer = this.getNoiseBuffer(ctx);
    this.noiseSource.loop = true;
    this.noiseFilter = ctx.createBiquadFilter();
    this.noiseFilter.type = "bandpass";
    this.noiseFilter.frequency.value = NOISE_FILTER_MIN_FREQ;
    this.noiseFilter.Q.value = 0.9;
    this.noiseGain = ctx.createGain();
    this.noiseGain.gain.value = 0;
    this.noiseSource.connect(this.noiseFilter).connect(this.noiseGain).connect(this.masterGain);
    this.noiseSource.start();

    this.rpm = IDLE_RPM;
    this.gear = 1;
    this.shiftCooldownRemaining = 0;
    this.shiftCutRemaining = 0;
    this.previousSpeedPercent = 0;
    this.previousThrottle = false;
    this.crackleBand = -1;
    this.crackleCooldownRemaining = 0;
    this.revMatchRemaining = 0;
    this.engineLoad = 0;
  }

  stopEngine() {
    if (!this.fundamentalOsc) return;
    this.workletGeneration += 1;
    this.workletNode?.disconnect();
    this.workletNode?.port.close();
    this.workletGain?.disconnect();
    this.workletNode = null;
    this.workletGain = null;
    [this.bodyOsc, this.fundamentalOsc, this.harmonicOsc, this.whineOsc, this.noiseSource].forEach((node) => {
      try {
        node.stop();
      } catch {
        // already stopped
      }
      node.disconnect();
    });
    [
      this.bodyGain,
      this.fundamentalGain,
      this.harmonicGain,
      this.whineGain,
      this.noiseFilter,
      this.noiseGain,
      this.masterGain,
      this.engineFilter,
      this.saturator,
      this.compressor,
    ].forEach((node) =>
      node?.disconnect()
    );
    this.bodyOsc = null;
    this.fundamentalOsc = null;
    this.harmonicOsc = null;
    this.whineOsc = null;
    this.noiseSource = null;
    this.bodyGain = null;
    this.fundamentalGain = null;
    this.harmonicGain = null;
    this.whineGain = null;
    this.noiseFilter = null;
    this.noiseGain = null;
    this.masterGain = null;
    this.engineFilter = null;
    this.saturator = null;
    this.compressor = null;
  }

  playShiftTransient() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const clunk = this.ctx.createOscillator();
    const clunkGain = this.ctx.createGain();
    clunk.type = "triangle";
    clunk.frequency.setValueAtTime(92, now);
    clunk.frequency.exponentialRampToValueAtTime(48, now + 0.075);
    clunkGain.gain.setValueAtTime(0.07, now);
    clunkGain.gain.exponentialRampToValueAtTime(0.001, now + 0.085);
    clunk.connect(clunkGain).connect(this.masterGain);
    clunk.onended = () => {
      clunk.disconnect();
      clunkGain.disconnect();
    };
    clunk.start(now);
    clunk.stop(now + 0.09);

    const snap = this.ctx.createBufferSource();
    const snapFilter = this.ctx.createBiquadFilter();
    const snapGain = this.ctx.createGain();
    snap.buffer = this.getNoiseBuffer(this.ctx);
    snapFilter.type = "bandpass";
    snapFilter.frequency.value = 2600;
    snapFilter.Q.value = 1.4;
    snapGain.gain.setValueAtTime(0.045, now + 0.025);
    snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.095);
    snap.connect(snapFilter).connect(snapGain).connect(this.masterGain);
    snap.onended = () => {
      snap.disconnect();
      snapFilter.disconnect();
      snapGain.disconnect();
    };
    snap.start(now + 0.025, 0, 0.08);
  }

  /** Short, non-looping exhaust combustion bursts. Event timing and tone vary so a
   *  crackle never becomes a recognisable repeating sample. */
  playExhaustCrackle(intensity = 0.6) {
    if (!this.ctx || !this.masterGain) return;
    const count = Math.random() < intensity * 0.55 ? 2 : 1;
    for (let index = 0; index < count; index += 1) {
      const start = this.ctx.currentTime + index * (0.035 + Math.random() * 0.045);
      const duration = 0.025 + Math.random() * 0.035;
      const source = this.ctx.createBufferSource();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();
      source.buffer = this.getNoiseBuffer(this.ctx);
      filter.type = "bandpass";
      filter.frequency.value = 650 + Math.random() * 1150;
      filter.Q.value = 0.65 + Math.random() * 0.75;
      const peak = 0.025 + intensity * 0.045;
      gain.gain.setValueAtTime(0.001, start);
      gain.gain.exponentialRampToValueAtTime(peak, start + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
      source.connect(filter).connect(gain).connect(this.masterGain);
      source.onended = () => {
        source.disconnect();
        filter.disconnect();
        gain.disconnect();
      };
      source.start(start, Math.random(), duration);
    }
  }

  /** Immediately (but smoothly) fades the whole engine to silent — used on pause/offscreen,
   *  where the rAF loop stops calling updateEngine but an already-started Web Audio graph
   *  would otherwise keep playing at its last volume regardless. */
  silence() {
    if (!this.ctx || !this.masterGain) return;
    this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, PARAM_SMOOTH_S);
  }

  /**
   * Called every tick regardless of state; a no-op whenever muted/uninitialised. Distinct
   * throttle/braking/off-road/active inputs so each reads differently, per the spec.
   */
  updateEngine({ speedPercent, throttle, braking, offRoad, active, dt }) {
    if (this.muted || !this.fundamentalOsc || !this.ctx) return;
    const now = this.ctx.currentTime;
    const clampedDt = Math.max(0, Math.min(dt, 1 / 15));

    // --- Simulated RPM + virtual gearbox ---
    const boundedSpeed = clamp01(speedPercent);
    const speedFalling = boundedSpeed < this.previousSpeedPercent - 0.0005;
    const ratioRpm = IDLE_RPM +
      (boundedSpeed / GEAR_REDLINE_SPEED[this.gear - 1]) * (REDLINE_RPM - IDLE_RPM);
    const throttleLoadRpm = throttle && !braking ? 900 : 0;
    const revMatchRpm = this.revMatchRemaining > 0
      ? 1050 * clamp01(this.revMatchRemaining / REV_MATCH_DURATION_S)
      : 0;
    const targetRpm = Math.min(REDLINE_RPM, Math.max(IDLE_RPM, ratioRpm + throttleLoadRpm + revMatchRpm));

    const rising = targetRpm > this.rpm;
    const rate = rising ? RPM_RISE_RATE : braking ? RPM_FALL_RATE * 1.6 : RPM_FALL_RATE;
    this.rpm += (targetRpm - this.rpm) * (1 - Math.exp(-rate * clampedDt));

    this.shiftCooldownRemaining = Math.max(0, this.shiftCooldownRemaining - clampedDt);
    this.shiftCutRemaining = Math.max(0, this.shiftCutRemaining - clampedDt);
    this.crackleCooldownRemaining = Math.max(0, this.crackleCooldownRemaining - clampedDt);
    this.revMatchRemaining = Math.max(0, this.revMatchRemaining - clampedDt);
    const canShift = this.shiftCooldownRemaining <= 0;
    const upshiftSpeed = UPSHIFT_SPEED[this.gear - 1];
    if (
      canShift && throttle && !braking && this.gear < MAX_GEAR &&
      boundedSpeed >= upshiftSpeed && this.rpm >= UPSHIFT_RPM
    ) {
      this.gear += 1;
      // Recalculate through the newly selected, taller ratio. This is the mechanical RPM
      // drop; it cannot recover until road speed crosses the next gear's threshold.
      this.rpm = Math.max(
        IDLE_RPM,
        IDLE_RPM + (boundedSpeed / GEAR_REDLINE_SPEED[this.gear - 1]) * (REDLINE_RPM - IDLE_RPM)
      );
      this.shiftCooldownRemaining = SHIFT_COOLDOWN_S;
      this.shiftCutRemaining = SHIFT_CUT_DURATION_S;
      this.playShiftTransient();
      this.crackleBand = -1;
    } else if (
      canShift && this.gear > 1 && (braking || speedFalling || !throttle) &&
      (boundedSpeed <= DOWNSHIFT_SPEED[this.gear - 1] || this.rpm <= DOWNSHIFT_RPM)
    ) {
      this.gear -= 1;
      this.rpm = Math.min(
        REDLINE_RPM,
        IDLE_RPM + (boundedSpeed / GEAR_REDLINE_SPEED[this.gear - 1]) * (REDLINE_RPM - IDLE_RPM) + 650
      );
      this.revMatchRemaining = REV_MATCH_DURATION_S;
      this.shiftCooldownRemaining = SHIFT_COOLDOWN_S;
      this.shiftCutRemaining = SHIFT_CUT_DURATION_S;
      this.playShiftTransient();
      if (this.gear <= 3 && this.rpm > 5000) {
        this.playExhaustCrackle(0.72);
        this.crackleCooldownRemaining = 0.3;
      }
      this.crackleBand = -1;
    } else if (boundedSpeed < 0.025 && !throttle) {
      this.gear = 1;
      this.rpm = IDLE_RPM;
    }
    this.previousSpeedPercent = boundedSpeed;

    // Crackles are state-transition events, never a timer loop: a throttle lift at useful
    // RPM, or crossing a new combustion-load band under hard acceleration in gears 1–3.
    const throttleLift = this.previousThrottle && !throttle && this.rpm > 4800;
    const accelerationBand = throttle && !braking && this.gear <= 3
      ? Math.floor((this.rpm - 5500) / 2400)
      : -1;
    if (this.crackleCooldownRemaining <= 0 && this.gear <= 3 && throttleLift) {
      this.playExhaustCrackle(braking ? 0.82 : 0.58);
      this.crackleCooldownRemaining = 0.32;
    } else if (
      this.crackleCooldownRemaining <= 0 && accelerationBand >= 0 &&
      accelerationBand > this.crackleBand
    ) {
      this.playExhaustCrackle(0.38 + accelerationBand * 0.1);
      this.crackleCooldownRemaining = 0.4;
    }
    this.crackleBand = accelerationBand;
    this.previousThrottle = throttle;

    const rpmFraction = clamp01((this.rpm - IDLE_RPM) / (REDLINE_RPM - IDLE_RPM));
    const shiftCutFactor = this.shiftCutRemaining > 0 ? 0.35 : 1;
    const revMatchFactor = clamp01(this.revMatchRemaining / REV_MATCH_DURATION_S);
    const loadTarget = throttle ? 1 : revMatchFactor > 0 ? 0.82 : braking ? 0.08 : 0.24;
    const loadRate = loadTarget > this.engineLoad ? 12 : 7;
    this.engineLoad += (loadTarget - this.engineLoad) * (1 - Math.exp(-loadRate * clampedDt));

    this.workletNode?.port.postMessage({
      type: "engine-state",
      rpm: this.rpm,
      load: this.engineLoad,
      gear: this.gear,
      braking,
      active,
    });

    // --- Synthesis: fundamental + harmonic + filtered noise, all smoothly modulated ---
    const fundamentalFreq = FUNDAMENTAL_MIN_FREQ + rpmFraction * (FUNDAMENTAL_MAX_FREQ - FUNDAMENTAL_MIN_FREQ);
    const firingCycleFreq = FIRING_CYCLE_MIN_FREQ +
      rpmFraction * (FIRING_CYCLE_MAX_FREQ - FIRING_CYCLE_MIN_FREQ);
    this.bodyOsc.frequency.setTargetAtTime(firingCycleFreq, now, PARAM_SMOOTH_S);
    this.fundamentalOsc.frequency.setTargetAtTime(fundamentalFreq, now, PARAM_SMOOTH_S);
    this.harmonicOsc.frequency.setTargetAtTime(fundamentalFreq * HARMONIC_RATIO, now, PARAM_SMOOTH_S);
    this.whineOsc.frequency.setTargetAtTime(fundamentalFreq * WHINE_RATIO, now, PARAM_SMOOTH_S);

    const lowBand = 1 - clamp01(rpmFraction / 0.5);
    const midBand = clamp01(1 - Math.abs(rpmFraction - 0.52) / 0.48);
    const highBand = clamp01((rpmFraction - 0.48) / 0.52);
    const engineGain = lerp(ENGINE_IDLE_GAIN, ENGINE_MAX_GAIN, rpmFraction) *
      lerp(0.82, 1.18, midBand) * shiftCutFactor;
    const fallbackMix = this.workletNode ? 0.22 : 1;
    const lowGearLoad = throttle ? 1 - (this.gear - 1) / (MAX_GEAR * 1.35) : 0.42;
    this.bodyGain.gain.setTargetAtTime(
      (0.018 + 0.072 * lowBand * lowGearLoad + 0.018 * revMatchFactor) * shiftCutFactor * fallbackMix,
      now,
      PARAM_SMOOTH_S
    );
    this.fundamentalGain.gain.setTargetAtTime(engineGain * fallbackMix, now, PARAM_SMOOTH_S);
    this.harmonicGain.gain.setTargetAtTime(
      engineGain * lerp(HARMONIC_GAIN_MIN_RATIO, HARMONIC_GAIN_MAX_RATIO, highBand) *
        lerp(0.78, 1.2, midBand) * fallbackMix,
      now,
      PARAM_SMOOTH_S
    );
    const redlineWhine = clamp01((rpmFraction - 0.52) / 0.48);
    this.whineGain.gain.setTargetAtTime(
      0.052 * redlineWhine * redlineWhine * (throttle ? 1 : 0.5) * shiftCutFactor *
        (this.workletNode ? 0.38 : 1),
      now,
      PARAM_SMOOTH_S
    );

    const noiseFilterFreq = NOISE_FILTER_MIN_FREQ + rpmFraction * (NOISE_FILTER_MAX_FREQ - NOISE_FILTER_MIN_FREQ);
    this.noiseFilter.frequency.setTargetAtTime(noiseFilterFreq, now, PARAM_SMOOTH_S);
    const noiseTarget = NOISE_GAIN_MAX * (0.15 * lowBand + 1.25 * highBand) *
      (throttle || revMatchFactor > 0 ? 1 : 0.45) * (offRoad ? 1.6 : 1) * shiftCutFactor;
    this.noiseGain.gain.setTargetAtTime(Math.min(NOISE_GAIN_MAX * 1.6, noiseTarget), now, PARAM_SMOOTH_S);

    // Throttle opens the virtual intake; coasting and braking retain a darker exhaust note.
    const intakeCutoff = lerp(1050, throttle || revMatchFactor > 0 ? 11200 : braking ? 2800 : 4600, rpmFraction);
    this.engineFilter.frequency.setTargetAtTime(intakeCutoff, now, 0.085);
    this.engineFilter.Q.setTargetAtTime(throttle || revMatchFactor > 0 ? lerp(0.9, 1.38, highBand) : 0.72, now, 0.1);

    this.masterGain.gain.setTargetAtTime(active ? 1 : 0, now, MASTER_FADE_S);
  }

  playTone(freq, duration = 0.12, type = "sine", peakGain = 0.08) {
    if (this.muted) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    osc.connect(gain).connect(ctx.destination);

    const now = ctx.currentTime;
    gain.gain.setValueAtTime(peakGain, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  playCountdownTick() {
    this.playTone(440, 0.1, "square", 0.06);
  }

  playCountdownGo() {
    this.playTone(660, 0.2, "square", 0.08);
  }

  playCollision() {
    this.playTone(90, 0.25, "sawtooth", 0.12);
  }

  playFinish() {
    this.playTone(523, 0.12, "triangle", 0.08);
    this.timeouts.push(setTimeout(() => this.playTone(659, 0.12, "triangle", 0.08), 120));
    this.timeouts.push(setTimeout(() => this.playTone(784, 0.2, "triangle", 0.08), 240));
  }

  destroy() {
    this.timeouts.forEach(clearTimeout);
    this.timeouts = [];
    this.stopEngine();
    if (this.ctx) {
      this.ctx.close().catch(() => {});
      this.ctx = null;
    }
  }
}
