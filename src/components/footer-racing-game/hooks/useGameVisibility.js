import { useEffect, useState } from "react";

/**
 * Tracks whether the game's footer section is in the viewport AND the browser tab is
 * visible. `isActive` is the combined signal the engine's pause/resume lifecycle listens to.
 */
export default function useGameVisibility(elementRef, { threshold = 0.35 } = {}) {
  const [isInViewport, setIsInViewport] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(
    typeof document === "undefined" ? true : document.visibilityState === "visible"
  );

  useEffect(() => {
    const node = elementRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setIsInViewport(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsInViewport(entry.isIntersecting),
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [elementRef, threshold]);

  useEffect(() => {
    if (typeof document === "undefined") return undefined;

    const handleVisibilityChange = () => setIsTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return { isInViewport, isTabVisible, isActive: isInViewport && isTabVisible };
}
