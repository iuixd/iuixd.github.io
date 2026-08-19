import { drawPlayerCockpitGeometry, COCKPIT_GRID_COLS, COCKPIT_GRID_ROWS } from "./motorcycleGeometry";

const BAKE_CELL_PX = 6;

// A single value that satisfies every breakpoint's "bottom N% of viewport" guidance at once
// (desktop 20–30%, tablet 22–32%, mobile 24–34%) — sized directly off viewport *height*,
// independent of the baked bitmap's own aspect ratio, since width/height guidance in the
// spec is itself independent of device aspect ratio.
const COCKPIT_HEIGHT_RATIO = 0.34;
const COCKPIT_WIDTH_RATIO = 1.06; // slight full-bleed overhang past the canvas edges

// The cockpit's palette comes from the theme, which can change (e.g. first paint before
// CSS custom properties resolve) — cache per resolved-colour-signature rather than once
// globally, so a theme change (rare) still re-bakes correctly instead of showing stale art.
let cachedSprite = null;
let cachedKey = "";
let realisticCockpit = null;

function getRealisticCockpit() {
  if (realisticCockpit || typeof Image === "undefined") return realisticCockpit;
  realisticCockpit = new Image();
  realisticCockpit.decoding = "async";
  realisticCockpit.src = "/assets/motogp-cockpit.png";
  return realisticCockpit;
}

function getSprite(theme) {
  const key = `${theme.cockpitBody}|${theme.cockpitTrim}|${theme.cockpitScreen}|${theme.text}|${theme.accent}`;
  if (cachedSprite && cachedKey === key) return cachedSprite;

  const canvas = document.createElement("canvas");
  canvas.width = COCKPIT_GRID_COLS * BAKE_CELL_PX;
  canvas.height = COCKPIT_GRID_ROWS * BAKE_CELL_PX;
  const ctx = canvas.getContext("2d");
  drawPlayerCockpitGeometry(ctx, BAKE_CELL_PX, theme);

  cachedSprite = canvas;
  cachedKey = key;
  return cachedSprite;
}

/**
 * Draws the first-person cockpit, rotated around a pivot just below the visible canvas
 * (so it reads as leaning rather than spinning in place) by the player's current lean plus
 * any crash-recovery tilt.
 */
export function drawPlayerCockpit(ctx, { viewportWidth, viewportHeight, lean, angleDegrees, theme }) {
  const photo = getRealisticCockpit();
  const photoReady = photo?.complete && photo.naturalWidth > 0;
  const sprite = photoReady ? photo : getSprite(theme);

  let drawWidth;
  let drawHeight;
  if (photoReady) {
    const scale = Math.min(
      (viewportWidth * 1.08) / photo.naturalWidth,
      (viewportHeight * 0.68) / photo.naturalHeight
    );
    drawWidth = photo.naturalWidth * scale;
    drawHeight = photo.naturalHeight * scale;
  } else {
    drawHeight = viewportHeight * COCKPIT_HEIGHT_RATIO;
    drawWidth = viewportWidth * COCKPIT_WIDTH_RATIO;
  }

  const pivotX = viewportWidth / 2;
  // Seat the cockpit below the frame so the windscreen does not cover the road's braking
  // and turn-in area. The lower tank/forearms crop naturally at the viewport edge.
  const pivotY = viewportHeight * 1.14;
  const angle = (lean * angleDegrees * Math.PI) / 180;

  ctx.save();
  ctx.translate(pivotX, pivotY);
  ctx.rotate(angle);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(sprite, -drawWidth / 2, -drawHeight, drawWidth, drawHeight);
  ctx.restore();
}
