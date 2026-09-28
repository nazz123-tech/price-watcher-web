import Image from "next/image";
import { cn } from "@/lib/utils";

// Store logos in public/icons/stores, keyed by the store name Kassalapp sends
// (lowercased, extra spaces removed). Add a line here when you add a logo file.
const STORE_LOGOS = {
  "rema 1000": "rema-1000.svg",
  rema: "rema-1000.svg",
  kiwi: "kiwi.svg",
  meny: "meny.svg",
  spar: "spar.svg",
  eurospar: "spar.svg",
  joker: "joker.svg",
  bunnpris: "bunnpris.svg",
  oda: "oda.svg",
  coop: "coop.svg",
  "coop extra": "coop-extra.svg",
  extra: "coop-extra.svg",
  "coop mega": "coop-mega.svg",
  mega: "coop-mega.svg",
  "coop prix": "coop-prix.svg",
  prix: "coop-prix.svg",
  "coop marked": "coop-marked.svg",
  "coop obs": "obs.svg",
  obs: "obs.svg",
};

// "Coop  Extra" -> "coop extra"
function logoFor(store) {
  return STORE_LOGOS[store.toLowerCase().replace(/\s+/g, " ").trim()] ?? null;
}

// Store name with its logo, like "[logo] REMA 1000".
// Stores without a logo file get a neutral tile with their first letter.
export default function StoreBadge({ store, className }) {
  if (!store) return null;
  const logo = logoFor(store);

  return (
    <span className={cn("inline-flex min-w-0 items-center gap-2 text-sm font-semibold", className)}>
      {logo ? (
        <Image
          src={`/icons/stores/${logo}`}
          alt="" // the store name is written right next to it
          width={32}
          height={32}
          unoptimized // SVGs are already small and sharp at any size
          className="size-8 shrink-0 rounded-lg bg-white object-contain ring-1 ring-border"
        />
      ) : (
        <span
          className="grid size-8 shrink-0 place-items-center rounded-lg bg-tile text-xs font-bold text-tile-foreground"
          aria-hidden
        >
          {store.charAt(0).toUpperCase()}
        </span>
      )}
      <span className="truncate">{store}</span>
    </span>
  );
}
