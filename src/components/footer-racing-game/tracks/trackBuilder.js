import { SEGMENT_LENGTH } from "../engine/constants";
import { createSegment } from "../engine/road";

// Curve/hill magnitude presets. Curve is the per-segment bend rate consumed by the renderer's
// cumulative offset; hill values are total world-Y height changes over the hill's length.
export const CURVE = { NONE: 0, EASY: 2, MEDIUM: 4, HARD: 6 };
export const HILL = { NONE: 0, LOW: 600, MEDIUM: 1200, HIGH: 1800 };

function easeIn(a, b, percent) {
  return a + (b - a) * percent * percent;
}

function easeInOut(a, b, percent) {
  return a + (b - a) * (0.5 - Math.cos(percent * Math.PI) / 2);
}

/**
 * Accumulates road segments into a track. Curves and hills ramp in/out over an
 * enter/hold/leave span (rather than snapping instantly) so the road reads as a smooth
 * bend or rise, matching how the renderer's cumulative curve offset expects consecutive
 * segments to change gradually.
 */
export class TrackBuilder {
  constructor() {
    this.segments = [];
    this.elevation = 0;
  }

  get length() {
    return this.segments.length;
  }

  addSegment(curve, elevation) {
    const startElevation = this.elevation;
    this.segments.push(createSegment(this.segments.length, curve, startElevation, elevation));
    this.elevation = elevation;
    return this;
  }

  /** A flat straight of `count` segments at the current curve (0) and elevation. */
  addStraight(count = 50) {
    return this.addRoad(0, count, 0, CURVE.NONE, 0);
  }

  /** A bend that eases in, holds at `curve`, then eases back out to straight. */
  addCurve(count = 60, curve = CURVE.MEDIUM) {
    const enter = Math.max(1, Math.round(count / 3));
    const leave = Math.max(1, Math.round(count / 3));
    const hold = Math.max(1, count - enter - leave);
    return this.addRoad(enter, hold, leave, curve, 0);
  }

  /** A rise of `height` world-Y units, curve unchanged, eased smoothly across the span. */
  addHill(count = 60, height = HILL.MEDIUM) {
    const enter = Math.max(1, Math.round(count / 3));
    const leave = Math.max(1, Math.round(count / 3));
    const hold = Math.max(1, count - enter - leave);
    return this.addRoad(enter, hold, leave, CURVE.NONE, height);
  }

  /** A drop of `height` world-Y units — an addHill with the sign flipped. */
  addDownhill(count = 60, height = HILL.MEDIUM) {
    return this.addHill(count, -Math.abs(height));
  }

  /** Four alternating bends of `segmentSpan` segments each: left-right-left-right (or the
   *  reverse, depending on `curve`'s sign), flat. */
  addSCurves(segmentSpan = 50, curve = CURVE.MEDIUM) {
    this.addCurve(segmentSpan, -curve);
    this.addCurve(segmentSpan, curve);
    this.addCurve(segmentSpan, -curve);
    this.addCurve(segmentSpan, curve);
    return this;
  }

  /** Shared enter/hold/leave ramp underlying all the helpers above. `curve` holds constant
   *  through the middle span; elevation eases continuously start-to-end across all three
   *  phases so hills read as one smooth rise rather than a rise-plateau-rise. */
  addRoad(enter, hold, leave, curve, deltaElevation) {
    const startElevation = this.elevation;
    const endElevation = startElevation + deltaElevation;
    const total = enter + hold + leave;

    for (let n = 0; n < enter; n += 1) {
      this.addSegment(easeIn(0, curve, n / enter), easeInOut(startElevation, endElevation, n / total));
    }
    for (let n = 0; n < hold; n += 1) {
      this.addSegment(curve, easeInOut(startElevation, endElevation, (enter + n) / total));
    }
    for (let n = 0; n < leave; n += 1) {
      this.addSegment(easeInOut(curve, 0, n / leave), easeInOut(startElevation, endElevation, (enter + hold + n) / total));
    }
    return this;
  }

  build() {
    return {
      segments: this.segments,
      length: this.segments.length * SEGMENT_LENGTH,
    };
  }
}
