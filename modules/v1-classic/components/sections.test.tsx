import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { certificates } from "../lib/content";
import { Permits } from "./sections";

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
