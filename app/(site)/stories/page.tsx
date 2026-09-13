import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";

export const revalidate = 0;

export default async function StoriesPage() {
  const supabase = createClient();
  const { data: stories } = await supabase
    .from("wedding_stories")
    .select("*")
    .order("featured", { ascending: false })
    .order("wedding_date", { ascending: false });

  return (
    <section className="wrap pt-16 pb-24">
      <div className="flex justify-between items-baseline gap-6 flex-wrap mb-10">
        <h1 className="text-[32px] md:text-[42px]">Wedding Stories</h1>
        <p className="max-w-sm">Full days, told in full — not just the highlight reel.</p>
      </div>

      {!stories || stories.length === 0 ? (
        <div className="empty-state">No wedding stories published yet.</div>
      ) : (
        <div className="flex flex-col">
          {stories.map((s, i) => (
            <div key={s.id} className={`grid md:grid-cols-[340px_1fr] gap-11 items-center py-10 border-b border-line ${i === 0 ? "pt-0" : ""}`}>
              {s.cover_image && (
                <div className="relative h-[260px] w-full">
                  <Image src={s.cover_image} alt={s.couple_name} fill className="object-cover" />
                </div>
              )}
              <div>
                <div className="text-blue text-sm mb-2.5">{s.location} · {formatDate(s.wedding_date)}</div>
                <h3 className="text-[30px] mb-3">{s.couple_name}</h3>
                <p className="max-w-xl mb-4.5">
                  {s.description.split("\n")[0].slice(0, 220)}
                  {s.description.length > 220 ? "…" : ""}
                </p>
                <Link href={`/stories/${s.slug}`} className="btn outline small">View Story</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
