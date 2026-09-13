"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cx } from "@/lib/utils";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/stories", label: "Wedding Stories" },
  { href: "/services", label: "Services" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

export default function Nav({ siteName }: { siteName: string }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cx(
        "sticky top-0 z-50 bg-white/95 backdrop-blur transition-colors",
        scrolled ? "border-b border-line" : "border-b border-transparent"
      )}
    >
      <div className="wrap flex items-center justify-between py-4.5">
        <Link href="/" className="group flex items-center gap-3 text-ink">
          <span className="flex h-9 w-9 items-center justify-center border border-blue text-blue font-serif text-lg transition-transform group-hover:rotate-6">A</span>
          <span>
            <span className="block font-serif text-xl leading-none">{siteName}</span>
            <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.18em] text-muted">Wedding photography</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-7 text-[13px] font-medium">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cx(
                "opacity-80 hover:opacity-100 hover:text-blue transition",
                pathname === l.href && "opacity-100 text-blue"
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link href="/contact" className="btn small hidden md:inline-flex">Book a Consultation</Link>
          <button
            className="md:hidden flex flex-col gap-1.5 p-1.5"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="w-5.5 h-px bg-ink block" />
            <span className="w-5.5 h-px bg-ink block" />
            <span className="w-5.5 h-px bg-ink block" />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden flex flex-col gap-4 px-5 pb-6 pt-4 border-t border-line bg-white">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-[15px]">
              {l.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)} className="btn small w-fit">
            Book a Consultation
          </Link>
        </div>
      )}
    </nav>
  );
}
