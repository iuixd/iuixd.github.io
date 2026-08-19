import { formatTime, formatScore } from "./formatters";
import CircuitMinimap from "./CircuitMinimap";

// Snapshot updates are already throttled to ~12Hz by the engine (see SNAPSHOT_INTERVAL_MS),
// so this plain re-render on prop change never approaches per-frame React updates.
export default function GameHUD({ styles, snapshot, muted, onToggleMute }) {
  return (
    <div className={styles.hud}>
      <CircuitMinimap styles={styles} snapshot={snapshot} />
      <div className={styles.hudRow}>
        <span className={styles.hudStat}>
          LAP {snapshot.lap}/{snapshot.totalLaps}
        </span>
        <span className={styles.hudStat}>LEVEL {snapshot.level}/{snapshot.totalLevels} · {snapshot.difficulty}</span>
        <span className={styles.hudStat}>
          POS {snapshot.position}/{snapshot.racers}
        </span>
        <span className={styles.hudRight}>
          <span className={styles.hudStat}>BEST {formatScore(snapshot.bestScore)}</span>
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
        <span className={styles.hudStat}>SCORE {formatScore(snapshot.score)}</span>
      </div>
    </div>
  );
}
