import { SEGMENT_LENGTH } from "./constants";

/**
 * A single road segment at `index`. `elevation` is the world Y height at the segment's far
 * edge (p2); p1's height is whatever the previous segment ended at, so consecutive segments
 * always connect without a seam.
 */
export function createSegment(index, curve = 0, startElevation = 0, elevation = startElevation) {
  const worldZ = index * SEGMENT_LENGTH;
  return {
    index,
    worldZ,
    curve,
    elevation,
    p1: { x: 0, y: startElevation, z: worldZ },
    p2: { x: 0, y: elevation, z: worldZ + SEGMENT_LENGTH },
    sprites: [],
  };
}

/** Index of the segment the camera's world Z currently sits within. */
export function findBaseSegmentIndex(cameraZ, segmentCount) {
  if (segmentCount <= 0) return 0;
  const index = Math.floor(cameraZ / SEGMENT_LENGTH) % segmentCount;
  return index < 0 ? index + segmentCount : index;
}

/** Interpolated ground height at world Z — used to keep the camera and opponent sprites
 *  sitting on the road surface as it climbs/descends hills. */
export function getGroundElevation(segments, z) {
  if (!segments.length) return 0;
  const segment = segments[findBaseSegmentIndex(z, segments.length)];
  const progress = (((z % SEGMENT_LENGTH) + SEGMENT_LENGTH) % SEGMENT_LENGTH) / SEGMENT_LENGTH;
  return segment.p1.y + (segment.p2.y - segment.p1.y) * progress;
}
