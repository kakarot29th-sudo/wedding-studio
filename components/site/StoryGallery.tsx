"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "./Lightbox";

export default function StoryGallery({ images, coupleName }: { images: string[]; coupleName: string }) {
  const [index, setIndex] = useState<number | null>(null);
  if (images.length === 0) return null;

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5">
        {images.map((url, i) => (
          <button key={url + i} onClick={() => setIndex(i)} className="relative h-[280px] w-full">
            <Image src={url} alt={`${coupleName} photograph`} fill sizes="33vw" className="object-cover" />
          </button>
        ))}
      </div>
      <Lightbox
        items={images.map((url) => ({ url, caption: coupleName, alt: coupleName }))}
        index={index}
        onClose={() => setIndex(null)}
        onNavigate={setIndex}
      />
    </div>
  );
}
