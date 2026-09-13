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
    <div className="w-60 shrink-0 bg-ink text-white p-6.5">
      <Link href="/admin" className="font-serif text-lg text-white block mb-7.5">Amaya &amp; Co.</Link>
      <nav className="flex flex-col gap-0.5">
        {NAV.map((g, gi) => (
          <div key={gi}>
            {g.group && <div className="text-[11px] uppercase tracking-wide text-[#7B8AC2] mt-4.5 mb-1.5 px-3">{g.group}</div>}
            {g.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cx(
                  "px-3 py-2 text-sm rounded-sm text-[#CBD5F5] hover:bg-white/5 hover:text-white block",
                  pathname === item.href.split("?")[0] && "bg-blue text-white"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        ))}
        <div className="text-[11px] uppercase tracking-wide text-[#7B8AC2] mt-4.5 mb-1.5 px-3">&nbsp;</div>
        <Link href="/" className="px-3 py-2 text-sm text-[#CBD5F5] hover:bg-white/5 hover:text-white block">
          &larr; View Website
        </Link>
        <form action={logout}>
          <button className="px-3 py-2 text-sm text-[#CBD5F5] hover:bg-white/5 hover:text-white block w-full text-left">
            Logout
          </button>
        </form>
      </nav>
    </div>
  );
}
