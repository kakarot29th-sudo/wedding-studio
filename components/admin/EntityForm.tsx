"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type ActionResult = { error?: string; success?: boolean } | void;

export default function EntityForm({
  action, redirectTo, submitLabel = "Save Changes", children,
}: {
  action: (formData: FormData) => Promise<ActionResult>;
  redirectTo: string;
  submitLabel?: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await action(formData);
      if (result && "error" in result && result.error) {
        setError(result.error);
        return;
      }
      router.push(redirectTo);
      router.refresh();
    });
  }

  return (
    <form action={handleSubmit}>
      {children}
      <div className="flex items-center gap-4 mt-6.5">
        <button type="submit" disabled={isPending} className="btn small">
          {isPending ? "Saving…" : submitLabel}
        </button>
        <a href={redirectTo} className="btn outline small">Cancel</a>
        {error && <span className="text-[#B4463E] text-sm">{error}</span>}
      </div>
    </form>
  );
}
