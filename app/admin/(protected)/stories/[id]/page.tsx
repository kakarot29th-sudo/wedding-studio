import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import EntityForm from "@/components/admin/EntityForm";
import ImageUploader from "@/components/admin/ImageUploader";
import { updateStory } from "../actions";

export default async function EditStoryPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: s } = await supabase.from("wedding_stories").select("*").eq("id", params.id).single();
  if (!s) notFound();

  const boundUpdate = updateStory.bind(null, s.id);

  return (
    <div>
      <h1 className="text-[26px] mb-7">Edit Wedding Story</h1>
      <p className="text-[13px] text-muted mb-5">Public URL: /stories/{s.slug}</p>
      <div className="bg-white border border-line p-7 max-w-xl">
        <EntityForm action={boundUpdate} redirectTo="/admin/stories">
          <label className="field-label">Couple name</label>
          <input className="field-input" name="couple_name" required defaultValue={s.couple_name} />
          <label className="field-label">Wedding date</label>
          <input className="field-input" name="wedding_date" type="date" defaultValue={s.wedding_date || ""} />
          <label className="field-label">Location</label>
          <input className="field-input" name="location" defaultValue={s.location} />
          <div className="mt-3.5"><ImageUploader name="cover_image" label="Cover image" defaultValue={s.cover_image} /></div>
          <label className="field-label">Story (new line = new paragraph)</label>
          <textarea className="field-input" name="description" rows={6} defaultValue={s.description} />
          <label className="field-label">Gallery image URLs (one per line)</label>
          <textarea className="field-input" name="gallery" rows={5} defaultValue={(s.gallery || []).join("\n")} />
          <div className="flex items-center gap-2 mt-3.5">
            <input type="checkbox" name="featured" id="featured" defaultChecked={s.featured} className="w-auto" />
            <label htmlFor="featured" className="!m-0 text-[13.5px] text-[#151B2C]">Feature on homepage</label>
          </div>
        </EntityForm>
      </div>
    </div>
  );
}
