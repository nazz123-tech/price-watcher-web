"use client";

import { useState } from "react";
import ItemForm from "./ItemForm";
import { formatPrice } from "@/lib/format";

// One grocery in the list. Shows the latest price, or an edit form.
export default function ItemCard({ item, onSave, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  if (editing) {
    return (
      <li>
        <ItemForm
          initial={item}
          submitLabel="Save"
          onCancel={() => setEditing(false)}
          onSubmit={async (fields) => {
            await onSave(item.id, fields);
            setEditing(false);
          }}
        />
      </li>
    );
  }

  async function handleDelete() {
    if (!window.confirm(`Stop watching "${item.name}"?`)) return;
    setDeleting(true);
    try {
      await onDelete(item.id);
    } catch {
      setDeleting(false); // the page shows the error message
    }
  }

  return (
    <li>
      <div>
        <div>
          <h2>{item.name}</h2>
          <p>&ldquo;{item.search}&rdquo;</p>
        </div>
        {item.is_deal && <span>Deal!</span>}
      </div>

      <dl>
        <div>
          <dt>Your target</dt>
          <dd>{formatPrice(item.target_price)}</dd>
        </div>
        <div>
          <dt>Best price</dt>
          <dd>
            {item.price === null ? (
              <span>Checked every morning</span>
            ) : (
              <>
                {formatPrice(item.price)}
                {item.store && <span> at {item.store}</span>}
              </>
            )}
          </dd>
        </div>
      </dl>
      {item.product_name && <p>{item.product_name}</p>}

      <div>
        <button onClick={() => setEditing(true)}>Edit</button>
        <button onClick={handleDelete} disabled={deleting}>
          {deleting ? "Deleting…" : "Delete"}
        </button>
      </div>
    </li>
  );
}
