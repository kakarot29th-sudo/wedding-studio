import Link from "next/link";
import type { SiteSettings } from "@/types/database";

export default function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="bg-stone border-t border-line pt-16 pb-7">
      <div className="wrap">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="font-serif text-lg text-ink mb-2.5">{settings.site_name}</div>
            <p className="text-sm max-w-[260px]">
              {settings.tagline} — cinematic wedding photography for couples who want their day told honestly.
            </p>
          </div>
          <div>
            <h4 className="text-[13px] font-sans font-semibold text-ink mb-3.5">Explore</h4>
            <div className="flex flex-col gap-2.5 text-sm">
              <Link href="/portfolio">Portfolio</Link>
              <Link href="/stories">Wedding Stories</Link>
              <Link href="/services">Services</Link>
              <Link href="/testimonials">Testimonials</Link>
            </div>
          </div>
          <div>
            <h4 className="text-[13px] font-sans font-semibold text-ink mb-3.5">Connect</h4>
            <div className="flex flex-col gap-2.5 text-sm">
              {settings.instagram && <a href={settings.instagram} target="_blank" rel="noreferrer">Instagram</a>}
              {settings.facebook && <a href={settings.facebook} target="_blank" rel="noreferrer">Facebook</a>}
              {settings.youtube && <a href={settings.youtube} target="_blank" rel="noreferrer">YouTube</a>}
              {settings.email && <a href={`mailto:${settings.email}`}>{settings.email}</a>}
            </div>
          </div>
          <div>
            <h4 className="text-[13px] font-sans font-semibold text-ink mb-3.5">Studio</h4>
            <p className="text-sm mb-2">{settings.phone}</p>
            <p className="text-sm">{settings.address}</p>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-3 text-xs text-muted border-t border-line pt-5">
          <span>© {new Date().getFullYear()} {settings.site_name}. All rights reserved.</span>
          <span className="flex gap-2 items-center">
            <Link href="/privacy">Privacy Policy</Link> · <Link href="/terms">Terms</Link> ·{" "}
            <Link href="/admin/login" className="opacity-50">Studio Login</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
