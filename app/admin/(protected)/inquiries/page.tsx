import { createClient } from "@/lib/supabase/server";
import StatusSelect from "@/components/admin/StatusSelect";
import { cx } from "@/lib/utils";
import type { InquiryStatus } from "@/types/database";

const STATUSES: InquiryStatus[] = ["New", "Contacted", "Follow-up", "Confirmed", "Closed"];

export default async function AdminInquiriesPage({
  searchParams,
}: { searchParams: { status?: string } }) {
  const supabase = createClient();
  const status = searchParams.status;

  let query = supabase.from("inquiries").select("*").order("created_at", { ascending: false });
  if (status && STATUSES.includes(status as InquiryStatus)) query = query.eq("status", status);
  const { data: inquiries } = await query;

  return (
    <div>
      <h1 className="text-[26px] mb-5">{status ? `${status} Inquiries` : "All Inquiries"}</h1>
      <div className="flex gap-2 mb-6">
        <a href="/admin/inquiries" className={cx("btn small", !status ? "" : "outline")}>All</a>
        {STATUSES.map((s) => (
          <a key={s} href={`/admin/inquiries?status=${s}`} className={cx("btn small", status === s ? "" : "outline")}>{s}</a>
        ))}
      </div>
      <div className="bg-white border border-line p-7 overflow-x-auto">
        {!inquiries || inquiries.length === 0 ? (
          <div className="empty-state">No inquiries in this category.</div>
        ) : (
          <table className="w-full text-[13.5px] border-collapse min-w-[900px]">
            <thead>
              <tr className="text-left text-xs text-muted uppercase tracking-wide">
                <th className="p-2.5 border-b border-line">Name</th>
                <th className="p-2.5 border-b border-line">Contact</th>
                <th className="p-2.5 border-b border-line">Event</th>
                <th className="p-2.5 border-b border-line">Wedding Date</th>
                <th className="p-2.5 border-b border-line">Guests</th>
                <th className="p-2.5 border-b border-line">Message</th>
                <th className="p-2.5 border-b border-line">Status</th>
                <th className="p-2.5 border-b border-line">Received</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((i) => (
                <tr key={i.id}>
                  <td className="p-2.5 border-b border-line">{i.name}</td>
                  <td className="p-2.5 border-b border-line">
                    {i.email}<br /><span className="text-muted">{i.phone}</span>
                  </td>
                  <td className="p-2.5 border-b border-line">{i.event_type}{i.location ? ` — ${i.location}` : ""}</td>
                  <td className="p-2.5 border-b border-line">{i.wedding_date || "—"}</td>
                  <td className="p-2.5 border-b border-line">{i.guest_count ?? "—"}</td>
                  <td className="p-2.5 border-b border-line max-w-[220px]">{i.message}</td>
                  <td className="p-2.5 border-b border-line"><StatusSelect id={i.id} status={i.status} /></td>
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
