import { createClient } from "@/lib/supabase/server";
import ActionForm from "@/components/admin/ActionForm";
import ImageUploader from "@/components/admin/ImageUploader";
import { updateAbout } from "../actions";

export default async function AdminAboutContent() {
  const supabase = createClient();
  const { data: a } = await supabase.from("about_content").select("*").eq("id", 1).single();
  if (!a) return null;

  return (
    <div>
      <h1 className="text-[26px] mb-7">About</h1>
      <div className="bg-white border border-line p-7 max-w-xl">
        <ActionForm action={updateAbout}>
          <label className="field-label">Heading</label>
          <input className="field-input" name="heading" defaultValue={a.heading} />
          <label className="field-label">Body (new line = new paragraph)</label>
          <textarea className="field-input" name="body" rows={7} defaultValue={a.body} />
          <div className="mt-3.5"><ImageUploader name="image" label="Photograph" defaultValue={a.image} /></div>
          <label className="field-label">Philosophy line</label>
          <input className="field-input" name="philosophy" defaultValue={a.philosophy} />
          <label className="field-label">Years of experience</label>
          <input className="field-input" name="experience_years" type="number" defaultValue={a.experience_years} />
        </ActionForm>
      </div>
    </div>
  );
}
