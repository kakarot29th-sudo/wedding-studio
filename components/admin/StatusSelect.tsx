"use client";

import { useTransition } from "react";
import { updateInquiryStatus } from "@/app/admin/(protected)/inquiries/actions";
import type { InquiryStatus } from "@/types/database";

const STATUSES: InquiryStatus[] = ["New", "Contacted", "Follow-up", "Confirmed", "Closed"];

export default function StatusSelect({ id, status }: { id: string; status: InquiryStatus }) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      className={`status-select status-${status.toLowerCase().replace(/\s+/g, "-")} text-xs px-2 py-1.5 border border-line w-auto`}
      defaultValue={status}
      disabled={isPending}
      onChange={(e) => {
        startTransition(() => {
          void updateInquiryStatus(id, e.target.value as InquiryStatus);
        });
      }}
    >
      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
    </select>
  );
}
