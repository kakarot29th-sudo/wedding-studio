"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { PortfolioImage } from "@/types/database";
import { cx } from "@/lib/utils";
import Lightbox from "./Lightbox";

export default function PortfolioGrid({ images }: { images: PortfolioImage[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(images.map((i) => i.category)))],
    [images]
  );
  const [filter, setFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const items = useMemo(
    () =>
      (filter === "All" ? images : images.filter((i) => i.category === filter))
        .sort((a, b) => a.sort_order - b.sort_order),
    [images, filter]
  );

  if (images.length === 0) {
    return <div className="empty-state">No portfolio images have been added yet.</div>;
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2.5 mb-10">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={cx(
              "px-4 py-2 text-[13px] border border-line",
              filter === c ? "bg-ink text-white border-ink" : "bg-white text-muted"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="empty-state">No images in this category yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 [grid-auto-rows:10px]">
          {items.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setLightboxIndex(i)}
              className="relative overflow-hidden bg-stone group text-left"
              style={{ gridRowEnd: `span ${img.caption ? 46 : 26}` }}
            >
              <Image
                src={img.url}
                alt={img.alt_text || img.caption || "Portfolio photograph"}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {img.caption && (
                <div className="absolute inset-x-0 bottom-0 p-3.5 text-[12.5px] text-white bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  {img.caption}
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      <Lightbox
        items={items.map((i) => ({ url: i.url, caption: i.caption, alt: i.alt_text }))}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}
