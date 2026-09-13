import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { basePath, serviceSections } from "../lib/content";
import { ServicesGrid } from "./home-sections";

describe("ServicesGrid", () => {
  it("links every card to its own section on the services page", () => {
    render(<ServicesGrid />);

    for (const service of serviceSections) {
      const link = screen.getByRole("link", { name: new RegExp(service.title) });
      expect(link).toHaveAttribute("href", `${basePath}/services#${service.id}`);
    }
  });
});
