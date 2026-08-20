import { useCallback, useEffect, useRef, useState } from "react";
import GameCanvas from "./GameCanvas";
import StartOverlay from "./StartOverlay";
import CountdownOverlay from "./CountdownOverlay";
import GameHUD from "./GameHUD";
import FinishOverlay from "./FinishOverlay";
import MobileControls from "./MobileControls";
import AccessibilityStatus from "./AccessibilityStatus";
import RetireConfirmation from "./RetireConfirmation";
import useGameVisibility from "./hooks/useGameVisibility";
import useResponsiveCanvas from "./hooks/useResponsiveCanvas";
import useReducedMotion from "./hooks/useReducedMotion";
import { GameEngine } from "./engine/GameEngine";
import { GAME_STATES } from "./engine/constants";
import { ordinal } from "./formatters";
import styles from "./FooterRacingGame.module.css";

export default function FooterRacingGame() {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const engineRef = useRef(null);

  const [snapshot, setSnapshot] = useState(null);
  const [announcement, setAnnouncement] = useState("");
  const [muted, setMuted] = useState(true);
  const [showRetireConfirmation, setShowRetireConfirmation] = useState(false);

  const reducedMotion = useReducedMotion();
  const { isActive } = useGameVisibility(wrapperRef);
  const { cssWidth, cssHeight } = useResponsiveCanvas(wrapperRef);

  useEffect(() => {
    const engine = new GameEngine({
      onSnapshot: (next) => setSnapshot(next),
      onEvent: (event) => {
        if (event.type === "overtake") {
          setAnnouncement(`You moved into ${ordinal(event.position)} position.`);
        } else if (event.type === "collision") {
          setAnnouncement("Collision. Recovering.");
        } else if (event.type === "finish") {
          setAnnouncement(`Race finished. ${ordinal(event.position)} place.`);
        } else if (event.type === "retired") {
          setAnnouncement("Race ended. Result: DNF, retired.");
        } else if (event.type === "paused" && event.reason === "stopped-off-road") {
          setAnnouncement("Motorcycle stopped beside the track. Race paused.");
        } else if (event.type === "lap") {
          setAnnouncement(`Lap ${event.lap} complete.`);
        }
      },
    });
    engineRef.current = engine;

    if (canvasRef.current) {
      engine.attach(canvasRef.current, wrapperRef.current, wrapperRef.current);
    }
    setSnapshot(engine.getSnapshot());

    return () => {
      engine.destroy();
      engineRef.current = null;
    };
  }, []);

  useEffect(() => {
    engineRef.current?.setReducedMotion(reducedMotion);
  }, [reducedMotion]);

  useEffect(() => {
    if (cssWidth && cssHeight) {
      engineRef.current?.resize(cssWidth, cssHeight);
    }
  }, [cssWidth, cssHeight]);

  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;
    if (isActive) {
      engine.resumeAmbient();
    } else {
      engine.pause();
    }
  }, [isActive]);

  const state = snapshot?.state ?? GAME_STATES.IDLE;

  const handleStart = useCallback(() => {
    engineRef.current?.start();
    wrapperRef.current?.focus();
    setAnnouncement("Get ready. Race begins after the countdown.");
  }, []);

  const handleModeChange = useCallback((mode) => {
    engineRef.current?.setRaceMode(mode);
  }, []);

  const handleLevelChange = useCallback((index) => {
    engineRef.current?.selectLevel(index);
  }, []);

  const handleResume = useCallback(() => {
    engineRef.current?.resume();
    wrapperRef.current?.focus();
    setAnnouncement("Race resumed.");
  }, []);

  const handleRaceAgain = useCallback(() => {
    engineRef.current?.restart();
    wrapperRef.current?.focus();
    setAnnouncement("Race started.");
  }, []);

  const handleNextLevel = useCallback(() => {
    engineRef.current?.advanceLevel();
    wrapperRef.current?.focus();
    setAnnouncement("Next circuit started.");
  }, []);

  const handleExit = useCallback(() => {
    engineRef.current?.stop();
    setAnnouncement("");
  }, []);

  const handleConfirmRetire = useCallback(() => {
    engineRef.current?.retireRace();
    setShowRetireConfirmation(false);
  }, []);

  const handleCancelRetire = useCallback(() => {
    setShowRetireConfirmation(false);
    wrapperRef.current?.focus();
  }, []);

  const handleMobileInput = useCallback((input) => {
    engineRef.current?.setInput(input);
  }, []);

  const handleToggleMute = useCallback(() => {
    setMuted((previous) => {
      const next = !previous;
      engineRef.current?.setMuted(next);
      return next;
    });
    // HUD controls take DOM focus when clicked. Return it to an active game on the next
    // frame so keyboard steering continues without requiring an extra click. On the start
    // screen, retain normal button focus for keyboard and assistive-technology users.
    if (state === GAME_STATES.RACING || state === GAME_STATES.CRASHED) {
      requestAnimationFrame(() => wrapperRef.current?.focus());
    }
  }, [state]);

  const showHud =
    state === GAME_STATES.RACING ||
    state === GAME_STATES.CRASHED ||
    state === GAME_STATES.PAUSED;

  return (
    <section
      ref={wrapperRef}
      className={styles.wrapper}
      aria-labelledby="retro-gp-title"
      tabIndex={-1}
    >
      <h2 id="retro-gp-title" className={styles.visuallyHidden}>
        Retro GP
      </h2>

      {/* Defs-only SVG (0x0, no visual footprint) for the idle-state flag-wave filter.
          Verified in isolation against several alternatives (raw turbulence alone was too
          speckly; displacing a smooth/striped gradient barely showed any warp since there
          was no contrast for the eye to track) before landing here: fractalNoise turbulence
          is turned into an organic, cloud-shaped alpha mask for the brand-colour gradient
          (so the colour patches themselves are irregular, not geometric), then the SAME
          noise drives feDiffuseLighting for genuine light/shadow modulation — masked to that
          same cloud shape so the lighting never leaks into the fully-transparent gaps, which
          is what keeps the game content visible through it. Present once, referenced by
          url(#footerFlagRippleFilter) from the CSS. */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <filter id="footerFlagRippleFilter" x="-25%" y="-25%" width="150%" height="150%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.007 0.011" numOctaves="3" seed="7" result="noise">
              <animate
                attributeName="baseFrequency"
                dur="26s"
                values="0.007 0.011;0.010 0.008;0.007 0.011"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feColorMatrix in="noise" type="luminanceToAlpha" result="alpha" />
            <feComponentTransfer in="alpha" result="cloudAlpha">
              <feFuncA type="linear" slope="2.4" intercept="-0.35" />
            </feComponentTransfer>
            <feComposite in="SourceGraphic" in2="cloudAlpha" operator="in" result="coloredClouds" />
            <feDiffuseLighting in="noise" lightingColor="#ffffff" surfaceScale="9" diffuseConstant="1.25" result="light">
              <feDistantLight azimuth="235" elevation="52" />
            </feDiffuseLighting>
            <feComposite in="light" in2="coloredClouds" operator="in" result="maskedLight" />
            <feBlend in="maskedLight" in2="coloredClouds" mode="overlay" />
          </filter>
        </defs>
      </svg>

      <GameCanvas canvasRef={canvasRef} className={styles.canvas} />

      {state === GAME_STATES.IDLE && (
        <StartOverlay
          styles={styles}
          muted={muted}
          snapshot={snapshot}
          onStart={handleStart}
          onToggleMute={handleToggleMute}
          onModeChange={handleModeChange}
          onLevelChange={handleLevelChange}
          isActive={isActive}
        />
      )}

      {(state === GAME_STATES.READY || state === GAME_STATES.COUNTDOWN) && (
        <CountdownOverlay styles={styles} value={snapshot?.countdownValue ?? 3} />
      )}

      {state === GAME_STATES.PAUSED && !showRetireConfirmation && (
        <div className={styles.pausedOverlay} role="dialog" aria-modal="true" aria-labelledby="retro-gp-paused-title">
          <p id="retro-gp-paused-title" className={styles.pausedLabel}>PAUSED</p>
          <button type="button" className={styles.primaryButton} onClick={handleResume}>
            Resume Race
          </button>
          <button type="button" className={styles.secondaryButton} onClick={handleRaceAgain}>
            Restart Race
          </button>
          <button type="button" className={styles.dangerButton} onClick={() => setShowRetireConfirmation(true)}>
            Retire from Race
          </button>
          <button type="button" className={styles.secondaryButton} onClick={handleExit}>
            Exit
          </button>
        </div>
      )}

      {state === GAME_STATES.PAUSED && showRetireConfirmation && (
        <RetireConfirmation styles={styles} onCancel={handleCancelRetire} onConfirm={handleConfirmRetire} />
      )}

      {(state === GAME_STATES.FINISHED || state === GAME_STATES.RETIRED) && snapshot && (
        <FinishOverlay
          styles={styles}
          snapshot={snapshot}
          onRaceAgain={handleRaceAgain}
          onNextLevel={handleNextLevel}
          onExit={handleExit}
        />
      )}

      {showHud && snapshot && (
        <GameHUD styles={styles} snapshot={snapshot} muted={muted} onToggleMute={handleToggleMute} />
      )}

      <MobileControls
        styles={styles}
        visible={state === GAME_STATES.RACING || state === GAME_STATES.CRASHED}
        onInputChange={handleMobileInput}
      />
      <AccessibilityStatus styles={styles} message={announcement} />
    </section>
  );
}
