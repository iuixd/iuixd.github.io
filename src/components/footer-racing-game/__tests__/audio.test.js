import { describe, expect, it, vi } from "vitest";
import { AudioController } from "../engine/audio";

const audioParam = () => ({ setTargetAtTime: vi.fn() });

function createRunningAudio() {
  const audio = new AudioController();
  audio.muted = false;
  audio.ctx = { currentTime: 0 };
  audio.bodyOsc = { frequency: audioParam() };
  audio.bodyGain = { gain: audioParam() };
  audio.fundamentalOsc = { frequency: audioParam() };
  audio.harmonicOsc = { frequency: audioParam() };
  audio.fundamentalGain = { gain: audioParam() };
  audio.harmonicGain = { gain: audioParam() };
  audio.whineOsc = { frequency: audioParam() };
  audio.whineGain = { gain: audioParam() };
  audio.noiseFilter = { frequency: audioParam() };
  audio.noiseGain = { gain: audioParam() };
  audio.engineFilter = { frequency: audioParam(), Q: audioParam() };
  audio.masterGain = { gain: audioParam() };
  audio.playShiftTransient = vi.fn();
  audio.playExhaustCrackle = vi.fn();
  return audio;
}

function runFor(audio, seconds, input) {
  const dt = 1 / 60;
  for (let elapsed = 0; elapsed < seconds; elapsed += dt) {
    audio.ctx.currentTime += dt;
    audio.updateEngine({ offRoad: false, active: true, dt, ...input });
  }
}

describe("motorcycle audio transmission", () => {
  it("holds top gear at sustained speed, then downshifts and permits a new upshift sequence", () => {
    const audio = createRunningAudio();

    for (const speedPercent of [0.16, 0.31, 0.46, 0.63]) {
      runFor(audio, 1.5, { speedPercent, throttle: true, braking: false });
    }

    expect(audio.gear).toBe(5);
    expect(audio.playShiftTransient).toHaveBeenCalledTimes(4);

    runFor(audio, 5, { speedPercent: 1, throttle: true, braking: false });
    expect(audio.gear).toBe(5);
    expect(audio.playShiftTransient).toHaveBeenCalledTimes(4);

    for (const speedPercent of [0.55, 0.39, 0.23, 0.08, 0]) {
      runFor(audio, 0.35, { speedPercent, throttle: false, braking: true });
    }
    expect(audio.gear).toBe(1);

    const shiftsAfterBraking = audio.playShiftTransient.mock.calls.length;
    for (const speedPercent of [0.16, 0.31]) {
      runFor(audio, 1.5, { speedPercent, throttle: true, braking: false });
    }
    expect(audio.gear).toBe(3);
    expect(audio.playShiftTransient).toHaveBeenCalledTimes(shiftsAfterBraking + 2);
  });

  it("emits low-gear crackles only on load bands and throttle transitions", () => {
    const audio = createRunningAudio();

    runFor(audio, 1.5, { speedPercent: 0.14, throttle: true, braking: false });
    const cracklesAfterAcceleration = audio.playExhaustCrackle.mock.calls.length;
    expect(cracklesAfterAcceleration).toBeGreaterThan(0);

    runFor(audio, 4, { speedPercent: 0.14, throttle: true, braking: false });
    expect(audio.playExhaustCrackle).toHaveBeenCalledTimes(cracklesAfterAcceleration);

    runFor(audio, 0.1, { speedPercent: 0.13, throttle: false, braking: true });
    expect(audio.playExhaustCrackle.mock.calls.length).toBeGreaterThan(cracklesAfterAcceleration);

    const cracklesAfterLift = audio.playExhaustCrackle.mock.calls.length;
    runFor(audio, 2, { speedPercent: 0.13, throttle: false, braking: true });
    expect(audio.playExhaustCrackle).toHaveBeenCalledTimes(cracklesAfterLift);
  });

  it("drops RPM on upshift and rev-matches a loaded downshift", () => {
    const audio = createRunningAudio();
    audio.rpm = 11200;

    runFor(audio, 1 / 60, { speedPercent: 0.16, throttle: true, braking: false });
    expect(audio.gear).toBe(2);
    expect(audio.rpm).toBeLessThan(8000);

    audio.gear = 3;
    audio.rpm = 7600;
    audio.shiftCooldownRemaining = 0;
    audio.previousSpeedPercent = 0.3;
    runFor(audio, 1 / 60, { speedPercent: 0.23, throttle: false, braking: true });

    expect(audio.gear).toBe(2);
    expect(audio.rpm).toBeGreaterThan(9000);
    expect(audio.revMatchRemaining).toBeGreaterThan(0);
  });

  it("streams RPM, gear and smoothed load to the combustion worklet", () => {
    const audio = createRunningAudio();
    const postMessage = vi.fn();
    audio.workletNode = { port: { postMessage } };

    runFor(audio, 0.2, { speedPercent: 0.1, throttle: true, braking: false });

    expect(postMessage).toHaveBeenCalled();
    expect(postMessage.mock.calls.at(-1)[0]).toMatchObject({
      type: "engine-state",
      gear: 1,
      braking: false,
      active: true,
    });
    expect(postMessage.mock.calls.at(-1)[0].load).toBeGreaterThan(0.8);
  });
});
