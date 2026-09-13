import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import EntityForm from "@/components/admin/EntityForm";
import ImageUploader from "@/components/admin/ImageUploader";
import { PORTFOLIO_CATEGORIES } from "@/lib/utils";
import { updatePortfolioImage } from "../actions";

export default async function EditPortfolioImagePage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: img } = await supabase.from("portfolio_images").select("*").eq("id", params.id).single();
  if (!img) notFound();

  const boundUpdate = updatePortfolioImage.bind(null, img.id);

  return (
    <div>
      <h1 className="text-[26px] mb-7">Edit Image</h1>
      <div className="bg-white border border-line p-7 max-w-xl">
        <EntityForm action={boundUpdate} redirectTo="/admin/portfolio">
          <ImageUploader name="url" label="Image URL" defaultValue={img.url} />
          <label className="field-label">Category</label>
          <select className="field-input" name="category" defaultValue={img.category}>
            {PORTFOLIO_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <label className="field-label">Caption</label>
          <input className="field-input" name="caption" defaultValue={img.caption} />
          <label className="field-label">Alt text</label>
          <input className="field-input" name="alt_text" defaultValue={img.alt_text} />
          <label className="field-label">Display order</label>
          <input className="field-input" name="sort_order" type="number" defaultValue={img.sort_order} />
          <div className="flex items-center gap-2 mt-3.5">
            <input type="checkbox" name="featured" id="featured" defaultChecked={img.featured} className="w-auto" />
            <label htmlFor="featured" className="!m-0 text-[13.5px] text-[#151B2C]">Mark as featured</label>
          </div>
        </EntityForm>
      </div>
    </div>
  );
}
