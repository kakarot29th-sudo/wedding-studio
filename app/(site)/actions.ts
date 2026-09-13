"use server";

import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const InquirySchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(1, "Phone is required"),
  weddingDate: z.string().optional(),
  location: z.string().optional(),
  eventType: z.string().optional(),
  guestCount: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

export async function submitInquiry(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());
  const parsed = InquirySchema.safeParse(raw);

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message || "Please check the form and try again." };
  }

  const { name, email, phone, weddingDate, location, eventType, guestCount, message } = parsed.data;
  const supabase = createClient();

  const { error } = await supabase.from("inquiries").insert({
    name, email, phone,
    wedding_date: weddingDate || null,
    location: location || "",
    event_type: eventType || "Wedding",
    guest_count: guestCount ? parseInt(guestCount, 10) : null,
    message,
    status: "New",
  });

  if (error) {
    return { error: "Something went wrong sending your inquiry. Please try again or email us directly." };
  }

  return { success: true };
}
