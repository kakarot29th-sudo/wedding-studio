import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import EntityForm from "@/components/admin/EntityForm";
import ImageUploader from "@/components/admin/ImageUploader";
import { updateTestimonial } from "../actions";

export default async function EditTestimonialPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: t } = await supabase.from("testimonials").select("*").eq("id", params.id).single();
  if (!t) notFound();

  const boundUpdate = updateTestimonial.bind(null, t.id);

  return (
    <div>
      <h1 className="text-[26px] mb-7">Edit Testimonial</h1>
      <div className="bg-white border border-line p-7 max-w-xl">
        <EntityForm action={boundUpdate} redirectTo="/admin/testimonials">
          <label className="field-label">Client name</label>
          <input className="field-input" name="name" required defaultValue={t.name} />
          <div className="mt-3.5"><ImageUploader name="image" label="Client photo" defaultValue={t.image} /></div>
          <label className="field-label">Review</label>
          <textarea className="field-input" name="review" rows={4} defaultValue={t.review} />
          <label className="field-label">Wedding date / location</label>
          <input className="field-input" name="wedding_info" defaultValue={t.wedding_info} />
          <label className="field-label">Rating (1-5)</label>
          <input className="field-input" name="rating" type="number" min={1} max={5} defaultValue={t.rating} />
          <div className="flex items-center gap-2 mt-3.5">
            <input type="checkbox" name="active" id="active" defaultChecked={t.active} className="w-auto" />
            <label htmlFor="active" className="!m-0 text-[13.5px] text-[#151B2C]">Active (visible on website)</label>
          </div>
        </EntityForm>
      </div>
    </div>
  );
}
