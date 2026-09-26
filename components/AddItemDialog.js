"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import ItemForm from "@/components/ItemForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Lime "Add item" button that opens the add form in a dialog.
export default function AddItemDialog({ onAdd, lists, defaultListId }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="glow" size="lg" className="h-11 gap-2 px-5 text-base font-semibold">
          <Plus className="size-5" /> Add item
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl font-bold">Watch a new grocery</DialogTitle>
          <DialogDescription>
            We check the price every morning and email you when it hits your target.
          </DialogDescription>
        </DialogHeader>
        <ItemForm
          lists={lists}
          defaultListId={defaultListId}
          submitLabel="Add to my list"
          onCancel={() => setOpen(false)}
          onSubmit={async (fields) => {
            await onAdd(fields);
            setOpen(false);
            toast.success(`${fields.name} added to your list`);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
