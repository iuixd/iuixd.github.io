import { useMemo, useState } from "react";
import { formatTime, formatScore, formatDelta } from "./formatters";

function MedalIcon({ styles }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.medalIcon}>
      <path d="M8 2 5 9l3 1.4L11.2 4Z" opacity="0.55" />
      <path d="M16 2l3 7-3 1.4L12.8 4Z" opacity="0.55" />
      <circle cx="12" cy="15" r="7" />
      <path
        className={styles.medalIconStar}
        d="m12 11.2 1.15 2.35 2.55.37-1.85 1.8.44 2.55L12 17.05l-2.29 1.22.44-2.55-1.85-1.8 2.55-.37Z"
      />
    </svg>
  );
}

const CONFETTI_COLORS = ["#ffd65a", "#ff8a65", "#70e0de", "#a78bfa", "#4ade80", "#ffffff"];

function Confetti({ styles }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2.4 + Math.random() * 1.6,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        rotate: Math.round(Math.random() * 360),
        drift: Math.round((Math.random() - 0.5) * 70),
        size: 5 + Math.random() * 5,
      })),
    []
  );

  return (
    <div className={styles.confetti} aria-hidden="true">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className={styles.confettiPiece}
          style={{
            left: `${piece.left}%`,
            width: `${piece.size}px`,
            height: `${piece.size * 0.4}px`,
            background: piece.color,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            "--confetti-drift": `${piece.drift}px`,
            "--confetti-rotate": `${piece.rotate}deg`,
          }}
        />
      ))}
    </div>
  );
}

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

  const wonGold = !retired && snapshot.medal === "gold";

  return (
    <div className={`${styles.overlay} ${styles.finishScrim}`}>
      {wonGold && <Confetti styles={styles} />}
      <p className={styles.finishLabel}>
        {retired ? "RACE ENDED" : snapshot.hasNextLevel ? "CIRCUIT COMPLETE" : "CHAMPIONSHIP COMPLETE"}
      </p>
      <p className={styles.circuitLabel}>
        {snapshot.modeLabel} · LEVEL {snapshot.level} · {snapshot.circuit} · {snapshot.difficulty}
      </p>

      {!retired && (
        <div className={`${styles.medalAward} ${styles[`medal_${snapshot.medal}`]}`}>
          <MedalIcon styles={styles} />
          <span className={styles.medalAwardCopy}>
            {snapshot.medal?.toUpperCase()} MEDAL
            {(snapshot.newBestTime || snapshot.newBestScore) && <small>NEW PERSONAL BEST</small>}
          </span>
        </div>
      )}

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
        <div className={styles.finishStat}>
          <dt>BEST LAP</dt>
          <dd>{snapshot.bestLap ? formatTime(snapshot.bestLap) : "—"}</dd>
        </div>
        <div className={styles.finishStat}>
          <dt>LAP DELTA</dt>
          <dd>{formatDelta(snapshot.lapDelta)}</dd>
        </div>
        <div className={styles.finishStat}>
          <dt>CLEAN SECTORS</dt>
          <dd>{snapshot.cleanSectorCount} / {snapshot.totalSectors}</dd>
        </div>
        <div className={styles.finishStat}>
          <dt>OVERTAKES · HITS</dt>
          <dd>{snapshot.overtakeCount} · {snapshot.collisionCount}</dd>
        </div>
      </dl>

      {!retired && snapshot.nextTarget && <p className={styles.nextTarget}>{snapshot.nextTarget}</p>}

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
