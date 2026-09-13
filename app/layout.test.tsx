import { describe, expect, it, vi } from "vitest";
import RootLayout from "./layout";

// `next/font` only runs inside the Next build; here it just has to hand back
// a class-name holder.
vi.mock("next/font/google", () => ({
  Geist: () => ({ variable: "geist" }),
  Geist_Mono: () => ({ variable: "geist-mono" }),
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
});
