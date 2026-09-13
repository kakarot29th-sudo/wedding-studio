import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";

export const revalidate = 0;

export default async function HomePage() {
  const supabase = createClient();

  const [{ data: hero }, { data: about }, { data: cta }, { data: stories }, { data: services }, { data: testimonials }] =
    await Promise.all([
      supabase.from("homepage_content").select("*").eq("id", 1).single(),
      supabase.from("about_content").select("*").eq("id", 1).single(),
      supabase.from("homepage_content").select("cta_heading, cta_description, cta_button_text").eq("id", 1).single(),
      supabase.from("wedding_stories").select("*").eq("featured", true).order("wedding_date", { ascending: false }).limit(3),
      supabase.from("services").select("*").eq("active", true).order("sort_order").limit(3),
      supabase.from("testimonials").select("*").eq("active", true).limit(3),
    ]);

  return (
    <>
      <section className="relative h-[92vh] min-h-[560px] flex items-end overflow-hidden bg-ink">
        {hero?.hero_image && (
          <Image src={hero.hero_image} alt="Wedding hero photograph" fill priority className="object-cover opacity-85" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/5 to-ink/75" />
        <div className="relative z-10 wrap pb-16 text-white">
          <div className="text-[#BBD0FF] text-sm">Amaya &amp; Co. — Wedding Photography Studio</div>
          <h1 className="text-white text-[38px] sm:text-6xl md:text-7xl leading-[1.05] max-w-3xl my-3.5">
            {hero?.hero_heading || "Stories of Love, Captured Forever."}
          </h1>
          <p className="text-[#E7ECFA] max-w-md text-base mb-7">{hero?.hero_subheading}</p>
          <div className="flex gap-3.5 flex-wrap">
            <Link href="/stories" className="btn">{hero?.hero_cta_primary || "View Our Stories"}</Link>
            <Link href="/contact" className="btn ghost">{hero?.hero_cta_secondary || "Book a Consultation"}</Link>
          </div>
        </div>
      </section>

      <section className="wrap py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {about?.image && (
            <div className="relative aspect-[4/5]">
              <Image src={about.image} alt="Photographer portrait" fill className="object-cover" />
            </div>
          )}
          <div>
            <div className="eyebrow text-blue text-sm">About the studio</div>
            <h2 className="text-[34px] my-3.5">{about?.heading}</h2>
            <p className="mb-5">{about?.body?.split("\n")[0]}</p>
            <Link href="/about" className="btn outline">Read our story</Link>
          </div>
        </div>
      </section>

      {stories && stories.length > 0 && (
        <section className="wrap py-24">
          <div className="flex justify-between items-baseline gap-6 flex-wrap mb-12">
            <h2 className="text-[32px] md:text-[42px] max-w-lg">Featured weddings</h2>
            <p className="max-w-sm">A few of the celebrations we&apos;ve had the privilege to document.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-line">
            {stories.map((s) => (
              <Link key={s.id} href={`/stories/${s.slug}`} className="relative min-h-[420px] block bg-ink group overflow-hidden">
                {s.cover_image && (
                  <Image src={s.cover_image} alt={s.couple_name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6.5 text-white">
                  <div className="text-[12.5px] text-[#C9D8FF] mb-1.5">{s.location} · {formatDate(s.wedding_date)}</div>
                  <h3 className="text-white text-2xl mb-2.5">{s.couple_name}</h3>
                  <span className="text-[13px] border-b border-white/60 w-fit">View Story</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {services && services.length > 0 && (
        <section className="wrap py-24">
          <div className="flex justify-between items-baseline gap-6 flex-wrap mb-12">
            <h2 className="text-[32px] md:text-[42px] max-w-lg">Services</h2>
            <p className="max-w-sm">Coverage built around how you actually want your day remembered.</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-px bg-line border border-line">
            {services.map((s) => (
              <div key={s.id} className="bg-white p-9 flex flex-col gap-3">
                {s.image && <div className="relative h-[180px] mb-2"><Image src={s.image} alt={s.title} fill className="object-cover" /></div>}
                <h3 className="text-xl">{s.title}</h3>
                <p>{s.description}</p>
                {s.price && <div className="text-blue text-[13px] mt-1">{s.price}</div>}
              </div>
            ))}
          </div>
          <Link href="/services" className="btn outline mt-8 inline-flex">View all services</Link>
        </section>
      )}

      {testimonials && testimonials.length > 0 && (
        <section className="wrap py-24">
          <h2 className="text-[32px] md:text-[42px] mb-12">What couples say</h2>
          <div className="grid md:grid-cols-3 gap-px bg-line border border-line">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white p-8.5 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  {t.image && <div className="relative w-11.5 h-11.5 rounded-full overflow-hidden"><Image src={t.image} alt={t.name} fill className="object-cover" /></div>}
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-blue text-[13px]">{"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}</div>
                  </div>
                </div>
                <p className="text-[#151B2C] text-[15px] italic">&ldquo;{t.review}&rdquo;</p>
                <div className="text-[12.5px] text-muted">{t.wedding_info}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="bg-ink text-white text-center py-24 px-7">
        <h2 className="text-white max-w-xl mx-auto mb-4">{cta?.cta_heading}</h2>
        <p className="text-[#B9C6EA] max-w-md mx-auto mb-8">{cta?.cta_description}</p>
        <Link href="/contact" className="btn bg-white text-ink border-white hover:bg-white/90">
          {cta?.cta_button_text || "Start Your Inquiry"}
        </Link>
      </section>
    </>
  );
}
