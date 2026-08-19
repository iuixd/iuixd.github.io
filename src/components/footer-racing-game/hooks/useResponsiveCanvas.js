import { useEffect, useRef, useState } from "react";
import { INTERNAL_WIDTH, INTERNAL_HEIGHT } from "../engine/constants";

/**
 * Measures the wrapper element's displayed CSS size via ResizeObserver. The engine owns
 * turning this into an actual canvas backing-store resolution (DPR capping included), so
 * this hook only ever reports logical CSS pixels.
 */
export default function useResponsiveCanvas(wrapperRef) {
  const [size, setSize] = useState({ cssWidth: INTERNAL_WIDTH, cssHeight: INTERNAL_HEIGHT });
  const frameRef = useRef(null);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return undefined;

    const rect = node.getBoundingClientRect();
    if (rect.width && rect.height) {
      setSize({ cssWidth: rect.width, cssHeight: rect.height });
    }

    if (typeof ResizeObserver === "undefined") return undefined;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;

      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        setSize({ cssWidth: width, cssHeight: height });
      });
    });

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [wrapperRef]);

  return size;
}
