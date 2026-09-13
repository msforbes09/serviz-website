import { render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { RouteTop } from "./route-top";

function clickLink(href: string) {
  const link = document.createElement("a");
  link.href = href;
  document.body.append(link);
  link.addEventListener("click", (event) => event.preventDefault());
  link.click();
  link.remove();
}

const scrollTo = vi.fn();

beforeEach(() => {
  window.scrollTo = scrollTo as unknown as typeof window.scrollTo;
});

afterEach(() => {
  scrollTo.mockReset();
});

/**
 * The window goes to the top the moment a link to another route is pressed,
 * so nothing the navigation measures — the nav pill's shared-layout
 * animation, the loading skeleton — sees the scroll position change under
 * it. Same-page anchors and other sites are not route changes.
 */
describe("RouteTop", () => {
  it("scrolls to the top instantly when a link to another route is pressed", () => {
    render(<RouteTop />);

    clickLink("/4sjhdc5awq/about");

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "instant" });
  });

  it("leaves a same-page fragment link alone, so anchors still glide", () => {
    render(<RouteTop />);

    clickLink("#payroll");

    expect(scrollTo).not.toHaveBeenCalled();
  });

  it("leaves a link to another site alone", () => {
    render(<RouteTop />);

    clickLink("https://www.google.com/maps");

    expect(scrollTo).not.toHaveBeenCalled();
  });
});
