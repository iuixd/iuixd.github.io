import { MOUNTAIN_PARALLAX_FACTOR, CLOUD_COUNT, CLOUD_DRIFT_PERIOD_MS } from "./constants";

// Fixed peak layout (fraction of width/height) so the silhouette doesn't reshuffle every
// frame — only its horizontal parallax offset changes.
const MOUNTAIN_PEAKS = [0, 0.08, 0.18, 0.24, 0.34, 0.42, 0.5, 0.58, 0.68, 0.76, 0.86, 0.94, 1];
const MOUNTAIN_HEIGHTS = [0.1, 0.32, 0.14, 0.4, 0.2, 0.3, 0.12, 0.36, 0.18, 0.28, 0.15, 0.34, 0.1];

/** Distant ridge line just above the horizon. Drawn unrotated, in renderBackdrop's space. */
export function renderMountains(ctx, { viewportWidth, viewportHeight, theme, camera }) {
  const horizon = viewportHeight / 2;
  const band = viewportHeight * 0.16;
  const parallaxOffset = -camera.x * MOUNTAIN_PARALLAX_FACTOR;

  ctx.fillStyle = theme.mountain;
  ctx.beginPath();
  ctx.moveTo(-viewportWidth * 0.1 + parallaxOffset, horizon);
  MOUNTAIN_PEAKS.forEach((fraction, i) => {
    const x = fraction * viewportWidth * 1.2 - viewportWidth * 0.1 + parallaxOffset;
    const y = horizon - MOUNTAIN_HEIGHTS[i] * band;
    ctx.lineTo(x, y);
  });
  ctx.lineTo(viewportWidth * 1.1 + parallaxOffset, horizon);
  ctx.closePath();
  ctx.fill();
}

const CLOUD_LAYOUT = [
  { baseFraction: 0.08, yFraction: 0.16, scale: 1.1, speedMultiplier: 1 },
  { baseFraction: 0.3, yFraction: 0.28, scale: 0.75, speedMultiplier: 0.7 },
  { baseFraction: 0.52, yFraction: 0.12, scale: 1.3, speedMultiplier: 1.2 },
  { baseFraction: 0.74, yFraction: 0.22, scale: 0.9, speedMultiplier: 0.85 },
  { baseFraction: 0.9, yFraction: 0.08, scale: 0.6, speedMultiplier: 1.05 },
];

function drawCloud(ctx, x, y, scale, color) {
  const w = 70 * scale;
  const h = 26 * scale;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(x, y, w * 0.5, h * 0.5, 0, 0, Math.PI * 2);
  ctx.ellipse(x - w * 0.32, y + h * 0.12, w * 0.32, h * 0.4, 0, 0, Math.PI * 2);
  ctx.ellipse(x + w * 0.34, y + h * 0.08, w * 0.36, h * 0.42, 0, 0, Math.PI * 2);
  ctx.fill();
}

/** A handful of soft, slowly-drifting clouds, wrapping around once they exit the viewport. */
export function renderClouds(ctx, { viewportWidth, viewportHeight, theme, elapsedMs }) {
  const cycle = (elapsedMs % CLOUD_DRIFT_PERIOD_MS) / CLOUD_DRIFT_PERIOD_MS;

  for (let i = 0; i < CLOUD_COUNT; i += 1) {
    const cloud = CLOUD_LAYOUT[i % CLOUD_LAYOUT.length];
    const drift = (cloud.baseFraction + cycle * cloud.speedMultiplier) % 1.3;
    const x = (drift - 0.15) * viewportWidth;
    const y = cloud.yFraction * viewportHeight;
    drawCloud(ctx, x, y, cloud.scale * (viewportWidth / 1280), theme.cloud);
  }
}

// --- Off-road dust particles ---
//
// Anything genuinely close to the camera is a known weak point of this projection
// technique — the road's own nearest segments render off-canvas for the same reason (see
// CAMERA_HEIGHT/CAMERA_DEPTH). Worse, at speed the camera closes the gap to a
// just-spawned world-space particle within a few milliseconds, so it's invisible almost
// before it exists. Classic pseudo-3D racers sidestep this by drawing near-camera effects
// (exhaust, dust) as a screen-space overlay instead of projected world geometry — that's
// what this does: particles live in canvas pixels near the bottom-centre, not world units.

export function spawnDustParticle(particles, { viewportWidth, viewportHeight, maxParticles }) {
  if (particles.length >= maxParticles) particles.shift();
  particles.push({
    x: viewportWidth / 2 + (Math.random() - 0.5) * viewportWidth * 0.22,
    y: viewportHeight * (0.86 + Math.random() * 0.08),
    driftX: (Math.random() - 0.5) * viewportWidth * 0.05,
    driftY: -viewportHeight * (0.05 + Math.random() * 0.05),
    life: 0,
  });
}

export function updateDustParticles(particles, dt, lifetimeMs) {
  const dtMs = dt * 1000;
  for (let i = particles.length - 1; i >= 0; i -= 1) {
    const particle = particles[i];
    particle.life += dtMs;
    particle.x += particle.driftX * dt;
    particle.y += particle.driftY * dt;
    if (particle.life >= lifetimeMs) particles.splice(i, 1);
  }
}

export function renderDustParticles(ctx, options) {
  const { particles, viewportWidth, theme, lifetimeMs } = options;

  for (const particle of particles) {
    const progress = particle.life / lifetimeMs;
    const radius = viewportWidth * (0.006 + progress * 0.012);

    ctx.globalAlpha = Math.max(0, 0.4 * (1 - progress));
    ctx.fillStyle = theme.rumbleLight;
    ctx.beginPath();
    ctx.ellipse(particle.x, particle.y, radius, radius * 0.65, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}
