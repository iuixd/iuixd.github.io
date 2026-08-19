import { describe, it, expect } from "vitest";
import { TrackBuilder, CURVE, HILL } from "../tracks/trackBuilder";
import { SEGMENT_LENGTH } from "../engine/constants";

describe("TrackBuilder", () => {
  it("produces continuously ordered segments with valid, connected Z coordinates", () => {
    const track = new TrackBuilder().addStraight(20).addCurve(30, CURVE.MEDIUM).build();

    track.segments.forEach((segment, i) => {
      expect(segment.index).toBe(i);
      expect(segment.p1.z).toBe(i * SEGMENT_LENGTH);
      expect(segment.p2.z).toBe((i + 1) * SEGMENT_LENGTH);

      if (i > 0) {
        const previous = track.segments[i - 1];
        expect(segment.p1.z).toBe(previous.p2.z);
        expect(segment.p1.y).toBeCloseTo(previous.p2.y);
      }
    });
  });

  it("reports a track length matching the segment count", () => {
    const track = new TrackBuilder().addStraight(50).build();
    expect(track.segments.length).toBe(50);
    expect(track.length).toBe(50 * SEGMENT_LENGTH);
  });

  it("ends at a well-defined finish point", () => {
    const track = new TrackBuilder().addStraight(10).addCurve(30, CURVE.EASY).build();
    const lastSegment = track.segments[track.segments.length - 1];
    expect(lastSegment.p2.z).toBe(track.length);
  });

  it("ramps curve smoothly in and out rather than jumping abruptly, reaching full magnitude", () => {
    const track = new TrackBuilder().addStraight(10).addCurve(60, CURVE.HARD).addStraight(10).build();
    const curves = track.segments.map((s) => s.curve);

    for (let i = 1; i < curves.length; i += 1) {
      expect(Math.abs(curves[i] - curves[i - 1])).toBeLessThan(CURVE.HARD);
    }
    expect(Math.max(...curves)).toBe(CURVE.HARD);
  });

  it("ramps elevation smoothly and reaches close to the requested hill height", () => {
    const track = new TrackBuilder().addStraight(10).addHill(60, HILL.MEDIUM).build();
    const elevations = track.segments.map((s) => s.elevation);

    for (let i = 1; i < elevations.length; i += 1) {
      expect(Math.abs(elevations[i] - elevations[i - 1])).toBeLessThan(HILL.MEDIUM);
    }
    expect(elevations[elevations.length - 1]).toBeGreaterThan(HILL.MEDIUM * 0.9);
  });

  it("addDownhill drops elevation by the requested height", () => {
    const track = new TrackBuilder().addDownhill(60, HILL.MEDIUM).build();
    const elevations = track.segments.map((s) => s.elevation);
    expect(elevations[elevations.length - 1]).toBeLessThan(-HILL.MEDIUM * 0.9);
  });

  it("addSCurves alternates curve direction across four bends", () => {
    const track = new TrackBuilder().addSCurves(40, CURVE.MEDIUM).build();
    const quarter = track.segments.length / 4;

    const peakIn = (from, to) =>
      track.segments.slice(from, to).reduce((max, s) => (Math.abs(s.curve) > Math.abs(max) ? s.curve : max), 0);

    const first = peakIn(0, quarter);
    const second = peakIn(quarter, quarter * 2);
    const third = peakIn(quarter * 2, quarter * 3);
    const fourth = peakIn(quarter * 3, quarter * 4);

    expect(Math.sign(first)).toBe(-1);
    expect(Math.sign(second)).toBe(1);
    expect(Math.sign(third)).toBe(-1);
    expect(Math.sign(fourth)).toBe(1);
  });
});
