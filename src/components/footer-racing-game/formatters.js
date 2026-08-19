export function formatTime(ms) {
  const totalTenths = Math.floor(Math.max(0, ms) / 100);
  const minutes = Math.floor(totalTenths / 600);
  const seconds = Math.floor((totalTenths % 600) / 10);
  const tenths = totalTenths % 10;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${tenths}`;
}

export function formatScore(score) {
  return Math.round(score).toLocaleString("en-US");
}

export function ordinal(n) {
  const suffixes = ["th", "st", "nd", "rd"];
  const remainder = n % 100;
  return `${n}${suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0]}`;
}
