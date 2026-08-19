import { describe, it, expect } from "vitest";
import { projectPoint } from "../engine/projection";
import { getRoadCurveOffset, getTracksidePlacement } from "../engine/renderer";
import { TrackBuilder, CURVE } from "../tracks/trackBuilder";
import { SEGMENT_LENGTH } from "../engine/constants";

const camera = { x: 0, y: 950, z: 0, depth: 0.84 };
const viewportWidth = 1280;
const viewportHeight = 720;
const roadWidth = 1800;

describe("projectPoint", () => {
  it("clips points at or behind the camera", () => {
    expect(projectPoint({ x: 0, y: 950, z: 0 }, camera, viewportWidth, viewportHeight, roadWidth).visible).toBe(
      false
    );
    expect(
      projectPoint({ x: 0, y: 950, z: -500 }, camera, viewportWidth, viewportHeight, roadWidth).visible
    ).toBe(false);
  });

  it("projects a point directly ahead at camera height to the screen centre", () => {
    const result = projectPoint({ x: 0, y: 950, z: 1000 }, camera, viewportWidth, viewportHeight, roadWidth);
    expect(result.visible).toBe(true);
    expect(result.x).toBeCloseTo(viewportWidth / 2);
    expect(result.y).toBeCloseTo(viewportHeight / 2);
  });

  it("perspective scale decreases monotonically as z increases", () => {
    const near = projectPoint({ x: 0, y: 950, z: 500 }, camera, viewportWidth, viewportHeight, roadWidth);
    const mid = projectPoint({ x: 0, y: 950, z: 2000 }, camera, viewportWidth, viewportHeight, roadWidth);
    const far = projectPoint({ x: 0, y: 950, z: 8000 }, camera, viewportWidth, viewportHeight, roadWidth);

    expect(near.scale).toBeGreaterThan(mid.scale);
    expect(mid.scale).toBeGreaterThan(far.scale);
    expect(near.w).toBeGreaterThan(mid.w);
    expect(mid.w).toBeGreaterThan(far.w);
  });

  it("projected width scales linearly with roadWidth", () => {
    const point = { x: 0, y: 950, z: 1000 };
    const narrow = projectPoint(point, camera, viewportWidth, viewportHeight, 900);
    const wide = projectPoint(point, camera, viewportWidth, viewportHeight, 1800);
    expect(wide.w).toBeCloseTo(narrow.w * 2);
  });

  it("offsets x/y screen position proportionally to camera-relative world offsets", () => {
    const centre = projectPoint({ x: 0, y: 950, z: 1000 }, camera, viewportWidth, viewportHeight, roadWidth);
    const shiftedRight = projectPoint({ x: 500, y: 950, z: 1000 }, camera, viewportWidth, viewportHeight, roadWidth);
    const shiftedUp = projectPoint({ x: 0, y: 1200, z: 1000 }, camera, viewportWidth, viewportHeight, roadWidth);

    expect(shiftedRight.x).toBeGreaterThan(centre.x);
    expect(shiftedUp.y).toBeLessThan(centre.y);
  });
});

describe("opponent road alignment", () => {
  it("accumulates the same lateral bend used by the projected road", () => {
    const track = new TrackBuilder().addCurve(60, CURVE.HARD).build();
    const offset = getRoadCurveOffset(track.segments, 0, SEGMENT_LENGTH * 30, SEGMENT_LENGTH);
    expect(Math.abs(offset)).toBeGreaterThan(1);
  });

  it("has no correction on a straight", () => {
    const track = new TrackBuilder().addStraight(60).build();
    expect(getRoadCurveOffset(track.segments, 0, SEGMENT_LENGTH * 30, SEGMENT_LENGTH)).toBe(0);
  });
});

describe("continuous trackside world placement", () => {
  it("returns stable scenery for the same absolute circuit segment", () => {
    expect(getTracksidePlacement(34)).toEqual({ itemIndex: 0, side: -1 });
    expect(getTracksidePlacement(34)).toEqual(getTracksidePlacement(34));
  });

  it("distributes different depth-scaled scenery types on both sides of the circuit", () => {
    const placements = Array.from({ length: 360 }, (_, index) => getTracksidePlacement(index)).filter(Boolean);
    expect(new Set(placements.map(({ itemIndex }) => itemIndex)).size).toBe(4);
    expect(placements.some(({ side }) => side === -1)).toBe(true);
    expect(placements.some(({ side }) => side === 1)).toBe(true);
  });
});
