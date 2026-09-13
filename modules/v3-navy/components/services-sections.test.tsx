import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { featuredServices, otherServices } from "../lib/content";
import { OtherServices, ServiceSections } from "./services-sections";

/**
 * Every home card links to `#<id>` on the services page. The first four land
 * on a full section, the last three on a card in the compact grid, so each
 * anchor must exist exactly once across the two components.
 */
describe("ServiceSections", () => {
  it("renders one anchored section per featured service, in the home order", () => {
    render(<ServiceSections />);

    const sections = Array.from(document.querySelectorAll("section[id]"));
    expect(sections.map((s) => s.id)).toEqual(featuredServices.map((s) => s.id));

    for (const service of featuredServices) {
      const heading = screen.getByRole("heading", { level: 2, name: service.title });
      expect(document.getElementById(service.id)).toContainElement(heading);
    }
  });

  it("shows the home card's number beside each title", () => {
    render(<ServiceSections />);
    for (const service of featuredServices) {
      expect(document.getElementById(service.id)).toHaveTextContent(service.num);
    }
  });
});

describe("OtherServices", () => {
  it("renders one anchored card per remaining service, in the home order", () => {
    render(<OtherServices />);

    const cards = Array.from(document.querySelectorAll("li[id]"));
    expect(cards.map((c) => c.id)).toEqual(otherServices.map((s) => s.id));

    for (const service of otherServices) {
      const heading = screen.getByRole("heading", { level: 3, name: service.title });
      expect(document.getElementById(service.id)).toContainElement(heading);
    }
  });
});
