export default function CountdownOverlay({ styles, value }) {
  const label = value > 0 ? String(value) : "GO";
  return (
    <div className={styles.countdownOverlay}>
      <span className={styles.countdownValue} aria-hidden="true">{label}</span>
      <span className={styles.visuallyHidden} role="status" aria-live="assertive" aria-atomic="true">
        {value > 0 ? `${label}.` : "Go."}
      </span>
    </div>
  );
}
