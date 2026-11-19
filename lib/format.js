export function formatPrice(value) {
  const number = Number(value);
  const text = Number.isInteger(number) ? String(number) : number.toFixed(2).replace(".", ",");
  return `${text} kr`;
}

export function parsePrice(text) {
  return Number(String(text).trim().replace(",", "."));
}

export function formatToday() {
  return new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
}

export function formatCheckedAt(isoString) {
  const date = new Date(isoString);
  const time = date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const dayMs = 24 * 60 * 60 * 1000;

  if (date >= startOfToday) return `today, ${time}`;
  if (date >= startOfToday - dayMs) return `yesterday, ${time}`;
  return `${date.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}, ${time}`;
}

export function formatTimeAgo(isoString) {
  const minutes = Math.round((Date.now() - new Date(isoString)) / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.round(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

// Prices are checked every morning, so 36 hours means at least one check was missed.
export function isStale(isoString) {
  return Boolean(isoString) && Date.now() - new Date(isoString) > 36 * 60 * 60 * 1000;
}
