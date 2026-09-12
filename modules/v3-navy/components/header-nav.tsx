"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { navItems } from "../lib/content";

type Pill = { x: number; w: number };

/**
 * Desktop navigation with a pill that slides to whichever route is active,
 * plus the mobile menu. The one client leaf in the v3 shell.
 *
 * The pill is measured rather than styled per-item because it animates
 * *between* items: its transform and width transition, which needs real pixel
 * values. Measurement runs in a layout effect so the pill is already in place
 * on the first paint, and again on resize and once web fonts settle, since
 * both change the items' widths.
 */
export function HeaderNav() {
  const pathname = usePathname();
  const trackRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState<Pill | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function measure() {
      const active = track?.querySelector<HTMLElement>('[data-active="true"]');
      if (!active) return;
      setPill({ x: active.offsetLeft, w: active.offsetWidth });
    }

    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure).catch(() => {});

    return () => window.removeEventListener("resize", measure);
  }, [pathname]);

  return (
    <>
      <nav
        ref={trackRef}
        aria-label="Main"
        className="relative isolate hidden items-center gap-1 min-[1001px]:flex"
      >
        <span
          aria-hidden
          style={{
            transform: `translateX(${pill?.x ?? 0}px) scale(${pill ? 1 : 0.9})`,
            width: pill ? `${pill.w}px` : 0,
            opacity: pill ? 1 : 0,
          }}
          className="bg-v3-navy absolute top-0 left-0 z-0 h-full rounded-full border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,.28),rgba(255,255,255,.04)_50%,rgba(0,0,0,.08))] shadow-[inset_0_1px_0_rgba(255,255,255,.35),inset_0_-1px_0_rgba(0,0,0,.25),0_8px_20px_rgba(15,42,68,.28)] transition-[transform,width,opacity] duration-[550ms] ease-[cubic-bezier(.32,.94,.36,1)]"
        />
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              data-active={active}
              aria-current={active ? "page" : undefined}
              className={`relative z-1 rounded-full px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors duration-[250ms] ${active ? "text-white" : "text-v3-ink hover:bg-v3-navy/5"}`}
            >
              {item.label}
            </Link>
          );
        })}
        <a
          href={`mailto:${siteConfig.contact.email}`}
          className="bg-v3-rust hover:bg-v3-rust-bright ml-2.5 rounded-full px-5 py-[11px] text-sm font-semibold whitespace-nowrap text-white transition-[transform,background-color] duration-200 ease-[cubic-bezier(.23,1,.32,1)] hover:-translate-y-px active:scale-[.97]"
        >
          Get a quote
        </a>
      </nav>

      <button
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="v3-mobile-menu"
        className="border-v3-navy/20 flex size-11 flex-col items-center justify-center gap-[5px] rounded-xl border bg-white min-[1001px]:hidden"
      >
        <span className="bg-v3-navy block h-0.5 w-[18px]" />
        <span className="bg-v3-navy block h-0.5 w-[18px]" />
        <span className="bg-v3-navy block h-0.5 w-[18px]" />
      </button>

      <div
        id="v3-mobile-menu"
        inert={!menuOpen}
        className={`border-v3-navy/10 bg-v3-paper absolute inset-x-0 top-full grid border-t transition-[grid-template-rows] duration-200 ease-[cubic-bezier(.23,1,.32,1)] min-[1001px]:hidden ${menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="flex min-h-0 flex-col gap-1 overflow-hidden px-4 pb-4">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-xl px-4 py-3.5 text-base font-medium ${active ? "bg-v3-navy text-white" : "text-v3-ink"}`}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            onClick={() => setMenuOpen(false)}
            className="bg-v3-rust mt-1.5 rounded-xl px-4 py-3.5 text-center text-base font-semibold text-white"
          >
            Get a quote
          </a>
        </div>
      </div>
    </>
  );
}
