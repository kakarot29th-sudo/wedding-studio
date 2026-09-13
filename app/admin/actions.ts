"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { error: "Incorrect email or password." };
  }

  // Only ever redirect back into /admin — never to an arbitrary external
  // or protocol-relative URL supplied via the redirectTo field.
  const requested = String(formData.get("redirectTo") || "/admin");
  const safeRedirect =
    requested.startsWith("/admin") && !requested.startsWith("//") ? requested : "/admin";

  redirect(safeRedirect);
}

export async function logout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
