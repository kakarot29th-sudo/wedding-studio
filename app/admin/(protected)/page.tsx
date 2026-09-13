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
      <h1 className="text-[26px] mb-7">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-9">
        {stats.map((s) => (
          <div key={s.label} className="bg-white border border-line p-5.5">
            <div className="font-serif text-[34px] text-ink">{s.value}</div>
            <div className="text-[12.5px] text-muted mt-1">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="bg-white border border-line p-7">
        <h3 className="text-lg mb-4.5">Recent inquiries</h3>
        {!recent || recent.length === 0 ? (
          <div className="empty-state">No inquiries yet. New submissions from the Contact page will show here.</div>
        ) : (
          <table className="w-full text-[13.5px] border-collapse">
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
                  <td className="p-2.5 border-b border-line">{i.status}</td>
                  <td className="p-2.5 border-b border-line">{new Date(i.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <Link href="/admin/inquiries" className="btn outline small mt-5 inline-flex">View all inquiries</Link>
      </div>
    </div>
  );
}
