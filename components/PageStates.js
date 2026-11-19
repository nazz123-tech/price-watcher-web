import { CloudOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const WAKING_UP = "Waking up the server… this can take up to a minute the first time.";

export function FullPageLoading() {
  return (
    <div className="grid min-h-dvh place-items-center text-muted-foreground">
      <Loader2 className="size-6 animate-spin" aria-label="Loading" />
    </div>
  );
}

export function ListLoading({ slow, cards = 3 }) {
  return (
    <div className="flex flex-col gap-4" aria-busy="true">
      <p role="status" className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin" />
        {slow ? WAKING_UP : "Loading…"}
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: cards }, (_, i) => (
          <Skeleton key={i} className="h-52 rounded-2xl bg-muted" />
        ))}
      </div>
    </div>
  );
}

export function InlineLoading({ slow }) {
  return (
    <p role="status" className="flex items-center gap-2 text-sm text-muted-foreground">
      <Loader2 className="size-4 animate-spin" />
      {slow ? WAKING_UP : "Loading…"}
    </p>
  );
}

export function LoadError({ message, onRetry }) {
  return (
    <div role="alert" className="flex flex-col items-start gap-4 rounded-2xl bg-destructive/10 p-5 text-destructive">
      <div className="flex items-start gap-3">
        <CloudOff className="mt-0.5 size-5 shrink-0" />
        <p>{message}</p>
      </div>
      <Button variant="outline" size="lg" className="h-11 bg-card px-5 text-base" onClick={onRetry}>
        Try again
      </Button>
    </div>
  );
}
