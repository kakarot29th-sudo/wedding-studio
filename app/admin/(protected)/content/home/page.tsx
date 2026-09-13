import { createClient } from "@/lib/supabase/server";
import ActionForm from "@/components/admin/ActionForm";
import ImageUploader from "@/components/admin/ImageUploader";
import { updateHomepage } from "../actions";

export default async function AdminHomeContent() {
  const supabase = createClient();
  const { data: h } = await supabase.from("homepage_content").select("*").eq("id", 1).single();
  if (!h) return null;

  return (
    <div>
      <h1 className="text-[26px] mb-7">Homepage</h1>

      <div className="bg-white border border-line p-7 mb-6 max-w-xl">
        <h3 className="text-lg mb-4.5">Hero section</h3>
        <ActionForm action={updateHomepage}>
          <label className="field-label">Heading</label>
          <input className="field-input" name="hero_heading" defaultValue={h.hero_heading} />
          <label className="field-label">Subheading</label>
          <textarea className="field-input" name="hero_subheading" rows={2} defaultValue={h.hero_subheading} />
          <div className="mt-3.5"><ImageUploader name="hero_image" label="Hero image" defaultValue={h.hero_image} /></div>
          <label className="field-label">Primary button text</label>
          <input className="field-input" name="hero_cta_primary" defaultValue={h.hero_cta_primary} />
          <label className="field-label">Secondary button text</label>
          <input className="field-input" name="hero_cta_secondary" defaultValue={h.hero_cta_secondary} />
        </ActionForm>
      </div>

      <div className="bg-white border border-line p-7 max-w-xl">
        <h3 className="text-lg mb-4.5">Bottom call-to-action</h3>
        <ActionForm action={updateHomepage}>
          <input type="hidden" name="hero_heading" defaultValue={h.hero_heading} />
          <input type="hidden" name="hero_subheading" defaultValue={h.hero_subheading} />
          <input type="hidden" name="hero_image" defaultValue={h.hero_image} />
          <input type="hidden" name="hero_cta_primary" defaultValue={h.hero_cta_primary} />
          <input type="hidden" name="hero_cta_secondary" defaultValue={h.hero_cta_secondary} />
          <label className="field-label">Heading</label>
          <input className="field-input" name="cta_heading" defaultValue={h.cta_heading} />
          <label className="field-label">Description</label>
          <textarea className="field-input" name="cta_description" rows={2} defaultValue={h.cta_description} />
          <label className="field-label">Button text</label>
          <input className="field-input" name="cta_button_text" defaultValue={h.cta_button_text} />
        </ActionForm>
      </div>
    </div>
  );
}
