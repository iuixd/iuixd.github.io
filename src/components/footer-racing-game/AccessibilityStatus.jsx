export default function AccessibilityStatus({ styles, message }) {
  return (
    <div className={styles.visuallyHidden} aria-live="polite">
      {message}
    </div>
  );
}
