import { formatTime, formatScore } from "./formatters";
import CircuitMinimap from "./CircuitMinimap";

export default function GameHUD({ styles, snapshot, muted, onToggleMute }) {
  return (
    <div className={styles.hud}>
      <CircuitMinimap styles={styles} snapshot={snapshot} />
      <div className={styles.hudRow}>
        <span className={styles.hudStat}>LAP {snapshot.lap}/{snapshot.totalLaps}</span>
        <span className={styles.hudStat}>{snapshot.modeLabel} · {snapshot.difficulty}</span>
        <span className={styles.hudStat}>POS {snapshot.position}/{snapshot.racers}</span>
        <span className={styles.hudRight}>
          <span className={styles.hudStat}>
            BEST LAP {snapshot.bestLap ? formatTime(snapshot.bestLap) : "--:--.-"}
          </span>
          <button
            type="button"
            className={styles.muteButton}
            onClick={onToggleMute}
            aria-pressed={!muted}
            aria-label={muted ? "Unmute engine sound" : "Mute engine sound"}
          >
            {muted ? "\u{1F507}" : "\u{1F50A}"}
          </button>
        </span>
      </div>
      <div className={styles.hudRow}>
        <span className={styles.hudStat}>SPEED {snapshot.speedKph}</span>
        <span className={styles.hudStat}>TIME {formatTime(snapshot.elapsedMs)}</span>
        <span className={styles.hudStat}>LAP {formatTime(snapshot.currentLapTime)}</span>
        <span className={styles.hudStat}>SCORE {formatScore(snapshot.score)}</span>
      </div>
      {snapshot.feedback && <div className={styles.raceFeedback} role="status">{snapshot.feedback}</div>}
    </div>
  );
}
