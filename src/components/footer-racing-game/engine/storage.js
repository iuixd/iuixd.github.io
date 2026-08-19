import { BEST_SCORE_STORAGE_KEY, BEST_TIME_STORAGE_KEY } from "./constants";

function hasLocalStorage() {
  try {
    return typeof window !== "undefined" && !!window.localStorage;
  } catch {
    return false;
  }
}

function readNumber(key) {
  if (!hasLocalStorage()) return 0;
  try {
    const raw = window.localStorage.getItem(key);
    const value = raw === null ? 0 : Number(raw);
    return Number.isFinite(value) ? value : 0;
  } catch {
    return 0;
  }
}

function writeNumber(key, value) {
  if (!hasLocalStorage()) return;
  try {
    window.localStorage.setItem(key, String(Math.round(value)));
  } catch {
    // Storage unavailable (quota exceeded, private browsing) — best score just won't persist.
  }
}

export function getBestScore() {
  return readNumber(BEST_SCORE_STORAGE_KEY);
}

export function setBestScore(score) {
  writeNumber(BEST_SCORE_STORAGE_KEY, score);
}

export function getBestTime() {
  return readNumber(BEST_TIME_STORAGE_KEY);
}

export function setBestTime(ms) {
  writeNumber(BEST_TIME_STORAGE_KEY, ms);
}
