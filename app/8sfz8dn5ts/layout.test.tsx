import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import V1Layout from "./layout";

// `next/font/google` fetches and self-hosts the font at build time; outside
// the Next compiler it is not callable. The layout only needs the CSS variable
// class each loader hands back.
vi.mock("next/font/google", () => {
  const loader = () => ({ variable: "font-var", className: "font-class" });
  return { Orbitron: loader, Poppins: loader };
});

describe("V1Layout", () => {
  const originalScrollIntoView = Element.prototype.scrollIntoView;

  afterEach(() => {
    Element.prototype.scrollIntoView = originalScrollIntoView;
    window.location.hash = "";
  });

  it("clips sideways overflow, so a slide-in parked past the edge cannot widen the page", () => {
    // Entrance animations start elements past the right edge of the viewport
    // and slide them in. A transformed element still counts toward the
    // document's scrollable area, so without a clip a phone can scroll the
    // whole page sideways and the sticky nav drifts. Only what jsdom can be
    // asked: the wrapper carries the clip, and clip rather than hidden so the
    // wrapper never becomes a scroll container that would unstick the nav.
    render(<V1Layout params={Promise.resolve({})}>{null}</V1Layout>);

    expect(document.querySelector(".v1-root")).toHaveClass("overflow-x-clip");
  });

  it("skips to the content from script, without a fragment in the address bar", async () => {
    const scrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoView;
    const user = userEvent.setup();
    render(
      <V1Layout params={Promise.resolve({})}>
        <main id="main" />
      </V1Layout>,
    );

    await user.click(screen.getByRole("link", { name: "Skip to content" }));

    const main = screen.getByRole("main");
    expect(scrollIntoView.mock.instances[0]).toBe(main);
    expect(main).toHaveFocus();
    expect(window.location.hash).toBe("");
  });
});
