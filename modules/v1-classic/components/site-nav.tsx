"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { navLinks } from "../lib/content";

const menuLinks = [
  ...navLinks,
  { href: "#contact", label: "Book a free consultation" },
] as const;

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

  return (
    <>
      <nav
        aria-label="Main"
        className="v1-nav-lift border-v1-line sticky top-0 z-50 border-b bg-[color-mix(in_srgb,var(--color-v1-paper)_92%,transparent)] backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-6 py-3">
          {/* `#top`, not `#main`. The main landmark starts below the nav, so
              jumping to it left the page short of the top by exactly the height
              of the bar, which is the bug this fixes. A fragment of "top" with
              no element to match is defined as the top of the document, so the
              href alone is correct and still works without scripting; the
              click handler makes it certain. The skip link keeps `#main`, since
              getting past the nav is the whole point of that one. */}
          <a
            href="#top"
            onClick={handleLogoClick}
            aria-label="SERBIZ home"
            className="flex items-center"
          >
            <Image
              src="/designs/v1/logo-full.png"
              alt="SERBIZ Resources Income Workers Cooperative"
              width={220}
              height={44}
              priority
              className="block h-11 w-auto"
            />
          </a>

          <div className="hidden items-center gap-6 text-sm font-medium min-[821px]:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-v1-ink hover:text-v1-orange transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
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

      <div
        ref={menuRef}
        id="v1-menu"
        inert={!open}
        className={`fixed inset-0 z-40 flex flex-col justify-center gap-4 bg-[color-mix(in_srgb,var(--color-v1-paper)_90%,transparent)] p-6 backdrop-blur-[40px] transition-opacity duration-[250ms] ease-[cubic-bezier(.23,1,.32,1)] min-[821px]:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        {menuLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className="text-v1-ink block text-3xl leading-9 font-semibold"
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
