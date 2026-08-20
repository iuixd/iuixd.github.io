import { formatTime } from "./formatters";

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5 12.5 4.2 4.2L19 7" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7.5 10V7a4.5 4.5 0 0 1 9 0v3M6 10h12v10H6z" />
    </svg>
  );
}

function CircuitIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 20V5m0 1h10l-2.5 3L17 12H7" />
    </svg>
  );
}

function SoundIcon({ muted }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 10v4h4l5 4V6L8 10H4Z" />
      {muted ? (
        <path d="m17 9 4 6m0-6-4 6" />
      ) : (
        <path d="M16 9.5a4 4 0 0 1 0 5M18.5 7a7.5 7.5 0 0 1 0 10" />
      )}
    </svg>
  );
}

export default function StartOverlay({ styles, muted, snapshot, onStart, onToggleMute, onModeChange, onLevelChange }) {
  const estimatedDuration = snapshot?.mode === "grand-prix" ? "~2 min" : "~40 sec";

  return (
    <div className={`${styles.overlay} ${styles.startScrim}`}>
      <div className={styles.startHeading}>
        <p className={styles.gameTitle} aria-hidden="true">Victory Lap!</p>
        <p className={styles.startIntro}>Choose your mode and circuit to begin your ride.</p>
      </div>

      <div className={styles.raceSetup} aria-label="Race setup">
        <section className={styles.setupSection}>
          <div className={styles.setupLabel}>
            <span>Race Length</span>
            <small>{estimatedDuration}</small>
          </div>
          <div className={styles.segmentedControl} aria-label="Race mode">
            <button type="button" className={snapshot?.mode === "sprint" ? styles.segmentActive : styles.segmentButton} aria-pressed={snapshot?.mode === "sprint"} onClick={() => onModeChange("sprint")}>
              Quick Sprint <span>(1 lap)</span>
            </button>
            <button type="button" className={snapshot?.mode === "grand-prix" ? styles.segmentActive : styles.segmentButton} aria-pressed={snapshot?.mode === "grand-prix"} onClick={() => onModeChange("grand-prix")}>
              Grand Prix <span>(3 laps)</span>
            </button>
          </div>
        </section>

        <section className={styles.setupSection}>
          <div className={styles.setupLabel}>
            <span>Circuit</span>
            <small>{snapshot?.bestTime ? `Best ${formatTime(snapshot.bestTime)}` : "Win to unlock the next"}</small>
          </div>
          <div className={styles.circuitSelect} aria-label="Circuit selection">
            {snapshot?.availableLevels?.map((level) => {
              const selected = snapshot.level === level.number;
              return (
                <button key={level.number} type="button" className={selected ? styles.circuitActive : styles.circuitButton} disabled={!level.unlocked} onClick={() => onLevelChange(level.index)} aria-label={`${level.circuit}, ${level.difficulty}${level.unlocked ? "" : ", locked"}`}>
                  <span className={styles.circuitIcon}>
                    {selected ? <CheckIcon /> : level.unlocked ? <CircuitIcon /> : <LockIcon />}
                  </span>
                  <span className={styles.circuitCopy}>
                    <strong>{level.circuit}</strong>
                    <small>{level.unlocked ? (level.medal === "none" ? level.difficulty : `${level.medal} medal`) : "Locked"}</small>
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <div className={styles.startActions}>
          <button type="button" className={styles.primaryButton} onClick={onStart}>Start Ride</button>
          <button type="button" className={styles.startSoundButton} onClick={onToggleMute} aria-label={muted ? "Enable engine sound" : "Mute engine sound"} aria-pressed={!muted} title={muted ? "Enable engine sound" : "Mute engine sound"}>
            <SoundIcon muted={muted} />
          </button>
        </div>
      </div>

      <div className={styles.controlsHint} aria-label="Keyboard controls">
        <span className={styles.controlGuide}><kbd>W/↑</kbd>accelerate</span>
        <span className={styles.controlGuide}><kbd>S/↓</kbd>brake</span>
        <span className={styles.controlGuide}><kbd>AD/←→</kbd>steer</span>
        <span className={styles.controlGuide}><kbd>P/ESC</kbd>pause</span>
      </div>
      <div className={styles.controlsHintTouch} aria-label="Touch controls">
        <span className={styles.controlGuide}><span>Auto accelerate</span></span>
        <span className={styles.controlGuide}><kbd>←</kbd><kbd>→</kbd><span>Steer</span></span>
        <span className={styles.controlGuide}><kbd>Brake</kbd><span>Slow down</span></span>
      </div>
    </div>
  );
}
