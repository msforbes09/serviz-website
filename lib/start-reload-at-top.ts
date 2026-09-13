/**
 * Browsers restore the previous scroll position on reload, which lands a
 * returning visitor mid-page after the hero has already entered. This opts a
 * reload — only a reload — out of that, so the page starts at the top and the
 * entrances play. Back and forward keep their restore, and a reload with a
 * hash is left alone so the anchor still lands.
 *
 * Runs as an inline script from the root layout, before hydration: the restore
 * happens before any React effect could, so an effect can only jump the page
 * afterwards. Restored to `auto` once the load is past so the setting does not
 * leak into the next navigation.
 *
 * Self-contained on purpose: `startReloadAtTopScript` is this function's
 * source, so it may only touch the window it is given. A segment layout cannot
 * carry the script instead — a bare `<script>` there made the router fall back
 * to a full page load on every client navigation into the segment.
 */
export function startReloadAtTop(win: Window) {
  const nav = win.performance.getEntriesByType("navigation")[0] as
    | PerformanceNavigationTiming
    | undefined;
  if (!nav || nav.type !== "reload" || win.location.hash) return;

  win.history.scrollRestoration = "manual";
  win.scrollTo(0, 0);
  win.addEventListener(
    "load",
    function () {
      win.history.scrollRestoration = "auto";
    },
    { once: true },
  );
}

export const startReloadAtTopScript = `(${startReloadAtTop.toString()})(window);`;
