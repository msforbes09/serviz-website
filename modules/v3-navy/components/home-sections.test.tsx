import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { audiences, basePath, serviceSections } from "../lib/content";
import { AudienceStrip, ServicesGrid } from "./home-sections";

describe("ServicesGrid", () => {
  it("links every card to its own section on the services page", () => {
    render(<ServicesGrid />);

    for (const service of serviceSections) {
      const link = screen.getByRole("link", { name: new RegExp(service.title) });
      expect(link).toHaveAttribute("href", `${basePath}/services#${service.id}`);
    }
  });
});

describe("AudienceStrip", () => {
  it("lists the audiences as items with nothing between them", () => {
    render(<AudienceStrip />);

    const items = within(screen.getByRole("list")).getAllByRole("listitem");
    expect(items.map((item) => item.textContent)).toEqual([...audiences]);
    // The rust dot separators are gone; nothing decorative sits between items.
    expect(document.querySelectorAll("[aria-hidden]")).toHaveLength(0);
  });
});

describe("AudienceStrip entrance", () => {
  // The strip lands with the headline (step 1), not after the buttons: read
  // together they are one statement — the promise, then who it is for.
  it("enters on the headline's step", () => {
    render(<AudienceStrip />);

    const strip = screen.getByRole("heading", { name: /we work with/i })
      .parentElement as HTMLElement;

    expect(strip.style.getPropertyValue("--i")).toBe("1");
  });
});
