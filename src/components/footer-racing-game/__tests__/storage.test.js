import { describe, it, expect, afterEach, vi } from "vitest";

// storage.js guards via `typeof window !== "undefined" && window.localStorage`, matching
// this being a purely client-side, no-SSR site — so these tests stub `window` itself
// (absent by default in Vitest's node environment), not just `localStorage`.
describe("storage", () => {
  const originalWindow = globalThis.window;

  afterEach(() => {
    if (originalWindow === undefined) {
      delete globalThis.window;
    } else {
      globalThis.window = originalWindow;
    }
    vi.resetModules();
  });

  it("reads and writes best score/time through a working localStorage", async () => {
    const store = {};
    globalThis.window = {
      localStorage: {
        getItem: (key) => (key in store ? store[key] : null),
        setItem: (key, value) => {
          store[key] = String(value);
        },
      },
    };

    const { getBestScore, setBestScore, getBestTime, setBestTime } = await import("../engine/storage.js");

    expect(getBestScore()).toBe(0);
    setBestScore(4200);
    expect(getBestScore()).toBe(4200);

    expect(getBestTime()).toBe(0);
    setBestTime(12345);
    expect(getBestTime()).toBe(12345);
  });

  it("falls back to 0 and never throws when localStorage.getItem/setItem throw (Safari private mode)", async () => {
    globalThis.window = {
      localStorage: {
        getItem: () => {
          throw new Error("blocked");
        },
        setItem: () => {
          throw new Error("blocked");
        },
      },
    };

    const { getBestScore, setBestScore, getBestTime, setBestTime } = await import("../engine/storage.js");

    expect(() => getBestScore()).not.toThrow();
    expect(getBestScore()).toBe(0);
    expect(() => setBestScore(999)).not.toThrow();
    expect(() => getBestTime()).not.toThrow();
    expect(getBestTime()).toBe(0);
    expect(() => setBestTime(999)).not.toThrow();
  });

  it("falls back to 0 and never throws when window/localStorage doesn't exist at all", async () => {
    delete globalThis.window;

    const { getBestScore, setBestScore } = await import("../engine/storage.js");

    expect(() => getBestScore()).not.toThrow();
    expect(getBestScore()).toBe(0);
    expect(() => setBestScore(500)).not.toThrow();
  });
});
