import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { officeAddress, officeMapsUrl } from "@/lib/site-config";
import { ContactDetails } from "./contact-sections";

describe("ContactDetails", () => {
  it("links the office row to Google Maps in a new tab, like the other rows link somewhere", () => {
    render(<ContactDetails />);

    const link = screen.getByRole("link", { name: new RegExp(officeAddress) });

    expect(link).toHaveAttribute("href", officeMapsUrl);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener");
  });
});
