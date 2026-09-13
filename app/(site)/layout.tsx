import { createClient } from "@/lib/supabase/server";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import type { SiteSettings } from "@/types/database";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const { data: settings } = await supabase.from("site_settings").select("*").eq("id", 1).single();

  const siteSettings: SiteSettings =
    settings || {
      id: 1, site_name: "Amaya & Co.", tagline: "Wedding Photography Studio",
      phone: "", email: "", address: "", instagram: "", facebook: "", youtube: "",
      updated_at: new Date().toISOString(),
    };

  return (
    <>
      <Nav siteName={siteSettings.site_name} />
      <main className="site-main">{children}</main>
      <Footer settings={siteSettings} />
    </>
  );
}
