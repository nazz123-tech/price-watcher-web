"use client";

import { useEffect, useRef, useState } from "react";
import { Lightbulb, RefreshCw } from "lucide-react";
import { TIPS } from "@/lib/tips";
import { cn } from "@/lib/utils";

// How long the old tip takes to fade out before the new one fades in (ms).
const FADE_MS = 220;

// A random grocery tip for Norway, with a button for the next one.
export default function TinyTips({ className }) {
  // Start on a random tip; "Next tip" walks through the rest in order.
  const [index, setIndex] = useState(() => Math.floor(Math.random() * TIPS.length));
  const [leaving, setLeaving] = useState(false); // true while the old tip fades out
  const [spins, setSpins] = useState(0); // turns the ↻ icon a full circle per click
  const timer = useRef(null);
  const tip = TIPS[index];

  // Don't change state after the card is gone.
  useEffect(() => () => clearTimeout(timer.current), []);

  function nextTip() {
    if (leaving) return; // ignore double taps mid-animation
    setSpins((n) => n + 1);
    setLeaving(true);
    // 1) fade the old tip out, 2) swap the text, 3) fade the new one in.
    timer.current = setTimeout(() => {
      setIndex((i) => (i + 1) % TIPS.length);
      setLeaving(false);
    }, FADE_MS);
  }

  return (
    <section
      aria-label="Tiny tip"
      className={cn(
        "relative overflow-hidden rounded-2xl border border-[#d9e6bd] bg-[#eaf2d8] p-5",
        className,
      )}
    >
      {/* Decorative lime circle, like the "weekly finds" card in the design */}
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
          onClick={nextTip}
          className="grid size-10 shrink-0 place-items-center rounded-xl bg-card/80 text-foreground shadow-sm transition hover:bg-card active:scale-95"
          aria-label="Next tip"
        >
          <RefreshCw
            className="size-4 transition-transform duration-500 ease-out motion-reduce:transition-none"
            style={{ transform: `rotate(${spins * 360}deg)` }}
          />
        </button>
      </div>

      {/* min-h keeps the card from jumping when tips have different lengths.
          aria-live so screen readers read the new tip after "Next tip". */}
      <div className="relative mt-2 min-h-[7.5rem]" aria-live="polite">
        <div
          key={index}
          className={cn(
            // New tip: fade in and rise a little (tw-animate-css).
            "animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out",
            // Old tip: fade out and drift up before it's swapped.
            "transition-[opacity,transform] ease-in",
            leaving && "-translate-y-1.5 opacity-0",
            "motion-reduce:animate-none motion-reduce:transition-none motion-reduce:transform-none",
          )}
          style={{ transitionDuration: `${FADE_MS}ms` }}
        >
          <h2 className="font-heading text-lg leading-snug font-bold">{tip.title}</h2>
          <p className="mt-1 text-sm leading-relaxed text-foreground/75">{tip.text}</p>
        </div>
      </div>
    </section>
  );
}
