"use client";

import { useState } from "react";
import { Check, ListPlus, Pencil, Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

// Quick picks shown until the user has a list with that name.
const SUGGESTIONS = ["Breakfast", "Lunch", "Dinner", "Snacks", "Supper"];

// Dialog to create, rename and delete lists.
// onCreate / onRename / onDelete should throw an Error with a readable message on failure.
export default function ManageListsDialog({ lists, itemCounts, onCreate, onRename, onDelete, trigger }) {
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [deletingId, setDeletingId] = useState(null); // asking "are you sure?"
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // Runs an action, showing "busy" and any error message.
  async function run(action) {
    setError("");
    setBusy(true);
    try {
      await action();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setBusy(false);
    }
  }

  async function create(name) {
    if (!name.trim()) return;
    if (await run(() => onCreate(name.trim()))) setNewName("");
  }

  async function saveRename(id) {
    if (await run(() => onRename(id, editName.trim()))) setEditingId(null);
  }

  async function confirmDelete(id) {
    if (await run(() => onDelete(id))) setDeletingId(null);
  }

  const existing = new Set(lists.map((list) => list.name.toLowerCase()));
  const suggestions = SUGGESTIONS.filter((name) => !existing.has(name.toLowerCase()));

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) {
          setError("");
          setEditingId(null);
          setDeletingId(null);
        }
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl font-bold">Your lists</DialogTitle>
          <DialogDescription>
            Group groceries by meal, like Breakfast or Dinner. Each grocery can be in one list.
          </DialogDescription>
        </DialogHeader>

        {/* New list */}
        <form
          className="flex gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            create(newName);
          }}
        >
          <Input
            placeholder="New list, e.g. Breakfast"
            aria-label="New list name"
            maxLength={100}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="h-11 bg-card text-base"
          />
          <Button
            type="submit"
            variant="glow"
            size="lg"
            disabled={busy || !newName.trim()}
            className="h-11 px-4"
          >
            <Plus className="size-5" />
            <span className="sr-only sm:not-sr-only">Add</span>
          </Button>
        </form>

        {suggestions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {suggestions.map((name) => (
              <button
                key={name}
                type="button"
                disabled={busy}
                onClick={() => create(name)}
                className="inline-flex h-9 items-center gap-1 rounded-full border border-dashed border-olive/50 px-3 text-sm font-medium text-olive transition hover:bg-[#eef4e0] disabled:opacity-50"
              >
                <Plus className="size-3.5" /> {name}
              </button>
            ))}
          </div>
        )}

        {error && (
          <p role="alert" className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        )}

        {/* Existing lists */}
        {lists.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border px-4 py-8 text-center text-muted-foreground">
            <ListPlus className="size-5" aria-hidden />
            <p className="text-sm">No lists yet. Add one above or tap a suggestion.</p>
          </div>
        ) : (
          <ul className="flex flex-col divide-y divide-border rounded-xl border border-border bg-card">
            {lists.map((list) => (
              <li key={list.id} className="flex min-h-14 items-center gap-2 px-3 py-2">
                {editingId === list.id ? (
                  <form
                    className="flex flex-1 items-center gap-2"
                    onSubmit={(event) => {
                      event.preventDefault();
                      saveRename(list.id);
                    }}
                  >
                    <Input
                      autoFocus
                      aria-label={`New name for ${list.name}`}
                      maxLength={100}
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="h-10 text-base"
                    />
                    <Button
                      type="submit"
                      size="icon-lg"
                      disabled={busy || !editName.trim()}
                      aria-label="Save name"
                    >
                      <Check />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-lg"
                      onClick={() => setEditingId(null)}
                      aria-label="Cancel renaming"
                    >
                      <X />
                    </Button>
                  </form>
                ) : deletingId === list.id ? (
                  <div className="flex flex-1 flex-wrap items-center justify-between gap-2">
                    <p className="text-sm">
                      Delete <strong>{list.name}</strong>? Its groceries stay, without a list.
                    </p>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="lg" className="h-10" onClick={() => setDeletingId(null)}>
                        Keep
                      </Button>
                      <Button
                        variant="destructive"
                        size="lg"
                        className="h-10"
                        disabled={busy}
                        onClick={() => confirmDelete(list.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold">{list.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {itemCounts[list.id] ?? 0} {itemCounts[list.id] === 1 ? "grocery" : "groceries"}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon-lg"
                      className="text-muted-foreground"
                      onClick={() => {
                        setEditingId(list.id);
                        setEditName(list.name);
                        setDeletingId(null);
                      }}
                      aria-label={`Rename ${list.name}`}
                    >
                      <Pencil />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-lg"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => {
                        setDeletingId(list.id);
                        setEditingId(null);
                      }}
                      aria-label={`Delete ${list.name}`}
                    >
                      <Trash2 />
                    </Button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  );
}
