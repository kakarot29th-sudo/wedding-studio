import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { createClient } from "@/lib/supabase/server";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const supabase = createClient();
  const { data: seo } = await supabase.from("seo_settings").select("*").eq("id", 1).single();

  return {
    title: seo?.title || "Amaya & Co. — Wedding Photography",
    description: seo?.description || "Cinematic wedding photography.",
    keywords: seo?.keywords || undefined,
    openGraph: {
      title: seo?.title || "Amaya & Co.",
      description: seo?.description || "",
      images: seo?.og_image ? [seo.og_image] : [],
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
