import { describe, expect, it } from "vitest";
import { LEVELS } from "../tracks/levels";
import { createOpponents } from "../engine/opponents";

describe("circuit progression", () => {
  it("defines three increasingly demanding, distinct circuits", () => {
    expect(LEVELS).toHaveLength(3);
    expect(new Set(LEVELS.map((level) => level.circuit)).size).toBe(3);
    expect(LEVELS[0].roadWidth).toBeGreaterThan(LEVELS[1].roadWidth);
    expect(LEVELS[1].roadWidth).toBeGreaterThan(LEVELS[2].roadWidth);
    expect(LEVELS[0].steeringAuthority).toBeGreaterThan(LEVELS[2].steeringAuthority);

    const signatures = LEVELS.map((level) => {
      const track = level.buildTrack();
      return track.segments.map((segment) => `${segment.curve.toFixed(2)}:${segment.elevation.toFixed(0)}`).join("|");
    });
    expect(new Set(signatures).size).toBe(3);
  });

  it("increases field size, pace, skill, and aggression by level", () => {
    const fields = LEVELS.map((level) => createOpponents(level.ai));
    expect(fields[0]).toHaveLength(3);
    expect(fields[1]).toHaveLength(5);
    expect(fields[2]).toHaveLength(5);
    expect(Math.max(...fields[1].map((rider) => rider.laneLimit))).toBeLessThan(1);
    expect(Math.max(...fields[2].map((rider) => rider.laneLimit))).toBeLessThan(
      Math.max(...fields[1].map((rider) => rider.laneLimit))
    );
    expect(Math.min(...fields[1].map((rider) => rider.baseSpeedRatio))).toBeGreaterThan(
      Math.min(...fields[0].map((rider) => rider.baseSpeedRatio))
    );
    expect(Math.min(...fields[2].map((rider) => rider.skill))).toBeGreaterThanOrEqual(LEVELS[2].ai.minSkill);
  });
});
