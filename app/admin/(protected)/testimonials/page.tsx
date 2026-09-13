import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteTestimonial } from "./actions";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminTestimonialsPage() {
  const supabase = createClient();
  const { data: testimonials } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex justify-between items-center mb-7">
        <h1 className="text-[26px]">Testimonials</h1>
        <Link href="/admin/testimonials/new" className="btn small">+ Add Testimonial</Link>
      </div>
      <div className="bg-white border border-line p-7">
        {!testimonials || testimonials.length === 0 ? (
          <div className="empty-state">No testimonials yet.</div>
        ) : (
          <table className="w-full text-[13.5px] border-collapse">
            <thead>
              <tr className="text-left text-xs text-muted uppercase tracking-wide">
                <th className="p-2.5 border-b border-line">Photo</th>
                <th className="p-2.5 border-b border-line">Name</th>
                <th className="p-2.5 border-b border-line">Rating</th>
                <th className="p-2.5 border-b border-line">Active</th>
                <th className="p-2.5 border-b border-line"></th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((t) => (
                <tr key={t.id}>
                  <td className="p-2.5 border-b border-line">
                    {t.image && <div className="relative w-11 h-11 rounded-full overflow-hidden"><Image src={t.image} alt={t.name} fill className="object-cover" /></div>}
                  </td>
                  <td className="p-2.5 border-b border-line">{t.name}</td>
                  <td className="p-2.5 border-b border-line">{"★".repeat(t.rating)}</td>
                  <td className="p-2.5 border-b border-line">{t.active ? "Yes" : "No"}</td>
                  <td className="p-2.5 border-b border-line">
                    <div className="flex gap-2">
                      <Link href={`/admin/testimonials/${t.id}`} className="btn outline small">Edit</Link>
                      <DeleteButton action={deleteTestimonial.bind(null, t.id)} confirmText="Delete this testimonial? This cannot be undone." />
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
