import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const supabase = createClient();
  const { data: stories } = await supabase.from("wedding_stories").select("slug, updated_at");

  const staticRoutes = ["", "/about", "/portfolio", "/stories", "/services", "/testimonials", "/contact"].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
  }));

  const storyRoutes = (stories || []).map((s) => ({
    url: `${base}/stories/${s.slug}`,
    lastModified: s.updated_at ? new Date(s.updated_at) : new Date(),
  }));

  return [...staticRoutes, ...storyRoutes];
}
