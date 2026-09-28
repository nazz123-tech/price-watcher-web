"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ListPlus,
  Mail,
  Plus,
  Search,
  ShoppingBasket,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";
import StoreBadge from "@/components/StoreBadge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

// The steps of the guide. "example" is a small picture of the real UI.
const STEPS = [
  {
    icon: ShoppingBasket,
    eyebrow: "Welcome",
    title: "Groceries at your price",
    text: "Tell us what you buy and what you'd like to pay. Every morning we check prices at Norwegian stores and email you when something hits your target.",
    example: "welcome",
  },
  {
    icon: Search,
    eyebrow: "Step 1",
    title: "Add a grocery",
    text: "Give it a name and some search words. A product matches only if its name contains every word, so add the brand and size.",
    example: "search",
  },
  {
    icon: Target,
    eyebrow: "Step 2",
    title: "Set your target price",
    text: "The price you'd happily pay. When today's cheapest price is at or below it, the card turns green and says Now.",
    example: "target",
  },
  {
    icon: ListPlus,
    eyebrow: "Step 3",
    title: "Group them in lists",
    text: "Make lists like Breakfast, Dinner or Snacks with the Lists button, and switch between them with the tabs.",
    example: "lists",
  },
  {
    icon: Mail,
    eyebrow: "Step 4",
    title: "Get one email per morning",
    text: "Only on days with a deal, never more than one. Turn it off any time in Settings. Tip: add our address to your contacts so it doesn't land in spam.",
    example: "email",
  },
];

// Step-by-step intro for new users.
// onFinish(addFirst) is called when the guide closes; addFirst = true means
// "open the Add item dialog now".
export default function OnboardingGuide({ open, onFinish }) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back (for the slide)
  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;
  const Icon = current.icon;

  function go(to) {
    setDirection(to > step ? 1 : -1);
    setStep(to);
  }

  function finish(addFirst) {
    onFinish(addFirst);
    setStep(0); // start from the beginning next time it's opened
  }

  return (
    <Dialog open={open} onOpenChange={(next) => !next && finish(false)}>
      <DialogContent className="max-h-[92dvh] gap-0 overflow-y-auto p-0 sm:max-w-md" showCloseButton={false}>
        {/* Top: coloured band with the step's icon */}
        <div className="relative overflow-hidden bg-[#eaf2d8] px-6 pt-6 pb-5">
          <span
            className="pointer-events-none absolute -top-12 -right-12 size-40 rounded-full border-[16px] border-primary/60"
            aria-hidden
          />
          <div className="relative flex items-center justify-between">
            <span className="grid size-12 place-items-center rounded-xl bg-ink text-primary ring-4 ring-primary/70">
              <Icon className="size-5" aria-hidden />
            </span>
            {!isLast && (
              <button
                type="button"
                onClick={() => finish(false)}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-foreground/70 hover:bg-card/60 hover:text-foreground"
              >
                Skip
              </button>
            )}
          </div>
        </div>

        {/* Step content slides in from the side we're moving towards. */}
        <div
          key={step}
          className={cn(
            "flex flex-col gap-4 px-6 pt-5 animate-in fade-in duration-300 ease-out motion-reduce:animate-none",
            direction > 0 ? "slide-in-from-right-6" : "slide-in-from-left-6",
          )}
        >
          <div>
            <p className="eyebrow text-olive">{current.eyebrow}</p>
            <DialogTitle className="mt-2 font-heading text-2xl leading-tight font-bold tracking-tight">
              {current.title}
            </DialogTitle>
            <DialogDescription className="mt-2 text-base leading-relaxed text-muted-foreground">
              {current.text}
            </DialogDescription>
          </div>
          <Example kind={current.example} />
        </div>

        {/* Bottom: progress dots and buttons */}
        <div className="flex flex-col gap-4 px-6 pt-6 pb-6">
          <div className="flex justify-center gap-2" aria-label={`Step ${step + 1} of ${STEPS.length}`}>
            {STEPS.map((s, i) => (
              <button
                key={s.title}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to step ${i + 1}: ${s.title}`}
                aria-current={i === step ? "step" : undefined}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === step ? "w-6 bg-ink" : "w-2 bg-border hover:bg-muted-foreground/40",
                )}
              />
            ))}
          </div>

          {isLast ? (
            <div className="flex flex-col gap-2">
              <Button
                variant="glow"
                size="lg"
                className="h-12 gap-2 text-base font-semibold"
                onClick={() => finish(true)}
              >
                <Plus className="size-5" /> Add my first grocery
              </Button>
              <Button variant="ghost" size="lg" className="h-11 text-base" onClick={() => finish(false)}>
                I&apos;ll look around first
              </Button>
            </div>
          ) : (
            <div className="flex gap-3">
              {step > 0 && (
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 gap-2 bg-card px-4 text-base"
                  onClick={() => go(step - 1)}
                >
                  <ArrowLeft className="size-4" /> Back
                </Button>
              )}
              <Button
                size="lg"
                className="h-12 flex-1 gap-2 bg-ink text-base font-semibold text-card hover:bg-ink/90"
                onClick={() => go(step + 1)}
              >
                {step === 0 ? "Show me how" : "Next"} <ArrowRight className="size-4" />
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Small, non-interactive pictures of the real UI for each step.
function Example({ kind }) {
  const frame = "rounded-2xl border border-border bg-card p-4";

  if (kind === "welcome") {
    return (
      <div className={cn(frame, "grid grid-cols-3 gap-2 text-center")} aria-hidden>
        {[
          ["1", "Add groceries"],
          ["2", "Set a price"],
          ["3", "Get an email"],
        ].map(([n, label]) => (
          <div key={n} className="flex flex-col items-center gap-2">
            <span className="grid size-9 place-items-center rounded-full bg-primary font-heading font-bold text-ink">
              {n}
            </span>
            <span className="text-xs leading-tight font-semibold">{label}</span>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "search") {
    return (
      <div className={cn(frame, "flex flex-col gap-2")} aria-hidden>
        <p className="text-xs font-semibold text-muted-foreground">Search words</p>
        <div className="flex items-center gap-2 rounded-lg border border-input bg-background px-3 py-2">
          <Search className="size-4 text-muted-foreground" />
          <span className="font-medium">tine lettmelk 1l</span>
        </div>
        <p className="flex items-center gap-1.5 text-xs text-deal">
          <Check className="size-3.5" /> Matches &ldquo;Lettmelk 0,5% 1l Tine&rdquo;
        </p>
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="grid size-3.5 place-items-center">✕</span> Skips &ldquo;Tine Lettmelk 1/4l&rdquo;
        </p>
      </div>
    );
  }

  if (kind === "target") {
    return (
      <div className={cn(frame, "flex flex-col gap-3")} aria-hidden>
        <div className="flex items-end justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-2xl font-bold tracking-tight text-deal">16,40 kr</span>
            <span className="text-xs font-semibold text-deal">−2,60 kr</span>
          </div>
          <StoreBadge store="REMA 1000" />
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Target: <strong className="text-foreground">19 kr</strong>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="h-1.5 flex-1 rounded-full bg-ink" />
          <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground">
            <Check className="size-3.5" /> Now
          </span>
        </div>
      </div>
    );
  }

  if (kind === "lists") {
    return (
      <div className={cn(frame, "flex flex-col gap-3")} aria-hidden>
        <div className="flex w-max gap-1 rounded-lg bg-secondary p-1 text-sm font-semibold">
          <span className="rounded-md px-3 py-1 text-muted-foreground">All</span>
          <span className="rounded-md bg-card px-3 py-1 shadow-sm">Breakfast</span>
          <span className="rounded-md px-3 py-1 text-muted-foreground">Dinner</span>
          <span className="rounded-md px-3 py-1 text-muted-foreground">Snacks</span>
        </div>
        <p className="text-sm">
          <span className="font-semibold">Lettmelk</span>{" "}
          <span className="text-muted-foreground">tine lettmelk 1l</span>{" "}
          <span className="font-semibold text-olive">· Breakfast</span>
        </p>
      </div>
    );
  }

  // email
  return (
    <div className={cn(frame, "flex flex-col gap-1")} aria-hidden>
      <p className="text-xs text-muted-foreground">From: Price Watcher · 08:00</p>
      <p className="font-semibold">Price alert: Lettmelk is 16.40 kr at REMA 1000</p>
      <p className="text-sm text-muted-foreground">1 grocery hit your target price today…</p>
    </div>
  );
}
