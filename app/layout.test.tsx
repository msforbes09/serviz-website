import { describe, expect, it, vi } from "vitest";
import RootLayout from "./layout";

// `next/font` only runs inside the Next build; here it just has to hand back
// a class-name holder.
vi.mock("next/font/google", () => ({
  Geist: () => ({ variable: "geist" }),
  Geist_Mono: () => ({ variable: "geist-mono" }),
}));

vi.mock("@vercel/analytics/next", () => ({
  Analytics: function Analytics() {
    return null;
  },
}));

describe("root layout", () => {
  // The document scrolls smoothly, which is right for a fragment jump within
  // one page and wrong for a route change: the router's jump to the top of
  // the new page would animate over the entrance that page is trying to play.
  // Next 16 stopped overriding `scroll-behavior` during navigation by default
  // and gates the old instant-jump behaviour behind this attribute.
  it("asks the router to scroll instantly between routes", () => {
    const element = RootLayout({ children: null, params: Promise.resolve({}) });

    expect(element.props["data-scroll-behavior"]).toBe("smooth");
  });

  // Vercel Web Analytics counts visitors and page views without cookies.
  // It lives in the root layout so every route, previews included, reports.
  it("mounts Vercel Analytics once, in the body", async () => {
    const { Analytics } = await import("@vercel/analytics/next");
    const element = RootLayout({ children: null, params: Promise.resolve({}) });
    const body = element.props.children;
    const types = (
      Array.isArray(body.props.children)
        ? body.props.children
        : [body.props.children]
    )
      .filter(Boolean)
      .map((child: { type: unknown }) => child.type);

    expect(types.filter((t: unknown) => t === Analytics)).toHaveLength(1);
  });
});
