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
    state === GAME_STATES.PAUSED ||
    state === GAME_STATES.FINISHED;

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

      <GameCanvas canvasRef={canvasRef} className={styles.canvas} />

      {state === GAME_STATES.IDLE && (
        <StartOverlay
          styles={styles}
          muted={muted}
          onStart={handleStart}
          onToggleMute={handleToggleMute}
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
