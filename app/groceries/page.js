"use client";

import { useState } from "react";
import Link from "next/link";
import { api, getErrorMessage } from "@/lib/api";
import { supabase } from "@/lib/supabase";
import { useRequireSession } from "@/lib/useSession";
import { useApiGet } from "@/lib/useApiGet";
import ItemCard from "@/components/ItemCard";
import ItemForm from "@/components/ItemForm";

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
  const [actionError, setActionError] = useState("");

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
    setActionError("");
    try {
      await api.delete(`/items/${id}`);
      setItems((list) => list.filter((item) => item.id !== id));
    } catch (err) {
      setActionError(getErrorMessage(err));
      throw err;
    }
  }

  if (sessionLoading || !session) {
    return <p>Loading…</p>;
  }

  return (
    <main>
      <header>
        <h1>My groceries</h1>
        <Link href="/settings">Settings</Link>
        <button onClick={() => supabase.auth.signOut()}>Log out</button>
      </header>

      <section>
        <h2>Watch a new grocery</h2>
        <ItemForm submitLabel="Add" onSubmit={addItem} />
      </section>

      {actionError && <p role="alert">{actionError}</p>}

      <section>
        {loadError ? (
          <div>
            <p>{loadError}</p>
            <button onClick={retry}>Try again</button>
          </div>
        ) : items === null ? (
          <p>
            {slow
              ? "Waking up the server… this can take up to a minute the first time."
              : "Loading your groceries…"}
          </p>
        ) : items.length === 0 ? (
          <p>Nothing here yet. Add a grocery above and we&apos;ll email you when it&apos;s cheap.</p>
        ) : (
          <ul>
            {items.map((item) => (
              <ItemCard key={item.id} item={item} onSave={saveItem} onDelete={deleteItem} />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
