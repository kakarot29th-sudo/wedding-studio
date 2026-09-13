import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import StoryGallery from "@/components/site/StoryGallery";

export const revalidate = 0;

export default async function StoryDetailPage({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const { data: story } = await supabase.from("wedding_stories").select("*").eq("slug", params.slug).single();

  if (!story) notFound();

  return (
    <>
      <div className="relative h-[70vh] min-h-[420px]">
        {story.cover_image && <Image src={story.cover_image} alt={story.couple_name} fill priority className="object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/10 to-ink/70" />
        <div className="relative z-10 h-full flex flex-col justify-end wrap pb-14 text-white">
          <div className="text-[#BBD0FF] text-sm">{story.location} · {formatDate(story.wedding_date)}</div>
          <h1 className="text-white text-[32px] sm:text-5xl md:text-6xl">{story.couple_name}</h1>
        </div>
      </div>
      <section className="wrap py-16">
        {story.description.split("\n").map((p: string, i: number) => (
          <p key={i} className="max-w-2xl mb-4 text-base">{p}</p>
        ))}
        {story.gallery?.length > 0 && (
          <>
            <h2 className="text-[26px] mt-14 mb-6">Gallery</h2>
            <StoryGallery images={story.gallery} coupleName={story.couple_name} />
          </>
        )}
        <Link href="/stories" className="btn outline mt-11 inline-flex">&larr; All Wedding Stories</Link>
      </section>
    </>
  );
}
