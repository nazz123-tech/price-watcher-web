import { ListPlus } from "lucide-react";
import { APP_NAME, APP_TAGLINE } from "@/lib/appInfo";
import { cn } from "@/lib/utils";

// Dark tile with a lime ring, plus the app name (and tagline on wider screens).
export default function Logo({ showTagline = true, className }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-ink text-primary ring-4 ring-primary/70">
        <ListPlus className="size-5" aria-hidden />
      </span>
      <span className="flex flex-col">
        <span className="font-heading text-lg leading-tight font-bold">{APP_NAME}</span>
        {showTagline && (
          <span className="eyebrow hidden text-[0.65rem] text-muted-foreground sm:block">{APP_TAGLINE}</span>
        )}
      </span>
    </div>
  );
}
