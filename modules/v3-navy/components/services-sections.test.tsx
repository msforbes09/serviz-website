import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { serviceSections } from "../lib/content";
import { ServiceSections } from "./services-sections";

describe("ServiceSections", () => {
  it("renders one anchored section per home card, in the home order", () => {
    render(<ServiceSections />);

    const sections = Array.from(document.querySelectorAll("section[id]"));
    expect(sections.map((s) => s.id)).toEqual(serviceSections.map((s) => s.id));

    for (const service of serviceSections) {
      const heading = screen.getByRole("heading", { level: 2, name: service.title });
      expect(document.getElementById(service.id)).toContainElement(heading);
    }
  });

  it("shows the home card's number beside each title", () => {
    render(<ServiceSections />);
    for (const service of serviceSections) {
      expect(document.getElementById(service.id)).toHaveTextContent(service.num);
    }
  });
});
