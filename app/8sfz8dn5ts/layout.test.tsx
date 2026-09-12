import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import V1Layout from "./layout";

// `next/font/google` fetches and self-hosts the font at build time; outside
// the Next compiler it is not callable. The layout only needs the CSS variable
// class each loader hands back.
vi.mock("next/font/google", () => {
  const loader = () => ({ variable: "font-var", className: "font-class" });
  return { Outfit: loader, Poppins: loader };
});

describe("V1Layout", () => {
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
});
