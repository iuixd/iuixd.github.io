import { describe, expect, it } from "vitest";
import { calculateMedal, nextUnlockedLevel } from "../engine/progression";
import { mergeRaceRecord, recordKey } from "../engine/storage";
import { computeCornerOverspeed } from "../engine/player";

describe("race progression", () => {
  it("awards medals for completion, podiums, and clean wins", () => {
    expect(calculateMedal({ position: 5, collisionCount: 0 })).toBe("bronze");
    expect(calculateMedal({ position: 2, collisionCount: 2 })).toBe("silver");
    expect(calculateMedal({ position: 1, collisionCount: 1 })).toBe("silver");
    expect(calculateMedal({ position: 1, collisionCount: 0 })).toBe("gold");
  });

  it("unlocks circuit two on completion and circuit three on Alpine silver", () => {
    expect(nextUnlockedLevel(0, 0, "bronze")).toBe(1);
    expect(nextUnlockedLevel(1, 1, "bronze")).toBe(1);
    expect(nextUnlockedLevel(1, 1, "silver")).toBe(2);
  });

  it("keeps independent keys and only improves stored records", () => {
    expect(recordKey(1, "sprint")).not.toBe(recordKey(1, "grand-prix"));
    const record = mergeRaceRecord(
      { bestTime: 60000, bestScore: 3000, bestLap: 58000, medal: "silver", finishes: 2 },
      { time: 62000, score: 3500, bestLap: 57000, medal: "bronze" }
    );
    expect(record).toMatchObject({ bestTime: 60000, bestScore: 3500, bestLap: 57000, medal: "silver", finishes: 3 });
  });

  it("requires more speed control as corners become sharper", () => {
    expect(computeCornerOverspeed(0, 0.8)).toBe(0);
    expect(computeCornerOverspeed(6, 0.8)).toBeGreaterThan(computeCornerOverspeed(2, 0.8));
  });
});
