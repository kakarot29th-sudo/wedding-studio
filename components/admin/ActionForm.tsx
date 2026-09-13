"use client";

import { useRef, useState, useTransition } from "react";

type ActionResult = { error?: string; success?: boolean } | void;

export default function ActionForm({
  action, successMessage = "Changes saved successfully.", submitLabel = "Save Changes", children,
}: {
  action: (formData: FormData) => Promise<ActionResult>;
  successMessage?: string;
  submitLabel?: string;
  children: React.ReactNode;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  function handleSubmit(formData: FormData) {
    setMessage(null);
    startTransition(async () => {
      const result = await action(formData);
      if (result && "error" in result && result.error) {
        setMessage({ type: "error", text: result.error });
      } else {
        setMessage({ type: "success", text: successMessage });
      }
    });
  }

  return (
    <form ref={formRef} action={handleSubmit}>
      {children}
      <div className="flex items-center gap-4 mt-5">
        <button type="submit" disabled={isPending} className="btn small">
          {isPending ? "Saving…" : submitLabel}
        </button>
        {message && (
          <span className={message.type === "success" ? "text-blue text-sm" : "text-[#B4463E] text-sm"}>
            {message.text}
          </span>
        )}
      </div>
    </form>
  );
}
