import { projectPoint } from "./projection";
import { getGroundElevation } from "./road";
import { drawPlayerCockpit } from "./rendering/drawPlayerMotorcycle";
import { drawOpponent } from "./rendering/drawOpponentMotorcycle";

const SHOULDER_WIDTH_RATIO = 1.075;
const RUMBLE_WIDTH_RATIO = 1.045;
const EDGE_LINE_WIDTH_RATIO = 0.012;
const STRIPE_SEGMENT_SPAN = 5; // longer red/white curb blocks, closer to a real circuit
// Measured focal horizon of circuit-environment-v2.png. The pseudo-3D projector's horizon
// is always at 50% viewport height, so the photo must be positioned by this focal line,
// not naively centered, or the road appears to float above the distant terrain.
const ENVIRONMENT_HORIZON_RATIO = 0.645;
let circuitEnvironment = null;
let sandTerrain = null;
let cloudLayer = null;
let terrainTexture = null;
let terrainPatternContext = null;
let tracksideAtlas = null;

const TRACKSIDE_ATLAS = {
  columns: 3,
  rows: 2,
  items: [
    { type: "marshalTower", cell: 1, width: 0.62, sideOffset: 1.72 },
    { type: "pitBuilding", cell: 2, width: 1.42, sideOffset: 2.05 },
    { type: "podium", cell: 3, width: 0.9, sideOffset: 1.92 },
    { type: "distanceMarker", cell: 5, width: 0.38, sideOffset: 1.38 },
  ],
};

function getTracksideAtlas() {
  if (tracksideAtlas || typeof Image === "undefined") return tracksideAtlas;
  tracksideAtlas = new Image();
  tracksideAtlas.decoding = "async";
  tracksideAtlas.src = "/assets/trackside-scenery-atlas-v3.png";
  return tracksideAtlas;
}

/** Stable circuit furniture keyed to a real segment index. Because these placements live
 * in track space (rather than screen space), camera progress, speed, bends and elevation
 * automatically determine when they approach, pass, leave frame and return next lap. */
export function getTracksidePlacement(segmentIndex) {
  if (segmentIndex % 180 === 8) return { itemIndex: 1, side: 1 };
  if (segmentIndex % 144 === 52) return { itemIndex: 2, side: -1 };
  if (segmentIndex % 112 === 34) return { itemIndex: 0, side: segmentIndex % 224 === 34 ? -1 : 1 };
  if (segmentIndex % 48 === 14) return { itemIndex: 3, side: segmentIndex % 96 === 14 ? -1 : 1 };
  return null;
}

function getCircuitEnvironment() {
  if (circuitEnvironment || typeof Image === "undefined") return circuitEnvironment;
  circuitEnvironment = new Image();
  circuitEnvironment.decoding = "async";
  circuitEnvironment.src = "/assets/circuit-environment-v2.png";
  return circuitEnvironment;
}

function getSandTerrain() {
  if (sandTerrain || typeof Image === "undefined") return sandTerrain;
  sandTerrain = new Image();
  sandTerrain.decoding = "async";
  sandTerrain.src = "/assets/circuit-sand-terrain-v1.png";
  return sandTerrain;
}

function getCloudLayer() {
  if (cloudLayer || typeof Image === "undefined") return cloudLayer;
  cloudLayer = new Image();
  cloudLayer.decoding = "async";
  cloudLayer.src = "/assets/raceday-cloud-layer-v2.png";
  return cloudLayer;
}

function getTerrainPattern(ctx) {
  const sand = getSandTerrain();
  if (!sand?.complete || !sand.naturalWidth) return "#b89a68";
  if (terrainTexture && terrainPatternContext === ctx) return terrainTexture;
  if (typeof document === "undefined") return "#b89a68";

  const textureCanvas = document.createElement("canvas");
  textureCanvas.width = 512;
  textureCanvas.height = 256;
  const textureContext = textureCanvas.getContext("2d");
  textureContext.drawImage(
    sand,
    0,
    0,
    sand.naturalWidth,
    sand.naturalHeight,
    0,
    0,
    textureCanvas.width,
    textureCanvas.height
  );
  terrainTexture = ctx.createPattern(textureCanvas, "repeat") || "#b89a68";
  terrainPatternContext = ctx;
  return terrainTexture;
}

// Reused across frames so the render loop doesn't allocate per segment. Sized lazily to
// whatever drawDistance is first requested with.
const scratch = {
  proj1: [],
  proj2: [],
  worldZ1: [],
  worldZ2: [],
  segments: [],
  camera: { x: 0, y: 0, z: 0, depth: 0 },
  worldP1: { x: 0, y: 0, z: 0 },
  worldP2: { x: 0, y: 0, z: 0 },
};

function ensureScratchCapacity(size) {
  while (scratch.proj1.length < size) {
    scratch.proj1.push({ visible: false, x: 0, y: 0, w: 0, scale: 0 });
    scratch.proj2.push({ visible: false, x: 0, y: 0, w: 0, scale: 0 });
    scratch.worldZ1.push(0);
    scratch.worldZ2.push(0);
    scratch.segments.push(null);
  }
}

let finishGantry = null;

function getFinishGantry() {
  if (finishGantry || typeof Image === "undefined") return finishGantry;
  finishGantry = new Image();
  finishGantry.decoding = "async";
  finishGantry.src = "/assets/finish-gantry.png";
  return finishGantry;
}

function drawFinishMarkings(ctx, near, far) {
  const columns = 12;
  const rows = 3;
  for (let row = 0; row < rows; row += 1) {
    const t1 = row / rows;
    const t2 = (row + 1) / rows;
    const y1 = near.y + (far.y - near.y) * t1;
    const y2 = near.y + (far.y - near.y) * t2;
    const w1 = near.w + (far.w - near.w) * t1;
    const w2 = near.w + (far.w - near.w) * t2;
    const x1 = near.x + (far.x - near.x) * t1;
    const x2 = near.x + (far.x - near.x) * t2;
    for (let column = 0; column < columns; column += 1) {
      const left = column / columns * 2 - 1;
      const right = (column + 1) / columns * 2 - 1;
      ctx.fillStyle = (row + column) % 2 ? "#151619" : "#f4f4f0";
      ctx.beginPath();
      ctx.moveTo(x1 + left * w1, y1);
      ctx.lineTo(x1 + right * w1, y1);
      ctx.lineTo(x2 + right * w2, y2);
      ctx.lineTo(x2 + left * w2, y2);
      ctx.closePath();
      ctx.fill();
    }
  }
}

function fillTrapezoid(ctx, x1, y1, w1, x2, y2, w2, color) {
  if (w1 <= 0 && w2 <= 0) return;
  const overlap = Math.abs(y1 - y2) > 1.5 ? 0.65 : 0;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x1 - w1, y1 + overlap);
  ctx.lineTo(x1 + w1, y1 + overlap);
  ctx.lineTo(x2 + w2, y2 - overlap);
  ctx.lineTo(x2 - w2, y2 - overlap);
  ctx.closePath();
  ctx.fill();
}

function fillSideStrip(ctx, proj1, proj2, innerRatio, outerRatio, side, color) {
  const overlap = Math.abs(proj1.y - proj2.y) > 1.5 ? 0.65 : 0;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(proj1.x + side * proj1.w * innerRatio, proj1.y + overlap);
  ctx.lineTo(proj1.x + side * proj1.w * outerRatio, proj1.y + overlap);
  ctx.lineTo(proj2.x + side * proj2.w * outerRatio, proj2.y - overlap);
  ctx.lineTo(proj2.x + side * proj2.w * innerRatio, proj2.y - overlap);
  ctx.closePath();
  ctx.fill();
}

function drawTrackEdgeLines(ctx, proj1, proj2, color) {
  for (const side of [-1, 1]) {
    const x1 = proj1.x + side * proj1.w * (1 - EDGE_LINE_WIDTH_RATIO);
    const x2 = proj2.x + side * proj2.w * (1 - EDGE_LINE_WIDTH_RATIO);
    fillTrapezoid(ctx, x1, proj1.y, proj1.w * EDGE_LINE_WIDTH_RATIO, x2, proj2.y, proj2.w * EDGE_LINE_WIDTH_RATIO, color);
  }
}

function drawAsphaltWear(ctx, proj1, proj2) {
  // Subtle continuous rubbering along the common racing line. Keeping this longitudinal
  // avoids the horizontal "stacked card" bands that made the former surface look arcade-like.
  fillTrapezoid(ctx, proj1.x, proj1.y, proj1.w * 0.23, proj2.x, proj2.y, proj2.w * 0.23, "rgba(10, 11, 12, 0.035)");
  for (const offset of [-0.31, 0.31]) {
    fillTrapezoid(
      ctx,
      proj1.x + proj1.w * offset,
      proj1.y,
      proj1.w * 0.008,
      proj2.x + proj2.w * offset,
      proj2.y,
      proj2.w * 0.008,
      "rgba(7, 8, 9, 0.055)"
    );
  }
}

function drawTracksideScenery(ctx, proj, segmentIndex, viewportWidth, distanceRatio) {
  const placement = getTracksidePlacement(segmentIndex);
  const atlas = getTracksideAtlas();
  if (!placement || !proj.visible || proj.w < 3 || !atlas?.complete || !atlas.naturalWidth) return;

  const item = TRACKSIDE_ATLAS.items[placement.itemIndex];
  const cellWidth = atlas.naturalWidth / TRACKSIDE_ATLAS.columns;
  const cellHeight = atlas.naturalHeight / TRACKSIDE_ATLAS.rows;
  const sourceX = (item.cell % TRACKSIDE_ATLAS.columns) * cellWidth;
  const sourceY = Math.floor(item.cell / TRACKSIDE_ATLAS.columns) * cellHeight;
  const width = Math.min(proj.w * item.width, viewportWidth * 0.38);
  const height = width * (cellHeight / cellWidth);
  const x = proj.x + placement.side * proj.w * item.sideOffset;
  const atmosphericAlpha = 1 - Math.max(0, distanceRatio - 0.58) * 1.2;

  ctx.save();
  ctx.globalAlpha = Math.max(0.42, atmosphericAlpha);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(
    atlas,
    sourceX,
    sourceY,
    cellWidth,
    cellHeight,
    x - width / 2,
    proj.y - height * 0.91,
    width,
    height
  );
  ctx.restore();
}

/**
 * Clears the canvas and fills the sky/grass backdrop. Drawn unrotated and always at full
 * canvas coverage, so the camera counter-roll (applied only to renderRoad, around the
 * canvas centre) never exposes gaps at the corners.
 */
function drawWrappedClouds(ctx, image, viewportWidth, horizonY, offsetX, scale, alpha) {
  if (!image?.complete || !image.naturalWidth) return;
  const width = viewportWidth * scale;
  const height = width * (image.naturalHeight / image.naturalWidth);
  const wrappedX = ((offsetX % width) + width) % width;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.beginPath();
  ctx.rect(0, 0, viewportWidth, horizonY);
  ctx.clip();
  for (let x = wrappedX - width; x < viewportWidth + width; x += width) {
    ctx.drawImage(image, x, horizonY - height * 0.98, width, height);
  }
  ctx.restore();
}

export function renderBackdrop(ctx, { viewportWidth, viewportHeight, theme, camera, sceneryElapsedMs = 0, speedPercent = 0 }) {
  ctx.clearRect(0, 0, viewportWidth, viewportHeight);

  const environment = getCircuitEnvironment();
  if (environment?.complete && environment.naturalWidth > 0) {
    const depthDrift = 1 + Math.sin((camera?.z || 0) * 0.000004) * 0.006;
    const scale = Math.max(viewportWidth / environment.naturalWidth, viewportHeight / environment.naturalHeight) * depthDrift;
    const width = environment.naturalWidth * scale;
    const height = environment.naturalHeight * scale;
    const horizonY = viewportHeight / 2;
    const environmentY = horizonY - height * ENVIRONMENT_HORIZON_RATIO;
    const lateralParallax = camera
      ? -camera.x * 0.018 + Math.sin(camera.z * 0.00001) * viewportWidth * 0.008
      : 0;

    // Any small lower crop exposed by focal-point alignment is terrain, never sky or a
    // transparent gap. The projected road covers the centre while this grounds its sides.
    ctx.fillStyle = "#b89a68";
    ctx.fillRect(0, 0, viewportWidth, viewportHeight);
    // Keep only sky and distant landscape from the photograph. Its foreground contains a
    // fixed straight corridor that cannot match a live track as it bends; projected terrain
    // below this horizon is rendered with the road instead.
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, viewportWidth, horizonY + viewportHeight * 0.035);
    ctx.clip();
    ctx.drawImage(environment, (viewportWidth - width) / 2 + lateralParallax, environmentY, width, height);
    ctx.restore();

    // Cover the photograph's baked cloud field with a natural sky grade, then render two
    // independently moving transparent cloud depths. Time provides ambient wind; camera z,
    // speed and lateral position add racing motion without coupling the effect to frame rate.
    const skyGrade = ctx.createLinearGradient(0, 0, 0, horizonY);
    skyGrade.addColorStop(0, "rgb(65, 137, 205)");
    skyGrade.addColorStop(0.68, "rgb(113, 174, 224)");
    skyGrade.addColorStop(1, "rgb(174, 207, 232)");
    ctx.fillStyle = skyGrade;
    ctx.fillRect(0, 0, viewportWidth, horizonY);

    const clouds = getCloudLayer();
    const forwardTravel = (camera?.z || 0) * (0.00055 + speedPercent * 0.0003);
    const steeringTravel = -(camera?.x || 0) * 0.035;
    const windTravel = sceneryElapsedMs * 0.006;
    drawWrappedClouds(
      ctx,
      clouds,
      viewportWidth,
      horizonY,
      windTravel * 0.32 + forwardTravel * 0.18 + steeringTravel * 0.22,
      1.42,
      0.46
    );
    const atmosphere = ctx.createLinearGradient(0, 0, 0, viewportHeight);
    atmosphere.addColorStop(0, "rgba(4, 31, 35, 0.04)");
    atmosphere.addColorStop(0.55, "rgba(4, 20, 18, 0.03)");
    atmosphere.addColorStop(1, "rgba(2, 8, 8, 0.2)");
    ctx.fillStyle = atmosphere;
    ctx.fillRect(0, 0, viewportWidth, viewportHeight);
    return;
  }

  const horizon = viewportHeight / 2;
  ctx.fillStyle = theme.sky;
  ctx.fillRect(0, 0, viewportWidth, horizon);
  ctx.fillStyle = "#b89a68";
  ctx.fillRect(0, horizon, viewportWidth, viewportHeight - horizon);
}

/**
 * Renders the road as projected trapezoids. Assumes renderBackdrop was already called this
 * frame — this only draws the segments themselves, so the caller can wrap it in a rotation
 * transform (camera counter-roll) without needing to re-fill the backdrop.
 *
 * Pass 1 walks the visible segments near-to-far, accumulating the classic cumulative
 * curve offset (`x`/`dx`) so bends read as a smooth curving perspective rather than a kinked
 * line — each segment's own curve value bends the *rate* of lateral drift for everything
 * beyond it. Pass 2 walks the results back-to-front so nearer segments naturally overpaint
 * farther ones (no z-buffer needed for this style of renderer).
 */
export function renderRoad(ctx, options) {
  const {
    segments,
    camera,
    viewportWidth,
    viewportHeight,
    drawDistance,
    roadWidth,
    theme,
    baseSegmentIndex,
    segmentLength,
    finishZ,
  } = options;

  const segmentCount = segments.length;
  if (!segmentCount) return;

  ensureScratchCapacity(drawDistance);

  const baseSegment = segments[baseSegmentIndex];
  const percentRemaining = (((camera.z % segmentLength) + segmentLength) % segmentLength) / segmentLength;
  const trackLength = segmentCount * segmentLength;
  const cameraLapOffset = Math.floor(camera.z / trackLength) * trackLength;
  const terrainFill = getTerrainPattern(ctx);
  if (terrainFill?.setTransform && typeof DOMMatrix !== "undefined") {
    terrainFill.setTransform(new DOMMatrix().translate(0, (camera.z * 0.028) % 256));
  }

  let x = 0;
  let dx = -(baseSegment.curve * percentRemaining);

  const workingCamera = scratch.camera;
  const worldP1 = scratch.worldP1;
  const worldP2 = scratch.worldP2;

  for (let n = 0; n < drawDistance; n += 1) {
    const segmentIndex = (baseSegmentIndex + n) % segmentCount;
    const segment = segments[segmentIndex];
    const lapOffset = cameraLapOffset + Math.floor((baseSegmentIndex + n) / segmentCount) * trackLength;

    workingCamera.x = camera.x - x;
    workingCamera.y = camera.y;
    workingCamera.z = camera.z;
    workingCamera.depth = camera.depth;

    worldP1.x = segment.p1.x;
    worldP1.y = segment.p1.y;
    worldP1.z = segment.p1.z + lapOffset;

    worldP2.x = segment.p2.x;
    worldP2.y = segment.p2.y;
    worldP2.z = segment.p2.z + lapOffset;

    scratch.worldZ1[n] = worldP1.z;
    scratch.worldZ2[n] = worldP2.z;

    projectPoint(worldP1, workingCamera, viewportWidth, viewportHeight, roadWidth, scratch.proj1[n]);
    projectPoint(worldP2, workingCamera, viewportWidth, viewportHeight, roadWidth, scratch.proj2[n]);
    scratch.segments[n] = segment;

    x += dx;
    dx += segment.curve;
  }

  for (let n = drawDistance - 1; n >= 0; n -= 1) {
    const segment = scratch.segments[n];
    const proj1 = scratch.proj1[n];
    const proj2 = scratch.proj2[n];

    if (!proj1.visible || !proj2.visible) continue;

    const isDark = Math.floor(segment.index / STRIPE_SEGMENT_SPAN) % 2 === 0;
    const roadColor = theme.road;
    const rumbleColor = isDark ? theme.rumbleDark : theme.rumbleLight;

    // Road and ground are one projected world surface. Rendering terrain for every segment
    // means it follows the same bends, crests, descents, and vanishing point on every lap.
    ctx.globalAlpha = 1;
    fillTrapezoid(
      ctx,
      proj1.x,
      proj1.y,
      Math.max(proj1.w * 6, viewportWidth),
      proj2.x,
      proj2.y,
      Math.max(proj2.w * 6, viewportWidth),
      terrainFill
    );
    fillTrapezoid(
      ctx,
      proj1.x,
      proj1.y,
      Math.max(proj1.w * 6, viewportWidth),
      proj2.x,
      proj2.y,
      Math.max(proj2.w * 6, viewportWidth),
      "rgba(92, 66, 35, 0.1)"
    );

    // Near asphalt is fully opaque; only its most distant third picks up atmospheric haze.
    const distanceRatio = n / Math.max(1, drawDistance - 1);
    ctx.globalAlpha = distanceRatio > 0.64 ? 1 - ((distanceRatio - 0.64) / 0.36) * 0.55 : 1;

    fillTrapezoid(ctx, proj1.x, proj1.y, proj1.w, proj2.x, proj2.y, proj2.w, roadColor);
    drawAsphaltWear(ctx, proj1, proj2);
    for (const side of [-1, 1]) {
      fillSideStrip(ctx, proj1, proj2, RUMBLE_WIDTH_RATIO, SHOULDER_WIDTH_RATIO, side, "rgba(15, 18, 18, 0.3)");
      fillSideStrip(ctx, proj1, proj2, 1, RUMBLE_WIDTH_RATIO, side, rumbleColor);
    }
    drawTrackEdgeLines(ctx, proj1, proj2, "rgba(244, 244, 237, 0.88)");
    if (n < drawDistance * 0.78) {
      drawTracksideScenery(ctx, proj2, segment.index, viewportWidth, distanceRatio);
    }
    ctx.globalAlpha = 1;
  }

  if (finishZ) {
    for (let n = 0; n < drawDistance; n += 1) {
      if (scratch.worldZ1[n] <= finishZ && scratch.worldZ2[n] >= finishZ) {
        const proj1 = scratch.proj1[n];
        const proj2 = scratch.proj2[n];
        if (!proj1.visible || !proj2.visible) break;

        const near = {
          x: proj1.x + (proj2.x - proj1.x) * 0.62,
          y: proj1.y + (proj2.y - proj1.y) * 0.62,
          w: proj1.w + (proj2.w - proj1.w) * 0.62,
        };
        drawFinishMarkings(ctx, near, proj2);

        const gantry = getFinishGantry();
        if (gantry?.complete && gantry.naturalWidth > 0) {
          const width = proj2.w * 2.75;
          const height = width * (gantry.naturalHeight / gantry.naturalWidth);
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(gantry, proj2.x - width / 2, proj2.y - height * 0.93, width, height);
        }
        break;
      }
    }
  }
}

/**
 * First-person cockpit — pixel-art motorcycle fairing, windscreen, instrument cluster, and
 * handlebars, rotated around a pivot just below the canvas by the player's current lean
 * (gameplay lean, or the idle sway, or crash tilt — the caller decides which). Baked once
 * per theme and cached; see rendering/drawPlayerMotorcycle.js.
 */
export function renderCockpit(ctx, { viewportWidth, viewportHeight, lean, angleDegrees, theme }) {
  drawPlayerCockpit(ctx, { viewportWidth, viewportHeight, lean, angleDegrees, theme });
}

/** Matches the cumulative bend integration used by renderRoad at an arbitrary point ahead
 * of the camera. Opponents need the same virtual road-centre offset or tight bends make a
 * correctly positioned rider appear to slide sideways off the projected asphalt. */
export function getRoadCurveOffset(segments, cameraZ, targetZ, segmentLength) {
  const distance = targetZ - cameraZ;
  if (distance <= 0 || !segments.length) return 0;

  const baseSegmentIndex = Math.floor((((cameraZ % (segments.length * segmentLength)) + segments.length * segmentLength) % (segments.length * segmentLength)) / segmentLength);
  const percentRemaining = (((cameraZ % segmentLength) + segmentLength) % segmentLength) / segmentLength;
  const steps = Math.min(Math.floor(distance / segmentLength), segments.length * 2);
  let offset = 0;
  let delta = -(segments[baseSegmentIndex].curve * percentRemaining);

  for (let step = 0; step < steps; step += 1) {
    const segment = segments[(baseSegmentIndex + step) % segments.length];
    offset += delta;
    delta += segment.curve;
  }
  return offset;
}

/**
 * Renders each opponent as a pixel-art rear-view motorcycle+rider (rendering/
 * drawOpponentMotorcycle.js — baked-sprite cache, LOD by projected size, anchored at the
 * tyre-contact point, rotated by the opponent's own lean). Assumes the caller has already
 * applied any world-space rotation/shake transform.
 */
export function renderOpponents(ctx, options) {
  const { opponents, camera, viewportWidth, viewportHeight, roadWidth, segments, segmentLength } = options;

  const projected = [];
  for (const opponent of opponents) {
    if (opponent.z <= camera.z) continue;
    const curveOffset = getRoadCurveOffset(segments, camera.z, opponent.z, segmentLength);
    const worldPoint = {
      x: opponent.offset * roadWidth,
      y: getGroundElevation(segments, opponent.z),
      z: opponent.z,
    };
    const projectionCamera = { ...camera, x: camera.x - curveOffset };
    const proj = projectPoint(worldPoint, projectionCamera, viewportWidth, viewportHeight, roadWidth);
    if (proj.visible) projected.push({ opponent, proj });
  }

  // Farthest (smallest scale) first, so nearer opponents naturally overpaint farther ones.
  projected.sort((a, b) => a.proj.scale - b.proj.scale);

  for (const { opponent, proj } of projected) {
    drawOpponent(ctx, proj, opponent, viewportWidth);
  }
}
