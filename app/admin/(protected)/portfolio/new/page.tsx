import EntityForm from "@/components/admin/EntityForm";
import ImageUploader from "@/components/admin/ImageUploader";
import { PORTFOLIO_CATEGORIES } from "@/lib/utils";
import { createPortfolioImage } from "../actions";

export default function NewPortfolioImagePage() {
  return (
    <div>
      <h1 className="text-[26px] mb-7">Add Image via URL</h1>
      <div className="bg-white border border-line p-7 max-w-xl">
        <EntityForm action={createPortfolioImage} redirectTo="/admin/portfolio" submitLabel="Add Image">
          <ImageUploader name="url" label="Image URL" />
          <label className="field-label">Category</label>
          <select className="field-input" name="category" defaultValue="Wedding">
            {PORTFOLIO_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <label className="field-label">Caption</label>
          <input className="field-input" name="caption" />
          <label className="field-label">Alt text</label>
          <input className="field-input" name="alt_text" />
          <label className="field-label">Display order</label>
          <input className="field-input" name="sort_order" type="number" defaultValue={0} />
          <div className="flex items-center gap-2 mt-3.5">
            <input type="checkbox" name="featured" id="featured" className="w-auto" />
            <label htmlFor="featured" className="!m-0 text-[13.5px] text-[#151B2C]">Mark as featured</label>
          </div>
        </EntityForm>
      </div>
    </div>
  );
}
