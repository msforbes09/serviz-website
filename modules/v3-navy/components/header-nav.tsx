"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navItems } from "../lib/content";
import { QuickMessageDialog } from "./quick-message-dialog";

/**
 * Desktop navigation with a pill that moves to whichever route is active, plus
 * the mobile menu. The one client leaf in the v3 shell.
 *
 * The pill is a shared-layout element: one `motion.span` rendered inside the
 * active link, with a `layoutId` that is the same string on every item. When
 * the active route changes the old one unmounts and the new one mounts, and
 * Motion animates between the two boxes.
 *
 * That replaces measuring the active item by hand. The previous version kept
 * pixel offsets in state, re-measured on resize and again once web fonts
 * settled, and transitioned `width` — a property that triggers layout on every
 * frame. Motion animates position and size on the compositor and corrects the
 * border-radius distortion that scaling a pill would otherwise produce.
 */
export function HeaderNav() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  // The menu remembers which route it was opened on and counts as open only
  // while that is still the route. Any navigation therefore closes it — the
  // header logo sits outside this component, so this is what makes a tap on
  // it dismiss the panel rather than carry it, open, onto the next page — and
  // no effect has to set state to do it.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const menuOpen = openedOn === pathname;
  const setMenuOpen = (open: boolean) => setOpenedOn(open ? pathname : null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /**
   * The panel is a dropdown under the header, not a full-screen overlay, so it
   * owes Escape and focus return — but not a focus trap, a scroll lock or
   * `aria-modal`. Those are the contract for a modal dialog, which this is not;
   * v1's overlay is one and carries all of them.
   */
  useEffect(() => {
    if (!menuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpenedOn(null);
      toggleRef.current?.focus();
    }

    // A tap anywhere outside the panel and its toggle dismisses it — the
    // logo, the hero behind, anything. Route changes already close it, but
    // the logo on the home page goes to the same route, so the panel stayed.
    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (
        panelRef.current?.contains(target) ||
        toggleRef.current?.contains(target)
      ) {
        return;
      }
      setOpenedOn(null);
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [menuOpen]);

  // Apple-style spring rather than a duration curve. The bounce is what reads
  // as the pill settling into place instead of stopping dead, and a spring
  // carries velocity through an interruption — clicking a third item mid-flight
  // retargets from wherever the pill actually is.
  const pillTransition = reduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, duration: 0.45, bounce: 0.22 };

  return (
    <>
      <nav
        aria-label="Main"
        className="relative hidden items-center gap-1 min-[1001px]:flex"
      >
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`relative rounded-full px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors duration-[250ms] ${active ? "text-white" : "text-v3-ink hover:bg-v3-navy/5"}`}
            >
              {active && (
                <motion.span
                  aria-hidden
                  layoutId="v3-nav-pill"
                  // `initial={false}` so the pill is simply in place on first
                  // paint rather than animating in from nothing.
                  initial={false}
                  transition={pillTransition}
                  className="bg-v3-navy absolute inset-0 rounded-full"
                />
              )}
              <span className="relative">{item.label}</span>
            </Link>
          );
        })}
        <QuickMessageDialog
          subject="Quote request"
          className="bg-v3-rust hover:bg-v3-rust-bright ml-2.5 cursor-pointer rounded-full border-0 px-5 py-[11px] text-sm font-semibold whitespace-nowrap text-white transition-[transform,background-color] duration-200 ease-[cubic-bezier(.23,1,.32,1)] hover:-translate-y-px active:scale-[.97]"
        >
          Get a quote
        </QuickMessageDialog>
      </nav>

      <button
        ref={toggleRef}
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="v3-mobile-menu"
        className="border-v3-navy/20 flex size-11 flex-col items-center justify-center gap-[5px] rounded-xl border bg-white min-[1001px]:hidden"
      >
        <span className="bg-v3-navy block h-0.5 w-[18px]" />
        <span className="bg-v3-navy block h-0.5 w-[18px]" />
        <span className="bg-v3-navy block h-0.5 w-[18px]" />
      </button>

      {/* Collapses by animating a grid row to 0fr. The row can only reach
          zero if the child it measures has no padding or border of its own —
          those stay in the row's minimum, and 17px of the active item's navy
          showed through under the header on every page. So the clipping child
          carries nothing, and the padding and top border sit on a wrapper
          inside it, where the clip hides them. */}
      <div
        id="v3-mobile-menu"
        ref={panelRef}
        inert={!menuOpen}
        className={`bg-v3-paper absolute inset-x-0 top-full grid transition-[grid-template-rows] duration-200 ease-[cubic-bezier(.23,1,.32,1)] min-[1001px]:hidden ${menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="border-v3-navy/10 flex flex-col gap-1 border-t px-4 py-4">
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
            <QuickMessageDialog
              subject="Quote request"
              onClick={() => setMenuOpen(false)}
              className="bg-v3-rust mt-1.5 cursor-pointer rounded-xl border-0 px-4 py-3.5 text-center text-base font-semibold text-white"
            >
              Get a quote
            </QuickMessageDialog>
          </div>
        </div>
      </div>
    </>
  );
}
