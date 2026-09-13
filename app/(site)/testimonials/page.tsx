import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

export default async function TestimonialsPage() {
  const supabase = createClient();
  const { data: testimonials } = await supabase.from("testimonials").select("*").eq("active", true);

  return (
    <section className="wrap pt-16 pb-24">
      <div className="flex justify-between items-baseline gap-6 flex-wrap mb-10">
        <h1 className="text-[32px] md:text-[42px]">Testimonials</h1>
        <p className="max-w-sm">From couples we&apos;ve had the honour of photographing.</p>
      </div>

      {!testimonials || testimonials.length === 0 ? (
        <div className="empty-state">No testimonials published yet.</div>
      ) : (
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
      )}
    </section>
  );
}
