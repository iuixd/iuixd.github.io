import { TrackBuilder, CURVE, HILL } from "./trackBuilder";

/** Apex Gauntlet: short straights, sharp switchbacks, crests, drops, and complex esses. */
export function buildCircuit03() {
  return new TrackBuilder()
    .addStraight(48)
    .addCurve(52, CURVE.HARD)
    .addCurve(45, -CURVE.HARD)
    .addHill(48, HILL.HARD)
    .addSCurves(30, CURVE.HARD)
    .addDownhill(44, HILL.HARD)
    .addCurve(42, CURVE.HARD)
    .addHill(42, HILL.MEDIUM)
    .addCurve(38, -CURVE.HARD)
    .addDownhill(40, HILL.HARD)
    .addSCurves(28, CURVE.HARD)
    .addStraight(90)
    .build();
}
