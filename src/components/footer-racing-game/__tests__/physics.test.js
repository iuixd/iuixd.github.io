import { describe, it, expect } from "vitest";
import { applyAcceleration, applyBraking, applyCoast, updateSpeed, updateSteering } from "../engine/physics";
import { MAX_SPEED, ACCELERATION, BRAKING, NATURAL_DECELERATION, OFFROAD_MAX_SPEED_RATIO } from "../engine/constants";

describe("physics: speed", () => {
  it("accelerates at the tuned rate", () => {
    expect(applyAcceleration(0, 1)).toBeCloseTo(ACCELERATION);
  });

  it("brakes at the tuned rate", () => {
    expect(applyBraking(5000, 1)).toBeCloseTo(5000 - BRAKING);
  });

  it("coasts down at the natural deceleration rate when idle", () => {
    expect(applyCoast(5000, 1)).toBeCloseTo(5000 - NATURAL_DECELERATION);
  });

  it("never exceeds MAX_SPEED on-road", () => {
    const speed = updateSpeed(MAX_SPEED, { throttle: true, brake: false, offRoad: false, dt: 1 });
    expect(speed).toBeLessThanOrEqual(MAX_SPEED);
  });

  it("never drops below zero under braking", () => {
    const speed = updateSpeed(10, { throttle: false, brake: true, offRoad: false, dt: 1 });
    expect(speed).toBeGreaterThanOrEqual(0);
  });

  it("caps speed lower while off-road, even under full throttle", () => {
    const speed = updateSpeed(MAX_SPEED, { throttle: true, brake: false, offRoad: true, dt: 1 });
    expect(speed).toBeLessThanOrEqual(MAX_SPEED * OFFROAD_MAX_SPEED_RATIO);
  });

  it("off-road drag slows the bike faster than natural coasting alone", () => {
    const onRoad = updateSpeed(5000, { throttle: false, brake: false, offRoad: false, dt: 0.1 });
    const offRoad = updateSpeed(5000, { throttle: false, brake: false, offRoad: true, dt: 0.1 });
    expect(offRoad).toBeLessThan(onRoad);
  });
});

describe("physics: steering & centrifugal force", () => {
  it("has no steering authority at a standstill, and steers at speed", () => {
    const stationary = updateSteering(0, { inputX: 1, curve: 0, speedPercent: 0, offRoad: false, dt: 1 });
    const atSpeed = updateSteering(0, { inputX: 1, curve: 0, speedPercent: 1, offRoad: false, dt: 1 });
    expect(stationary).toBeCloseTo(0);
    expect(atSpeed).toBeGreaterThan(0);
  });

  it("a curve pulls playerX away from centre with no steering input at all", () => {
    const pulled = updateSteering(0, { inputX: 0, curve: 4, speedPercent: 1, offRoad: false, dt: 1 });
    expect(pulled).not.toBeCloseTo(0);
  });

  it("sharper curves pull harder than gentle ones at the same speed", () => {
    const mild = updateSteering(0, { inputX: 0, curve: 2, speedPercent: 1, offRoad: false, dt: 1 });
    const sharp = updateSteering(0, { inputX: 0, curve: 6, speedPercent: 1, offRoad: false, dt: 1 });
    expect(Math.abs(sharp)).toBeGreaterThan(Math.abs(mild));
  });

  it("clamps playerX to the off-road limit", () => {
    const result = updateSteering(1.6, { inputX: 1, curve: 0, speedPercent: 1, offRoad: true, dt: 1 });
    expect(Math.abs(result)).toBeLessThanOrEqual(1.65);
  });
});
