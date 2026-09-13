"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

function parseTestimonialForm(formData: FormData) {
  return {
    name: String(formData.get("name") || "").trim(),
    image: String(formData.get("image") || ""),
    review: String(formData.get("review") || ""),
    rating: Math.min(5, Math.max(1, parseInt(String(formData.get("rating") || "5"), 10) || 5)),
    wedding_info: String(formData.get("wedding_info") || ""),
    active: formData.get("active") === "on",
  };
}

export async function createTestimonial(formData: FormData) {
  const values = parseTestimonialForm(formData);
  if (!values.name) return { error: "Client name is required." };

  const supabase = createClient();
  const { error } = await supabase.from("testimonials").insert(values);
  if (error) return { error: error.message };

  revalidatePath("/testimonials");
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  return { success: true };
}

export async function updateTestimonial(id: string, formData: FormData) {
  const values = parseTestimonialForm(formData);
  if (!values.name) return { error: "Client name is required." };

  const supabase = createClient();
  const { error } = await supabase.from("testimonials").update(values).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/testimonials");
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  return { success: true };
}

export async function deleteTestimonial(id: string) {
  const supabase = createClient();
  await supabase.from("testimonials").delete().eq("id", id);
  revalidatePath("/testimonials");
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}
