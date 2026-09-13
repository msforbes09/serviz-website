import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { officeAddress, siteConfig } from "@/lib/site-config";
import { certificates } from "../lib/content";
import { Hero, Permits, Services, SiteFooter } from "./sections";
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

describe("Hero on a phone", () => {
  it("centres its text and stretches the primary button to the full width", () => {
    render(<Hero />);

    const heading = screen.getByRole("heading", { level: 1 });
    const book = screen.getByRole("link", { name: "Book a free consultation" });

    expect(heading.parentElement?.className).toMatch(/max-md:text-center/);
    expect(book.className).toMatch(/max-md:w-full/);
  });

  it("drops the city from the badge, so the pill holds one line", () => {
    render(<Hero />);

    // The full sentence wrapped "2021" onto a line of its own at phone width.
    // Without the city it fits; if a narrower phone still wraps it, balanced
    // wrapping splits the sentence evenly instead of orphaning the year.
    const badge = screen.getByText(/A workers cooperative/).closest("p")!;
    expect(badge).toHaveTextContent(
      "A workers cooperative in Pasig City, since 2021",
    );
    // The comma goes with the city, so the phone reads "cooperative since".
    // The city comes back at 900px, where the hero grid widens the text
    // column. From 768px the hero is already two columns and the column is
    // too narrow for the full sentence, which wrapped it on a phone held
    // sideways.
    expect(screen.getByText("in Pasig City,").className).toMatch(
      /max-\[900px\]:hidden/,
    );
    expect(screen.getByText(/A workers cooperative/).className).toMatch(
      /text-balance/,
    );
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

describe("SiteFooter", () => {
  it("carries the header's lockup — mark, Orbitron wordmark, descriptor — and nothing else of the name", () => {
    render(<SiteFooter />);
    const footer = screen.getByRole("contentinfo");

    const word = within(footer).getByText("SERBIZ");
    expect(word.className).toMatch(/font-orbitron/);

    // Same lockup as the nav bar so the two cannot drift. The address and
    // the full legal name are not repeated here.
    expect(footer).toHaveTextContent(
      new RegExp(`^${siteConfig.name}Resources Income Workers Cooperative`),
    );
    expect(within(footer).queryByText(officeAddress)).toBeNull();
    expect(within(footer).queryByText(siteConfig.legalName)).toBeNull();
  });

  it("keeps the lockup's lines flush left, so it reads as one image even where the footer centres text", () => {
    render(<SiteFooter />);
    const column = within(screen.getByRole("contentinfo")).getByText("SERBIZ")
      .parentElement!;

    expect(column.className).toMatch(/\btext-left\b/);
  });
});
