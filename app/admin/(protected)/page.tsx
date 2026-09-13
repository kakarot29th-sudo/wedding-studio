import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = createClient();

  const [{ count: portfolioCount }, { count: storiesCount }, { count: servicesCount }, { count: testimonialsCount }, { count: newInquiries }, { count: totalInquiries }, { data: recent }] =
    await Promise.all([
      supabase.from("portfolio_images").select("*", { count: "exact", head: true }),
      supabase.from("wedding_stories").select("*", { count: "exact", head: true }),
      supabase.from("services").select("*", { count: "exact", head: true }),
      supabase.from("testimonials").select("*", { count: "exact", head: true }),
      supabase.from("inquiries").select("*", { count: "exact", head: true }).eq("status", "New"),
      supabase.from("inquiries").select("*", { count: "exact", head: true }),
      supabase.from("inquiries").select("*").order("created_at", { ascending: false }).limit(5),
    ]);

  const stats = [
    { label: "Gallery Images", value: portfolioCount || 0 },
    { label: "Wedding Stories", value: storiesCount || 0 },
    { label: "Services", value: servicesCount || 0 },
    { label: "Testimonials", value: testimonialsCount || 0 },
    { label: "New Inquiries", value: newInquiries || 0 },
    { label: "Total Inquiries", value: totalInquiries || 0 },
  ];

  return (
    <div>
      <div className="admin-heading">
        <div>
          <div className="admin-kicker mb-2">Overview</div>
          <h1>Dashboard</h1>
          <p className="mt-2 max-w-xl text-sm">A quick view of your studio content and the latest couple inquiries.</p>
        </div>
        <Link href="/" className="btn outline small">View live site</Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-9">
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <div className="stat-card-value">{s.value}</div>
            <div className="stat-card-label">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="admin-panel">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
          <div>
            <div className="admin-kicker mb-2">Inbox</div>
            <h3 className="text-2xl">Recent inquiries</h3>
          </div>
          <Link href="/admin/inquiries" className="text-sm font-semibold text-blue hover:text-blue-deep">See all inquiries</Link>
        </div>
        {!recent || recent.length === 0 ? (
          <div className="empty-state">No inquiries yet. New submissions from the Contact page will show here.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr className="text-left text-xs text-muted uppercase tracking-wide">
                <th className="p-2.5 border-b border-line">Name</th>
                <th className="p-2.5 border-b border-line">Event</th>
                <th className="p-2.5 border-b border-line">Date</th>
                <th className="p-2.5 border-b border-line">Status</th>
                <th className="p-2.5 border-b border-line">Received</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((i) => (
                <tr key={i.id}>
                  <td className="p-2.5 border-b border-line">{i.name}</td>
                  <td className="p-2.5 border-b border-line">{i.event_type}</td>
                  <td className="p-2.5 border-b border-line">{i.wedding_date || "—"}</td>
                  <td className="p-2.5 border-b border-line">
                    <span className={`status-badge status-${i.status.toLowerCase().replace(/\s+/g, "-")}`}>{i.status}</span>
                  </td>
                  <td className="p-2.5 border-b border-line">{new Date(i.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
