import { describe, expect, it, vi } from "vitest";
import { startReloadAtTop, startReloadAtTopScript } from "./start-reload-at-top";

function fakeWindow(type: string, hash = "") {
  const listeners: Record<string, () => void> = {};
  return {
    win: {
      performance: { getEntriesByType: () => [{ type }] },
      location: { hash },
      history: { scrollRestoration: "auto" },
      scrollTo: vi.fn(),
      addEventListener: (name: string, fn: () => void) => {
        listeners[name] = fn;
      },
    } as unknown as Window,
    listeners,
  };
}

/**
 * Browsers restore the previous scroll position on reload, which lands a
 * returning visitor mid-page after the hero has already entered. A reload —
 * only a reload — opts out, so the page starts at the top and the entrance
 * animations play again.
 */
describe("startReloadAtTop", () => {
  it("scrolls a reload to the top and turns restoration off for that load", () => {
    const { win, listeners } = fakeWindow("reload");

    startReloadAtTop(win);

    expect(win.history.scrollRestoration).toBe("manual");
    expect(win.scrollTo).toHaveBeenCalledWith(0, 0);

    // Back to the default once the load is past, so it does not leak into the
    // next navigation.
    listeners.load();
    expect(win.history.scrollRestoration).toBe("auto");
  });

  it("leaves a plain navigation, and back and forward, alone", () => {
    for (const type of ["navigate", "back_forward"]) {
      const { win } = fakeWindow(type);
      startReloadAtTop(win);
      expect(win.history.scrollRestoration).toBe("auto");
      expect(win.scrollTo).not.toHaveBeenCalled();
    }
  });

  it("leaves a reload with a hash alone, so the anchor still lands", () => {
    const { win } = fakeWindow("reload", "#tax");
    startReloadAtTop(win);
    expect(win.scrollTo).not.toHaveBeenCalled();
  });

  it("ships as a self-contained inline script", () => {
    // The root layout injects this string before hydration; it must not lean
    // on anything outside the function body.
    expect(startReloadAtTopScript).toMatch(/^\(function startReloadAtTop\(/);
    expect(startReloadAtTopScript).toMatch(/\)\(window\);$/);
  });
});
