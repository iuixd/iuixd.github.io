import { BEST_SCORE_STORAGE_KEY, BEST_TIME_STORAGE_KEY, PROGRESSION_STORAGE_KEY } from "./constants";

const EMPTY_PROFILE = { version: 2, unlockedLevelIndex: 0, records: {} };
const MEDAL_RANK = { none: 0, bronze: 1, silver: 2, gold: 3 };

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
    // Storage is optional; the current session continues normally without persistence.
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

export function getProgression() {
  const emptyProfile = () => ({ ...EMPTY_PROFILE, records: {} });
  if (!hasLocalStorage()) return emptyProfile();
  try {
    const value = JSON.parse(window.localStorage.getItem(PROGRESSION_STORAGE_KEY) || "null");
    if (!value || value.version !== 2 || typeof value.records !== "object") return emptyProfile();
    return {
      version: 2,
      unlockedLevelIndex: Math.max(0, Number(value.unlockedLevelIndex) || 0),
      records: value.records,
    };
  } catch {
    return emptyProfile();
  }
}

export function setProgression(profile) {
  if (!hasLocalStorage()) return;
  try {
    window.localStorage.setItem(PROGRESSION_STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // Progress remains available for the current session if persistence is unavailable.
  }
}

export function recordKey(levelNumber, mode) {
  return `${levelNumber}:${mode}`;
}

export function mergeRaceRecord(previous = {}, result) {
  const medal = MEDAL_RANK[result.medal] > MEDAL_RANK[previous.medal || "none"]
    ? result.medal
    : previous.medal || result.medal;
  const bestTime = !previous.bestTime || result.time < previous.bestTime ? result.time : previous.bestTime;
  const bestScore = Math.max(previous.bestScore || 0, result.score);
  const bestLap = !previous.bestLap || result.bestLap < previous.bestLap ? result.bestLap : previous.bestLap;
  return {
    ...previous,
    bestTime,
    bestScore,
    bestLap,
    medal,
    finishes: (previous.finishes || 0) + 1,
  };
}

export function medalRank(medal) {
  return MEDAL_RANK[medal || "none"] || 0;
}
