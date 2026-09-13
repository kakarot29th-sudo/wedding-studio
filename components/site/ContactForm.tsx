"use client";

import { useRef, useState, useTransition } from "react";
import { submitInquiry } from "@/app/(site)/actions";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await submitInquiry(formData);
      if (result?.error) {
        setError(result.error);
        return;
      }
      setSuccess(true);
      formRef.current?.reset();
    });
  }

  return (
    <form ref={formRef} action={handleSubmit}>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="field-label">Name</label>
          <input className="field-input" required name="name" />
        </div>
        <div>
          <label className="field-label">Email</label>
          <input className="field-input" required type="email" name="email" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="field-label">Phone</label>
          <input className="field-input" required name="phone" />
        </div>
        <div>
          <label className="field-label">Wedding Date</label>
          <input className="field-input" type="date" name="weddingDate" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="field-label">Wedding Location</label>
          <input className="field-input" name="location" />
        </div>
        <div>
          <label className="field-label">Event Type</label>
          <select className="field-input" name="eventType">
            <option>Wedding</option>
            <option>Pre-Wedding</option>
            <option>Engagement</option>
            <option>Destination Wedding</option>
            <option>Other</option>
          </select>
        </div>
      </div>
      <label className="field-label">Estimated Guest Count</label>
      <input className="field-input" type="number" min={0} name="guestCount" />
      <label className="field-label">Message</label>
      <textarea className="field-input" name="message" rows={4} required placeholder="Tell us a little about your day..." />

      <button className="btn mt-5" type="submit" disabled={isPending}>
        {isPending ? "Sending…" : "Send Inquiry"}
      </button>

      {error && <div className="mt-4 bg-[#FBEAE8] text-[#8A3630] px-4 py-3 text-sm">{error}</div>}
      {success && (
        <div className="mt-4 bg-soft text-blue-deep px-4 py-3 text-sm">
          Thank you — your inquiry has been sent. We&apos;ll be in touch within 48 hours.
        </div>
      )}
    </form>
  );
}
