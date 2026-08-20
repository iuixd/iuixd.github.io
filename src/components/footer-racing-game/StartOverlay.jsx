export default function StartOverlay({ styles, muted, onStart, onToggleMute }) {
  return (
    <div className={`${styles.overlay} ${styles.startScrim}`}>
      <div className={styles.startHeading}>
        <p className={styles.gameTitle} aria-hidden="true">Victory Lap!</p>

        <div className={styles.controlsHint} aria-label="Keyboard controls">
          <span className={styles.controlGuide}>
            <kbd>W / &uarr;</kbd><span>accelerate</span>
          </span>
          <span className={styles.controlGuide}>
            <kbd>S / &darr;</kbd><span>brake</span>
          </span>
          <span className={styles.controlGuide}>
            <kbd>A D / &larr; &rarr;</kbd><span>steer</span>
          </span>
          <span className={styles.controlGuide}>
            <kbd>P / Esc</kbd><span>pause</span>
          </span>
        </div>

        <div className={styles.controlsHintTouch} aria-label="Touch controls">
          <span className={styles.controlGuide}><span>Auto accelerate</span></span>
          <span className={styles.controlGuide}><kbd>&larr; &rarr;</kbd><span>steer</span></span>
          <span className={styles.controlGuide}><kbd>Brake</kbd><span>slow down</span></span>
        </div>
      </div>
      <div className={styles.startActions}>
        <button
          type="button"
          className={styles.primaryButton}
          onClick={onStart}
          aria-label="Start Retro GP motorcycle race"
        >
          Start Ride
        </button>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={onToggleMute}
          aria-pressed={!muted}
        >
          {muted ? "Enable Engine Sound" : "Engine Sound On"}
        </button>
      </div>
    </div>
  );
}
