"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Packshots come from each chain's image server, so they skip Next's optimizer.
export default function ProductThumb({ src, name, className }) {
  const [failedSrc, setFailedSrc] = useState(null);

  if (src && failedSrc !== src) {
    return (
      <span
        className={cn(
          "grid size-14 shrink-0 place-items-center overflow-hidden rounded-2xl bg-white p-1.5 ring-1 ring-border",
          className,
        )}
      >
        <Image
          src={src}
          alt=""
          width={56}
          height={56}
          unoptimized
          referrerPolicy="no-referrer"
          className="size-full object-contain"
          onError={() => setFailedSrc(src)}
        />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "grid size-14 shrink-0 place-items-center rounded-2xl bg-tile font-heading text-xl font-bold text-tile-foreground",
        className,
      )}
      aria-hidden
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}
