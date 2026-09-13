"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

function parsePortfolioForm(formData: FormData) {
  return {
    url: String(formData.get("url") || "").trim(),
    category: String(formData.get("category") || "Wedding"),
    caption: String(formData.get("caption") || ""),
    alt_text: String(formData.get("alt_text") || ""),
    sort_order: parseInt(String(formData.get("sort_order") || "0"), 10) || 0,
    featured: formData.get("featured") === "on",
  };
}

export async function createPortfolioImage(formData: FormData) {
  const values = parsePortfolioForm(formData);
  if (!values.url) return { error: "Image URL is required." };

  const supabase = createClient();
  const { error } = await supabase.from("portfolio_images").insert(values);
  if (error) return { error: error.message };

  revalidatePath("/portfolio");
  revalidatePath("/");
  revalidatePath("/admin/portfolio");
  return { success: true };
}

export async function updatePortfolioImage(id: string, formData: FormData) {
  const values = parsePortfolioForm(formData);
  if (!values.url) return { error: "Image URL is required." };

  const supabase = createClient();
  const { error } = await supabase.from("portfolio_images").update(values).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/portfolio");
  revalidatePath("/");
  revalidatePath("/admin/portfolio");
  return { success: true };
}

export async function deletePortfolioImage(id: string) {
  const supabase = createClient();
  await supabase.from("portfolio_images").delete().eq("id", id);
  revalidatePath("/portfolio");
  revalidatePath("/");
  revalidatePath("/admin/portfolio");
}
