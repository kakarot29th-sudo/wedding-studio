import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import EntityForm from "@/components/admin/EntityForm";
import ImageUploader from "@/components/admin/ImageUploader";
import { updateService } from "../actions";

export default async function EditServicePage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: s } = await supabase.from("services").select("*").eq("id", params.id).single();
  if (!s) notFound();

  const boundUpdate = updateService.bind(null, s.id);

  return (
    <div>
      <h1 className="text-[26px] mb-7">Edit Service</h1>
      <div className="bg-white border border-line p-7 max-w-xl">
        <EntityForm action={boundUpdate} redirectTo="/admin/services">
          <label className="field-label">Title</label>
          <input className="field-input" name="title" required defaultValue={s.title} />
          <label className="field-label">Description</label>
          <textarea className="field-input" name="description" rows={4} defaultValue={s.description} />
          <div className="mt-3.5"><ImageUploader name="image" label="Image" defaultValue={s.image} /></div>
          <label className="field-label">Starting price</label>
          <input className="field-input" name="price" defaultValue={s.price} />
          <label className="field-label">Display order</label>
          <input className="field-input" name="sort_order" type="number" defaultValue={s.sort_order} />
          <div className="flex items-center gap-2 mt-3.5">
            <input type="checkbox" name="active" id="active" defaultChecked={s.active} className="w-auto" />
            <label htmlFor="active" className="!m-0 text-[13.5px] text-[#151B2C]">Active (visible on website)</label>
          </div>
        </EntityForm>
      </div>
    </div>
  );
}
