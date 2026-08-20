import { ROAD_EDGE, MAX_SPEED } from "./constants";
import { clamp, updateSpeed, updateSteering, computeCurveInfluence, computeTargetLean, updateLean } from "./physics";

export function createPlayer() {
  return {
    x: 0, // -1..1 on road, up to ±OFFROAD_LIMIT off-road
    z: 0, // world Z — drives the camera
    speed: 0,
    lean: 0,
    distance: 0,
    cornerOverspeed: 0,
  };
}

export function computeCornerOverspeed(curve, speedPercent) {
  const safeSpeed = clamp(0.96 - Math.abs(curve) * 0.075, 0.5, 0.96);
  return Math.max(0, speedPercent - safeSpeed);
}

/** One frame of player physics: speed, steering, and lean, given the curve of the road
 *  segment the player is currently on. `authorityScale` (default 1) temporarily reduces
 *  steering precision, e.g. while recovering from a collision. */
export function updatePlayer(player, { input, curve, dt, authorityScale = 1, roadEdge = ROAD_EDGE }) {
  const isOffRoad = Math.abs(player.x) > roadEdge;

  const speed = updateSpeed(player.speed, {
    throttle: input.throttle,
    brake: input.brake,
    offRoad: isOffRoad,
    dt,
  });
  const speedPercent = speed / MAX_SPEED;
  const cornerOverspeed = computeCornerOverspeed(curve, speedPercent);
  const gripAuthority = Math.max(0.52, 1 - cornerOverspeed * 1.8);
  const loadedCurve = curve * (1 + cornerOverspeed * 2.4);

  const x = updateSteering(player.x, {
    inputX: input.steerX,
    curve: loadedCurve,
    speedPercent,
    offRoad: isOffRoad,
    dt,
    authorityScale: authorityScale * gripAuthority,
  });

  const curveInfluence = computeCurveInfluence(loadedCurve, speedPercent);
  const targetLean = computeTargetLean(input.steerX, curveInfluence);
  const lean = updateLean(player.lean, targetLean, dt);

  return {
    x,
    z: player.z + speed * dt,
    speed,
    lean,
    distance: player.distance + speed * dt,
    cornerOverspeed,
  };
}
