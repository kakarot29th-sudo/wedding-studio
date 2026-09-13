import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

export default async function AboutPage() {
  const supabase = createClient();
  const { data: about } = await supabase.from("about_content").select("*").eq("id", 1).single();
  if (!about) return null;

  return (
    <section className="wrap pt-16 pb-24">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {about.image && (
          <div className="relative aspect-[4/5]">
            <Image src={about.image} alt="Photographer portrait" fill className="object-cover" />
          </div>
        )}
        <div>
          <div className="text-blue text-sm">About us</div>
          <h1 className="text-[38px] my-3.5">{about.heading}</h1>
          {about.body.split("\n").map((p: string, i: number) => (
            <p key={i} className="mb-4">{p}</p>
          ))}
          <div className="flex gap-10 mt-7">
            <div>
              <div className="font-serif text-3xl text-ink">{about.experience_years}+</div>
              <div className="text-[13px] text-muted">years documenting weddings</div>
            </div>
            {about.philosophy && (
              <div className="font-serif text-xl text-ink italic">&ldquo;{about.philosophy}&rdquo;</div>
            )}
          </div>
          <Link href="/contact" className="btn outline mt-7 inline-flex">Get in touch</Link>
        </div>
      </div>
    </section>
  );
}
