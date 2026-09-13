"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/utils";

function parseStoryForm(formData: FormData) {
  const gallery = String(formData.get("gallery") || "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  return {
    couple_name: String(formData.get("couple_name") || "").trim(),
    wedding_date: String(formData.get("wedding_date") || "") || null,
    location: String(formData.get("location") || ""),
    cover_image: String(formData.get("cover_image") || ""),
    description: String(formData.get("description") || ""),
    gallery,
    featured: formData.get("featured") === "on",
  };
}

export async function createStory(formData: FormData) {
  const values = parseStoryForm(formData);
  if (!values.couple_name) return { error: "Couple name is required." };

  const supabase = createClient();
  let slug = slugify(values.couple_name);

  // ensure slug uniqueness
  const { data: existing } = await supabase.from("wedding_stories").select("slug").ilike("slug", `${slug}%`);
  if (existing && existing.some((e) => e.slug === slug)) {
    slug = `${slug}-${Date.now().toString().slice(-5)}`;
  }

  const { error } = await supabase.from("wedding_stories").insert({ ...values, slug });
  if (error) return { error: error.message };

  revalidatePath("/stories");
  revalidatePath("/");
  revalidatePath("/admin/stories");
  return { success: true };
}

export async function updateStory(id: string, formData: FormData) {
  const values = parseStoryForm(formData);
  if (!values.couple_name) return { error: "Couple name is required." };

  const supabase = createClient();
  const { error } = await supabase.from("wedding_stories").update(values).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/stories");
  revalidatePath("/");
  revalidatePath("/admin/stories");
  return { success: true };
}

export async function deleteStory(id: string) {
  const supabase = createClient();
  await supabase.from("wedding_stories").delete().eq("id", id);
  revalidatePath("/stories");
  revalidatePath("/");
  revalidatePath("/admin/stories");
}
