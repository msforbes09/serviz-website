"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

/**
 * Why a route change from a scrolled page could still look like a slide up.
 *
 * `data-scroll-behavior` on `<html>` (root layout) makes the router's jump to
 * the top instant once the new page lands. But with a prefetched route the
 * loading skeleton paints first, at whatever position the old page was
 * scrolled to, and the router does not scroll until the real page arrives —
 * so the visitor watched the skeleton sit halfway down and the page then
 * pop to the top.
 *
 * A link press to another route arms a flag; the skeleton, on mounting,
 * spends it on an instant scroll to the top. Back and forward never come from
 * a link press, so they keep the browser's own scroll restore. The flag is
 * dropped on any route change so it cannot outlive the navigation it was
 * armed for.
 */
let armed = false;

/** Mounted once in the v3 shell. Renders nothing. */
export function RouteTopArmer() {
  const pathname = usePathname();

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const anchor = (event.target as Element | null)?.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.origin !== window.location.origin) return;
      if (anchor.pathname === window.location.pathname) return;
      armed = true;
    }

    // Capture phase, so it runs before `Link`'s own handler starts the
    // navigation.
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  useEffect(() => {
    armed = false;
  }, [pathname]);

  return null;
}

/** Mounted inside the segment's `loading.tsx`. Renders nothing. */
export function LoadingAtTop() {
  // Layout effect: before the skeleton is painted, so there is no frame of
  // it at the old position.
  useLayoutEffect(() => {
    if (!armed) return;
    armed = false;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return null;
}
