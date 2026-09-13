import { render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LoadingAtTop, RouteTopArmer } from "./route-top";

let pathname = "/4sjhdc5awq";
vi.mock("next/navigation", () => ({ usePathname: () => pathname }));

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
  pathname = "/4sjhdc5awq";
});

/**
 * With a prefetched route the loading skeleton paints at once, at whatever
 * scroll position the old page was at, and the router only jumps to the top
 * when the real page lands. So a link press arms a flag and the skeleton,
 * on mounting, spends it on an instant scroll to the top. Back and forward
 * never come from a link press, so they keep the browser's own restore.
 */
describe("RouteTopArmer and LoadingAtTop", () => {
  it("scrolls the skeleton to the top after a link to another route", () => {
    const view = render(<RouteTopArmer />);
    clickLink("/4sjhdc5awq/about");

    view.rerender(
      <>
        <RouteTopArmer />
        <LoadingAtTop />
      </>,
    );

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "instant" });
  });

  it("leaves the skeleton alone when nothing was pressed, as on back or forward", () => {
    render(
      <>
        <RouteTopArmer />
        <LoadingAtTop />
      </>,
    );

    expect(scrollTo).not.toHaveBeenCalled();
  });

  it("spends the flag once", () => {
    const view = render(<RouteTopArmer />);
    clickLink("/4sjhdc5awq/about");
    view.rerender(
      <>
        <RouteTopArmer />
        <LoadingAtTop />
      </>,
    );
    view.rerender(<RouteTopArmer />);
    view.rerender(
      <>
        <RouteTopArmer />
        <LoadingAtTop />
      </>,
    );

    expect(scrollTo).toHaveBeenCalledTimes(1);
  });

  it("ignores a same-page fragment and a link to another site", () => {
    const view = render(<RouteTopArmer />);
    clickLink("#payroll");
    clickLink("https://www.google.com/maps");

    view.rerender(
      <>
        <RouteTopArmer />
        <LoadingAtTop />
      </>,
    );

    expect(scrollTo).not.toHaveBeenCalled();
  });

  it("drops a stale flag once the route has changed without a skeleton", () => {
    const view = render(<RouteTopArmer />);
    clickLink("/4sjhdc5awq/about");
    pathname = "/4sjhdc5awq/about";
    view.rerender(<RouteTopArmer />);

    view.rerender(
      <>
        <RouteTopArmer />
        <LoadingAtTop />
      </>,
    );

    expect(scrollTo).not.toHaveBeenCalled();
  });
});
