import { getMotorcycleVariant } from "./motorcyclePalette";
import { drawOpponentMotorcycle as paintOpponentMotorcycle, OPPONENT_GRID_COLS, OPPONENT_GRID_ROWS } from "./motorcycleGeometry";

const BAKE_CELL_PX = 8;
const NEAR_DETAIL_MIN_WIDTH = 46; // draw width (px) above which the "near" (fuller-detail) sprite is used
const MIN_VISIBLE_WIDTH = 3; // skip drawing bikes too small/far to read at all
const MAX_DRAW_WIDTH_RATIO = 0.42; // clamp vs viewport width — never let one bike dominate the frame
const BIKE_WIDTH_TO_ROAD_HALF_WIDTH = 0.22;
const ASPECT = OPPONENT_GRID_ROWS / OPPONENT_GRID_COLS;

// Baked once per (variant, detail) the first time they're needed, reused for the rest of
// the session — no per-frame procedural redraw, no per-frame allocation.
const spriteCache = new Map();
const PHOTO_SPRITE_URLS = [
  "/assets/opponents/motogp-red.png",
  "/assets/opponents/motogp-blue.png",
  "/assets/opponents/motogp-gold.png",
];
const START_SPRITE_URLS = [
  "/assets/opponents/motogp-red-start-clean.png",
  "/assets/opponents/motogp-blue-start-clean.png",
  "/assets/opponents/motogp-gold-start-clean.png",
];
const photoSprites = [];
const startSprites = [];

function getPhotoSprite(variantIndex) {
  if (typeof Image === "undefined") return null;
  const index = variantIndex % PHOTO_SPRITE_URLS.length;
  if (!photoSprites[index]) {
    const image = new Image();
    image.decoding = "async";
    image.src = PHOTO_SPRITE_URLS[index];
    photoSprites[index] = image;
  }
  const image = photoSprites[index];
  return image.complete && image.naturalWidth > 0 ? image : null;
}

function getStartSprite(variantIndex) {
  if (typeof Image === "undefined") return null;
  const index = variantIndex % START_SPRITE_URLS.length;
  if (!startSprites[index]) {
    const image = new Image();
    image.decoding = "async";
    image.src = START_SPRITE_URLS[index];
    startSprites[index] = image;
  }
  const image = startSprites[index];
  return image.complete && image.naturalWidth > 0 ? image : null;
}

function drawCroppedPhoto(ctx, sprite, drawWidth, drawHeight, alpha = 1) {
  const sourceX = sprite.naturalWidth * 0.12;
  const sourceY = sprite.naturalHeight * 0.06;
  const sourceWidth = sprite.naturalWidth * 0.72;
  const sourceHeight = sprite.naturalHeight * 0.86;
  ctx.globalAlpha = alpha;
  ctx.drawImage(sprite, sourceX, sourceY, sourceWidth, sourceHeight, -drawWidth / 2, -drawHeight, drawWidth, drawHeight);
  ctx.globalAlpha = 1;
}

function getSprite(variantIndex, detail) {
  const key = `${variantIndex}:${detail}`;
  let sprite = spriteCache.get(key);
  if (sprite) return sprite;

  const canvas = document.createElement("canvas");
  canvas.width = OPPONENT_GRID_COLS * BAKE_CELL_PX;
  canvas.height = OPPONENT_GRID_ROWS * BAKE_CELL_PX;
  const ctx = canvas.getContext("2d");
  paintOpponentMotorcycle(ctx, getMotorcycleVariant(variantIndex), BAKE_CELL_PX, detail);

  sprite = canvas;
  spriteCache.set(key, sprite);
  return sprite;
}

/**
 * Draws one opponent, anchored at the tyre-contact point (proj.x, proj.y) rather than the
 * sprite's centre, rotated by its current lean, sized purely from the existing pseudo-3D
 * projection scale (proj.w) — never an arbitrary CSS size.
 */
export function drawOpponent(ctx, proj, opponent, viewportWidth) {
  const drawWidth = Math.min(proj.w * BIKE_WIDTH_TO_ROAD_HALF_WIDTH, viewportWidth * MAX_DRAW_WIDTH_RATIO);
  if (drawWidth < MIN_VISIBLE_WIDTH) return;

  const detail = drawWidth >= NEAR_DETAIL_MIN_WIDTH ? "near" : "far";
  const photoSprite = getPhotoSprite(opponent.spriteVariant);
  const startSprite = getStartSprite(opponent.spriteVariant);
  // Use the vector version only during the brief asynchronous photo load.
  const sprite = photoSprite ?? getSprite(opponent.spriteVariant, detail);
  const drawHeight = drawWidth * (photoSprite ? 1.95 : ASPECT);

  const lean = opponent.lean || 0;
  const bobOffset = (opponent.suspensionOffset || 0) * (drawHeight / OPPONENT_GRID_ROWS);

  ctx.save();
  ctx.translate(proj.x, proj.y + bobOffset);
  ctx.rotate(lean);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  if (photoSprite) {
    // Crop the generous transparent generation margin so the tyre contact point and rider
    // silhouette fill the projected bounds without stretching their natural proportions.
    const sourceX = sprite.naturalWidth * 0.18;
    const sourceY = sprite.naturalHeight * 0.075;
    const sourceWidth = sprite.naturalWidth * 0.64;
    const sourceHeight = sprite.naturalHeight * 0.835;
    const launch = Math.min(1, Math.max(0, opponent.launchProgress || 0));
    const easedLaunch = launch * launch * (3 - 2 * launch);
    if (startSprite && easedLaunch < 1) drawCroppedPhoto(ctx, startSprite, drawWidth, drawHeight, 1 - easedLaunch);
    ctx.globalAlpha = easedLaunch;
    ctx.drawImage(sprite, sourceX, sourceY, sourceWidth, sourceHeight, -drawWidth / 2, -drawHeight, drawWidth, drawHeight);
    ctx.globalAlpha = 1;
  } else {
    ctx.drawImage(sprite, -drawWidth / 2, -drawHeight, drawWidth, drawHeight);
  }
  ctx.restore();
}
