import Image from "next/image";
import { cn } from "@/lib/utils";

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

function logoFor(store) {
  return STORE_LOGOS[store.toLowerCase().replace(/\s+/g, " ").trim()] ?? null;
}

export default function StoreBadge({ store, className }) {
  if (!store) return null;
  const logo = logoFor(store);

  if (logo) {
    return (
      <Image
        src={`/icons/stores/${logo}`}
        alt={store}
        title={store}
        width={40}
        height={40}
        unoptimized
        className={cn("size-10 shrink-0 rounded-xl bg-white object-contain ring-1 ring-border", className)}
      />
    );
  }

  // Same 40px tile as the logos so every card lines up; the name shows on hover.
  return (
    <span
      title={store}
      className={cn(
        "grid size-10 shrink-0 place-items-center rounded-xl bg-white font-heading text-sm font-bold text-ink ring-1 ring-border",
        className,
      )}
    >
      <span aria-hidden>{store.slice(0, 2).toUpperCase()}</span>
      <span className="sr-only">{store}</span>
    </span>
  );
}
