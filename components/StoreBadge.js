// Store name with a small coloured letter tile, like "[R] REMA 1000".
// Colours roughly follow each chain's brand; unknown stores get a neutral tile.
const STORE_COLORS = {
  "rema 1000": "bg-[#e4322b] text-white",
  kiwi: "bg-[#b9d53a] text-ink",
  meny: "bg-[#f6cd4c] text-ink",
  coop: "bg-[#1d5fa8] text-white",
  "coop extra": "bg-[#1d5fa8] text-white",
  "coop prix": "bg-[#1d5fa8] text-white",
  "coop mega": "bg-[#1d5fa8] text-white",
  "coop obs": "bg-[#1d5fa8] text-white",
  extra: "bg-[#1d5fa8] text-white",
  obs: "bg-[#1d5fa8] text-white",
  joker: "bg-[#ffd21f] text-ink",
  spar: "bg-[#0a8a4a] text-white",
  bunnpris: "bg-[#f28c1c] text-white",
};

export default function StoreBadge({ store }) {
  if (!store) return null;
  const colors = STORE_COLORS[store.toLowerCase()] ?? "bg-tile text-tile-foreground";

  return (
    <span className="inline-flex min-w-0 items-center gap-2 text-sm font-semibold">
      <span className={`grid size-7 shrink-0 place-items-center rounded-lg text-xs font-bold ${colors}`} aria-hidden>
        {store.charAt(0).toUpperCase()}
      </span>
      <span className="truncate">{store}</span>
    </span>
  );
}
