"use client";

import { useState } from "react";
import { navLinks } from "../lib/content";

/**
 * The only interactive part of the v2 header, so the header itself stays a
 * Server Component.
 *
 * The panel animates on `grid-template-rows` rather than `height`, which is
 * what lets it transition to its natural height without a measured pixel
 * value. It stays in the DOM when closed so the transition has something to
 * animate; `inert` keeps a closed panel out of the tab order and away from
 * screen readers.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((wasOpen) => !wasOpen)}
        aria-expanded={open}
        aria-controls="v2-mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex size-11 flex-col items-center justify-center gap-[5px] border-0 bg-transparent min-[860px]:hidden"
      >
        <span
          className={`bg-v2-forest block h-0.5 w-[22px] rounded-sm transition-transform duration-200 ease-[cubic-bezier(.23,1,.32,1)] ${open ? "translate-y-[7px] rotate-45" : ""}`}
        />
        <span
          className={`bg-v2-forest block h-0.5 w-[22px] rounded-sm transition-opacity duration-150 ${open ? "opacity-0" : "opacity-100"}`}
        />
        <span
          className={`bg-v2-forest block h-0.5 w-[22px] rounded-sm transition-transform duration-200 ease-[cubic-bezier(.23,1,.32,1)] ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
        />
      </button>

      <div
        id="v2-mobile-menu"
        inert={!open}
        className={`bg-v2-cream absolute inset-x-0 top-full grid transition-[grid-template-rows] duration-200 ease-[cubic-bezier(.23,1,.32,1)] min-[860px]:hidden ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div
          className={`flex min-h-0 flex-col gap-1 overflow-hidden px-5 text-base font-medium transition-[opacity,transform,padding] duration-200 ease-[cubic-bezier(.23,1,.32,1)] ${open ? "translate-y-0 pt-2 pb-5 opacity-100" : "-translate-y-1.5 opacity-0"}`}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-v2-ink px-1 py-3"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="bg-v2-forest mt-2 rounded-xl px-[18px] py-3.5 text-center text-white"
          >
            Get a quote
          </a>
        </div>
      </div>
    </>
  );
}
