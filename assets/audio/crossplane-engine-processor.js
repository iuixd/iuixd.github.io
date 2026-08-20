const TWO_PI = Math.PI * 2;
const FIRING_PHASES = [0, 270 / 720, 450 / 720, 540 / 720];

class CrossplaneEngineProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.rpm = 1400;
    this.targetRpm = 1400;
    this.load = 0;
    this.gear = 1;
    this.braking = false;
    this.active = false;
    this.cycle = 0;
    this.nextFireCycle = 0;
    this.nextFireIndex = 0;
    this.exhaustEnvelope = 0;
    this.intakeEnvelope = 0;
    this.combustionEnvelope = 0;
    this.exhaustPhase = 0;
    this.intakePhase = 0;
    this.howlPhase = 0;
    this.mechanicalPhase = 0;
    this.seed = 0x51f15e;

    this.port.onmessage = ({ data }) => {
      if (data.type !== "engine-state") return;
      this.targetRpm = Math.max(1000, Math.min(14500, data.rpm || 1400));
      this.load = Math.max(0, Math.min(1, data.load || 0));
      this.gear = Math.max(1, Math.min(6, data.gear || 1));
      this.braking = Boolean(data.braking);
      this.active = Boolean(data.active);
    };
  }

  random() {
    this.seed = (Math.imul(this.seed, 1664525) + 1013904223) >>> 0;
    return this.seed / 4294967296;
  }

  fire() {
    const lowGear = 1 - (this.gear - 1) / 6;
    const variation = 0.96 + this.random() * 0.08;
    this.exhaustEnvelope += (0.38 + this.load * 0.55) * (0.72 + lowGear * 0.28) * variation;
    this.combustionEnvelope += (0.25 + this.load * 0.7) * variation;
    this.intakeEnvelope += (0.08 + this.load * 0.72) * variation;
  }

  process(_inputs, outputs) {
    const output = outputs[0][0];
    if (!output) return true;

    for (let index = 0; index < output.length; index += 1) {
      this.rpm += (this.targetRpm - this.rpm) * 0.0008;
      const rpmNorm = Math.max(0, Math.min(1, (this.rpm - 1400) / 12600));
      const cycleStep = this.rpm / 120 / sampleRate;
      this.cycle += cycleStep;

      let nextFire = this.nextFireCycle + FIRING_PHASES[this.nextFireIndex];
      if (this.cycle >= nextFire) {
        this.fire();
        this.nextFireIndex += 1;
        if (this.nextFireIndex >= FIRING_PHASES.length) {
          this.nextFireIndex = 0;
          this.nextFireCycle += 1;
        }
        nextFire = this.nextFireCycle + FIRING_PHASES[this.nextFireIndex];
      }

      const exhaustFrequency = 74 + rpmNorm * 105 + this.load * 26;
      const intakeFrequency = 620 + rpmNorm * 2450;
      const firingFrequency = this.rpm / 30;
      const howlFrequency = firingFrequency * (2.02 + rpmNorm * 0.01);
      const mechanicalFrequency = firingFrequency * 3.01;
      this.exhaustPhase += TWO_PI * exhaustFrequency / sampleRate;
      this.intakePhase += TWO_PI * intakeFrequency / sampleRate;
      this.howlPhase += TWO_PI * howlFrequency / sampleRate;
      this.mechanicalPhase += TWO_PI * mechanicalFrequency / sampleRate;

      const lowBand = 1 - Math.min(1, rpmNorm / 0.52);
      const midBand = Math.max(0, 1 - Math.abs(rpmNorm - 0.52) / 0.48);
      const highBand = Math.max(0, Math.min(1, (rpmNorm - 0.45) / 0.55));
      const noise = this.random() * 2 - 1;
      const exhaust = Math.sin(this.exhaustPhase) * this.exhaustEnvelope * (0.17 + lowBand * 0.18);
      const combustion = (noise * 0.44 + Math.sin(this.intakePhase) * 0.56) *
        this.combustionEnvelope * (0.08 + midBand * 0.12);
      const intake = Math.sin(this.howlPhase) * this.intakeEnvelope * highBand * highBand * 0.2;
      const mechanical = Math.sin(this.mechanicalPhase) * highBand * highBand * this.load * 0.085;
      const overrun = this.braking ? noise * this.combustionEnvelope * 0.018 : 0;
      const mixed = exhaust + combustion + intake + mechanical + overrun;
      output[index] = this.active ? Math.tanh(mixed * 1.65) * 0.48 : 0;

      this.exhaustEnvelope *= Math.exp(-1 / (sampleRate * (0.034 - rpmNorm * 0.014)));
      this.combustionEnvelope *= Math.exp(-1 / (sampleRate * 0.012));
      this.intakeEnvelope *= Math.exp(-1 / (sampleRate * (0.009 + rpmNorm * 0.008)));
      if (this.exhaustPhase > TWO_PI) this.exhaustPhase -= TWO_PI;
      if (this.intakePhase > TWO_PI) this.intakePhase -= TWO_PI;
      if (this.howlPhase > TWO_PI) this.howlPhase -= TWO_PI;
      if (this.mechanicalPhase > TWO_PI) this.mechanicalPhase -= TWO_PI;
    }
    return true;
  }
}

registerProcessor("crossplane-engine", CrossplaneEngineProcessor);
