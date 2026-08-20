import { useState } from "react";
import { formatTime, formatScore } from "./formatters";

export default function FinishOverlay({ styles, snapshot, onRaceAgain, onNextLevel, onExit }) {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const retired = snapshot.resultStatus === "dnf";

  const handleCopyScore = async () => {
    const result = retired ? "DNF (Retired)" : `position ${snapshot.position}/${snapshot.racers}`;
    const text = `Retro GP — ${formatScore(snapshot.score)} pts, ${result}, ${formatTime(snapshot.elapsedMs)}`;
    try {
      await navigator.clipboard?.writeText(text);
      setCopied(true);
      setCopyFailed(false);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyFailed(true);
      setTimeout(() => setCopyFailed(false), 2500);
    }
  };

  return (
    <div className={`${styles.overlay} ${styles.finishScrim}`}>
      <p className={styles.finishLabel}>
        {retired ? "RACE ENDED" : snapshot.hasNextLevel ? "CIRCUIT COMPLETE" : "CHAMPIONSHIP COMPLETE"}
      </p>
      <p className={styles.circuitLabel}>
        LEVEL {snapshot.level} · {snapshot.circuit} · {snapshot.difficulty}
      </p>

      <div className={styles.resultsRow} aria-label={retired ? "You, DNF, retired" : `You, position ${snapshot.position}`}>
        <span className={styles.resultsRider}>YOU</span>
        <strong className={retired ? styles.dnfStatus : styles.finishedStatus}>
          {retired ? "DNF · RETIRED" : `${snapshot.position} / ${snapshot.racers}`}
        </strong>
      </div>

      <dl className={styles.finishStats}>
        <div className={styles.finishStat}>
          <dt>{retired ? "RESULT" : "POSITION"}</dt>
          <dd>{retired ? "DNF" : `${snapshot.position} / ${snapshot.racers}`}</dd>
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
        {retired ? (
          <button type="button" className={styles.primaryButton} onClick={onRaceAgain}>Retry Race</button>
        ) : snapshot.hasNextLevel ? (
          <button type="button" className={styles.primaryButton} onClick={onNextLevel}>Next Circuit</button>
        ) : (
          <button type="button" className={styles.primaryButton} onClick={onRaceAgain}>Race Again</button>
        )}
        {!retired && snapshot.hasNextLevel && (
          <button type="button" className={styles.secondaryButton} onClick={onRaceAgain}>Replay Level</button>
        )}
        <button type="button" className={styles.secondaryButton} onClick={onExit}>Exit</button>
        {navigator.clipboard && (
          <button type="button" className={styles.secondaryButton} onClick={handleCopyScore}>
            {copied ? "Copied!" : copyFailed ? "Copy Failed" : "Copy Score"}
          </button>
        )}
      </div>
    </div>
  );
}
