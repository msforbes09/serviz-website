"use client";

import { useEffect } from "react";

/**
 * Drives the scroll entrance for `.reveal` elements.
 *
 * Mounted once per layout. It renders nothing and wraps nothing, so every
 * section it animates stays a Server Component.
 *
 * The whole design is one rule: **nothing is hidden until this is running and
 * able to show it again.** The stylesheet contains no resting `opacity: 0` for
 * these elements; the hidden state is gated behind `data-reveal-ready`, which
 * only this effect sets. If the bundle fails to load, throws, or the browser
 * has no `IntersectionObserver`, the page is simply visible with no animation.
 *
 * That is deliberately the inverse of e.gov.ph, which was the reference for
 * this work. It ships `opacity: 0` in the markup and waits on an observer;
 * scrolled through in a browser, seven of its elements were measured sitting
 * inside the viewport still invisible. The same failure once left this
 * project's own hero blank in a background tab.
 *
 * Why JavaScript at all, when the CSS scroll-timeline version needed none:
 * `animation-timeline: view()` is unsupported in older Safari and Firefox, and
 * there it does nothing at all — correct, but it means most visitors saw no
 * entrance. An observer works everywhere.
 */
export function RevealController() {
  useEffect(() => {
    // Both are reasons to leave the page exactly as the server sent it.
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal"),
    );
    if (targets.length === 0) return;

    const pending = new Set(targets);

    /**
     * Reveal anything currently inside the viewport, whatever the observer has
     * or has not said. Run once before arming, so above-the-fold content never
     * flashes out and back — and again as a safety net, because an observer
     * that exists but never fires is a real state: a hidden or backgrounded tab
     * does exactly that. It is the state e.gov.ph was measured in, with seven
     * elements inside the viewport still invisible.
     */
    function sweep() {
      for (const el of pending) {
        const box = el.getBoundingClientRect();
        if (box.top < window.innerHeight && box.bottom > 0) {
          el.dataset.revealed = "";
          pending.delete(el);
        }
      }
    }

    sweep();
    document.documentElement.dataset.revealReady = "";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.dataset.revealed = "";
          pending.delete(el);
          observer.unobserve(el);
        }
      },
      // A little before the edge, so an element is already moving by the time
      // it is properly in view rather than starting at the last moment.
      { rootMargin: "0px 0px -12% 0px" },
    );

    for (const el of pending) observer.observe(el);

    // A tab that was hidden at mount gets no observer callbacks; sweep when it
    // comes back. The timeout covers the same gap for anything else that keeps
    // the observer quiet.
    document.addEventListener("visibilitychange", sweep);
    const safetyNet = window.setTimeout(sweep, 1200);

    return () => {
      document.removeEventListener("visibilitychange", sweep);
      window.clearTimeout(safetyNet);
      observer.disconnect();
      // Disarming matters: leaving the flag set with no observer would strand
      // anything not yet revealed at opacity 0.
      delete document.documentElement.dataset.revealReady;
    };
  }, []);

  return null;
}
