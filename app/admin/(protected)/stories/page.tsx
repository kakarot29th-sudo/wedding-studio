import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteStory } from "./actions";
import DeleteButton from "@/components/admin/DeleteButton";
import { formatDate } from "@/lib/utils";

export default async function AdminStoriesPage() {
  const supabase = createClient();
  const { data: stories } = await supabase.from("wedding_stories").select("*").order("wedding_date", { ascending: false });

  return (
    <div>
      <div className="flex justify-between items-center mb-7">
        <h1 className="text-[26px]">Wedding Stories</h1>
        <Link href="/admin/stories/new" className="btn small">+ Add Story</Link>
      </div>
      <div className="bg-white border border-line p-7">
        {!stories || stories.length === 0 ? (
          <div className="empty-state">No wedding stories yet.</div>
        ) : (
          <table className="w-full text-[13.5px] border-collapse">
            <thead>
              <tr className="text-left text-xs text-muted uppercase tracking-wide">
                <th className="p-2.5 border-b border-line">Cover</th>
                <th className="p-2.5 border-b border-line">Couple</th>
                <th className="p-2.5 border-b border-line">Location</th>
                <th className="p-2.5 border-b border-line">Date</th>
                <th className="p-2.5 border-b border-line">Featured</th>
                <th className="p-2.5 border-b border-line"></th>
              </tr>
            </thead>
            <tbody>
              {stories.map((s) => (
                <tr key={s.id}>
                  <td className="p-2.5 border-b border-line">
                    {s.cover_image && <div className="relative w-13 h-13"><Image src={s.cover_image} alt={s.couple_name} fill className="object-cover" /></div>}
                  </td>
                  <td className="p-2.5 border-b border-line">{s.couple_name}</td>
                  <td className="p-2.5 border-b border-line">{s.location}</td>
                  <td className="p-2.5 border-b border-line">{formatDate(s.wedding_date)}</td>
                  <td className="p-2.5 border-b border-line">{s.featured ? "Yes" : "No"}</td>
                  <td className="p-2.5 border-b border-line">
                    <div className="flex gap-2">
                      <Link href={`/admin/stories/${s.id}`} className="btn outline small">Edit</Link>
                      <DeleteButton action={deleteStory.bind(null, s.id)} confirmText="Delete this wedding story? This cannot be undone." />
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
