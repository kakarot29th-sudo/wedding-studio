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
    <div className="flex min-h-screen bg-stone">
      <Sidebar />
      <div className="flex-1 p-9 overflow-x-auto">{children}</div>
    </div>
  );
}
