"use client";

import { useState } from "react";
import { ArrowDownRight, Bookmark, Search, ShoppingBasket, Target } from "lucide-react";
import { toast } from "sonner";
import { api, getErrorMessage } from "@/lib/api";
import { formatPrice, formatTimeAgo, formatToday } from "@/lib/format";
import { useRequireSession } from "@/lib/useSession";
import { useApiGet } from "@/lib/useApiGet";
import AddItemDialog from "@/components/AddItemDialog";
import AppHeader from "@/components/AppHeader";
import ItemCard from "@/components/ItemCard";
import { FullPageLoading, ListLoading, LoadError } from "@/components/PageStates";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function GroceriesPage() {
  const { session, loading: sessionLoading } = useRequireSession();

  // Load the list once we know who is logged in.
  const {
    data: items, // null = not loaded yet
    setData: setItems,
    error: loadError,
    slow,
    retry,
  } = useApiGet("/items", Boolean(session));

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all"); // "all" | "deals"

  // The form shows its own error, so turn axios errors into readable Errors.
  async function addItem(fields) {
    try {
      const { data } = await api.post("/items", fields);
      // A new item has no cached price yet.
      setItems((list) => [...list, { ...data, price: null, is_deal: false }]);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  }

  async function saveItem(id, fields) {
    try {
      await api.patch(`/items/${id}`, fields);
      // Reload so the price info matches the (maybe new) search words.
      const { data } = await api.get("/items");
      setItems(data);
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  }

  async function deleteItem(id) {
    try {
      await api.delete(`/items/${id}`);
      setItems((list) => list.filter((item) => item.id !== id));
    } catch (err) {
      toast.error(getErrorMessage(err));
      throw err;
    }
  }

  if (sessionLoading || !session) {
    return <FullPageLoading />;
  }

  // Numbers for the stat cards.
  const deals = items?.filter((item) => item.is_deal) ?? [];
  const belowTarget = deals.reduce((sum, item) => sum + (Number(item.target_price) - Number(item.price)), 0);
  const lastChecked = items
    ?.map((item) => item.checked_at)
    .filter(Boolean)
    .sort()
    .at(-1);

  // Search box + "All / At target" tabs.
  const words = query.trim().toLowerCase();
  const visibleItems = (items ?? []).filter(
    (item) =>
      (filter === "all" || item.is_deal) &&
      (!words || `${item.name} ${item.search}`.toLowerCase().includes(words))
  );

  const firstName = session.user.user_metadata?.first_name;

  return (
    <div className="flex min-h-dvh flex-col">
      <AppHeader email={session.user.email} />

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-10 pb-8 sm:px-6 sm:pt-14">
          <p className="eyebrow flex items-center gap-2 text-olive">
            <span className="size-1.5 rounded-full bg-olive" aria-hidden />
            {formatToday()}
          </p>
          <h1 className="mt-4 font-heading text-5xl leading-[0.95] font-bold tracking-[-0.04em] sm:text-7xl">
            Good to see you,
            <br />
            <span className="text-olive">{firstName ? `${firstName}.` : "welcome back."}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Your list does the work. We check Norwegian grocery prices every morning and tell you what&apos;s
            worth picking up, without checking five apps.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-2 sm:max-w-3xl sm:gap-3">
            <StatCard
              icon={Bookmark}
              tone="bg-[#e3efcf] text-deal"
              value={items ? items.length : "–"}
              label="on your watch list"
            />
            <StatCard
              icon={Target}
              tone="bg-[#fdefc8] text-[#b58a45]"
              value={items ? deals.length : "–"}
              label="at target now"
            />
            <StatCard
              icon={ArrowDownRight}
              tone="bg-[#f6ddd6] text-destructive"
              value={items ? formatPrice(Math.round(belowTarget * 100) / 100) : "–"}
              label="below your targets"
            />
          </div>
        </section>

        {/* Toolbar */}
        <section className="border-y border-border bg-band">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="relative sm:w-80">
              <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search your list…"
                aria-label="Search your list"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-11 bg-card pl-10 text-base shadow-sm"
              />
            </div>
            <Tabs value={filter} onValueChange={setFilter}>
              <TabsList className="h-11 w-full bg-secondary p-1 sm:w-auto">
                <TabsTrigger value="all" className="px-4 text-sm font-semibold data-active:bg-card">
                  All
                </TabsTrigger>
                <TabsTrigger value="deals" className="px-4 text-sm font-semibold data-active:bg-card">
                  At target
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </section>

        {/* List */}
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="flex items-center gap-3 font-heading text-3xl font-bold tracking-tight">
                Your list
                {items && (
                  <Badge variant="outline" className="border-olive/40 bg-[#eef4e0] text-xs text-deal">
                    {items.length}
                  </Badge>
                )}
              </h2>
              <p className="mt-1 text-muted-foreground">
                {lastChecked ? `Last checked ${formatTimeAgo(lastChecked)}` : "Prices are checked every morning"}
              </p>
            </div>
            <AddItemDialog onAdd={addItem} />
          </div>

          {loadError ? (
            <LoadError message={loadError} onRetry={retry} />
          ) : items === null ? (
            <ListLoading slow={slow} />
          ) : items.length === 0 ? (
            <EmptyState
              title="Nothing here yet"
              text="Add a grocery and we'll email you when it's at or below your target price."
            />
          ) : visibleItems.length === 0 ? (
            <EmptyState
              title="No matches"
              text={filter === "deals" ? "Nothing is at your target price right now." : "Try other words."}
            />
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visibleItems.map((item) => (
                <ItemCard key={item.id} item={item} onSave={saveItem} onDelete={deleteItem} />
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}

function StatCard({ icon: Icon, tone, value, label }) {
  // Compact and stacked on phones, icon beside the number on wider screens.
  return (
    <div className="flex flex-col items-start gap-3 rounded-2xl border border-border bg-card p-3 sm:flex-row sm:items-center sm:gap-4 sm:px-5 sm:py-4">
      <span className={`grid size-9 shrink-0 place-items-center rounded-lg sm:size-10 ${tone}`}>
        <Icon className="size-4" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="font-heading text-xl leading-tight font-bold tracking-tight sm:text-2xl">{value}</p>
        <p className="text-xs leading-snug text-muted-foreground sm:text-sm">{label}</p>
      </div>
    </div>
  );
}

function EmptyState({ title, text }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-card/60 px-6 py-14 text-center">
      <span className="grid size-12 place-items-center rounded-2xl bg-tile text-tile-foreground">
        <ShoppingBasket className="size-5" aria-hidden />
      </span>
      <h3 className="font-heading text-xl font-bold">{title}</h3>
      <p className="max-w-sm text-muted-foreground">{text}</p>
    </div>
  );
}
