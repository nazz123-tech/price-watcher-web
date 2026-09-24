"use client";

import { useState } from "react";
import { parsePrice } from "@/lib/format";

// Form used both for adding a new grocery and editing an existing one.
// onSubmit receives { name, search, target_price } and should throw
// an Error with a readable message if saving fails.
export default function ItemForm({ initial, submitLabel, onSubmit, onCancel }) {
  const [name, setName] = useState(initial?.name ?? "");
  const [search, setSearch] = useState(initial?.search ?? "");
  const [price, setPrice] = useState(initial ? String(initial.target_price) : "");
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
      await onSubmit({ name: name.trim(), search: search.trim(), target_price: targetPrice });
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
    <form onSubmit={handleSubmit}>
      <label>
        <span>Name</span>
        <input
          required
          maxLength={100}
          placeholder="Milk"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        <span>Search words</span>
        <input
          required
          maxLength={100}
          placeholder="tine lettmelk"
          autoCapitalize="none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span>A product matches if its name contains every word.</span>
      </label>

      <label>
        <span>Target price (kr)</span>
        <input
          required
          inputMode="decimal"
          placeholder="25"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>

      {error && <p role="alert">{error}</p>}

      <div>
        {onCancel && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button type="submit" disabled={busy}>
          {busy ? "Saving…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
