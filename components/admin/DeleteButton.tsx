"use client";

import { useTransition } from "react";

export default function DeleteButton({
  action, confirmText = "Are you sure you want to delete this? This cannot be undone.",
}: { action: () => Promise<void>; confirmText?: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      className="btn danger small"
      disabled={isPending}
      onClick={() => {
        if (confirm(confirmText)) startTransition(() => action());
      }}
    >
      {isPending ? "Deleting…" : "Delete"}
    </button>
  );
}
