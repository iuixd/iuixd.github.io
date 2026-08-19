import {
  MAX_SPEED,
  ACCELERATION,
  BRAKING,
  NATURAL_DECELERATION,
  OFFROAD_DECELERATION,
  OFFROAD_MAX_SPEED_RATIO,
  STEER_SPEED,
  OFFROAD_STEER_PENALTY,
  CENTRIFUGAL_FORCE,
  OFFROAD_LIMIT,
  LEAN_SMOOTHING_RATE,
  SPEED_KPH_MAX,
} from "./constants";

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function applyAcceleration(speed, dt) {
  return speed + ACCELERATION * dt;
}

export function applyBraking(speed, dt) {
  return speed - BRAKING * dt;
}

export function applyCoast(speed, dt) {
  return speed - NATURAL_DECELERATION * dt;
}

export function applyOffRoadDrag(speed, dt) {
  return speed - OFFROAD_DECELERATION * dt;
}

export function clampSpeed(speed, offRoad) {
  const max = offRoad ? MAX_SPEED * OFFROAD_MAX_SPEED_RATIO : MAX_SPEED;
  return clamp(speed, 0, max);
}

/** One frame of throttle/brake/coast (+ off-road drag), clamped to the road's speed limit. */
export function updateSpeed(speed, { throttle, brake, offRoad, dt }) {
  let next = speed;

  if (brake) {
    next = applyBraking(next, dt);
  } else if (throttle) {
    next = applyAcceleration(next, dt);
  } else {
    next = applyCoast(next, dt);
  }

  if (offRoad) {
    next = applyOffRoadDrag(next, dt);
  }

  return clampSpeed(next, offRoad);
}

/**
 * One frame of lateral movement: steering input scaled by speed (no crawling-speed
 * steering authority), minus the centrifugal pull of the current curve — faster corners
 * pull harder, so the rider has to countersteer to hold a line. `authorityScale` lets a
 * caller temporarily reduce steering precision (e.g. recovering from a collision).
 */
export function updateSteering(playerX, { inputX, curve, speedPercent, offRoad, dt, authorityScale = 1 }) {
  const baseAuthority = offRoad ? STEER_SPEED * OFFROAD_STEER_PENALTY : STEER_SPEED;
  const steerAuthority = baseAuthority * authorityScale;
  let next = playerX + inputX * steerAuthority * speedPercent * dt;
  next -= curve * CENTRIFUGAL_FORCE * speedPercent * speedPercent * dt;
  return clamp(next, -OFFROAD_LIMIT, OFFROAD_LIMIT);
}

export function computeCurveInfluence(curve, speedPercent) {
  return clamp(curve * CENTRIFUGAL_FORCE * speedPercent, -1, 1);
}

export function computeTargetLean(inputX, curveInfluence) {
  return clamp(inputX * 0.75 - curveInfluence, -1, 1);
}

export function updateLean(lean, targetLean, dt) {
  return lerp(lean, targetLean, 1 - Math.exp(-LEAN_SMOOTHING_RATE * dt));
}

export function speedToKph(speed) {
  const speedPercent = clamp(speed / MAX_SPEED, 0, 1);
  return Math.round(speedPercent * SPEED_KPH_MAX);
}
