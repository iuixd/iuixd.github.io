import { ROAD_EDGE, MAX_SPEED } from "./constants";
import { updateSpeed, updateSteering, computeCurveInfluence, computeTargetLean, updateLean } from "./physics";

export function createPlayer() {
  return {
    x: 0, // -1..1 on road, up to ±OFFROAD_LIMIT off-road
    z: 0, // world Z — drives the camera
    speed: 0,
    lean: 0,
    distance: 0,
  };
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

  const x = updateSteering(player.x, {
    inputX: input.steerX,
    curve,
    speedPercent,
    offRoad: isOffRoad,
    dt,
    authorityScale,
  });

  const curveInfluence = computeCurveInfluence(curve, speedPercent);
  const targetLean = computeTargetLean(input.steerX, curveInfluence);
  const lean = updateLean(player.lean, targetLean, dt);

  return {
    x,
    z: player.z + speed * dt,
    speed,
    lean,
    distance: player.distance + speed * dt,
  };
}
