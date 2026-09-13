import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HomeOpening } from "./home-hero";
import { SiteHeader } from "./site-header";

vi.mock("next/navigation", () => ({ usePathname: () => "/4sjhdc5awq" }));

describe("HomeOpening", () => {
  it("fills the first screen below the header with the hero and the audience strip", () => {
    render(<HomeOpening />);
    render(<SiteHeader />);

    // Only what jsdom can be asked: the opening's floor is the viewport minus
    // the header, and both read the header's height from one token, so a
    // change to the bar cannot leave the first screen short or long.
    const opening = screen.getByTestId("home-opening");
    expect(opening.className).toMatch(
      /min-h-\[calc\(100svh-var\(--v3-nav-height\)\)\]/,
    );
    expect(opening).toContainElement(screen.getByRole("heading", { level: 1 }));
    expect(opening).toContainElement(
      screen.getByRole("heading", { name: /we work with/i }),
    );
    expect(screen.getByRole("banner").className).toMatch(
      /h-\(--v3-nav-height\)/,
    );
  });
});

describe("HomeHero entrance", () => {
  const step = (el: HTMLElement | null) =>
    Number(el?.style.getPropertyValue("--i"));

  it("enters the audience strip before the buttons, and the promise card last", () => {
    render(<HomeOpening />);

    const strip = screen.getByRole("heading", { name: /we work with/i })
      .parentElement as HTMLElement;
    // The consultation button opens the quick-message dialog, so it is a
    // button, and its entrance lives on a wrapper: the `.enter-*` transition
    // shorthand would otherwise replace the button's own hover transition.
    const book = screen.getByRole("button", {
      name: /book a free consultation/i,
    }).parentElement as HTMLElement;
    const see = screen.getByRole("link", { name: /see our services/i });
    // The entrance lives on the card's outer wrapper; the surface inside it
    // carries the hover dip with a transition of its own.
    const card = screen
      .getByText(/our promise/i)
      .closest(".enter-slide") as HTMLElement;

    expect(step(strip)).toBeLessThan(step(book));
    expect(step(see)).toBe(step(book));
    // The card's delay is inline, in seconds; the buttons' step is 100ms each.
    expect(parseFloat(card.style.transitionDelay)).toBeGreaterThan(
      step(book) * 0.1,
    );
  });

  it("puts the city on its own line on phones", () => {
    render(<HomeOpening />);

    const city = screen.getByText("Pasig City");
    expect(city.className).toMatch(/max-md:block/);
    // The dash only makes sense on the single desktop line.
    expect(screen.getByText("—").className).toMatch(/max-md:hidden/);
  });

  it("balances the services list across its own lines on phones", () => {
    render(<HomeOpening />);

    // Five services no longer fit one phone line. Balanced wrapping splits
    // the list evenly instead of orphaning the last word after a dangling dot,
    // and the span goes block so the balance is measured on that line alone.
    const services = screen.getByText(/Payroll · Accounting · Tax · HR · Software/);
    expect(services.className).toMatch(/max-md:block/);
    expect(services.className).toMatch(/max-md:text-balance/);
    // Each dot is glued to the word before it, so a line can end with a
    // separator but never start with one.
    expect(services.textContent).toBe(
      "Payroll\u00a0· Accounting\u00a0· Tax\u00a0· HR\u00a0· Software",
    );
  });
});

describe("v3 on a phone", () => {
  it("stretches the hero buttons to the full width and centres the text", () => {
    render(<HomeOpening />);
    const book = screen.getByRole("button", {
      name: /book a free consultation/i,
    });
    const see = screen.getByRole("link", { name: /see our services/i });
    expect(book.className).toMatch(/w-full/);
    expect(book.parentElement?.className).toMatch(/max-md:w-full/);
    expect(see.className).toMatch(/max-md:w-full/);
    expect(
      screen.getByRole("heading", { level: 1 }).parentElement?.className,
    ).toMatch(/max-md:text-center/);
  });

  it("sets the header wordmark in Orbitron, like v1", () => {
    render(<SiteHeader />);
    expect(screen.getByText("SERBIZ").className).toMatch(/font-orbitron/);
  });
});
