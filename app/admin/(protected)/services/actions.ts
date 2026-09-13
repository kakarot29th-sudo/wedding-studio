"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

function parseServiceForm(formData: FormData) {
  return {
    title: String(formData.get("title") || "").trim(),
    description: String(formData.get("description") || ""),
    image: String(formData.get("image") || ""),
    price: String(formData.get("price") || ""),
    sort_order: parseInt(String(formData.get("sort_order") || "0"), 10) || 0,
    active: formData.get("active") === "on",
  };
}

export async function createService(formData: FormData) {
  const values = parseServiceForm(formData);
  if (!values.title) return { error: "Title is required." };

  const supabase = createClient();
  const { error } = await supabase.from("services").insert(values);
  if (error) return { error: error.message };

  revalidatePath("/services");
  revalidatePath("/");
  revalidatePath("/admin/services");
  return { success: true };
}

export async function updateService(id: string, formData: FormData) {
  const values = parseServiceForm(formData);
  if (!values.title) return { error: "Title is required." };

  const supabase = createClient();
  const { error } = await supabase.from("services").update(values).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/services");
  revalidatePath("/");
  revalidatePath("/admin/services");
  return { success: true };
}

export async function deleteService(id: string) {
  const supabase = createClient();
  await supabase.from("services").delete().eq("id", id);
  revalidatePath("/services");
  revalidatePath("/");
  revalidatePath("/admin/services");
}
