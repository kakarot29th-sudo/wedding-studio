"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/admin/actions";
import { cx } from "@/lib/utils";

const NAV: { group: string; items: { href: string; label: string }[] }[] = [
  { group: "", items: [{ href: "/admin", label: "Dashboard" }] },
  {
    group: "Website Content",
    items: [
      { href: "/admin/content/home", label: "Homepage" },
      { href: "/admin/content/about", label: "About" },
      { href: "/admin/services", label: "Services" },
      { href: "/admin/testimonials", label: "Testimonials" },
      { href: "/admin/content/contact", label: "Contact Information" },
      { href: "/admin/content/social", label: "Social Media" },
    ],
  },
  {
    group: "Portfolio",
    items: [
      { href: "/admin/portfolio", label: "All Images" },
      { href: "/admin/portfolio/upload", label: "Upload Images" },
    ],
  },
  {
    group: "Wedding Stories",
    items: [
      { href: "/admin/stories", label: "All Stories" },
      { href: "/admin/stories/new", label: "Add Story" },
    ],
  },
  {
    group: "Inquiries",
    items: [
      { href: "/admin/inquiries", label: "All Inquiries" },
      { href: "/admin/inquiries?status=New", label: "New" },
      { href: "/admin/inquiries?status=Follow-up", label: "Follow-up" },
      { href: "/admin/inquiries?status=Confirmed", label: "Confirmed" },
      { href: "/admin/inquiries?status=Closed", label: "Closed" },
    ],
  },
  {
    group: "Settings",
    items: [{ href: "/admin/settings/seo", label: "SEO Settings" }],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar w-full shrink-0 bg-ink text-white lg:sticky lg:top-0 lg:h-screen lg:w-[272px]">
      <div className="flex items-center justify-between px-5 py-5 lg:block lg:px-6 lg:py-7">
        <Link href="/admin" className="block text-white">
          <span className="font-serif text-[22px] tracking-tight">Amaya &amp; Co.</span>
          <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9eacd8]">Studio console</span>
        </Link>
        <Link href="/" className="text-[11px] text-[#cbd5f5] hover:text-white lg:hidden">View site</Link>
      </div>
      <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:block lg:overflow-visible lg:px-4 lg:pb-0">
        {NAV.map((g, gi) => (
          <div key={gi} className="shrink-0 lg:mb-1">
            {g.group && <div className="hidden text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7B8AC2] lg:mb-2 lg:mt-6 lg:block lg:px-3">{g.group}</div>}
            <div className="flex gap-1 lg:block">
              {g.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cx(
                    "block whitespace-nowrap rounded-md px-3 py-2.5 text-[13px] text-[#cbd5f5] hover:bg-white/10 hover:text-white lg:mb-0.5",
                    pathname === item.href.split("?")[0] && "bg-blue text-white shadow-lg shadow-blue/20"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
        <div className="hidden border-t border-white/10 pt-4 lg:mt-7 lg:block">
          <Link href="/" className="block px-3 py-2.5 text-[13px] text-[#cbd5f5] hover:text-white">View Website</Link>
          <form action={logout}>
            <button className="block w-full px-3 py-2.5 text-left text-[13px] text-[#cbd5f5] hover:text-white">Log out</button>
          </form>
        </div>
      </nav>
    </aside>
  );
}
