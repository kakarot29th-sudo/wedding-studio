import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deletePortfolioImage } from "./actions";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminPortfolioPage() {
  const supabase = createClient();
  const { data: images } = await supabase.from("portfolio_images").select("*").order("sort_order");

  return (
    <div>
      <div className="flex justify-between items-center mb-7">
        <h1 className="text-[26px]">Portfolio Images</h1>
        <div className="flex gap-2.5">
          <Link href="/admin/portfolio/upload" className="btn outline small">Upload Image</Link>
          <Link href="/admin/portfolio/new" className="btn small">+ Add via URL</Link>
        </div>
      </div>
      <div className="bg-white border border-line p-7">
        {!images || images.length === 0 ? (
          <div className="empty-state">No portfolio images yet.</div>
        ) : (
          <table className="w-full text-[13.5px] border-collapse">
            <thead>
              <tr className="text-left text-xs text-muted uppercase tracking-wide">
                <th className="p-2.5 border-b border-line">Image</th>
                <th className="p-2.5 border-b border-line">Caption</th>
                <th className="p-2.5 border-b border-line">Category</th>
                <th className="p-2.5 border-b border-line">Featured</th>
                <th className="p-2.5 border-b border-line"></th>
              </tr>
            </thead>
            <tbody>
              {images.map((img) => (
                <tr key={img.id}>
                  <td className="p-2.5 border-b border-line">
                    <div className="relative w-13 h-13"><Image src={img.url} alt={img.alt_text || ""} fill className="object-cover" /></div>
                  </td>
                  <td className="p-2.5 border-b border-line">{img.caption}</td>
                  <td className="p-2.5 border-b border-line">{img.category}</td>
                  <td className="p-2.5 border-b border-line">{img.featured ? "Yes" : "No"}</td>
                  <td className="p-2.5 border-b border-line">
                    <div className="flex gap-2">
                      <Link href={`/admin/portfolio/${img.id}`} className="btn outline small">Edit</Link>
                      <DeleteButton action={deletePortfolioImage.bind(null, img.id)} confirmText="Delete this image? This cannot be undone." />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
