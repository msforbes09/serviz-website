import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import V1Loading from "../8sfz8dn5ts/loading";
import V3Loading from "./loading";

/**
 * A loading state that is one flat slab reads as a hole in the page. Each
 * skeleton is shaped like the hero it stands in for, with the same height
 * floor, so the page looks like it is arriving and does not jump when it does.
 */
describe.each([
  ["v3", V3Loading, "v3"],
  ["v1", V1Loading, "v1"],
])("%s loading skeleton", (_, Loading, variant) => {
  it("is hidden from assistive tech and shaped like the hero", () => {
    const { container } = render(<Loading />);
    const root = container.firstElementChild as HTMLElement;

    expect(root).toHaveAttribute("aria-hidden", "true");
    expect(root.className).toMatch(new RegExp(`100svh-var\\(--${variant}-nav-height\\)`));
    // More than one placeholder block: a kicker, a headline, a lede, buttons.
    expect(root.querySelectorAll("[class*='animate-pulse']").length).toBeGreaterThan(3);
  });
});
