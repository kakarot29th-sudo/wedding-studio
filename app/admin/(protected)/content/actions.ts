"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateHomepage(formData: FormData) {
  const supabase = createClient();
  const { error } = await supabase.from("homepage_content").update({
    hero_heading: String(formData.get("hero_heading") || ""),
    hero_subheading: String(formData.get("hero_subheading") || ""),
    hero_image: String(formData.get("hero_image") || ""),
    hero_cta_primary: String(formData.get("hero_cta_primary") || ""),
    hero_cta_secondary: String(formData.get("hero_cta_secondary") || ""),
    cta_heading: String(formData.get("cta_heading") || ""),
    cta_description: String(formData.get("cta_description") || ""),
    cta_button_text: String(formData.get("cta_button_text") || ""),
  }).eq("id", 1);

  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/content/home");
  return { success: true };
}

export async function updateAbout(formData: FormData) {
  const supabase = createClient();
  const { error } = await supabase.from("about_content").update({
    heading: String(formData.get("heading") || ""),
    body: String(formData.get("body") || ""),
    image: String(formData.get("image") || ""),
    philosophy: String(formData.get("philosophy") || ""),
    experience_years: parseInt(String(formData.get("experience_years") || "0"), 10) || 0,
  }).eq("id", 1);

  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/admin/content/about");
  return { success: true };
}

export async function updateContactInfo(formData: FormData) {
  const supabase = createClient();
  const { error } = await supabase.from("site_settings").update({
    site_name: String(formData.get("site_name") || ""),
    tagline: String(formData.get("tagline") || ""),
    phone: String(formData.get("phone") || ""),
    email: String(formData.get("email") || ""),
    address: String(formData.get("address") || ""),
  }).eq("id", 1);

  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  revalidatePath("/admin/content/contact");
  return { success: true };
}

export async function updateSocial(formData: FormData) {
  const supabase = createClient();
  const { error } = await supabase.from("site_settings").update({
    instagram: String(formData.get("instagram") || ""),
    facebook: String(formData.get("facebook") || ""),
    youtube: String(formData.get("youtube") || ""),
  }).eq("id", 1);

  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  revalidatePath("/admin/content/social");
  return { success: true };
}

export async function updateSeo(formData: FormData) {
  const supabase = createClient();
  const { error } = await supabase.from("seo_settings").update({
    title: String(formData.get("title") || ""),
    description: String(formData.get("description") || ""),
    keywords: String(formData.get("keywords") || ""),
    og_image: String(formData.get("og_image") || ""),
  }).eq("id", 1);

  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  revalidatePath("/admin/settings/seo");
  return { success: true };
}
