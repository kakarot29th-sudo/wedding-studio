import { createClient } from "@/lib/supabase/server";
import ActionForm from "@/components/admin/ActionForm";
import ImageUploader from "@/components/admin/ImageUploader";
import { updateSeo } from "../../content/actions";

export default async function AdminSeoSettings() {
  const supabase = createClient();
  const { data: s } = await supabase.from("seo_settings").select("*").eq("id", 1).single();
  if (!s) return null;

  return (
    <div>
      <h1 className="text-[26px] mb-7">SEO Settings</h1>
      <div className="bg-white border border-line p-7 max-w-xl">
        <ActionForm action={updateSeo}>
          <label className="field-label">Website title</label>
          <input className="field-input" name="title" defaultValue={s.title} />
          <label className="field-label">Meta description</label>
          <textarea className="field-input" name="description" rows={3} defaultValue={s.description} />
          <label className="field-label">Keywords (comma separated)</label>
          <input className="field-input" name="keywords" defaultValue={s.keywords} />
          <div className="mt-3.5"><ImageUploader name="og_image" label="Social sharing image" defaultValue={s.og_image} /></div>
        </ActionForm>
      </div>
    </div>
  );
}
