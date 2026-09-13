"use client";

import { useEffect, useCallback } from "react";

export interface LightboxItem { url: string; caption?: string; alt?: string; }

export default function Lightbox({
  items, index, onClose, onNavigate,
}: {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onNavigate: (i: number) => void;
}) {
  const isOpen = index !== null;

  const shift = useCallback(
    (dir: number) => {
      if (index === null) return;
      onNavigate((index + dir + items.length) % items.length);
    },
    [index, items.length, onNavigate]
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") shift(1);
      if (e.key === "ArrowLeft") shift(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose, shift]);

  if (!isOpen || index === null) return null;
  const item = items[index];

  return (
    <div className="fixed inset-0 z-[2000] bg-[#080a14]/95 flex flex-col items-center justify-center p-8">
      <button className="absolute top-6 right-7 text-white text-3xl leading-none" onClick={onClose} aria-label="Close">×</button>
      <button className="absolute left-3 top-1/2 -translate-y-1/2 text-white text-3xl p-3.5" onClick={() => shift(-1)} aria-label="Previous">‹</button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={item.url} alt={item.alt || item.caption || ""} className="max-h-[82vh] max-w-[88vw] object-contain" />
      {item.caption && <div className="text-[#cfd6ea] mt-4 text-sm">{item.caption}</div>}
      <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-3xl p-3.5" onClick={() => shift(1)} aria-label="Next">›</button>
    </div>
  );
}
