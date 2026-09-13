import { createClient } from "@/lib/supabase/server";
import PortfolioGrid from "@/components/site/PortfolioGrid";

export const revalidate = 0;

export default async function PortfolioPage() {
  const supabase = createClient();
  const { data: images } = await supabase.from("portfolio_images").select("*").order("sort_order");

  return (
    <section className="wrap pt-16 pb-24">
      <div className="flex justify-between items-baseline gap-6 flex-wrap mb-10">
        <h1 className="text-[32px] md:text-[42px]">Portfolio</h1>
        <p className="max-w-sm">Every category from the mehndi morning to the last dance.</p>
      </div>
      <PortfolioGrid images={images || []} />
    </section>
  );
}
