import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { certificates } from "../lib/content";
import { Hero, Permits } from "./sections";
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
