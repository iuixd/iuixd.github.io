import { useEffect, useRef } from "react";

export default function RetireConfirmation({ styles, onCancel, onConfirm }) {
  const continueRef = useRef(null);

  useEffect(() => {
    continueRef.current?.focus();
  }, []);

  return (
    <div
      className={styles.confirmScrim}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="retire-title"
      aria-describedby="retire-description"
      onKeyDown={(event) => {
        if (event.key === "Escape") onCancel();
        event.stopPropagation();
      }}
    >
      <div className={styles.confirmPanel}>
        <p id="retire-title" className={styles.confirmTitle}>Retire from this race?</p>
        <p id="retire-description" className={styles.confirmDescription}>
          Your participation will end and your result will be recorded as DNF.
        </p>
        <div className={styles.finishActions}>
          <button ref={continueRef} type="button" className={styles.primaryButton} onClick={onCancel}>
            Continue Racing
          </button>
          <button type="button" className={styles.dangerButton} onClick={onConfirm}>
            Retire
          </button>
        </div>
      </div>
    </div>
  );
}
