import { TrackBuilder, CURVE, HILL } from "./trackBuilder";

/** Alpine Rush: narrower rhythm sections, repeated elevation changes, and late braking zones. */
export function buildCircuit02() {
  return new TrackBuilder()
    .addStraight(65)
    .addCurve(70, CURVE.MEDIUM)
    .addHill(70, HILL.HARD)
    .addCurve(62, -CURVE.HARD)
    .addDownhill(58, HILL.HARD)
    .addSCurves(38, CURVE.HARD)
    .addHill(65, HILL.MEDIUM)
    .addCurve(85, CURVE.MEDIUM)
    .addDownhill(55, HILL.MEDIUM)
    .addStraight(125)
    .build();
}
