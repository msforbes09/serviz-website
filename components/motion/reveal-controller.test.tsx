import { render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { RevealController } from "./reveal-controller";

type Cb = (entries: { target: Element; isIntersecting: boolean }[]) => void;

function stubObserver() {
  const observed: Element[] = [];
  let cb: Cb = () => {};
  class IO {
    constructor(handler: Cb) {
      cb = handler;
    }
    observe(el: Element) {
      observed.push(el);
    }
    unobserve() {}
    disconnect() {}
  }
  vi.stubGlobal("IntersectionObserver", IO);
  return { observed, fire: (el: Element) => cb([{ target: el, isIntersecting: true }]) };
}

function stubMatchMedia(reduced: boolean) {
  vi.stubGlobal("matchMedia", () => ({ matches: reduced, addEventListener() {}, removeEventListener() {} }));
}

function mountTargets(count: number) {
  const host = document.createElement("div");
  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    el.className = "reveal";
    host.appendChild(el);
  }
  document.body.appendChild(host);
  return host;
}

afterEach(() => {
  vi.unstubAllGlobals();
  document.body.innerHTML = "";
  delete document.documentElement.dataset.revealReady;
});

/**
 * The rule this component exists to enforce: nothing is ever hidden unless the
 * script is running AND able to reveal it again. e.gov.ph ships `opacity: 0` in
 * the markup and waits on an observer — measured there, seven elements sat
 * inside the viewport still invisible. Every test below is a way that could
 * happen here, and must not.
 */
describe("RevealController", () => {
  it("arms the hidden state only once it is running", () => {
    stubObserver();
    stubMatchMedia(false);
    expect(document.documentElement.dataset.revealReady).toBeUndefined();

    mountTargets(2);
    render(<RevealController />);

    expect(document.documentElement.dataset.revealReady).toBe("");
  });

  it("hides nothing when the browser has no IntersectionObserver", () => {
    stubMatchMedia(false);
    vi.stubGlobal("IntersectionObserver", undefined);

    mountTargets(2);
    render(<RevealController />);

    expect(document.documentElement.dataset.revealReady).toBeUndefined();
  });

  it("hides nothing when the visitor asked for reduced motion", () => {
    stubObserver();
    stubMatchMedia(true);

    mountTargets(2);
    render(<RevealController />);

    expect(document.documentElement.dataset.revealReady).toBeUndefined();
  });

  it("marks an element revealed once it intersects", () => {
    const { observed, fire } = stubObserver();
    stubMatchMedia(false);
    const host = mountTargets(1);
    render(<RevealController />);

    const el = host.firstElementChild as HTMLElement;
    expect(observed).toContain(el);
    expect(el.dataset.revealed).toBeUndefined();

    fire(el);

    expect(el.dataset.revealed).toBe("");
  });

  it("sweeps anything on screen that the observer never reported", async () => {
    // The gap this closes: an observer that exists but never fires. A hidden or
    // background tab does exactly that, and it is the state e.gov.ph was
    // measured in — seven elements inside the viewport, still invisible.
    stubObserver();
    stubMatchMedia(false);
    const host = mountTargets(1);
    const el = host.firstElementChild as HTMLElement;
    // Off screen at mount, so the initial pass skips it...
    vi.spyOn(el, "getBoundingClientRect").mockReturnValue({ top: 5000, bottom: 5400 } as DOMRect);

    render(<RevealController />);
    expect(el.dataset.revealed).toBeUndefined();

    // ...then it scrolls into view and the observer stays silent.
    vi.mocked(el.getBoundingClientRect).mockReturnValue({ top: 100, bottom: 400 } as DOMRect);
    document.dispatchEvent(new Event("visibilitychange"));

    expect(el.dataset.revealed).toBe("");
  });

  it("sweeps on scroll stop, for an item the observer has not reported yet", () => {
    // An item can be on screen without the observer having fired for it —
    // sitting inside the root margin, or arriving between callbacks. If the
    // visitor stops scrolling there, it must not stay hidden.
    vi.useFakeTimers();
    stubObserver();
    stubMatchMedia(false);
    const host = mountTargets(1);
    const el = host.firstElementChild as HTMLElement;
    vi.spyOn(el, "getBoundingClientRect").mockReturnValue({ top: 5000, bottom: 5400 } as DOMRect);
    render(<RevealController />);
    expect(el.dataset.revealed).toBeUndefined();

    vi.mocked(el.getBoundingClientRect).mockReturnValue({ top: 100, bottom: 400 } as DOMRect);
    window.dispatchEvent(new Event("scroll"));
    vi.advanceTimersByTime(200);

    expect(el.dataset.revealed).toBe("");
    vi.useRealTimers();
  });

  it("disarms on unmount, so nothing is left hidden with no observer", () => {
    stubObserver();
    stubMatchMedia(false);
    mountTargets(2);

    const view = render(<RevealController />);
    expect(document.documentElement.dataset.revealReady).toBe("");

    view.unmount();

    expect(document.documentElement.dataset.revealReady).toBeUndefined();
  });
});
