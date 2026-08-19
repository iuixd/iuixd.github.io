// Simulated 1000cc inline-four engine — idle ~1,400rpm, redline ~14,000rpm. RPM is *not*
// speed directly (a real bike's RPM depends on gear + throttle, not just road speed): a
// small virtual gearbox tracks a target RPM that climbs under throttle, falls faster under
// braking than it climbs, and cuts briefly on a simulated upshift once it crosses a shift
// point — the "rise → cut → pulls again" pattern of a real bike accelerating hard.
const IDLE_RPM = 1400;
const REDLINE_RPM = 14000;
const RPM_RISE_RATE = 4.5;
const RPM_FALL_RATE = 1.8;
const SHIFT_TRIGGER_RPM = IDLE_RPM + (REDLINE_RPM - IDLE_RPM) * 0.86;
const SHIFT_COOLDOWN_S = 0.32;
const SHIFT_RPM_DIP_RATIO = 0.6;
const SHIFT_CUT_DURATION_S = 0.11;
const MAX_GEAR = 6;

// Three layers combined so it doesn't read as "one oscillator": a fundamental + a detuned
// harmonic for growl, plus filtered noise for mechanical/intake texture — all Web Audio,
// no samples.
// A four-stroke inline-four produces two firing events per crank revolution. Mapping
// that pulse rate gives the engine its characteristic high-revving inline-four sound.
const FUNDAMENTAL_MIN_FREQ = IDLE_RPM / 30;
const FUNDAMENTAL_MAX_FREQ = REDLINE_RPM / 30;
const HARMONIC_RATIO = 2.02;
const NOISE_FILTER_MIN_FREQ = 500;
const NOISE_FILTER_MAX_FREQ = 4800;

const ENGINE_IDLE_GAIN = 0.028;
const ENGINE_MAX_GAIN = 0.075;
const HARMONIC_GAIN_MIN_RATIO = 0.15;
const HARMONIC_GAIN_MAX_RATIO = 0.55;
const NOISE_GAIN_MAX = 0.02;

const PARAM_SMOOTH_S = 0.06; // setTargetAtTime time-constant used throughout — no clicks
const MASTER_FADE_S = 0.16;
const SAMPLE_LAYERS = [
  { url: "/assets/audio/hornet-low.wav", baseRpm: 2200 },
  { url: "/assets/audio/hornet-mid.wav", baseRpm: 6000 },
  { url: "/assets/audio/hornet-high.wav", baseRpm: 10000 },
];

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

/**
 * Optional, muted-by-default sound: three crossfaded real inline-four recording layers,
 * reinforced by a quiet procedural firing pulse and short gameplay effect tones. The
 * AudioContext is only ever created from setMuted(false), itself only ever called from the
 * mute button's click handler, so this never runs into autoplay restrictions.
 */
export class AudioController {
  constructor() {
    this.ctx = null;
    this.muted = true;
    this.noiseBuffer = null;

    this.masterGain = null;
    this.fundamentalOsc = null;
    this.fundamentalGain = null;
    this.harmonicOsc = null;
    this.harmonicGain = null;
    this.noiseSource = null;
    this.noiseFilter = null;
    this.noiseGain = null;
    this.engineFilter = null;
    this.saturator = null;
    this.compressor = null;
    this.sampleBuffers = null;
    this.sampleLoadPromise = null;
    this.sampleSources = [];
    this.sampleGains = [];

    this.rpm = IDLE_RPM;
    this.gear = 1;
    this.shiftCooldownRemaining = 0;
    this.shiftCutRemaining = 0;

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
      this.ensureSampleLayers();
    }
  }

  async ensureSampleLayers() {
    const ctx = this.ensureContext();
    if (!ctx || this.sampleSources.length) return;
    if (!this.sampleBuffers) {
      this.sampleLoadPromise ??= Promise.all(
        SAMPLE_LAYERS.map(async ({ url }) => {
          const response = await fetch(url);
          if (!response.ok) throw new Error(`Unable to load engine layer: ${url}`);
          return ctx.decodeAudioData(await response.arrayBuffer());
        })
      ).then((buffers) => {
        this.sampleBuffers = buffers;
        return buffers;
      });
      try {
        await this.sampleLoadPromise;
      } catch {
        // The procedural layer remains as a quiet fallback if an asset cannot be loaded.
        this.sampleLoadPromise = null;
        return;
      }
    }
    if (this.muted || !this.masterGain || this.sampleSources.length) return;

    this.sampleSources = this.sampleBuffers.map((buffer, index) => {
      const source = ctx.createBufferSource();
      const gain = ctx.createGain();
      source.buffer = buffer;
      source.loop = true;
      source.loopStart = 0;
      source.loopEnd = buffer.duration;
      gain.gain.value = index === 0 ? 0.4 : 0;
      source.connect(gain).connect(this.masterGain);
      source.start();
      this.sampleGains.push(gain);
      return source;
    });

    // Once the real recording layers are running, retain only a trace of synthesis to
    // reinforce the firing pulse without masking the bike's actual intake/exhaust texture.
    this.fundamentalGain?.gain.setTargetAtTime(0.004, ctx.currentTime, 0.15);
    this.harmonicGain?.gain.setTargetAtTime(0.002, ctx.currentTime, 0.15);
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
  }

  stopEngine() {
    if (!this.fundamentalOsc) return;
    [this.fundamentalOsc, this.harmonicOsc, this.noiseSource].forEach((node) => {
      try {
        node.stop();
      } catch {
        // already stopped
      }
      node.disconnect();
    });
    [
      this.fundamentalGain,
      this.harmonicGain,
      this.noiseFilter,
      this.noiseGain,
      this.masterGain,
      this.engineFilter,
      this.saturator,
      this.compressor,
    ].forEach((node) =>
      node?.disconnect()
    );
    this.fundamentalOsc = null;
    this.harmonicOsc = null;
    this.noiseSource = null;
    this.fundamentalGain = null;
    this.harmonicGain = null;
    this.noiseFilter = null;
    this.noiseGain = null;
    this.masterGain = null;
    this.engineFilter = null;
    this.saturator = null;
    this.compressor = null;
    this.sampleSources.forEach((source) => {
      try {
        source.stop();
      } catch {
        // already stopped
      }
      source.disconnect();
    });
    this.sampleGains.forEach((gain) => gain.disconnect());
    this.sampleSources = [];
    this.sampleGains = [];
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
    const engineBrakingFloor = IDLE_RPM + speedPercent * (REDLINE_RPM - IDLE_RPM) * 0.5;
    let targetRpm;
    if (throttle && !braking) {
      targetRpm = engineBrakingFloor + (REDLINE_RPM - IDLE_RPM) * 0.42;
    } else if (braking) {
      targetRpm = Math.max(IDLE_RPM, engineBrakingFloor * 0.55);
    } else {
      targetRpm = Math.max(IDLE_RPM, engineBrakingFloor * 0.8);
    }
    targetRpm = Math.min(REDLINE_RPM, targetRpm);

    const rising = targetRpm > this.rpm;
    const rate = rising ? RPM_RISE_RATE : braking ? RPM_FALL_RATE * 1.6 : RPM_FALL_RATE;
    this.rpm += (targetRpm - this.rpm) * (1 - Math.exp(-rate * clampedDt));

    this.shiftCooldownRemaining = Math.max(0, this.shiftCooldownRemaining - clampedDt);
    this.shiftCutRemaining = Math.max(0, this.shiftCutRemaining - clampedDt);
    if (throttle && !braking && this.rpm >= SHIFT_TRIGGER_RPM && this.shiftCooldownRemaining <= 0 && this.gear < MAX_GEAR) {
      this.gear += 1;
      this.rpm *= SHIFT_RPM_DIP_RATIO;
      this.shiftCooldownRemaining = SHIFT_COOLDOWN_S;
      this.shiftCutRemaining = SHIFT_CUT_DURATION_S;
      this.playShiftTransient();
    }
    if (!throttle && speedPercent < 0.04 && this.gear > 1) {
      this.gear = 1;
    }

    const rpmFraction = clamp01((this.rpm - IDLE_RPM) / (REDLINE_RPM - IDLE_RPM));
    const shiftCutFactor = this.shiftCutRemaining > 0 ? 0.35 : 1;

    // --- Synthesis: fundamental + harmonic + filtered noise, all smoothly modulated ---
    const fundamentalFreq = FUNDAMENTAL_MIN_FREQ + rpmFraction * (FUNDAMENTAL_MAX_FREQ - FUNDAMENTAL_MIN_FREQ);
    this.fundamentalOsc.frequency.setTargetAtTime(fundamentalFreq, now, PARAM_SMOOTH_S);
    this.harmonicOsc.frequency.setTargetAtTime(fundamentalFreq * HARMONIC_RATIO, now, PARAM_SMOOTH_S);

    const proceduralMix = this.sampleSources.length ? 0.08 : 1;
    const engineGain = lerp(ENGINE_IDLE_GAIN, ENGINE_MAX_GAIN, rpmFraction) * shiftCutFactor * proceduralMix;
    this.fundamentalGain.gain.setTargetAtTime(engineGain, now, PARAM_SMOOTH_S);
    this.harmonicGain.gain.setTargetAtTime(
      engineGain * lerp(HARMONIC_GAIN_MIN_RATIO, HARMONIC_GAIN_MAX_RATIO, rpmFraction),
      now,
      PARAM_SMOOTH_S
    );

    const noiseFilterFreq = NOISE_FILTER_MIN_FREQ + rpmFraction * (NOISE_FILTER_MAX_FREQ - NOISE_FILTER_MIN_FREQ);
    this.noiseFilter.frequency.setTargetAtTime(noiseFilterFreq, now, PARAM_SMOOTH_S);
    const noiseTarget =
      NOISE_GAIN_MAX * rpmFraction * (throttle ? 1 : 0.5) * (offRoad ? 1.6 : 1) * shiftCutFactor;
    this.noiseGain.gain.setTargetAtTime(Math.min(NOISE_GAIN_MAX * 1.6, noiseTarget), now, PARAM_SMOOTH_S);

    // Throttle opens the virtual intake; coasting and braking retain a darker exhaust note.
    const intakeCutoff = lerp(1500, throttle ? 7200 : braking ? 2300 : 3600, rpmFraction);
    this.engineFilter.frequency.setTargetAtTime(intakeCutoff, now, 0.085);
    this.engineFilter.Q.setTargetAtTime(throttle ? 1.15 : 0.72, now, 0.1);

    if (this.sampleSources.length === SAMPLE_LAYERS.length) {
      const lowWeight = clamp01(1 - rpmFraction / 0.45);
      const highWeight = clamp01((rpmFraction - 0.5) / 0.5);
      const midWeight = clamp01(1 - Math.abs(rpmFraction - 0.48) / 0.38);
      const weights = [lowWeight, midWeight, highWeight];
      this.sampleSources.forEach((source, index) => {
        const rate = Math.min(1.38, Math.max(0.72, this.rpm / SAMPLE_LAYERS[index].baseRpm));
        source.playbackRate.setTargetAtTime(rate, now, 0.075);
        const loadGain = (throttle ? 0.48 : braking ? 0.3 : 0.37) * shiftCutFactor;
        this.sampleGains[index].gain.setTargetAtTime(weights[index] * loadGain, now, 0.08);
      });
    }

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
