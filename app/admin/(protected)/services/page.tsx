import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteService } from "./actions";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminServicesPage() {
  const supabase = createClient();
  const { data: services } = await supabase.from("services").select("*").order("sort_order");

  return (
    <div>
      <div className="flex justify-between items-center mb-7">
        <h1 className="text-[26px]">Services</h1>
        <Link href="/admin/services/new" className="btn small">+ Add Service</Link>
      </div>
      <div className="bg-white border border-line p-7">
        {!services || services.length === 0 ? (
          <div className="empty-state">No services yet. Click &quot;Add Service&quot; to create one.</div>
        ) : (
          <table className="w-full text-[13.5px] border-collapse">
            <thead>
              <tr className="text-left text-xs text-muted uppercase tracking-wide">
                <th className="p-2.5 border-b border-line">Image</th>
                <th className="p-2.5 border-b border-line">Title</th>
                <th className="p-2.5 border-b border-line">Price</th>
                <th className="p-2.5 border-b border-line">Active</th>
                <th className="p-2.5 border-b border-line"></th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s.id}>
                  <td className="p-2.5 border-b border-line">
                    {s.image && <div className="relative w-13 h-13"><Image src={s.image} alt={s.title} fill className="object-cover" /></div>}
                  </td>
                  <td className="p-2.5 border-b border-line">{s.title}</td>
                  <td className="p-2.5 border-b border-line">{s.price}</td>
                  <td className="p-2.5 border-b border-line">
                    <span className={s.active ? "badge bg-soft text-blue-deep px-2.5 py-0.5 text-xs" : "badge bg-[#eee] text-[#888] px-2.5 py-0.5 text-xs"}>
                      {s.active ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="p-2.5 border-b border-line">
                    <div className="flex gap-2">
                      <Link href={`/admin/services/${s.id}`} className="btn outline small">Edit</Link>
                      <DeleteButton action={deleteService.bind(null, s.id)} confirmText="Delete this service? This cannot be undone." />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
