import EntityForm from "@/components/admin/EntityForm";
import ImageUploader from "@/components/admin/ImageUploader";
import { createService } from "../actions";

export default function NewServicePage() {
  return (
    <div>
      <h1 className="text-[26px] mb-7">Add Service</h1>
      <div className="bg-white border border-line p-7 max-w-xl">
        <EntityForm action={createService} redirectTo="/admin/services" submitLabel="Create Service">
          <label className="field-label">Title</label>
          <input className="field-input" name="title" required />
          <label className="field-label">Description</label>
          <textarea className="field-input" name="description" rows={4} />
          <div className="mt-3.5"><ImageUploader name="image" label="Image" /></div>
          <label className="field-label">Starting price</label>
          <input className="field-input" name="price" placeholder="From ₹25,000" />
          <label className="field-label">Display order</label>
          <input className="field-input" name="sort_order" type="number" defaultValue={0} />
          <div className="flex items-center gap-2 mt-3.5">
            <input type="checkbox" name="active" id="active" defaultChecked className="w-auto" />
            <label htmlFor="active" className="!m-0 text-[13.5px] text-[#151B2C]">Active (visible on website)</label>
          </div>
        </EntityForm>
      </div>
    </div>
  );
}
