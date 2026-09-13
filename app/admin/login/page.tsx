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
    <div className="min-h-screen bg-ink px-5 py-8 sm:px-8 sm:py-12">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-5xl overflow-hidden bg-white shadow-2xl lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative hidden overflow-hidden bg-blue-deep p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/20" />
          <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full border border-white/10" />
          <div className="relative">
            <div className="mb-8 flex h-12 w-12 items-center justify-center border border-white/60 font-serif text-2xl">A</div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#bdcaff]">Amaya &amp; Co.</div>
            <h1 className="mt-4 max-w-xs text-4xl leading-tight text-white">Make every story feel close.</h1>
          </div>
          <p className="relative max-w-xs text-sm leading-relaxed text-[#cbd5f5]">Your quiet workspace for publishing photographs, stories, services, and the details couples use to find you.</p>
        </div>
        <div className="flex items-center p-7 sm:p-12">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <div className="mb-4 flex h-11 w-11 items-center justify-center border border-blue font-serif text-xl text-blue">A</div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue">Amaya &amp; Co. / Studio</div>
            </div>
            <div className="admin-kicker mb-2">Private workspace</div>
            <h2 className="mb-2 text-3xl">Studio Admin</h2>
            <p className="mb-7 text-sm">Sign in to manage your website content.</p>
        <form action={handleSubmit}>
          <input type="hidden" name="redirectTo" value={redirectTo} />
          <label className="field-label">Email</label>
          <input className="field-input" name="email" type="email" required placeholder="studio@amaya.com" />
          <label className="field-label">Password</label>
          <input className="field-input" name="password" type="password" required />
          <button className="btn mt-6 w-full" type="submit" disabled={isPending}>
            {isPending ? "Signing in…" : "Sign In"}
          </button>
        </form>
        {error && <div className="mt-3 bg-[#FBEAE8] px-3 py-2 text-[13px] text-[#B4463E]">{error}</div>}
        <p className="mt-6 text-[12px] text-muted">
          <a href="/" className="text-blue">&larr; Back to website</a>
        </p>
            </div>
          </div>
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
