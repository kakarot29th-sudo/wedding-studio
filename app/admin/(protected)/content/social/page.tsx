import { createClient } from "@/lib/supabase/server";
import ActionForm from "@/components/admin/ActionForm";
import { updateSocial } from "../actions";

export default async function AdminSocialContent() {
  const supabase = createClient();
  const { data: s } = await supabase.from("site_settings").select("*").eq("id", 1).single();
  if (!s) return null;

  return (
    <div>
      <h1 className="text-[26px] mb-7">Social Media</h1>
      <div className="bg-white border border-line p-7 max-w-xl">
        <ActionForm action={updateSocial}>
          <label className="field-label">Instagram URL</label>
          <input className="field-input" name="instagram" defaultValue={s.instagram} />
          <label className="field-label">Facebook URL</label>
          <input className="field-input" name="facebook" defaultValue={s.facebook} />
          <label className="field-label">YouTube URL</label>
          <input className="field-input" name="youtube" defaultValue={s.youtube} />
        </ActionForm>
      </div>
    </div>
  );
}
