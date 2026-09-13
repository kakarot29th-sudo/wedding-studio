import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 0;

export default async function ServicesPage() {
  const supabase = createClient();
  const { data: services } = await supabase.from("services").select("*").eq("active", true).order("sort_order");

  return (
    <section className="wrap pt-16 pb-24">
      <div className="flex justify-between items-baseline gap-6 flex-wrap mb-10">
        <h1 className="text-[32px] md:text-[42px]">Services</h1>
        <p className="max-w-sm">Every package can be mixed and matched — tell us what your day needs.</p>
      </div>

      {!services || services.length === 0 ? (
        <div className="empty-state">No services published yet.</div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-px bg-line border border-line">
          {services.map((s) => (
            <div key={s.id} className="bg-white p-9 flex flex-col gap-3">
              {s.image && <div className="relative h-[180px] mb-2"><Image src={s.image} alt={s.title} fill className="object-cover" /></div>}
              <h3 className="text-xl">{s.title}</h3>
              <p>{s.description}</p>
              {s.price && <div className="text-blue text-[13px] mt-1">{s.price}</div>}
              <Link href="/contact" className="btn outline small mt-2 self-start">Enquire</Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
