// 25 -> "25 kr", 22.9 -> "22.90 kr"
export function formatPrice(value) {
  const number = Number(value);
  return `${Number.isInteger(number) ? number : number.toFixed(2)} kr`;
}

// Norwegian keyboards type "22,90": accept a comma as the decimal separator.
export function parsePrice(text) {
  return Number(String(text).trim().replace(",", "."));
}
