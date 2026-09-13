import { render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import V3Layout from "./layout";

// `next/font/google` fetches and self-hosts the font at build time; outside
// the Next compiler it is not callable. The layout only needs the CSS variable
// class each loader hands back.
vi.mock("next/font/google", () => {
  const loader = () => ({ variable: "font-var", className: "font-class" });
  return { Outfit: loader, Poppins: loader };
});
vi.mock("next/navigation", () => ({ usePathname: () => "/4sjhdc5awq" }));
// The header and footer have their own contracts; the footer is also an async
// `"use cache"` component, which Testing Library cannot render.
vi.mock("@/modules/v3-navy/components/site-header", () => ({ SiteHeader: () => <header /> }));
vi.mock("@/modules/v3-navy/components/site-footer", () => ({ SiteFooter: () => <footer /> }));

afterEach(() => {
  vi.unstubAllGlobals();
  delete document.documentElement.dataset.revealReady;
});

describe("V3Layout", () => {
  it("arms the JavaScript scroll reveal, so entrances run in browsers without scroll timelines", () => {
    // The CSS-only path does nothing in older Safari and Firefox. Mounting the
    // controller is what moves v3 onto the observer, and the flag it sets is
    // the one thing the stylesheet gates the hidden state behind.
    vi.stubGlobal("IntersectionObserver", class { observe() {} unobserve() {} disconnect() {} });
    vi.stubGlobal("matchMedia", () => ({ matches: false }));

    // The controller has nothing to arm on a page with no reveals, so give it
    // one, the way every v3 page does.
    render(
      <V3Layout params={Promise.resolve({})}>
        <section className="reveal" />
      </V3Layout>,
    );

    expect(document.documentElement.dataset.revealReady).toBe("");
  });
});
