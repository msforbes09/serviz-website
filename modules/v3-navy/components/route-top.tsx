"use client";

import { useEffect } from "react";

/**
 * Renders nothing. Scrolls the window to the top the instant a link to
 * another route is pressed, before the router does anything.
 *
 * Two things went wrong when the visitor changed page from a scrolled one,
 * and both come from the scroll position changing part-way through the
 * navigation. The nav pill is a Motion shared-layout element measured in
 * page coordinates: the old pill was snapshotted at the old scroll and the
 * new one measured at the top, so the scroll distance landed in the pill's
 * start position and it slid up from below the fold. And a prefetched
 * route's loading skeleton painted at the old position and only jumped to
 * the top when the real page landed.
 *
 * Scrolling first means every measurement the navigation makes happens at
 * the top. `data-scroll-behavior` on `<html>` (root layout) still covers the
 * router's own jump for navigations that do not come through a link press.
 * Back and forward do not come through here and keep the browser's restore.
 *
 * A capture-phase listener on the document rather than a handler on each
 * `Link`: the header, footer and hero all link between routes, and one
 * listener covers a link added later without it having to know.
 */
export function RouteTop() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const anchor = (event.target as Element | null)?.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.origin !== window.location.origin) return;
      if (anchor.pathname === window.location.pathname) return;
      window.scrollTo({ top: 0, behavior: "instant" });
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}
