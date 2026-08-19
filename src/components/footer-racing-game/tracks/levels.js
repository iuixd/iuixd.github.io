import { ROAD_WIDTH } from "../engine/constants";
import { buildCircuit01 } from "./circuit01";
import { buildCircuit02 } from "./circuit02";
import { buildCircuit03 } from "./circuit03";

export const LEVELS = [
  {
    number: 1,
    name: "Normal",
    circuit: "Skyline Circuit",
    lengthLabel: "5.8 KM",
    turnCount: 8,
    sectors: 4,
    buildTrack: buildCircuit01,
    roadWidth: ROAD_WIDTH * 1.16,
    roadEdge: 1.12,
    steeringAuthority: 1.08,
    ai: { count: 3, minSpeedRatio: 0.66, maxSpeedRatio: 0.84, minSkill: 0.2, aggressionBoost: -0.12, laneLimit: 0.92 },
    palette: { sky: "#075d62", grass: "#0c522a", mountain: "#06282a", road: "#484a49", roadAlt: "#484a49" },
  },
  {
    number: 2,
    name: "Medium",
    circuit: "Alpine Rush",
    lengthLabel: "6.4 KM",
    turnCount: 12,
    sectors: 4,
    buildTrack: buildCircuit02,
    roadWidth: ROAD_WIDTH,
    roadEdge: 1,
    steeringAuthority: 1,
    ai: { count: 5, minSpeedRatio: 0.76, maxSpeedRatio: 0.94, minSkill: 0.48, aggressionBoost: 0.08, laneLimit: 0.86 },
    palette: { sky: "#154856", grass: "#22452d", mountain: "#102f3a", road: "#454746", roadAlt: "#454746" },
  },
  {
    number: 3,
    name: "Expert",
    circuit: "Apex Gauntlet",
    lengthLabel: "7.1 KM",
    turnCount: 18,
    sectors: 4,
    buildTrack: buildCircuit03,
    roadWidth: ROAD_WIDTH * 0.86,
    roadEdge: 0.9,
    steeringAuthority: 0.9,
    ai: { count: 5, minSpeedRatio: 0.86, maxSpeedRatio: 1.02, minSkill: 0.72, aggressionBoost: 0.22, laneLimit: 0.78 },
    palette: { sky: "#172a3b", grass: "#303226", mountain: "#111923", road: "#414342", roadAlt: "#414342", rumbleDark: "#9d3035" },
  },
];

export const getLevel = (index) => LEVELS[Math.max(0, Math.min(LEVELS.length - 1, index))];
