import Image from "next/image";
import Link from "next/link";
import { cacheLife } from "next/cache";
import { officeAddress, siteConfig } from "@/lib/site-config";
import { navItems } from "../lib/content";

async function CopyrightYear() {
  "use cache";
  cacheLife("days");

  return <>{new Date().getFullYear()}</>;
}

export function SiteFooter() {
  return (
    <footer className="bg-v3-navy-darkest relative overflow-hidden text-white [--v3-focus-ring:var(--color-v3-paper)]">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1.5 bg-[linear-gradient(90deg,var(--color-v3-rust)_0_40%,var(--color-v3-sky)_40%_55%,var(--color-v3-navy)_55%_100%)]"
      />
      <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-9 px-5 pt-14 pb-8">
        <div>
          {/* Mark plus text, not the wordmark PNG: that file spelled out an
              "(SRI)" the cooperative no longer uses, and type can be set in
              the same face as the header. */}
          <p className="mb-4 flex items-center gap-2.5">
            <Image
              src="/designs/v3/logo-mark.png"
              alt=""
              width={40}
              height={40}
              className="size-10 shrink-0 object-contain"
            />
            <span className="flex flex-col leading-[1.05]">
              <span className="font-orbitron text-[21px] font-black tracking-[0.06em] text-white">
                {siteConfig.name}
              </span>
              <span className="text-v3-on-dark-muted text-[10px] tracking-[0.02em]">
                Resources Income Workers Cooperative
              </span>
            </span>
          </p>
          <p className="text-v3-on-dark-muted max-w-[320px] text-sm leading-relaxed">
            Payroll &amp; accounting outsourcing for sole proprietors,
            one-person corporations and SMEs.
          </p>
        </div>

        <div>
          <h2 className="text-v3-sky mb-3.5 text-xs font-semibold tracking-[0.14em] uppercase">
            Pages
          </h2>
          {/* A wrapped row, not a column: five short links flow across two or
              three lines rather than stacking five deep. */}
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-v3-rust text-[15px] text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h2 className="text-v3-sky mb-3.5 text-xs font-semibold tracking-[0.14em] uppercase">
            Contact
          </h2>
          <div className="grid gap-2 text-[15px] leading-normal [overflow-wrap:anywhere]">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="hover:text-v3-rust text-white"
            >
              {siteConfig.contact.email}
            </a>
            <a
              href={`tel:${siteConfig.contact.mobileTel}`}
              className="hover:text-v3-rust text-white"
            >
              {siteConfig.contact.phones.mobile}
            </a>
            <a
              href={siteConfig.contact.facebook}
              target="_blank"
              rel="noopener"
              className="hover:text-v3-rust text-white"
            >
              {siteConfig.contact.facebookHandle}
            </a>
            <span className="text-v3-on-dark-muted">{officeAddress}</span>
          </div>
        </div>
      </div>

      <div className="text-v3-on-dark-muted mx-auto flex max-w-[1200px] flex-wrap justify-between gap-2.5 border-t border-white/10 px-5 pt-5 pb-7 text-[13px]">
        <span>
          © <CopyrightYear /> {siteConfig.legalName}
        </span>
        <span>{siteConfig.motto}</span>
      </div>
    </footer>
  );
}
