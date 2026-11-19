"use client";

import { Flame, Users } from "lucide-react";
import { formatCheckedAt, formatPrice } from "@/lib/format";
import { useRequireSession } from "@/lib/useSession";
import { useApiGet } from "@/lib/useApiGet";
import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import StoreBadge from "@/components/StoreBadge";
import { FullPageLoading, ListLoading, LoadError } from "@/components/PageStates";
import { Card } from "@/components/ui/card";

export default function PopularPage() {
  const { session, loading } = useRequireSession();
  const { data: popular, error, slow, retry } = useApiGet("/items/popular", Boolean(session));

  if (loading || !session) return <FullPageLoading />;

  return (
    <div className="flex min-h-dvh flex-col">
      <AppHeader email={session.user.email} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
        <p className="eyebrow flex items-center gap-2 text-olive">
          <Flame className="size-3.5" aria-hidden /> Popular right now
        </p>
        <h1 className="mt-4 font-heading text-4xl leading-tight font-bold tracking-[-0.03em] sm:text-6xl">
          What everyone&apos;s watching
        </h1>
        <p className="mt-4 mb-10 max-w-xl text-lg leading-relaxed text-muted-foreground">
          The groceries most Price Watcher users keep an eye on, with today&apos;s cheapest price.
        </p>

        {error ? (
          <LoadError message={error} onRetry={retry} />
        ) : popular === null ? (
          <ListLoading slow={slow} />
        ) : popular.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border bg-card/60 px-6 py-14 text-center text-muted-foreground">
            Nothing popular yet. A grocery shows up here once at least two people watch it.
          </p>
        ) : (
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((row, i) => (
              <li key={row.search}>
                <Card className="h-full flex-row items-center gap-4 rounded-2xl p-5 ring-border">
                  <span
                    className="grid size-12 shrink-0 place-items-center rounded-2xl bg-tile font-heading text-lg font-bold text-tile-foreground"
                    aria-label={`Number ${i + 1}`}
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate font-heading text-lg leading-tight font-bold capitalize">
                      {row.search}
                    </h2>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Users className="size-3.5" aria-hidden />
                      {row.watchers} watching
                      {row.checked_at && <> · {formatCheckedAt(row.checked_at)}</>}
                    </p>
                    <p className="mt-2 font-heading text-2xl font-bold tracking-tight">
                      {row.price === null ? (
                        <span className="text-base font-normal text-muted-foreground">No price yet</span>
                      ) : (
                        formatPrice(row.price)
                      )}
                    </p>
                  </div>
                  <StoreBadge store={row.store} />
                </Card>
              </li>
            ))}
          </ol>
        )}
      </main>
      <AppFooter />
    </div>
  );
}
