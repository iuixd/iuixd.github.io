import {
  DISTANCE_SCORE_RATE,
  OVERTAKE_BONUS,
  CLEAN_SECTOR_BONUS,
  FINISH_BONUS,
  COLLISION_PENALTY,
  POSITION_BONUS,
} from "./constants";

export function clampScore(score) {
  return Math.max(0, score);
}

export function accumulateDistanceScore(score, speedPercent, dt) {
  return clampScore(score + speedPercent * DISTANCE_SCORE_RATE * dt);
}

export function applyOvertakeBonus(score) {
  return clampScore(score + OVERTAKE_BONUS);
}

export function applyCleanSectorBonus(score) {
  return clampScore(score + CLEAN_SECTOR_BONUS);
}

export function applyCollisionPenalty(score) {
  return clampScore(score - COLLISION_PENALTY);
}

export function applyFinishBonus(score, position) {
  return clampScore(score + FINISH_BONUS + (POSITION_BONUS[position] ?? 0));
}

// --- Ranking ---
// progress = completedLaps * trackLength + currentZ. This track is single-lap, so
// completedLaps stays 0 for the whole race and progress reduces to just `z` — kept in the
// spec's literal form so it's correct as-is if a multi-lap circuit is added later.

export function computeProgress(racer, trackLength) {
  return (racer.completedLaps || 0) * trackLength + racer.z;
}

/** Ranks racers by progress, furthest-along first. Call once per tick — never re-sort
 *  inside a per-racer drawing loop. */
export function rankRacers(racers, trackLength) {
  return [...racers]
    .map((racer) => ({ id: racer.id, progress: computeProgress(racer, trackLength) }))
    .sort((a, b) => b.progress - a.progress);
}

/** 1-based position of `id` within an already-ranked list. */
export function getPosition(rankedRacers, id) {
  const index = rankedRacers.findIndex((racer) => racer.id === id);
  return index === -1 ? rankedRacers.length : index + 1;
}
