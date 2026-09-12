"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { navItems } from "../lib/content";

type Box = { x: number; w: number };

/** Blob width before scaling. Only ever scaled, never animated as `width`. */
const BLOB_BASE = 100;

/**
 * Desktop navigation with a pill that flows to whichever route is active, plus
 * the mobile menu. The one client leaf in the v3 shell.
 *
 * The pill is two blobs, not one, sitting in a layer behind the labels with an
 * SVG gooey filter on it. The leader springs stiffly to the new item, the
 * trailer follows slackly; while they are apart the filter welds them into a
 * stretched liquid shape, and as the trailer catches up they merge back into a
 * single pill.
 *
 * Two consequences worth knowing:
 *
 * 1. The filter blurs everything in its subtree, so the labels *cannot* live
 *    inside it. They sit in the normal flow above a `pointer-events-none`
 *    filtered layer.
 * 2. This needs real coordinates, so the measurement the plain version deleted
 *    comes back. A shared `layoutId` positions one element implicitly; two
 *    blobs at different spring rates have to be told where to go.
 *
 * The blobs are transformed, never resized — `scaleX` against a fixed base
 * width. Scaling a rounded pill would normally give elliptical end caps, but
 * the filter re-rounds every edge it touches, so the distortion is invisible.
 */
export function HeaderNav() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLElement>(null);
  const [box, setBox] = useState<Box | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function measure() {
      const active = track?.querySelector<HTMLElement>('[data-active="true"]');
      if (!active) return;
      setBox({ x: active.offsetLeft, w: active.offsetWidth });
    }

    measure();
    window.addEventListener("resize", measure);
    // Web fonts change every item's width once they land.
    document.fonts?.ready.then(measure).catch(() => {});

    return () => window.removeEventListener("resize", measure);
  }, [pathname]);

  /**
   * The panel is a dropdown under the header, not a full-screen overlay, so it
   * owes Escape and focus return — but not a focus trap, a scroll lock or
   * `aria-modal`. Those are the contract for a modal dialog, which this is not.
   */
  useEffect(() => {
    if (!menuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      toggleRef.current?.focus();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const blobStyle = box
    ? { transform: `translateX(${box.x}px) scaleX(${box.w / BLOB_BASE})` }
    : { transform: "translateX(0px) scaleX(0)" };

  // The gap between the two springs is the whole effect. Matched rates would
  // move the blobs as one and never stretch; too wide a gap and they separate
  // far enough for the filter to stop bridging them.
  const leader = { type: "spring" as const, duration: 0.42, bounce: 0.24 };
  const trailer = { type: "spring" as const, duration: 0.62, bounce: 0.18 };

  return (
    <>
      <nav
        ref={trackRef}
        aria-label="Main"
        className="relative hidden items-center gap-1 min-[1001px]:flex"
      >
        {box && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 [filter:url(#v3-nav-goo)]"
          >
            {/* Reduced motion gets one blob and no travel: the shape is the
                affordance, the liquid is the decoration. */}
            {!reduceMotion && (
              <motion.span
                animate={blobStyle}
                transition={trailer}
                style={{ width: BLOB_BASE, transformOrigin: "left center" }}
                className="bg-v3-navy absolute top-0 left-0 h-full rounded-full"
              />
            )}
            <motion.span
              animate={blobStyle}
              transition={reduceMotion ? { duration: 0 } : leader}
              style={{ width: BLOB_BASE, transformOrigin: "left center" }}
              className="bg-v3-navy absolute top-0 left-0 h-full rounded-full"
            />
          </div>
        )}

        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              data-active={active}
              aria-current={active ? "page" : undefined}
              className={`relative rounded-full px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors duration-[250ms] ${active ? "text-white" : "text-v3-ink hover:bg-v3-navy/5"}`}
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

        {/* Blur, then crank the alpha contrast so blurred edges snap back to
            hard ones. Where two blobs are close enough for their blurs to
            overlap, the contrast pass welds them into a single shape. */}
        <svg aria-hidden className="pointer-events-none absolute size-0">
          <defs>
            <filter id="v3-nav-goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -11"
              />
            </filter>
          </defs>
        </svg>
      </nav>

      <button
        ref={toggleRef}
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
