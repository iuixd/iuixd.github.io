import { describe, it, expect } from "vitest";
import {
  accumulateDistanceScore,
  applyOvertakeBonus,
  applyCollisionPenalty,
  applyFinishBonus,
  clampScore,
  rankRacers,
  getPosition,
} from "../engine/scoring";
import { OVERTAKE_BONUS, COLLISION_PENALTY, FINISH_BONUS, POSITION_BONUS } from "../engine/constants";

describe("scoring", () => {
  it("accumulates distance score proportional to speed", () => {
    const full = accumulateDistanceScore(0, 1, 1);
    const half = accumulateDistanceScore(0, 0.5, 1);
    expect(full).toBeGreaterThan(half);
    expect(half).toBeGreaterThan(0);
  });

  it("awards the overtake bonus", () => {
    expect(applyOvertakeBonus(1000)).toBe(1000 + OVERTAKE_BONUS);
  });

  it("applies the finish bonus plus the position bonus", () => {
    expect(applyFinishBonus(1000, 1)).toBe(1000 + FINISH_BONUS + POSITION_BONUS[1]);
    expect(applyFinishBonus(1000, 6)).toBe(1000 + FINISH_BONUS + POSITION_BONUS[6]);
  });

  it("subtracts the collision penalty", () => {
    expect(applyCollisionPenalty(1000)).toBe(1000 - COLLISION_PENALTY);
  });

  it("never allows the final score to drop below zero", () => {
    expect(applyCollisionPenalty(100)).toBe(0);
    expect(clampScore(-500)).toBe(0);
  });
});

describe("ranking", () => {
  it("ranks racers by progress, furthest along first", () => {
    const racers = [
      { id: "a", z: 500 },
      { id: "b", z: 1500 },
      { id: "c", z: 900 },
    ];
    expect(rankRacers(racers, 10000).map((r) => r.id)).toEqual(["b", "c", "a"]);
  });

  it("reports the correct 1-based position for a given racer", () => {
    const racers = [
      { id: "player", z: 1000 },
      { id: "opp-1", z: 2000 },
    ];
    const ranked = rankRacers(racers, 10000);
    expect(getPosition(ranked, "player")).toBe(2);
    expect(getPosition(ranked, "opp-1")).toBe(1);
  });
});
