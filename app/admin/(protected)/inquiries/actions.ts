"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { InquiryStatus } from "@/types/database";

export async function updateInquiryStatus(id: string, status: InquiryStatus) {
  const supabase = createClient();
  const { error } = await supabase.from("inquiries").update({ status }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/inquiries");
  revalidatePath("/admin");
  return { success: true };
}
