import EntityForm from "@/components/admin/EntityForm";
import ImageUploader from "@/components/admin/ImageUploader";
import { createTestimonial } from "../actions";

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 className="text-[26px] mb-7">Add Testimonial</h1>
      <div className="bg-white border border-line p-7 max-w-xl">
        <EntityForm action={createTestimonial} redirectTo="/admin/testimonials" submitLabel="Add Testimonial">
          <label className="field-label">Client name</label>
          <input className="field-input" name="name" required />
          <div className="mt-3.5"><ImageUploader name="image" label="Client photo" /></div>
          <label className="field-label">Review</label>
          <textarea className="field-input" name="review" rows={4} />
          <label className="field-label">Wedding date / location</label>
          <input className="field-input" name="wedding_info" placeholder="December 2026 · Delhi" />
          <label className="field-label">Rating (1-5)</label>
          <input className="field-input" name="rating" type="number" min={1} max={5} defaultValue={5} />
          <div className="flex items-center gap-2 mt-3.5">
            <input type="checkbox" name="active" id="active" defaultChecked className="w-auto" />
            <label htmlFor="active" className="!m-0 text-[13.5px] text-[#151B2C]">Active (visible on website)</label>
          </div>
        </EntityForm>
      </div>
    </div>
  );
}
