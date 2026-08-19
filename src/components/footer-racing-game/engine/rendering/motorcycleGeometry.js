// Compact 3x5 pixel-block digit font — enough for two-digit racing numbers, deliberately
// blocky rather than a smooth typeface, matching the EGA/VGA-era reference aesthetic.
const DIGIT_FONT = {
  0: ["111", "101", "101", "101", "111"],
  1: ["010", "110", "010", "010", "111"],
  2: ["111", "001", "111", "100", "111"],
  3: ["111", "001", "111", "001", "111"],
  4: ["101", "101", "111", "001", "001"],
  5: ["111", "100", "111", "001", "111"],
  6: ["111", "100", "111", "101", "111"],
  7: ["111", "001", "001", "001", "001"],
  8: ["111", "101", "111", "101", "111"],
  9: ["111", "101", "111", "001", "111"],
};

export function drawPixelDigits(ctx, text, x, y, pixelSize, color) {
  ctx.fillStyle = color;
  let cursorX = x;
  for (const char of String(text)) {
    const pattern = DIGIT_FONT[char];
    if (!pattern) {
      cursorX += pixelSize * 4;
      continue;
    }
    for (let row = 0; row < pattern.length; row += 1) {
      for (let col = 0; col < pattern[row].length; col += 1) {
        if (pattern[row][col] === "1") {
          ctx.fillRect(cursorX + col * pixelSize, y + row * pixelSize, pixelSize, pixelSize);
        }
      }
    }
    cursorX += pixelSize * 4;
  }
}

// --- Opponent motorcycle, viewed from directly behind, on a 16x24 grid. ---
// Anchor (tyre contact point) is grid (8, 24) — bottom-centre.
export const OPPONENT_GRID_COLS = 16;
export const OPPONENT_GRID_ROWS = 24;

/**
 * Draws one opponent rear-view motorcycle+rider into `ctx` at the given cell size. `detail`
 * is "far" (simple 3–5 colour silhouette) or "near" (full detail: number panel, visor,
 * gloves, exhaust) — the level-of-detail switch the spec calls for.
 */
export function drawOpponentMotorcycle(ctx, variant, cellPx, detail) {
  const isNear = detail === "near";
  const s = cellPx;

  // Contact shadow and narrow racing slick establish a planted, full-size GP silhouette.
  ctx.fillStyle = "rgba(4, 6, 8, 0.42)";
  ctx.beginPath();
  ctx.ellipse(8 * s, 23.1 * s, 4.4 * s, 0.8 * s, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#0a0a0c";
  ctx.beginPath();
  ctx.ellipse(8 * s, 19.6 * s, 1.75 * s, 3.75 * s, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#27282b";
  ctx.beginPath();
  ctx.ellipse(8 * s, 19.5 * s, 0.95 * s, 2.65 * s, 0, 0, Math.PI * 2);
  ctx.fill();

  // Swingarm, undertail and compact upswept exhaust.
  ctx.strokeStyle = "#55575c";
  ctx.lineWidth = Math.max(1, 0.55 * s);
  ctx.beginPath();
  ctx.moveTo(5.7 * s, 15.2 * s);
  ctx.lineTo(7.4 * s, 20.2 * s);
  ctx.lineTo(10.8 * s, 15.4 * s);
  ctx.stroke();
  if (isNear) {
    ctx.fillStyle = "#2a2b2e";
    ctx.beginPath();
    ctx.roundRect(11.1 * s, 14.7 * s, 1.7 * s, 4.1 * s, 0.55 * s);
    ctx.fill();
    ctx.fillStyle = "#7a7d80";
    ctx.beginPath();
    ctx.ellipse(12 * s, 18.5 * s, 0.7 * s, 0.35 * s, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Tapered tail and rear fairing, considerably narrower than the rider's shoulders.
  ctx.fillStyle = variant.bodyShade;
  ctx.beginPath();
  ctx.moveTo(4.7 * s, 12.7 * s);
  ctx.quadraticCurveTo(8 * s, 11.6 * s, 11.3 * s, 12.7 * s);
  ctx.lineTo(10.5 * s, 17.2 * s);
  ctx.quadraticCurveTo(8 * s, 18.1 * s, 5.5 * s, 17.2 * s);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = variant.body;
  ctx.beginPath();
  ctx.moveTo(5.1 * s, 12.5 * s);
  ctx.quadraticCurveTo(8 * s, 11.3 * s, 10.9 * s, 12.5 * s);
  ctx.lineTo(10.2 * s, 15.9 * s);
  ctx.quadraticCurveTo(8 * s, 16.7 * s, 5.8 * s, 15.9 * s);
  ctx.closePath();
  ctx.fill();

  if (isNear) {
    ctx.fillStyle = variant.numberBg;
    ctx.beginPath();
    ctx.roundRect(6.15 * s, 12.8 * s, 3.7 * s, 2.45 * s, 0.45 * s);
    ctx.fill();
    ctx.fillStyle = variant.numberText;
    ctx.font = `800 ${2.15 * s}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(variant.number, 8 * s, 14.05 * s);
  }

  // Bent legs hug the tank; boots sit high on rear-set foot pegs.
  ctx.strokeStyle = variant.bodyShade;
  ctx.lineWidth = 1.65 * s;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(5.4 * s, 10.8 * s);
  ctx.lineTo(4.3 * s, 14.4 * s);
  ctx.lineTo(5.5 * s, 16.5 * s);
  ctx.moveTo(10.6 * s, 10.8 * s);
  ctx.lineTo(11.7 * s, 14.4 * s);
  ctx.lineTo(10.5 * s, 16.5 * s);
  ctx.stroke();

  // Rider is tucked forward with rounded shoulders, elbows out and head low behind screen.
  ctx.fillStyle = variant.body;
  ctx.beginPath();
  ctx.moveTo(4.1 * s, 7.4 * s);
  ctx.quadraticCurveTo(5.2 * s, 5.9 * s, 8 * s, 6.2 * s);
  ctx.quadraticCurveTo(10.8 * s, 5.9 * s, 11.9 * s, 7.4 * s);
  ctx.lineTo(10.4 * s, 12.6 * s);
  ctx.quadraticCurveTo(8 * s, 13.5 * s, 5.6 * s, 12.6 * s);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = variant.trim;
  ctx.lineWidth = 0.38 * s;
  ctx.beginPath();
  ctx.moveTo(5 * s, 8.2 * s);
  ctx.quadraticCurveTo(8 * s, 10.1 * s, 11 * s, 8.2 * s);
  ctx.stroke();

  ctx.strokeStyle = variant.bodyShade;
  ctx.lineWidth = 1.2 * s;
  ctx.beginPath();
  ctx.moveTo(4.8 * s, 7.5 * s);
  ctx.lineTo(2.9 * s, 10.6 * s);
  ctx.moveTo(11.2 * s, 7.5 * s);
  ctx.lineTo(13.1 * s, 10.6 * s);
  ctx.stroke();
  ctx.fillStyle = "#17181b";
  ctx.beginPath();
  ctx.arc(2.8 * s, 10.7 * s, 0.7 * s, 0, Math.PI * 2);
  ctx.arc(13.2 * s, 10.7 * s, 0.7 * s, 0, Math.PI * 2);
  ctx.fill();

  // Full-face helmet, neck tucked down rather than sitting upright above the torso.
  ctx.fillStyle = variant.helmet;
  ctx.beginPath();
  ctx.ellipse(8 * s, 4.4 * s, 2.45 * s, 2.75 * s, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = variant.helmetStripe;
  ctx.lineWidth = 0.48 * s;
  ctx.beginPath();
  ctx.arc(8 * s, 4.4 * s, 2.12 * s, Math.PI * 1.05, Math.PI * 1.95);
  ctx.stroke();
  ctx.fillStyle = "#101419";
  ctx.beginPath();
  ctx.roundRect(5.85 * s, 3.75 * s, 4.3 * s, 1.15 * s, 0.5 * s);
  ctx.fill();
  if (isNear) {
    ctx.fillStyle = "rgba(180, 225, 235, 0.3)";
    ctx.beginPath();
    ctx.roundRect(6.15 * s, 3.9 * s, 2.6 * s, 0.25 * s, 0.15 * s);
    ctx.fill();
  }
}

// --- Player cockpit, first-person, on an 80x45 grid (~320x180 logical px at cellPx=4). ---
export const COCKPIT_GRID_COLS = 80;
export const COCKPIT_GRID_ROWS = 45;

export function drawPlayerCockpitGeometry(ctx, cellPx, theme) {
  // mirror hints, upper corners
  ctx.fillStyle = theme.cockpitTrim;
  ctx.beginPath();
  ctx.ellipse(8 * cellPx, 16 * cellPx, 3.5 * cellPx, 2 * cellPx, -0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(72 * cellPx, 16 * cellPx, 3.5 * cellPx, 2 * cellPx, 0.3, 0, Math.PI * 2);
  ctx.fill();

  // windscreen silhouette (soft, low-opacity)
  ctx.fillStyle = theme.cockpitScreen;
  ctx.beginPath();
  ctx.moveTo(19 * cellPx, 32 * cellPx);
  ctx.quadraticCurveTo(23 * cellPx, 12 * cellPx, 40 * cellPx, 9 * cellPx);
  ctx.quadraticCurveTo(57 * cellPx, 12 * cellPx, 61 * cellPx, 32 * cellPx);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(210, 245, 248, 0.3)";
  ctx.lineWidth = Math.max(1, cellPx * 0.45);
  ctx.stroke();

  // instrument cluster (tacho-inspired dial)
  const dialX = 40 * cellPx;
  const dialY = 33 * cellPx;
  const dialR = 7 * cellPx;
  ctx.fillStyle = "#0c0c0e";
  ctx.beginPath();
  ctx.arc(dialX, dialY, dialR, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = theme.cockpitTrim;
  ctx.lineWidth = Math.max(1, cellPx * 0.4);
  ctx.beginPath();
  ctx.arc(dialX, dialY, dialR * 0.82, 0, Math.PI * 2);
  ctx.stroke();
  // tick marks
  ctx.strokeStyle = theme.text;
  ctx.lineWidth = Math.max(1, cellPx * 0.35);
  for (let i = 0; i < 8; i += 1) {
    const a = Math.PI * 0.75 + (i / 7) * Math.PI * 1.5;
    const inner = dialR * 0.55;
    const outer = dialR * 0.75;
    ctx.beginPath();
    ctx.moveTo(dialX + Math.cos(a) * inner, dialY + Math.sin(a) * inner);
    ctx.lineTo(dialX + Math.cos(a) * outer, dialY + Math.sin(a) * outer);
    ctx.stroke();
  }
  // needle (fixed, decorative — not wired to live RPM to keep this a static cached bitmap)
  ctx.strokeStyle = theme.accent;
  ctx.lineWidth = Math.max(1, cellPx * 0.5);
  ctx.beginPath();
  ctx.moveTo(dialX, dialY);
  ctx.lineTo(dialX + Math.cos(Math.PI * 1.15) * dialR * 0.6, dialY + Math.sin(Math.PI * 1.15) * dialR * 0.6);
  ctx.stroke();

  // fairing top / tank silhouette across the base
  ctx.fillStyle = theme.cockpitBody;
  ctx.beginPath();
  ctx.moveTo(2 * cellPx, 45 * cellPx);
  ctx.lineTo(6 * cellPx, 34 * cellPx);
  ctx.lineTo(20 * cellPx, 30 * cellPx);
  ctx.lineTo(60 * cellPx, 30 * cellPx);
  ctx.lineTo(74 * cellPx, 34 * cellPx);
  ctx.lineTo(78 * cellPx, 45 * cellPx);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = theme.cockpitTrim;
  ctx.fillRect(2 * cellPx, 42 * cellPx, 76 * cellPx, 1.4 * cellPx);

  // Forged top yoke and fork adjusters anchor the viewpoint inside a real cockpit.
  ctx.fillStyle = "#17191d";
  ctx.beginPath();
  ctx.moveTo(25 * cellPx, 37.5 * cellPx);
  ctx.lineTo(55 * cellPx, 37.5 * cellPx);
  ctx.lineTo(51 * cellPx, 43.5 * cellPx);
  ctx.lineTo(29 * cellPx, 43.5 * cellPx);
  ctx.closePath();
  ctx.fill();
  const drawForkCap = (x, accent) => {
    ctx.fillStyle = "#c8ccd0";
    ctx.beginPath();
    ctx.arc(x * cellPx, 40 * cellPx, 2.7 * cellPx, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.arc(x * cellPx, 40 * cellPx, 1.65 * cellPx, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#31343a";
    ctx.beginPath();
    ctx.arc(x * cellPx, 40 * cellPx, 0.62 * cellPx, 0, Math.PI * 2);
    ctx.fill();
  };
  drawForkCap(29, "#d4ad25");
  drawForkCap(51, theme.accent);

  // Steering stem and sculpted tank ridge.
  ctx.fillStyle = "#d9dde0";
  ctx.beginPath();
  ctx.arc(40 * cellPx, 41 * cellPx, 1.7 * cellPx, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = theme.cockpitBody;
  ctx.beginPath();
  ctx.moveTo(34 * cellPx, 45 * cellPx);
  ctx.quadraticCurveTo(40 * cellPx, 39.5 * cellPx, 46 * cellPx, 45 * cellPx);
  ctx.closePath();
  ctx.fill();

  // handlebars + grips + gloves
  const drawGrip = (baseX, dir) => {
    ctx.strokeStyle = "#1c1c1e";
    ctx.lineWidth = cellPx * 1.4;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(baseX, 38 * cellPx);
    ctx.lineTo(baseX + dir * 9 * cellPx, 41 * cellPx);
    ctx.stroke();
    // glove
    ctx.fillStyle = "#242428";
    ctx.beginPath();
    ctx.ellipse(baseX + dir * 9 * cellPx, 41.5 * cellPx, cellPx * 2.4, cellPx * 1.8, 0, 0, Math.PI * 2);
    ctx.fill();
  };
  drawGrip(28 * cellPx, -1);
  drawGrip(52 * cellPx, 1);
}
