"use client";

import { useState } from "react";
import { Lightbulb, RefreshCw } from "lucide-react";
import { TIPS } from "@/lib/tips";
import { cn } from "@/lib/utils";

// A random grocery tip for Norway, with a button for the next one.
export default function TinyTips({ className }) {
  // Start on a random tip; "Next tip" walks through the rest in order.
  const [index, setIndex] = useState(() => Math.floor(Math.random() * TIPS.length));
  const tip = TIPS[index];

  return (
    <section
      aria-label="Tiny tip"
      className={cn(
        "relative overflow-hidden rounded-2xl border border-[#d9e6bd] bg-[#eaf2d8] p-5",
        className,
      )}
    >
      {/* Decorative lime circles, like the "weekly finds" card in the design */}
      <span
        className="pointer-events-none absolute -top-10 -right-10 size-36 rounded-full border-[14px] border-primary/60"
        aria-hidden
      />

      <div className="relative flex items-center justify-between gap-3">
        <p className="eyebrow flex items-center gap-2 text-olive">
          <Lightbulb className="size-3.5" aria-hidden /> Tiny tip · {index + 1}/{TIPS.length}
        </p>
        <button
          type="button"
          onClick={() => setIndex((i) => (i + 1) % TIPS.length)}
          className="grid size-10 shrink-0 place-items-center rounded-xl bg-card/80 text-foreground shadow-sm transition hover:bg-card"
          aria-label="Next tip"
        >
          <RefreshCw className="size-4" />
        </button>
      </div>

      {/* aria-live so screen readers read the new tip after "Next tip" */}
      <div className="relative mt-2" aria-live="polite">
        <h2 className="font-heading text-lg leading-snug font-bold">{tip.title}</h2>
        <p className="mt-1 text-sm leading-relaxed text-foreground/75">{tip.text}</p>
      </div>
    </section>
  );
}
