// Norwegian style: 25 -> "25 kr", 22.9 -> "22,90 kr"
export function formatPrice(value) {
  const number = Number(value);
  const text = Number.isInteger(number) ? String(number) : number.toFixed(2).replace(".", ",");
  return `${text} kr`;
}

// Norwegian keyboards type "22,90": accept a comma as the decimal separator.
export function parsePrice(text) {
  return Number(String(text).trim().replace(",", "."));
}

// "Friday 26 September"
export function formatToday() {
  return new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
}

// "today, 06:12" / "yesterday, 18:30" / "24 Sep, 07:40"
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

// "12 minutes ago", "3 hours ago", "2 days ago"
export function formatTimeAgo(isoString) {
  const minutes = Math.round((Date.now() - new Date(isoString)) / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.round(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}
