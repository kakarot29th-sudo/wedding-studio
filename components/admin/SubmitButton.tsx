"use client";

import { useFormStatus } from "react-dom";
import { cx } from "@/lib/utils";

export default function SubmitButton({
  children, className, pendingText = "Saving…",
}: { children: React.ReactNode; className?: string; pendingText?: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={cx("btn small", className)}>
      {pending ? pendingText : children}
    </button>
  );
}
