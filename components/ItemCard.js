"use client";

import { useState } from "react";
import { Check, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { formatCheckedAt, formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import ItemForm from "@/components/ItemForm";
import StoreBadge from "@/components/StoreBadge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// One grocery in the list: latest price, store, and how close it is to the target.
export default function ItemCard({ item, lists, listName, onSave, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const hasPrice = item.price !== null;
  const target = Number(item.target_price);
  const price = Number(item.price);
  const difference = hasPrice ? price - target : 0; // negative = below target
  // How close the price is to the target: 100% when it's at or below.
  const progress = hasPrice ? Math.min(100, Math.round((target / price) * 100)) : 0;

  async function handleDelete() {
    setDeleting(true);
    try {
      await onDelete(item.id);
      toast.success(`Stopped watching ${item.name}`);
    } catch {
      setDeleting(false); // the page shows the error message
      setConfirmingDelete(false);
    }
  }

  return (
    <li>
      <Card className="h-full gap-0 rounded-2xl py-0 shadow-[0_1px_0_rgba(34,64,58,0.04)] ring-border">
        <div className="flex flex-1 flex-col gap-4 p-5">
          <div className="flex items-start gap-4">
            <span
              className="grid size-14 shrink-0 place-items-center rounded-2xl bg-tile font-heading text-xl font-bold text-tile-foreground"
              aria-hidden
            >
              {item.name.charAt(0).toUpperCase()}
            </span>
            <div className="min-w-0 flex-1 pt-1">
              <h3 className="truncate font-heading text-lg leading-tight font-bold">{item.name}</h3>
              <p className="truncate text-sm text-muted-foreground">
                {item.search}
                {listName && <span className="font-semibold text-olive"> · {listName}</span>}
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="-mt-1 -mr-2 grid size-10 place-items-center rounded-full text-muted-foreground hover:bg-muted">
                <MoreHorizontal className="size-5" />
                <span className="sr-only">Options for {item.name}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="py-2" onSelect={() => setEditing(true)}>
                  <Pencil /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="py-2"
                  variant="destructive"
                  onSelect={() => setConfirmingDelete(true)}
                >
                  <Trash2 /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {hasPrice ? (
            <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2 sm:pl-18">
              <div className="flex items-baseline gap-3">
                <span
                  className={cn(
                    "font-heading text-3xl font-bold tracking-tight",
                    item.is_deal ? "text-deal" : "text-foreground",
                  )}
                >
                  {formatPrice(price)}
                </span>
                <span
                  className={cn(
                    "text-sm font-semibold",
                    difference <= 0 ? "text-deal" : "text-muted-foreground",
                  )}
                >
                  {difference < 0
                    ? `−${formatPrice(-difference)}`
                    : difference > 0
                      ? `+${formatPrice(difference)}`
                      : "at target"}
                </span>
              </div>
              <StoreBadge store={item.store} />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground sm:pl-18">No price yet. We check every morning.</p>
          )}
        </div>

        <div className="border-t border-border bg-band px-5 py-4">
          <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
            <span>
              Target: <strong className="text-foreground">{formatPrice(target)}</strong>
            </span>
            {item.checked_at && <span>{formatCheckedAt(item.checked_at)}</span>}
          </div>
          {hasPrice && (
            <div className="mt-3 flex items-center gap-3">
              <Progress
                value={progress}
                aria-label={`${progress}% of the way to your target`}
                className="h-1.5 flex-1 bg-border *:data-[slot=progress-indicator]:bg-ink"
              />
              {item.is_deal ? (
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground">
                  <Check className="size-3.5" /> Now
                </span>
              ) : (
                <span className="shrink-0 text-xs font-semibold text-muted-foreground">
                  {formatPrice(difference)} to go
                </span>
              )}
            </div>
          )}
        </div>
      </Card>

      <Dialog open={editing} onOpenChange={setEditing}>
        <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl font-bold">Edit {item.name}</DialogTitle>
            <DialogDescription>Change the name, search words, target price or list.</DialogDescription>
          </DialogHeader>
          <ItemForm
            initial={item}
            lists={lists}
            submitLabel="Save changes"
            onCancel={() => setEditing(false)}
            onSubmit={async (fields) => {
              await onSave(item.id, fields);
              setEditing(false);
              toast.success("Saved");
            }}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={confirmingDelete} onOpenChange={setConfirmingDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Stop watching {item.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              It will be removed from your list and you won&apos;t get alerts for it anymore.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-11 px-5 text-base">Keep it</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              className="h-11 px-5 text-base"
              disabled={deleting}
              onClick={(event) => {
                event.preventDefault(); // keep the dialog open until the delete finishes
                handleDelete();
              }}
            >
              {deleting ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </li>
  );
}
