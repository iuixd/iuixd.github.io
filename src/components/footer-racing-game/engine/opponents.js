import {
  MAX_SPEED,
  SEGMENT_LENGTH,
  OPPONENT_COUNT,
  OPPONENT_MIN_SPEED_RATIO,
  OPPONENT_MAX_SPEED_RATIO,
  OPPONENT_LANE_LIMIT,
  CURVE_SPEED_FACTOR,
  OPPONENT_SKILL_CURVE_REDUCTION,
  AI_SPEED_SMOOTHING_RATE,
  AI_OFFSET_SMOOTHING_RATE,
  AI_LOOKAHEAD_Z,
  AI_AVOID_LATERAL_GAP,
  AI_AVOID_X_THRESHOLD,
  OPPONENT_LEAN_CURVE_WEIGHT,
  OPPONENT_LEAN_LATERAL_WEIGHT,
  OPPONENT_LEAN_SMOOTHING_RATE,
  OPPONENT_HIT_WOBBLE_DECAY_RATE,
  OPPONENT_SUSPENSION_FREQUENCY,
  OPPONENT_SUSPENSION_AMPLITUDE,
} from "./constants";
import { clamp, lerp, computeCurveInfluence } from "./physics";
import { findBaseSegmentIndex } from "./road";

const HOME_OFFSETS = [-0.6, -0.3, 0, 0.3, 0.6];

// Deterministic PRNG (mulberry32) so opponent personalities are stable across a session
// instead of reshuffling on every re-render.
function seededRandom(seed) {
  let t = seed;
  return function next() {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

export function createOpponents(profile = {}) {
  const opponents = [];
  const count = profile.count ?? OPPONENT_COUNT;
  const minSpeedRatio = profile.minSpeedRatio ?? OPPONENT_MIN_SPEED_RATIO;
  const maxSpeedRatio = profile.maxSpeedRatio ?? OPPONENT_MAX_SPEED_RATIO;
  const minSkill = profile.minSkill ?? 0;
  const aggressionBoost = profile.aggressionBoost ?? 0;
  const laneLimit = profile.laneLimit ?? OPPONENT_LANE_LIMIT;

  for (let i = 0; i < count; i += 1) {
    const rand = seededRandom(1000 + i * 97);
    const skill = minSkill + rand() * (1 - minSkill);
    const aggression = clamp(rand() + aggressionBoost, 0, 1);
    const speedRatio = minSpeedRatio + rand() * (maxSpeedRatio - minSpeedRatio);
    const homeOffset = HOME_OFFSETS[i % HOME_OFFSETS.length];

    opponents.push({
      id: `opp-${i + 1}`,
      z: (i + 1) * SEGMENT_LENGTH * 2.5, // staggered ahead of the start line
      offset: homeOffset,
      speed: speedRatio * MAX_SPEED * 0.6, // rolling start, not a dead stop
      targetOffset: homeOffset,
      homeOffset,
      laneLimit,
      baseSpeedRatio: speedRatio,
      aggression,
      skill,
      reaction: 0.4 + rand() * 0.6, // higher = commits to a lane change faster
      spriteVariant: i % OPPONENT_COUNT,
      lean: 0,
      hitWobble: 0,
      bobPhase: rand() * Math.PI * 2,
      bobTime: 0,
      suspensionOffset: 0,
      launchProgress: 0,
    });
  }

  return opponents;
}

function computeTargetSpeed(opponent, curve) {
  const rawPenalty = Math.min(Math.abs(curve) * CURVE_SPEED_FACTOR, 0.28);
  const penalty = rawPenalty * (1 - OPPONENT_SKILL_CURVE_REDUCTION * opponent.skill);
  return opponent.baseSpeedRatio * MAX_SPEED * (1 - penalty);
}

/** Nearest racer within the lookahead window, roughly in the same lane, ahead of `opponent`. */
function findBlocker(opponent, allRacers) {
  let closest = null;
  let closestDistance = AI_LOOKAHEAD_Z;

  for (const other of allRacers) {
    if (other === opponent) continue;
    const aheadDistance = other.z - opponent.z;
    if (aheadDistance <= 0 || aheadDistance > AI_LOOKAHEAD_Z) continue;
    if (Math.abs(other.offset - opponent.offset) > AI_AVOID_X_THRESHOLD) continue;

    if (aheadDistance < closestDistance) {
      closest = other;
      closestDistance = aheadDistance;
    }
  }

  return closest;
}

/** Picks a lateral gap to overtake through — prefers whichever side is closer to the
 *  opponent's home lane, falls back to the other side, and occasionally (more often for
 *  lower-skill riders) misjudges which gap is actually clear. */
function chooseOvertakeOffset(opponent, blocker, allRacers) {
  const rightGap = blocker.offset + AI_AVOID_LATERAL_GAP;
  const leftGap = blocker.offset - AI_AVOID_LATERAL_GAP;

  const spaceIsClear = (candidateOffset) =>
    Math.abs(candidateOffset) <= opponent.laneLimit &&
    !allRacers.some(
      (other) =>
        other !== opponent &&
        other !== blocker &&
        Math.abs(other.z - opponent.z) < AI_LOOKAHEAD_Z * 0.5 &&
        Math.abs(other.offset - candidateOffset) < AI_AVOID_X_THRESHOLD
    );

  const preferRight = opponent.homeOffset >= blocker.offset;
  const preferred = preferRight ? rightGap : leftGap;
  const fallback = preferRight ? leftGap : rightGap;

  const misjudge = Math.random() < (1 - opponent.skill) * 0.15;

  if (!misjudge && spaceIsClear(preferred)) return clamp(preferred, -opponent.laneLimit, opponent.laneLimit);
  if (spaceIsClear(fallback)) return clamp(fallback, -opponent.laneLimit, opponent.laneLimit);
  return opponent.offset; // both sides blocked — hold position rather than force it
}

export function updateOpponent(opponent, { curve, allRacers, dt }) {
  const targetSpeed = computeTargetSpeed(opponent, curve);
  const speed = lerp(opponent.speed, targetSpeed, 1 - Math.exp(-AI_SPEED_SMOOTHING_RATE * dt));
  const speedPercent = clamp(speed / MAX_SPEED, 0, 1);

  const blocker = findBlocker(opponent, allRacers);
  const targetOffset = blocker ? chooseOvertakeOffset(opponent, blocker, allRacers) : opponent.homeOffset;

  const offsetRate = AI_OFFSET_SMOOTHING_RATE * opponent.reaction;
  const offset = clamp(
    lerp(opponent.offset, targetOffset, 1 - Math.exp(-offsetRate * dt)),
    -opponent.laneLimit,
    opponent.laneLimit
  );

  // Visual lean only — never fed back into AI/physics. Blends how hard the current curve
  // pulls (reusing the same curve-influence math as the player's own lean) with how fast
  // the rider is moving sideways right now (overtaking/avoiding reads as a harder lean).
  const lateralVelocity = dt > 0 ? (offset - opponent.offset) / dt : 0;
  const curveInfluence = computeCurveInfluence(curve, speedPercent);
  const targetLean = clamp(
    curveInfluence * OPPONENT_LEAN_CURVE_WEIGHT + lateralVelocity * OPPONENT_LEAN_LATERAL_WEIGHT,
    -1,
    1
  );
  const lean = lerp(opponent.lean, targetLean, 1 - Math.exp(-OPPONENT_LEAN_SMOOTHING_RATE * dt));
  const hitWobble = (opponent.hitWobble || 0) * Math.exp(-OPPONENT_HIT_WOBBLE_DECAY_RATE * dt);

  const bobTime = opponent.bobTime + dt;
  const suspensionOffset =
    Math.sin(bobTime * OPPONENT_SUSPENSION_FREQUENCY * Math.PI * 2 + opponent.bobPhase) * OPPONENT_SUSPENSION_AMPLITUDE;

  return {
    ...opponent,
    speed,
    offset,
    targetOffset,
    lean: lean + hitWobble,
    hitWobble,
    bobTime,
    suspensionOffset,
    launchProgress: Math.min(1, (opponent.launchProgress || 0) + dt / 1.15),
    z: opponent.z + speed * dt,
  };
}

/** Advances every opponent one frame. Avoidance decisions are based on this frame's
 *  positions (including the player, via `playerRacer`) before anyone moves, so results
 *  don't depend on array iteration order. */
export function updateOpponents(opponents, { segments, dt, playerRacer }) {
  const segmentCount = segments.length;
  const allRacers = playerRacer ? [...opponents, playerRacer] : opponents;

  return opponents.map((opponent) => {
    const curve = segments[findBaseSegmentIndex(opponent.z, segmentCount)].curve;
    return updateOpponent(opponent, { curve, allRacers, dt });
  });
}
