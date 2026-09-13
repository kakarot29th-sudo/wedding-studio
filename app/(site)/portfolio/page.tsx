import { createClient } from "@/lib/supabase/server";
import PortfolioGrid from "@/components/site/PortfolioGrid";

export const revalidate = 0;

export default async function PortfolioPage() {
  const supabase = createClient();
  const { data: images } = await supabase.from("portfolio_images").select("*").order("sort_order");

  return (
    <section className="portfolio-page py-8 sm:py-12 lg:py-16">
      <div className="portfolio-wrap">
        <div className="portfolio-intro flex justify-between items-end gap-6 flex-wrap mb-8 sm:mb-10">
          <div>
            <div className="portfolio-kicker">Selected stories</div>
            <h1>Portfolio</h1>
          </div>
          <p className="max-w-sm">Every category from the mehndi morning to the last dance.</p>
        </div>
        <PortfolioGrid images={images || []} />
      </div>
    </section>
  );
}
