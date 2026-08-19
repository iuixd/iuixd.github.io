import { useState } from "react";
import { formatTime, formatScore } from "./formatters";

export default function FinishOverlay({ styles, snapshot, onRaceAgain, onNextLevel, onExit }) {
  const [copied, setCopied] = useState(false);

  const handleCopyScore = async () => {
    const text = `Retro GP — ${formatScore(snapshot.score)} pts, position ${snapshot.position}/${snapshot.racers}, ${formatTime(snapshot.elapsedMs)}`;
    try {
      await navigator.clipboard?.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access denied/unavailable — no-op, nothing to recover from here.
    }
  };

  return (
    <div className={`${styles.overlay} ${styles.finishScrim}`}>
      <p className={styles.finishLabel}>
        {snapshot.hasNextLevel ? "CIRCUIT COMPLETE" : "CHAMPIONSHIP COMPLETE"}
      </p>
      <p className={styles.circuitLabel}>
        LEVEL {snapshot.level} · {snapshot.circuit} · {snapshot.difficulty}
      </p>

      <dl className={styles.finishStats}>
        <div className={styles.finishStat}>
          <dt>POSITION</dt>
          <dd>
            {snapshot.position} / {snapshot.racers}
          </dd>
        </div>
        <div className={styles.finishStat}>
          <dt>TIME</dt>
          <dd>{formatTime(snapshot.elapsedMs)}</dd>
        </div>
        <div className={styles.finishStat}>
          <dt>SCORE</dt>
          <dd>{formatScore(snapshot.score)}</dd>
        </div>
        <div className={styles.finishStat}>
          <dt>BEST</dt>
          <dd>{formatScore(snapshot.bestScore)}</dd>
        </div>
      </dl>

      <div className={styles.finishActions}>
        {snapshot.hasNextLevel ? (
          <button type="button" className={styles.primaryButton} onClick={onNextLevel}>
            Next Circuit
          </button>
        ) : (
          <button type="button" className={styles.primaryButton} onClick={onRaceAgain}>
            Race Again
          </button>
        )}
        {snapshot.hasNextLevel && (
          <button type="button" className={styles.secondaryButton} onClick={onRaceAgain}>
            Replay Level
          </button>
        )}
        <button type="button" className={styles.secondaryButton} onClick={onExit}>
          Exit
        </button>
        {navigator.clipboard && (
          <button type="button" className={styles.secondaryButton} onClick={handleCopyScore}>
            {copied ? "Copied!" : "Copy Score"}
          </button>
        )}
      </div>
    </div>
  );
}
