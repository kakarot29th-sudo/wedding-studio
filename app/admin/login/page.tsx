"use client";

import { Suspense, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { login } from "@/app/admin/actions";

function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/admin";

  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await login(formData);
      if (result?.error) setError(result.error);
      // On success, `login` redirects server-side — nothing left to do here.
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink">
      <div className="bg-white p-12 w-[360px]">
        <h2 className="mb-1.5">Studio Admin</h2>
        <p className="text-[13px] text-muted mb-6.5">Sign in to manage your website content.</p>
        <form action={handleSubmit}>
          <input type="hidden" name="redirectTo" value={redirectTo} />
          <label className="field-label">Email</label>
          <input className="field-input" name="email" type="email" required placeholder="studio@amaya.com" />
          <label className="field-label">Password</label>
          <input className="field-input" name="password" type="password" required />
          <button className="btn w-full mt-5.5" type="submit" disabled={isPending}>
            {isPending ? "Signing in…" : "Sign In"}
          </button>
        </form>
        {error && <div className="text-[#B4463E] text-[13px] mt-2.5">{error}</div>}
        <p className="text-[12px] text-muted mt-5">
          <a href="/" className="text-blue">&larr; Back to website</a>
        </p>
      </div>
    </div>
  );
}

// This route is intentionally OUTSIDE the app/admin/(protected) route group
// (see app/admin/(protected)/layout.tsx) so it is never wrapped by the
// authenticated layout — that nesting was what caused the redirect loop.
export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
