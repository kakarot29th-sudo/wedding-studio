// Seeds realistic demo content — run once after applying schema.sql:
//   npm run seed
// Requires SUPABASE_SERVICE_ROLE_KEY in .env.local (bypasses RLS for seeding).

import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
if (!url || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}
const supabase = createClient(url, serviceKey);
const img = (seed: string, w = 1200, h = 1500) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

async function seed() {
  await supabase.from("site_settings").update({
    site_name: "Amaya & Co.", tagline: "Wedding Photography Studio",
    phone: "+91 98765 43210", email: "hello@amayaandco.com",
    address: "Delhi, India — available worldwide",
    instagram: "https://instagram.com", facebook: "https://facebook.com", youtube: "https://youtube.com",
  }).eq("id", 1);

  await supabase.from("seo_settings").update({
    title: "Amaya & Co. — Wedding Photography",
    description: "Cinematic, emotional wedding photography for couples in Delhi and beyond.",
    keywords: "wedding photographer, wedding photography, pre-wedding, Delhi",
    og_image: img("og", 1200, 630),
  }).eq("id", 1);

  await supabase.from("homepage_content").update({
    hero_heading: "Stories of Love, Captured Forever.",
    hero_subheading: "Cinematic wedding photography for couples who want their story told honestly, beautifully, and without a single posed smile.",
    hero_image: img("hero1", 1800, 1300),
    hero_cta_primary: "View Our Stories",
    hero_cta_secondary: "Book a Consultation",
    cta_heading: "Have a date in mind?",
    cta_description: "We take on a limited number of weddings each season so every couple gets our full attention. Tell us about your day.",
    cta_button_text: "Start Your Inquiry",
  }).eq("id", 1);

  await supabase.from("about_content").update({
    heading: "A little about us",
    body: "We started Amaya & Co. after shooting weddings across three countries and realising the best photographs happen when no one is posing. Our approach is quiet, observant, and a little old-fashioned.\nOver the last nine years we've photographed more than 180 weddings, from three-day Delhi celebrations to small courthouse ceremonies. Every one gets the same attention.",
    image: img("about1", 1000, 1250),
    philosophy: "Honest moments over posed perfection.",
    experience_years: 9,
  }).eq("id", 1);

  const services = [
    { title: "Wedding Photography", description: "Full-day coverage of your ceremony and celebrations, documented candidly from the first look to the last dance.", image: img("svc1"), price: "From ₹85,000", sort_order: 1 },
    { title: "Pre-Wedding Photography", description: "An easy, unscripted session with the two of you before the big day.", image: img("svc2"), price: "From ₹35,000", sort_order: 2 },
    { title: "Engagement Photography", description: "A relaxed hour or two to mark the beginning.", image: img("svc3"), price: "From ₹25,000", sort_order: 3 },
    { title: "Cinematic Wedding Films", description: "A short film that plays back like a memory.", image: img("svc4"), price: "From ₹65,000", sort_order: 4 },
    { title: "Traditional Photography", description: "Formal portraits alongside the candid coverage.", image: img("svc5"), price: "From ₹20,000", sort_order: 5 },
    { title: "Couple Portraits", description: "A dedicated portrait session, indoors or on location.", image: img("svc6"), price: "From ₹18,000", sort_order: 6 },
    { title: "Destination Weddings", description: "Full coverage for weddings outside Delhi, anywhere in the world.", image: img("svc7"), price: "Custom quote", sort_order: 7 },
  ];
  await supabase.from("services").insert(services);

  const portfolio = [
    { url: img("p1", 900, 1200), category: "Wedding", caption: "Garden ceremony, Delhi", alt_text: "Bride and groom during garden ceremony", featured: true, sort_order: 1 },
    { url: img("p2", 900, 700), category: "Pre-Wedding", caption: "Golden hour, Lodhi Gardens", alt_text: "Couple walking during golden hour", sort_order: 2 },
    { url: img("p3", 900, 1300), category: "Mehndi", caption: "Mehndi details", alt_text: "Close up of mehndi hands", featured: true, sort_order: 3 },
    { url: img("p4", 900, 700), category: "Sangeet", caption: "Sangeet night", alt_text: "Guests dancing at sangeet", sort_order: 4 },
    { url: img("p5", 900, 1100), category: "Haldi", caption: "Haldi morning", alt_text: "Haldi ceremony moment", sort_order: 5 },
    { url: img("p6", 900, 900), category: "Engagement", caption: "Ring ceremony", alt_text: "Engagement ring exchange", sort_order: 6 },
    { url: img("p7", 900, 1200), category: "Couple Portraits", caption: "Studio portrait", alt_text: "Couple portrait in soft light", featured: true, sort_order: 7 },
    { url: img("p8", 900, 700), category: "Reception", caption: "First dance", alt_text: "First dance at reception", sort_order: 8 },
    { url: img("p9", 900, 1250), category: "Wedding", caption: "Baraat entrance", alt_text: "Baraat procession", sort_order: 9 },
    { url: img("p10", 900, 800), category: "Pre-Wedding", caption: "Rooftop session", alt_text: "Pre-wedding rooftop shoot", sort_order: 10 },
  ];
  await supabase.from("portfolio_images").insert(portfolio);

  const stories = [
    {
      slug: "rahul-ananya", couple_name: "Rahul & Ananya", wedding_date: "2026-12-12", location: "Delhi",
      cover_image: img("s1", 1600, 1000),
      description: "Rahul and Ananya got married on a cold December evening at a farmhouse outside Delhi, surrounded by fairy lights and about 300 relatives.\nWe spent three days with them — mehndi, sangeet, and the wedding itself.",
      gallery: [img("s1a", 1000, 1300), img("s1b", 1000, 750), img("s1c", 1000, 1300), img("s1d", 1000, 750)],
      featured: true,
    },
    {
      slug: "arjun-meera", couple_name: "Arjun & Meera", wedding_date: "2026-02-08", location: "Udaipur",
      cover_image: img("s2", 1600, 1000),
      description: "A lakeside wedding in Udaipur with exactly the golden light you'd hope for.\nArjun proposed at the same hotel four years earlier.",
      gallery: [img("s2a", 1000, 1300), img("s2b", 1000, 750), img("s2c", 1000, 1300)],
      featured: true,
    },
    {
      slug: "aditya-riya", couple_name: "Aditya & Riya", wedding_date: "2026-11-02", location: "Goa",
      cover_image: img("s3", 1600, 1000),
      description: "A small, barefoot beach wedding for two families who flew in from three continents.",
      gallery: [img("s3a", 1000, 1300), img("s3b", 1000, 750)],
      featured: false,
    },
  ];
  await supabase.from("wedding_stories").insert(stories);

  const testimonials = [
    { name: "Ananya Kapoor", image: img("t1", 200, 200), review: "They disappeared into the background and somehow got every single moment we cared about.", rating: 5, wedding_info: "December 2026 · Delhi" },
    { name: "Meera Chopra", image: img("t2", 200, 200), review: "The pre-wedding shoot alone was worth it — we felt like we were on a walk with a friend.", rating: 5, wedding_info: "February 2026 · Udaipur" },
    { name: "Riya Malhotra", image: img("t3", 200, 200), review: "Our film still makes my mother cry. Cannot recommend them enough.", rating: 5, wedding_info: "November 2026 · Goa" },
  ];
  await supabase.from("testimonials").insert(testimonials);

  console.log("Seed complete.");
}

seed();
