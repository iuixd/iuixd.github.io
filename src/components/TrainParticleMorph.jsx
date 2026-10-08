import { useEffect, useRef } from "react";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const smoothstep = (value) => value * value * (3 - 2 * value);

export default function TrainParticleMorph({
  imageSrc = "/assets/tajmahal-clean-reference.png",
  className = "",
  alt = "Clarity Emerges from Complexity — particle illustration of the Taj Mahal",
  desktopDensity = 3,
  mobileDensity = 4,
  scatter = 120,
  lensDiameter = 660,
  mobileLensDiameter = 375,
  lensFeather = 40,
  lensZoom = 1,
  topSpace = 50,
  cropTop = 0.015,
  cropBottom = 0.86,
  gatherDuration = 480,
  dissolveDuration = 680,
}) {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return undefined;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return undefined;

    const image = new Image();
    image.decoding = "async";
    const motionQuery = matchMedia("(prefers-reduced-motion: reduce)");
    let width = 1;
    let height = 1;
    let artworkHeight = 1;
    let artworkTop = 0;
    let dpr = 1;
    let particles = [];
    let frame = 0;
    let resizeTimer = 0;
    let ready = false;
    let visible = true;
    let disposed = false;
    let reducedMotion = motionQuery.matches;
    let previousTime = performance.now();
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, strength: 0, targetStrength: 0, active: false };

    function buildParticles() {
      const source = document.createElement("canvas");
      source.width = width;
      source.height = artworkHeight;
      const sourceCtx = source.getContext("2d", { willReadFrequently: true });
      sourceCtx.imageSmoothingEnabled = true;
      sourceCtx.imageSmoothingQuality = "high";
      const sourceY = image.naturalHeight * cropTop;
      const sourceHeight = image.naturalHeight * (cropBottom - cropTop);
      sourceCtx.drawImage(
        image,
        0,
        sourceY,
        image.naturalWidth,
        sourceHeight,
        0,
        0,
        width,
        artworkHeight
      );
      const data = sourceCtx.getImageData(0, 0, width, artworkHeight).data;
      const gap = width < 768 ? mobileDensity : desktopDensity;
      const next = [];

      // Estimate the cropped photograph's uniform sky tone from its upper band.
      // Particles are then admitted only for brighter masonry or strong edges
      // inside the known monument silhouette.
      let skyTotal = 0;
      let skySamples = 0;
      const skyBand = Math.max(2, Math.floor(artworkHeight * 0.055));
      for (let sy = 0; sy < skyBand; sy += 2) {
        for (let sx = Math.floor(width * 0.2); sx < width * 0.8; sx += 4) {
          const si = (sy * width + sx) * 4;
          skyTotal += data[si] * 0.2126 + data[si + 1] * 0.7152 + data[si + 2] * 0.0722;
          skySamples += 1;
        }
      }
      const skyLuma = skySamples ? skyTotal / skySamples : 160;

      for (let y = gap / 2; y < artworkHeight; y += gap) {
        for (let x = gap / 2; x < width; x += gap) {
          const ix = Math.floor(x);
          const iy = Math.floor(y);
          const index = (iy * width + ix) * 4;
          const luma =
            data[index] * 0.2126 +
            data[index + 1] * 0.7152 +
            data[index + 2] * 0.0722;
          const rightIndex = (iy * width + Math.min(ix + gap, width - 1)) * 4;
          const downIndex = (Math.min(iy + gap, artworkHeight - 1) * width + ix) * 4;
          const rightLuma = data[rightIndex] * 0.2126 + data[rightIndex + 1] * 0.7152 + data[rightIndex + 2] * 0.0722;
          const downLuma = data[downIndex] * 0.2126 + data[downIndex + 1] * 0.7152 + data[downIndex + 2] * 0.0722;
          const edge = (Math.abs(luma - rightLuma) + Math.abs(luma - downLuma)) / 92;
          const nx = x / width;
          const ny = y / artworkHeight;
          // Clean reference geometry: central monument, two rear minarets and
          // the two tall front minarets. Uniform sky within these broad bounds
          // is still rejected by the image-derived sky comparison below.
          const centralBuilding =
            nx > 0.275 && nx < 0.725 && ny > 0.035 && ny < 0.84;
          const leftFrontMinaret =
            nx > 0.095 && nx < 0.185 && ny > 0.08 && ny < 0.86;
          const rightFrontMinaret =
            nx > 0.815 && nx < 0.905 && ny > 0.08 && ny < 0.86;
          const leftRearMinaret =
            nx > 0.255 && nx < 0.33 && ny > 0.31 && ny < 0.84;
          const rightRearMinaret =
            nx > 0.67 && nx < 0.745 && ny > 0.31 && ny < 0.84;
          const architecturalBase =
            nx > 0.075 && nx < 0.925 && ny > 0.7 && ny < 0.9;
          const inTajSilhouette =
            centralBuilding ||
            leftFrontMinaret ||
            rightFrontMinaret ||
            leftRearMinaret ||
            rightRearMinaret ||
            architecturalBase;
          const brighterThanSky = (luma - skyLuma) / 88;
          const energy = clamp(Math.max(brighterThanSky, edge), 0, 1);
          const isMasonry = luma > skyLuma + 18;
          const isArchitecturalEdge = edge > 0.2 && luma > skyLuma - 8;
          if (
            data[index + 3] < 16 ||
            !inTajSilhouette ||
            (!isMasonry && !isArchitecturalEdge) ||
            energy < 0.08
          ) continue;
          if (Math.random() > 0.54 + energy * 0.36) continue;

          const positionedY = y + artworkTop;
          const centerX = width * 0.5;
          const centerY = artworkTop + artworkHeight * 0.58;
          const radialAngle = Math.atan2(positionedY - centerY, x - centerX);
          const angle = radialAngle + (Math.random() - 0.5) * 1.7;
          const distance =
            (22 + Math.pow(Math.random(), 0.58) * scatter) *
            (1.12 - energy * 0.22);
          next.push({
            homeX: x,
            homeY: positionedY,
            dustX: x + Math.cos(angle) * distance,
            dustY: positionedY + Math.sin(angle) * distance,
            phase: Math.random() * Math.PI * 2,
            delay: Math.random() * 0.28,
            energy,
            size: 0.42 + energy * 0.68,
            alpha: 0.2 + energy * 0.76,
            alignment: reducedMotion ? 1 : 0,
            alignmentVelocity: 0,
          });
        }
      }

      // Build the caption from particles as well, so it shares the exact same
      // scattered resting state, localized hover reveal and spring restoration
      // as the monument rather than appearing as a separate HTML text layer.
      const captionCanvas = document.createElement("canvas");
      captionCanvas.width = width;
      captionCanvas.height = artworkTop;
      const captionCtx = captionCanvas.getContext("2d", { willReadFrequently: true });
      const caption = "Clarity Emerges from Complexity";
      let captionSize = clamp(width * 0.038, 17, 42);
      captionCtx.font = `700 ${captionSize}px "Poppins", sans-serif`;
      const maxCaptionWidth = width * 0.9;
      const measuredWidth = captionCtx.measureText(caption).width;
      if (measuredWidth > maxCaptionWidth) {
        captionSize *= maxCaptionWidth / measuredWidth;
        captionCtx.font = `700 ${captionSize}px "Poppins", sans-serif`;
      }
      captionCtx.textAlign = "center";
      captionCtx.textBaseline = "middle";
      captionCtx.fillStyle = "white";
      const captionCenterY = 100 + captionSize / 2;
      captionCtx.fillText(caption, width / 2, captionCenterY);
      const captionData = captionCtx.getImageData(0, 0, width, artworkTop).data;
      const captionGap = Math.max(2, gap);
      for (let y = captionGap / 2; y < artworkTop; y += captionGap) {
        for (let x = captionGap / 2; x < width; x += captionGap) {
          const alpha = captionData[(Math.floor(y) * width + Math.floor(x)) * 4 + 3] / 255;
          if (alpha < 0.2 || Math.random() > 0.9) continue;
          const centerX = width * 0.5;
          const centerY = artworkTop + artworkHeight * 0.58;
          const radialAngle = Math.atan2(y - centerY, x - centerX);
          const angle = radialAngle + (Math.random() - 0.5) * 1.7;
          const distance = 22 + Math.pow(Math.random(), 0.58) * scatter;
          next.push({
            homeX: x,
            homeY: y,
            dustX: x + Math.cos(angle) * distance,
            dustY: y + Math.sin(angle) * distance,
            phase: Math.random() * Math.PI * 2,
            delay: Math.random() * 0.28,
            energy: alpha,
            size: 0.48 + alpha * 0.7,
            alpha: 0.34 + alpha * 0.66,
            // The caption intentionally behaves opposite to the monument: it
            // is assembled at rest and disperses locally beneath the lens.
            reverseReveal: true,
            alignment: 1,
            alignmentVelocity: 0,
          });
        }
      }
      particles = next;
    }

    function resize() {
      if (!ready || disposed) return;
      width = Math.max(1, Math.round(wrapper.clientWidth));
      const croppedSourceHeight = image.naturalHeight * (cropBottom - cropTop);
      artworkHeight = Math.max(1, Math.round(width * croppedSourceHeight / image.naturalWidth));
      // Reserve a real particle-free band before the artwork. This is an
      // absolute canvas region, not margin outside the footer or a proportional
      // offset that can shrink below the requested visual breathing room.
      // Keep 100px of completely transparent space before the particle caption,
      // plus enough room for its responsive line and a small separation from
      // the Taj Mahal artwork.
      artworkTop = Math.max(170, Math.round(topSpace + 120));
      height = artworkHeight + artworkTop;
      wrapper.style.height = `${height}px`;
      dpr = Math.min(devicePixelRatio || 1, width < 768 ? 1.5 : 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      buildParticles();
      draw(performance.now(), 0);
    }

    function draw(time, delta) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const follow = 1 - Math.exp(-delta * 20);
      pointer.x += (pointer.targetX - pointer.x) * follow;
      pointer.y += (pointer.targetY - pointer.y) * follow;
      const strengthDuration = pointer.targetStrength > pointer.strength ? gatherDuration : dissolveDuration;
      pointer.strength += (pointer.targetStrength - pointer.strength) *
        (1 - Math.exp(-delta * (4300 / strengthDuration)));

      const diameter = width < 768 ? mobileLensDiameter : lensDiameter;
      const radius = Math.min(diameter / 2, width * 0.34);
      const feather = Math.min(lensFeather, radius * 0.65);

      ctx.fillStyle = "oklch(0.8761 0.0758 198.98)";
      for (const particle of particles) {
        const dx = particle.homeX - pointer.x;
        const dy = particle.homeY - pointer.y;
        const distance = Math.hypot(dx, dy);
        // Stable per-particle radius variation makes the boundary dusty and
        // organic without introducing a visible circular mask.
        const organicRadius = radius +
          Math.sin(particle.phase * 2.7) * 7 +
          Math.sin(particle.homeX * 0.031 + particle.homeY * 0.023) * 5;
        const organicInner = Math.max(0, organicRadius - feather);
        const edge = clamp((distance - organicInner) / Math.max(feather, 1), 0, 1);
        const localInfluence = reducedMotion ? 1 : (1 - smoothstep(edge)) * pointer.strength;
        const targetAlignment = reducedMotion
          ? 1
          : particle.reverseReveal
            ? 1 - localInfluence
            : localInfluence;

        // Critically damped local spring: each dot independently converges only
        // while its image coordinate lies inside the soft cursor influence.
        const stiffness = targetAlignment > particle.alignment ? 95 : 42;
        const damping = targetAlignment > particle.alignment ? 18 : 13;
        particle.alignmentVelocity += (targetAlignment - particle.alignment) * stiffness * delta;
        particle.alignmentVelocity *= Math.exp(-damping * delta);
        particle.alignment = clamp(particle.alignment + particle.alignmentVelocity * delta, 0, 1);
        const mix = smoothstep(particle.alignment);
        const dustMotion = 1 - mix;
        const driftX = Math.sin(time * 0.00032 + particle.phase) * 1.65 * dustMotion;
        const driftY = Math.cos(time * 0.00024 + particle.phase * 1.31) * 1.25 * dustMotion;
        const zoom = reducedMotion ? 1 : 1 + (lensZoom - 1) * mix;
        const formedX = pointer.x + (particle.homeX - pointer.x) * zoom;
        const formedY = pointer.y + (particle.homeY - pointer.y) * zoom;
        const x = particle.dustX + (formedX - particle.dustX) * mix + driftX;
        const y = particle.dustY + (formedY - particle.dustY) * mix + driftY;
        const size = particle.size * (0.66 + mix * 0.62);
        ctx.globalAlpha = particle.alpha * (0.42 + mix * 0.58);
        ctx.fillRect(x - size / 2, y - size / 2, size, size);
      }
      ctx.globalAlpha = 1;
    }

    function loop(time) {
      if (disposed || !visible || reducedMotion) return;
      const delta = Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;
      draw(time, delta);
      frame = requestAnimationFrame(loop);
    }
    function start() {
      cancelAnimationFrame(frame);
      previousTime = performance.now();
      if (ready && visible && !reducedMotion) frame = requestAnimationFrame(loop);
    }
    function updatePointer(event) {
      const rect = canvas.getBoundingClientRect();
      pointer.targetX = clamp(event.clientX - rect.left, 0, width);
      pointer.targetY = clamp(event.clientY - rect.top, 0, height);
      if (!pointer.active) {
        pointer.x = pointer.targetX;
        pointer.y = pointer.targetY;
      }
      pointer.active = true;
      pointer.targetStrength = 1;
    }
    function onMove(event) {
      if (!reducedMotion && !(event.pointerType === "touch" && event.buttons === 0)) updatePointer(event);
    }
    function onLeave() {
      pointer.active = false;
      pointer.targetStrength = 0;
    }
    function onMotion(event) {
      reducedMotion = event.matches;
      pointer.strength = pointer.targetStrength = 0;
      if (reducedMotion) {
        cancelAnimationFrame(frame);
        draw(performance.now(), 0);
      } else start();
    }

    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 100);
    });
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else cancelAnimationFrame(frame);
    }, { rootMargin: "160px" });
    image.onload = () => {
      ready = true;
      resize();
      start();
    };
    image.src = imageSrc;
    resizeObserver.observe(wrapper);
    visibilityObserver.observe(wrapper);
    canvas.addEventListener("pointerenter", updatePointer, { passive: true });
    canvas.addEventListener("pointermove", onMove, { passive: true });
    canvas.addEventListener("pointerdown", updatePointer, { passive: true });
    canvas.addEventListener("pointerleave", onLeave, { passive: true });
    canvas.addEventListener("pointercancel", onLeave, { passive: true });
    motionQuery.addEventListener?.("change", onMotion);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      clearTimeout(resizeTimer);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      canvas.removeEventListener("pointerenter", updatePointer);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", updatePointer);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointercancel", onLeave);
      motionQuery.removeEventListener?.("change", onMotion);
      particles = [];
    };
  }, [cropBottom, cropTop, desktopDensity, dissolveDuration, gatherDuration, imageSrc, lensDiameter, lensFeather, lensZoom, mobileDensity, mobileLensDiameter, scatter, topSpace]);

  return (
    <div ref={wrapperRef} className={className} style={{ width: "100%", height: "auto", overflow: "hidden", background: "transparent" }}>
      <canvas ref={canvasRef} role="img" aria-label={alt} style={{ display: "block", width: "100%", height: "auto", background: "transparent", touchAction: "pan-y" }} />
    </div>
  );
}
