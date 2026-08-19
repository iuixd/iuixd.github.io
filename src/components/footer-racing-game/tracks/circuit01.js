import { TrackBuilder, CURVE, HILL } from "./trackBuilder";

/**
 * "Skyline Circuit" — an original fictional track (no relation to any real or commercial
 * circuit). ~930 segments: starting straight → gentle right → uphill → tight left →
 * downhill straight → S-curves → long sweeping right → final straight → finish.
 * Exact race duration depends on player physics (Phase 5) and gets tuned against the
 * 45–75s target once that lands.
 */
export function buildCircuit01() {
  return new TrackBuilder()
    .addStraight(80)
    .addCurve(90, CURVE.EASY)
    .addHill(90, HILL.MEDIUM)
    .addCurve(70, -CURVE.HARD)
    .addDownhill(90, HILL.MEDIUM)
    .addSCurves(50, CURVE.MEDIUM)
    .addCurve(150, CURVE.EASY)
    .addStraight(160)
    .build();
}
