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
    expect(opening.className).toMatch(/min-h-\[calc\(100svh-var\(--v3-nav-height\)\)\]/);
    expect(opening).toContainElement(screen.getByRole("heading", { level: 1 }));
    expect(opening).toContainElement(screen.getByRole("heading", { name: /we work with/i }));
    expect(screen.getByRole("banner").className).toMatch(/h-\(--v3-nav-height\)/);
  });
});

describe("HomeHero entrance", () => {
  it("steps the two buttons separately rather than as one block", () => {
    render(<HomeOpening />);

    const book = screen.getByRole("link", { name: /book a free consultation/i });
    const see = screen.getByRole("link", { name: /see our services/i });

    expect(book.className).toMatch(/enter-step/);
    expect(see.className).toMatch(/enter-step/);
    expect(book.style.getPropertyValue("--i")).not.toBe(see.style.getPropertyValue("--i"));
  });
});

describe("v3 on a phone", () => {
  it("stretches the hero buttons to the full width and centres the text", () => {
    render(<HomeOpening />);
    const book = screen.getByRole("link", { name: /book a free consultation/i });
    const see = screen.getByRole("link", { name: /see our services/i });
    expect(book.className).toMatch(/max-md:w-full/);
    expect(see.className).toMatch(/max-md:w-full/);
    expect(screen.getByRole("heading", { level: 1 }).parentElement?.className).toMatch(/max-md:text-center/);
  });

  it("sets the header wordmark in Orbitron, like v1", () => {
    render(<SiteHeader />);
    expect(screen.getByText("SERBIZ").className).toMatch(/font-orbitron/);
  });
});
