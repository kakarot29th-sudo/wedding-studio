import { createClient } from "@/lib/supabase/server";
import ContactForm from "@/components/site/ContactForm";

export const revalidate = 0;

export default async function ContactPage() {
  const supabase = createClient();
  const { data: settings } = await supabase.from("site_settings").select("*").eq("id", 1).single();

  return (
    <section className="wrap pt-16 pb-24">
      <div className="flex justify-between items-baseline gap-6 flex-wrap mb-10">
        <h1 className="text-[32px] md:text-[42px]">Get in touch</h1>
        <p className="max-w-sm">Tell us about your day and we&apos;ll reply within 48 hours.</p>
      </div>
      <div className="grid md:grid-cols-[1fr_1.3fr] gap-14">
        <div className="flex flex-col gap-5.5">
          <div className="text-sm"><span className="text-blue block text-xs mb-0.5">Phone</span>{settings?.phone}</div>
          <div className="text-sm"><span className="text-blue block text-xs mb-0.5">Email</span>{settings?.email}</div>
          <div className="text-sm"><span className="text-blue block text-xs mb-0.5">Studio</span>{settings?.address}</div>
          <div className="text-sm">
            <span className="text-blue block text-xs mb-0.5">Follow along</span>
            {settings?.instagram && <a href={settings.instagram} className="text-blue" target="_blank" rel="noreferrer">Instagram</a>} ·{" "}
            {settings?.facebook && <a href={settings.facebook} className="text-blue" target="_blank" rel="noreferrer">Facebook</a>} ·{" "}
            {settings?.youtube && <a href={settings.youtube} className="text-blue" target="_blank" rel="noreferrer">YouTube</a>}
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
