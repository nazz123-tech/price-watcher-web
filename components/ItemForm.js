"use client";

import { useState } from "react";
import { parsePrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Radix Select can't use "" as a value, so "no list" gets its own marker.
const NO_LIST = "none";

// Form used both for adding a new grocery and editing an existing one.
// onSubmit receives { name, search, target_price, list_id } and should throw
// an Error with a readable message if saving fails.
// lists: the user's lists for the list picker; defaultListId preselects one when adding.
export default function ItemForm({
  initial,
  lists = [],
  defaultListId = null,
  submitLabel,
  onSubmit,
  onCancel,
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [search, setSearch] = useState(initial?.search ?? "");
  const [price, setPrice] = useState(initial ? String(initial.target_price).replace(".", ",") : "");
  const [listId, setListId] = useState((initial ? initial.list_id : defaultListId) ?? NO_LIST);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const targetPrice = parsePrice(price);
    if (!Number.isFinite(targetPrice) || targetPrice <= 0) {
      setError("Target price must be a number above 0, e.g. 25 or 22,90.");
      return;
    }

    setBusy(true);
    try {
      await onSubmit({
        name: name.trim(),
        search: search.trim(),
        target_price: targetPrice,
        list_id: listId === NO_LIST ? null : listId,
      });
      if (!initial) {
        // Clear the add form after a successful add.
        setName("");
        setSearch("");
        setPrice("");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="item-name">Name</Label>
        <Input
          id="item-name"
          required
          maxLength={100}
          placeholder="Milk"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-11 bg-card text-base"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="item-search">Search words</Label>
        <Input
          id="item-search"
          required
          maxLength={100}
          placeholder="tine lettmelk 1l"
          autoCapitalize="none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-11 bg-card text-base"
          aria-describedby="item-search-help"
        />
        <p id="item-search-help" className="text-sm text-muted-foreground">
          A product matches if its name contains every word. Add brand and size (e.g. &ldquo;1l&rdquo;) to
          avoid odd matches.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="item-price">Target price (kr)</Label>
        <Input
          id="item-price"
          required
          inputMode="decimal"
          placeholder="25"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="h-11 bg-card text-base"
        />
      </div>

      {lists.length > 0 && (
        <div className="flex flex-col gap-2">
          <Label htmlFor="item-list">List</Label>
          <Select value={listId} onValueChange={setListId}>
            <SelectTrigger id="item-list" className="h-11 w-full bg-card text-base data-[size=default]:h-11">
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value={NO_LIST} className="py-2">
                No list
              </SelectItem>
              {lists.map((list) => (
                <SelectItem key={list.id} value={list.id} className="py-2">
                  {list.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {error && (
        <p role="alert" className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="h-11 px-5 text-base"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          variant="glow"
          size="lg"
          disabled={busy}
          className="h-11 px-6 text-base font-semibold"
        >
          {busy ? "Saving…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}
