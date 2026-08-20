import { medalRank } from "./storage";

export function calculateMedal({ position, collisionCount }) {
  if (position === 1 && collisionCount === 0) return "gold";
  if (position <= 3) return "silver";
  return "bronze";
}

export function nextUnlockedLevel(currentUnlockedIndex, completedLevelIndex, medal) {
  if (completedLevelIndex === 0 && medalRank(medal) >= medalRank("bronze")) {
    return Math.max(currentUnlockedIndex, 1);
  }
  if (completedLevelIndex === 1 && medalRank(medal) >= medalRank("silver")) {
    return Math.max(currentUnlockedIndex, 2);
  }
  return currentUnlockedIndex;
}

export function describeNextTarget({ medal, position, collisionCount }) {
  if (medal === "gold") return "Gold secured — chase a new personal best.";
  if (position > 3) return "Finish in the top 3 to earn Silver.";
  if (collisionCount > 0) return "Win without a collision to earn Gold.";
  return "Win the race to earn Gold.";
}
