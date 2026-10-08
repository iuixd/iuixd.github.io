
import { useEffect, useRef } from "react";

export function LegacyTrainParticleFooter({
  imageSrc = "/assets/teal-pointillist-train-station-wreck.png",
  className = "",
  desktopGap = 4,
  mobileGap = 7,
}) {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;

    if (!wrapper || !canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: true,
    });

    if (!ctx) return;

    const clamp = (value, min, max) =>
      Math.min(max, Math.max(min, value));

    const rand = (min, max) =>
      Math.random() * (max - min) + min;

    const motionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    let reduceMotion = motionQuery.matches;
    let width = 0;
    let height = 0;
    let dpr = 1;

    let particles = [];
    let animationFrame = null;
    let isRunning = false;
    let isVisible = false;
    let imageReady = false;
    let disposed = false;
    let shockwave = null;
    let baseLayer = null;

    const mouse = {
      x: -9999,
      y: -9999,
      vx: 0,
      vy: 0,
      lastX: -9999,
      lastY: -9999,
      active: false,
      radius: 120,
    };

    const image = new Image();
    image.decoding = "async";

    function resizeCanvas() {
      width = wrapper.clientWidth;
      height = width * (image.naturalHeight / image.naturalWidth);
      wrapper.style.height = `${height}px`;
      mouse.radius = clamp(Math.min(width, height) * 0.38, 82, 150);

      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
    }

    // Convert the source image into particles.
    function buildParticles() {
      if (!imageReady || !width || !height) return;

      const offscreen = document.createElement("canvas");
      const offCtx = offscreen.getContext("2d", {
        willReadFrequently: true,
      });

      if (!offCtx) return;

      offscreen.width = Math.round(width);
      offscreen.height = Math.round(height);

      // Preserve the photograph's original proportions and complete composition.
      const scale = Math.min(
        offscreen.width / image.naturalWidth,
        offscreen.height / image.naturalHeight
      );
      const drawWidth = image.naturalWidth * scale;
      const drawHeight = image.naturalHeight * scale;
      const drawX = (offscreen.width - drawWidth) / 2;
      const drawY = (offscreen.height - drawHeight) / 2;

      offCtx.imageSmoothingEnabled = true;
      offCtx.imageSmoothingQuality = "high";
      offCtx.drawImage(image, drawX, drawY, drawWidth, drawHeight);

      const imageData = offCtx.getImageData(
        0,
        0,
        offscreen.width,
        offscreen.height
      ).data;

      const gap = width < 768 ? mobileGap : desktopGap;
      const nextParticles = [];

      for (let y = 0; y <offscreen.height; y += gap) {
        for (let x = 0; x < offscreen.width; x += gap) {
          const index = (y * offscreen.width + x) * 4;

          const r = imageData[index];
          const g = imageData[index + 1];
          const b = imageData[index + 2];
          const a = imageData[index + 3];

          if (a < 20) continue;

          const luma =
            0.2126 * r +
            0.7152 * g +
            0.0722 * b;

          // This source is already pointillist: sample its luminous marks, not
          // the dark teal field between them.
          if (luma < 48) continue;
          if (luma < 82 && Math.random() > 0.1) continue;

          const isSmoke = false;
          const color = [r, g, b];
          const alpha = clamp(0.16 + (luma / 255) * 0.72, 0.2, 0.88);
          const size = rand(0.68, 1.28) + (luma / 255) * 0.32;

          const baseX = x;
          const baseY = y;

          const startSpread = reduceMotion ? 0 : rand(0, 3.5);

          const startAngle = Math.random() * Math.PI * 2;

          nextParticles.push({
            x: reduceMotion
              ? baseX
              : baseX + Math.cos(startAngle) * startSpread,

            y: reduceMotion
              ? baseY
              : baseY +
                Math.sin(startAngle) * startSpread +
                rand(0, 3.5),

            baseX,
            baseY,
            vx: 0,
            vy: 0,
            size,
            alpha,
            color,
            seed: Math.random() * 1000,
            drift: isSmoke
              ? rand(1.2, 3.1)
              : rand(0.15, 0.75),

            glow: !isSmoke && Math.random() < 0.12,
            depth: 0.55 + (luma / 255) * 0.9,
          });
        }
      }

      particles = nextParticles;

      // Preserve the supplied artwork pixel-for-pixel beneath the interactive
      // point layer; only the sampled particles are displaced.
      baseLayer = offscreen;
      renderFrame(performance.now(), !reduceMotion);
    }

    // Draw and animate particles.
    function renderFrame(time, animated) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // The base never disperses, so fine station and locomotive details remain
      // legible even while the sampled highlight particles move above it.
      if (baseLayer) {
        ctx.save();
        ctx.globalAlpha = 1;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(image, 0, 0, width, height);
        ctx.restore();

        // Reveal the displaced point cloud through a feathered lens. Without
        // this local transition the intact source image visually masks motion.
        if (animated && mouse.active) {
          ctx.save();
          ctx.globalCompositeOperation = "destination-out";
          const reveal = ctx.createRadialGradient(
            mouse.x,
            mouse.y,
            0,
            mouse.x,
            mouse.y,
            mouse.radius * 1.08
          );
          reveal.addColorStop(0, "rgba(0,0,0,0.84)");
          reveal.addColorStop(0.5, "rgba(0,0,0,0.58)");
          reveal.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = reveal;
          ctx.fillRect(
            mouse.x - mouse.radius * 1.1,
            mouse.y - mouse.radius * 1.1,
            mouse.radius * 2.2,
            mouse.radius * 2.2
          );
          ctx.restore();
        }
      }

      for (const p of particles) {
        const driftX = animated
          ? Math.sin(time * 0.00045 + p.seed) * p.drift
          : 0;

        const driftY = animated
          ? Math.cos(time * 0.00035 + p.seed * 1.37) *
            p.drift *
            0.55
          : 0;

        let targetX = p.baseX + driftX;
        let targetY = p.baseY + driftY;

        if (animated) {
          // The reference behaves like a soft magnetic/depth lens: points are
          // drawn toward the pointer, shear with its movement, then recover.
          if (mouse.active) {
            const dx = mouse.x - p.baseX;
            const dy = mouse.y - p.baseY;
            const dist = Math.hypot(dx, dy);

            if (dist < mouse.radius) {
              const normalized = 1 - dist / mouse.radius;
              const lens = normalized * normalized * (3 - 2 * normalized);
              targetX += dx * lens * 0.24 * p.depth + mouse.vx * lens * 2.4 * p.depth;
              targetY += dy * lens * 0.24 * p.depth + mouse.vy * lens * 2.4 * p.depth;

              // A very small tangential component produces the fluid, layered
              // curl visible around the cursor in the reference footage.
              targetX += (-dy / (dist || 1)) * lens * 5.5 * p.depth;
              targetY += (dx / (dist || 1)) * lens * 5.5 * p.depth;
            }
          }

          // Click shockwave.
          if (shockwave) {
            const elapsed =
              (time - shockwave.time) / 1000;

            const waveRadius = elapsed * 360;

            if (elapsed < 1.15) {
              const dx = p.x - shockwave.x;
              const dy = p.y - shockwave.y;
              const dist = Math.hypot(dx, dy) || 1;

              const band = Math.abs(dist - waveRadius);

              if (band < 42) {
                const force =
                  (1 - band / 42) * 0.65;

                p.vx += (dx / dist) * force;
                p.vy += (dy / dist) * force;
              }
            }
          }

          // Friction and spring return.
          p.vx *= 0.88;
          p.vy *= 0.88;

          p.x +=
            (targetX - p.x) * 0.082 + p.vx;

          p.y +=
            (targetY - p.y) * 0.082 + p.vy;
        } else {
          p.x = targetX;
          p.y = targetY;
          p.vx = 0;
          p.vy = 0;
        }

        const [r, g, b] = p.color;
        const pointerDistance = mouse.active
          ? Math.hypot(p.baseX - mouse.x, p.baseY - mouse.y)
          : Infinity;
        const focus = pointerDistance < mouse.radius * 1.15
          ? Math.pow(1 - pointerDistance / (mouse.radius * 1.15), 1.5)
          : 0;
        const renderSize = p.size * (1 + focus * 0.9 * p.depth);
        const renderAlpha = clamp(p.alpha + focus * 0.38, 0, 1);

        ctx.beginPath();
        ctx.arc(
          p.x,
          p.y,
          renderSize,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = `rgba(${r},${g},${b},${renderAlpha})`;
        ctx.fill();

        // Subtle cyan glow.
        if (animated && p.glow) {
          ctx.beginPath();
          ctx.arc(
            p.x,
            p.y,
            p.size * 2.4,
            0,
            Math.PI * 2
          );

          ctx.fillStyle =
            `rgba(120,255,240,${p.alpha * 0.09})`;

          ctx.fill();
        }
      }

      if (
        shockwave &&
        (time - shockwave.time) / 1000 > 1.15
      ) {
        shockwave = null;
      }

      mouse.vx *= 0.82;
      mouse.vy *= 0.82;
    }

    function loop(time) {
      if (!isRunning) return;

      renderFrame(time, true);

      animationFrame = window.requestAnimationFrame(loop);
    }

    function start() {
      if (
        isRunning ||
        reduceMotion ||
        !imageReady ||
        !isVisible
      ) {
        return;
      }

      isRunning = true;
      animationFrame = window.requestAnimationFrame(loop);
    }

    function stop() {
      isRunning = false;

      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
    }

    function rebuild() {
      if (!imageReady || disposed) return;

      stop();
      resizeCanvas();
      buildParticles();

      if (reduceMotion) {
        renderFrame(performance.now(), false);
      } else {
        start();
      }
    }

    function onPointerMove(event) {
      if (reduceMotion) return;

      const rect = canvas.getBoundingClientRect();

      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      if (mouse.lastX > -1000) {
        mouse.vx = clamp(mouse.x - mouse.lastX, -12, 12);
        mouse.vy = clamp(mouse.y - mouse.lastY, -12, 12);
      }
      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;
      mouse.active = true;
    }

    function onPointerLeave() {
      mouse.active = false;
      mouse.vx = 0;
      mouse.vy = 0;
      mouse.lastX = -9999;
      mouse.lastY = -9999;
      mouse.x = -9999;
      mouse.y = -9999;
    }

    function onPointerDown(event) {
      if (reduceMotion) return;

      const rect = canvas.getBoundingClientRect();

      shockwave = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        time: performance.now(),
      };
    }

    function onReduceMotionChange(event) {
      reduceMotion = event.matches;
      rebuild();
    }

    const resizeObserver = new ResizeObserver(() => {
      rebuild();
    });

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;

        if (isVisible) {
          if (reduceMotion) {
            renderFrame(performance.now(), false);
          } else {
            start();
          }
        } else {
          stop();
        }
      },
      { threshold: 0.12 }
    );

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);
    canvas.addEventListener("pointerdown", onPointerDown);

    motionQuery.addEventListener(
      "change",
      onReduceMotionChange
    );

    resizeObserver.observe(wrapper);
    intersectionObserver.observe(wrapper);

    image.onload = () => {
      if (disposed) return;

      imageReady = true;
      rebuild();
    };

    image.onerror = () => {
      console.error(
        "Footer particle image failed to load:",
        imageSrc
      );
    };

    image.src = imageSrc;

    if (image.complete && image.naturalWidth > 0) {
      imageReady = true;
      rebuild();
    }

    return () => {
      disposed = true;
      stop();

      canvas.removeEventListener(
        "pointermove",
        onPointerMove
      );

      canvas.removeEventListener(
        "pointerleave",
        onPointerLeave
      );

      canvas.removeEventListener(
        "pointerdown",
        onPointerDown
      );

      motionQuery.removeEventListener(
        "change",
        onReduceMotionChange
      );

      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [imageSrc, desktopGap, mobileGap]);

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "auto",
        overflow: "hidden",
        background: "transparent",
      }}
      role="img"
      aria-label="Historic locomotive at Gare Montparnasse railway station"
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          background: "transparent",
          touchAction: "pan-y",
        }}
      />
    </div>
  );
}

export { default } from "./TrainParticleMorph";
