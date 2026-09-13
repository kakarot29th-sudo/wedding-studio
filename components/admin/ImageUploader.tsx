"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

// Uploads directly to the public "media" Supabase Storage bucket from the
// browser (the admin's authenticated session is required by the storage
// RLS policy). The resulting public URL is written into a hidden input
// so it submits along with the rest of the surrounding <form>.
export default function ImageUploader({
  name, label, defaultValue,
}: { name: string; label: string; defaultValue?: string }) {
  const [url, setUrl] = useState(defaultValue || "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);

    const supabase = createClient();
    const path = `uploads/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, "")}`;
    const { error: uploadError } = await supabase.storage.from("media").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

    if (uploadError) {
      setError("Upload failed: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("media").getPublicUrl(path);
    setUrl(data.publicUrl);
    setUploading(false);
  }

  return (
    <div>
      <label className="field-label">{label}</label>
      <input
        className="field-input"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://... or upload a file below"
      />
      <input type="hidden" name={name} value={url} />
      <div className="flex items-center gap-3 mt-2">
        <input type="file" accept="image/*" onChange={handleFile} className="text-xs" />
        {uploading && <span className="text-xs text-muted">Uploading…</span>}
      </div>
      {error && <div className="text-[#B4463E] text-xs mt-1">{error}</div>}
      {url && (
        <div className="relative w-full h-[140px] mt-2 bg-stone">
          <Image src={url} alt="Preview" fill className="object-cover" onError={() => {}} />
        </div>
      )}
    </div>
  );
}
