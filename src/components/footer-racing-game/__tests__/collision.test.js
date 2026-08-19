import { describe, it, expect } from "vitest";
import { isColliding, findCollision, isCooldownActive } from "../engine/collision";
import { COLLISION_Z_THRESHOLD, COLLISION_X_THRESHOLD } from "../engine/constants";

describe("collision detection", () => {
  it("detects a collision when both close in Z and X", () => {
    expect(isColliding(1000, 0, 1000 + COLLISION_Z_THRESHOLD * 0.5, COLLISION_X_THRESHOLD * 0.5)).toBe(true);
  });

  it("misses when far apart in Z even if laterally aligned (longitudinal miss)", () => {
    expect(isColliding(1000, 0, 1000 + COLLISION_Z_THRESHOLD * 2, 0)).toBe(false);
  });

  it("misses when close in Z but far apart laterally (lateral miss)", () => {
    expect(isColliding(1000, 0, 1000, COLLISION_X_THRESHOLD * 2)).toBe(false);
  });

  it("findCollision returns the colliding opponent among several racers", () => {
    const player = { z: 1000, x: 0 };
    const opponents = [
      { id: "a", z: 5000, offset: 0 },
      { id: "b", z: 1000, offset: 0.05 },
      { id: "c", z: 1500, offset: 0 },
    ];
    expect(findCollision(player, opponents)?.id).toBe("b");
  });

  it("findCollision returns null when nobody is close enough", () => {
    const player = { z: 1000, x: 0 };
    const opponents = [{ id: "a", z: 5000, offset: 0 }];
    expect(findCollision(player, opponents)).toBeNull();
  });
});

describe("collision cooldown", () => {
  it("is active while time remains and inactive once it reaches zero", () => {
    expect(isCooldownActive(500)).toBe(true);
    expect(isCooldownActive(0)).toBe(false);
    expect(isCooldownActive(-10)).toBe(false);
  });
});
