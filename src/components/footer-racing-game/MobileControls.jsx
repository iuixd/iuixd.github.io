import { useCallback, useEffect, useRef } from "react";

/**
 * Hold-to-steer / hold-to-brake touch controls. Acceleration is automatic on mobile (per the
 * spec's preferred V1) — this component pushes `throttle: true` the moment it becomes
 * visible, not just while a button is held. Button state lives in a ref, not React state,
 * since it's read synchronously on each pointer event and never needs to trigger a render.
 */
export default function MobileControls({ styles, visible, onInputChange }) {
  const pressedRef = useRef({ left: false, right: false, brake: false });

  const sendInput = useCallback(() => {
    const { left, right, brake } = pressedRef.current;
    onInputChange({
      throttle: true,
      brake,
      steerX: (right ? 1 : 0) - (left ? 1 : 0),
    });
  }, [onInputChange]);

  useEffect(() => {
    if (visible) {
      sendInput();
      return undefined;
    }
    pressedRef.current = { left: false, right: false, brake: false };
    onInputChange({ throttle: false, brake: false, steerX: 0 });
    return undefined;
  }, [visible, sendInput, onInputChange]);

  // Release on unmount too, so leaving the page mid-hold can't leave input stuck on.
  useEffect(
    () => () => {
      onInputChange({ throttle: false, brake: false, steerX: 0 });
    },
    [onInputChange]
  );

  const press = (key) => (event) => {
    event.preventDefault();
    pressedRef.current[key] = true;
    sendInput();
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const release = (key) => (event) => {
    event.preventDefault();
    pressedRef.current[key] = false;
    sendInput();
  };

  if (!visible) return null;

  return (
    <div className={styles.mobileControls}>
      <button
        type="button"
        className={styles.touchButton}
        aria-label="Steer left"
        onPointerDown={press("left")}
        onPointerUp={release("left")}
        onPointerCancel={release("left")}
        onLostPointerCapture={release("left")}
      >
        &larr;
      </button>
      <button
        type="button"
        className={styles.touchButtonBrake}
        aria-label="Brake"
        onPointerDown={press("brake")}
        onPointerUp={release("brake")}
        onPointerCancel={release("brake")}
        onLostPointerCapture={release("brake")}
      >
        BRAKE
      </button>
      <button
        type="button"
        className={styles.touchButton}
        aria-label="Steer right"
        onPointerDown={press("right")}
        onPointerUp={release("right")}
        onPointerCancel={release("right")}
        onLostPointerCapture={release("right")}
      >
        &rarr;
      </button>
    </div>
  );
}
