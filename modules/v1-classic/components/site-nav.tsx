"use client";

import Image from "next/image";
import { useState } from "react";
import { navLinks } from "../lib/content";

/**
 * v1's navigation. A client component because the mobile panel is a
 * full-screen overlay whose open state lives here; the rest of the v1 page is
 * server-rendered.
 */
export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav
        aria-label="Main"
        className="border-v1-line sticky top-0 z-50 border-b bg-[color-mix(in_srgb,var(--color-v1-paper)_92%,transparent)] backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-6 py-3">
          <a href="#main" aria-label="SERBIZ home" className="flex items-center">
            <Image
              src="/designs/v1/logo-full.jpg"
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
        id="v1-menu"
        inert={!open}
        className={`fixed inset-0 z-40 flex flex-col justify-center gap-4 bg-[color-mix(in_srgb,var(--color-v1-paper)_90%,transparent)] p-6 backdrop-blur-[40px] transition-opacity duration-[250ms] ease-[cubic-bezier(.23,1,.32,1)] min-[821px]:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        {[...navLinks, { href: "#contact", label: "Book a free consultation" }].map(
          (link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-v1-ink block text-3xl leading-9 font-semibold"
            >
              {link.label}
            </a>
          ),
        )}
      </div>
    </>
  );
}
