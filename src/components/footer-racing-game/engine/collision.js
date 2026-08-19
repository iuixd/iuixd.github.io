import { COLLISION_Z_THRESHOLD, COLLISION_X_THRESHOLD } from "./constants";

export function isColliding(playerZ, playerX, opponentZ, opponentOffset) {
  return (
    Math.abs(playerZ - opponentZ) < COLLISION_Z_THRESHOLD &&
    Math.abs(playerX - opponentOffset) < COLLISION_X_THRESHOLD
  );
}

/** First opponent currently colliding with the player, or null. */
export function findCollision(player, opponents) {
  return opponents.find((opponent) => isColliding(player.z, player.x, opponent.z, opponent.offset)) ?? null;
}

export function isCooldownActive(cooldownMs) {
  return cooldownMs > 0;
}
