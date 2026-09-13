import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Sidebar from "@/components/admin/Sidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Middleware already protects /admin/*, but a Server Component check
  // here is the real authorization boundary — never trust the client.
  if (!user) redirect("/admin/login");

  return (
    <div className="admin-shell flex min-h-screen flex-col lg:flex-row">
      <Sidebar />
      <main className="admin-main">
        <div className="admin-content">{children}</div>
      </main>
    </div>
  );
}
