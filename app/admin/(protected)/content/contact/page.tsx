import { createClient } from "@/lib/supabase/server";
import ActionForm from "@/components/admin/ActionForm";
import { updateContactInfo } from "../actions";

export default async function AdminContactContent() {
  const supabase = createClient();
  const { data: s } = await supabase.from("site_settings").select("*").eq("id", 1).single();
  if (!s) return null;

  return (
    <div>
      <h1 className="text-[26px] mb-7">Contact Information</h1>
      <div className="bg-white border border-line p-7 max-w-xl">
        <ActionForm action={updateContactInfo}>
          <label className="field-label">Studio name</label>
          <input className="field-input" name="site_name" defaultValue={s.site_name} />
          <label className="field-label">Tagline</label>
          <input className="field-input" name="tagline" defaultValue={s.tagline} />
          <label className="field-label">Phone</label>
          <input className="field-input" name="phone" defaultValue={s.phone} />
          <label className="field-label">Email</label>
          <input className="field-input" name="email" type="email" defaultValue={s.email} />
          <label className="field-label">Address</label>
          <input className="field-input" name="address" defaultValue={s.address} />
        </ActionForm>
      </div>
    </div>
  );
}
