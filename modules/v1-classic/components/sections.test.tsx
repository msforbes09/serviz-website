import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { certificates } from "../lib/content";
import { Hero, Permits, Services } from "./sections";
import { SiteNav } from "./site-nav";

describe("Permits", () => {
  it("shows every certificate slot", () => {
    render(<Permits />);

    expect(screen.getAllByRole("img")).toHaveLength(certificates.length);
  });

  it("says a missing scan is missing rather than implying one exists", () => {
    render(<Permits />);

    for (const certificate of certificates.filter((item) => item.src === null)) {
      expect(
        screen.getByRole("img", {
          name: `${certificate.alt} — scan not yet supplied`,
        }),
      ).toBeInTheDocument();
    }
  });

  it("names the registration from the shared config, not a retyped literal", () => {
    render(<Permits />);

    expect(screen.getByText(/9520-10130003 1448/)).toBeInTheDocument();
  });
});

describe("Hero", () => {
  it("fills the viewport below the nav, so the next section waits off screen", () => {
    render(<Hero />);
    render(<SiteNav />);

    // Only what the browser can be asked in jsdom: the hero's floor is the
    // viewport minus the nav, and both sides read the nav's height from the
    // same token, so a change to the bar cannot leave the hero short or long.
    const hero = document.querySelector("section");
    const nav = screen.getByRole("navigation", { name: "Main" });

    expect(hero?.className).toMatch(/100svh-var\(--v1-nav-height\)/);
    expect(nav.className).toMatch(/h-\(--v1-nav-height\)/);
  });
});

describe("contact links", () => {
  const originalScrollIntoView = Element.prototype.scrollIntoView;

  afterEach(() => {
    Element.prototype.scrollIntoView = originalScrollIntoView;
    window.location.hash = "";
  });

  const withContact = () => {
    const target = document.createElement("section");
    target.id = "contact";
    document.body.appendChild(target);
    return target;
  };

  it.each([
    ["hero", () => <Hero />, "Book a free consultation"],
    ["services", () => <Services />, /Not sure what you need/],
  ])("%s jumps to contact from script, without a fragment in the address bar", async (_, Section, name) => {
    const user = userEvent.setup();
    const scrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoView;
    const target = withContact();
    render(<Section />);

    await user.click(screen.getByRole("link", { name }));

    expect(scrollIntoView.mock.instances[0]).toBe(target);
    expect(window.location.hash).toBe("");

    target.remove();
  });
});
