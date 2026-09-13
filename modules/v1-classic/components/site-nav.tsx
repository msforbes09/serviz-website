"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { navLinks } from "../lib/content";
import { jumpTo, sectionFor } from "./section-link";

const menuLinks = [
  ...navLinks,
  { href: "#contact", label: "Book a free consultation" },
] as const;

// "Resources Income Workers Cooperative", read off the legal name rather than
// typed a second time, so the bar cannot drift from `site-config.ts`.
const descriptor = siteConfig.legalName.replace(siteConfig.name, "").trim();

/**
 * v1's navigation. A client component because the mobile panel is a
 * full-screen overlay whose open state lives here; the rest of the v1 page is
 * server-rendered.
 *
 * The overlay is a disclosure, so it owes the visitor the whole behaviour, not
 * just the visual: focus moves in when it opens and back to the toggle when it
 * closes, Escape dismisses it, Tab cycles within it rather than wandering into
 * the page it is covering, and the page underneath does not scroll.
 */
export function SiteNav() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pendingJump = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    // Restore whatever was there rather than assuming it was unset — the
    // value may belong to something else on the page.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const links = () =>
      Array.from(menuRef.current?.querySelectorAll("a") ?? []);

    links()[0]?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;

      // The toggle doubles as the close button, so it belongs in the cycle —
      // first, because the nav is rendered before the overlay and that is
      // where the browser's own tab order would put it.
      const focusable = [toggleRef.current, ...links()].filter(
        (element) => element !== null,
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function handleLogoClick(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    // No `behavior` given, so this defers to the CSS `scroll-behavior`: smooth
    // normally, instant for a visitor who asked for reduced motion. Passing
    // "smooth" here would animate for them regardless of that preference.
    //
    // Belt and braces over the `#top` href, which is correct per the HTML spec
    // but could not be observed working in this environment. Also keeps the
    // fragment out of the address bar.
    window.scrollTo({ top: 0 });
  }

  // A jump chosen from the overlay runs here, after the lock effect above has
  // handed the page back. Cleanups run before the next effects, so by the time
  // this sees `open` go false the body's overflow is already restored. A
  // smooth scroll begun while the body was still locked is dropped when the
  // lock lifts a frame later, which left the menu's links doing nothing.
  useEffect(() => {
    if (open || !pendingJump.current) return;
    jumpTo(pendingJump.current);
    pendingJump.current = null;
  }, [open]);

  function handleSectionClick(event: React.MouseEvent<HTMLAnchorElement>) {
    const target = sectionFor(event);
    if (target) jumpTo(target);
  }

  function handleMenuClick(event: React.MouseEvent<HTMLAnchorElement>) {
    pendingJump.current = sectionFor(event);
    setOpen(false);
  }

  return (
    <>
      <nav
        aria-label="Main"
        className="v1-nav-lift border-v1-line sticky top-0 z-50 h-(--v1-nav-height) border-b bg-[color-mix(in_srgb,var(--color-v1-paper)_92%,transparent)] backdrop-blur-md"
      >
        <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between gap-6 px-6">
          {/* `#top`, not `#main`. The main landmark starts below the nav, so
              jumping to it left the page short of the top by exactly the height
              of the bar, which is the bug this fixes. A fragment of "top" with
              no element to match is defined as the top of the document, so the
              href alone is correct and still works without scripting; the
              click handler makes it certain. The skip link keeps `#main`, since
              getting past the nav is the whole point of that one. */}
          {/* The mark plus real text, not the full wordmark PNG: that file
              carried its own white ground, which sat as a box on the paper
              bar. The mark alone is transparent, and type takes whatever is
              behind it. */}
          <a
            href="#top"
            onClick={handleLogoClick}
            aria-label="SERBIZ home"
            className="flex min-w-0 items-center gap-2.5"
          >
            <Image
              src="/designs/v1/logo-mark.png"
              alt=""
              width={40}
              height={40}
              priority
              className="size-10 shrink-0 object-contain"
            />
            <span className="flex min-w-0 flex-col leading-[1.05]">
              <span className="font-outfit text-v1-ink text-[22px] font-extrabold tracking-[0.12em]">
                {siteConfig.name}
              </span>
              <span className="text-v1-muted truncate text-[10px] tracking-[0.02em]">
                {descriptor}
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-6 text-sm font-medium min-[821px]:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleSectionClick}
                className="text-v1-ink hover:text-v1-orange transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={handleSectionClick}
              className="bg-v1-forest hover:bg-v1-orange rounded-lg px-3 py-2 font-semibold text-white transition-colors"
            >
              Book a free consultation
            </a>
          </div>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((wasOpen) => !wasOpen)}
            aria-expanded={open}
            aria-controls="v1-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative size-11 min-[821px]:hidden"
          >
            <span
              className={`bg-v1-ink absolute left-[11px] block h-0.5 w-[22px] rounded-sm transition-transform duration-[250ms] ease-[cubic-bezier(.77,0,.175,1)] ${open ? "top-[21px] rotate-45" : "top-[15px]"}`}
            />
            <span
              className={`bg-v1-ink absolute left-[11px] block h-0.5 w-[22px] rounded-sm transition-transform duration-[250ms] ease-[cubic-bezier(.77,0,.175,1)] ${open ? "top-[21px] -rotate-45" : "top-[27px]"}`}
            />
          </button>
        </div>
      </nav>

      {/* A dialog, and modal while it is open. The Tab cycle above only
          constrains the keyboard; `aria-modal` is what hides the page behind
          it from a screen reader's virtual cursor, which would otherwise read
          straight through the overlay. Only while open, so the closed panel
          never hides the page. `overscroll-contain` stops a scroll gesture
          that reaches the end of the overlay from chaining to the body, which
          `overflow: hidden` alone does not prevent on iOS. */}
      <div
        ref={menuRef}
        id="v1-menu"
        role="dialog"
        aria-modal={open || undefined}
        aria-label="Menu"
        inert={!open}
        className={`fixed inset-0 z-40 flex flex-col justify-center gap-4 overscroll-contain bg-[color-mix(in_srgb,var(--color-v1-paper)_90%,transparent)] p-6 backdrop-blur-[40px] transition-opacity duration-[250ms] ease-[cubic-bezier(.23,1,.32,1)] min-[821px]:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        {menuLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={handleMenuClick}
            className="text-v1-ink block text-3xl leading-9 font-semibold"
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
