export default function CountdownOverlay({ styles, value }) {
  const label = value > 0 ? String(value) : "GO";
  return (
    <div className={styles.countdownOverlay} aria-hidden="true">
      <span className={styles.countdownValue}>{label}</span>
    </div>
  );
}
