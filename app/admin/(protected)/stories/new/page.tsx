import EntityForm from "@/components/admin/EntityForm";
import ImageUploader from "@/components/admin/ImageUploader";
import { createStory } from "../actions";

export default function NewStoryPage() {
  return (
    <div>
      <h1 className="text-[26px] mb-7">Add Wedding Story</h1>
      <div className="bg-white border border-line p-7 max-w-xl">
        <EntityForm action={createStory} redirectTo="/admin/stories" submitLabel="Create Story">
          <label className="field-label">Couple name</label>
          <input className="field-input" name="couple_name" required placeholder="Rahul & Ananya" />
          <label className="field-label">Wedding date</label>
          <input className="field-input" name="wedding_date" type="date" />
          <label className="field-label">Location</label>
          <input className="field-input" name="location" />
          <div className="mt-3.5"><ImageUploader name="cover_image" label="Cover image" /></div>
          <label className="field-label">Story (new line = new paragraph)</label>
          <textarea className="field-input" name="description" rows={6} />
          <label className="field-label">Gallery image URLs (one per line)</label>
          <textarea className="field-input" name="gallery" rows={5} placeholder="https://...&#10;https://..." />
          <div className="flex items-center gap-2 mt-3.5">
            <input type="checkbox" name="featured" id="featured" className="w-auto" />
            <label htmlFor="featured" className="!m-0 text-[13.5px] text-[#151B2C]">Feature on homepage</label>
          </div>
        </EntityForm>
      </div>
    </div>
  );
}
