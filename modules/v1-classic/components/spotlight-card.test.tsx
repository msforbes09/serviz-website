import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SpotlightCard } from "./spotlight-card";

const card = () => screen.getByRole("article");

describe("SpotlightCard", () => {
  it("renders its content", () => {
    render(<SpotlightCard>Payroll outsourcing</SpotlightCard>);

    expect(screen.getByText("Payroll outsourcing")).toBeInTheDocument();
  });

  it("records where the pointer is, relative to the card", () => {
    render(<SpotlightCard>Payroll</SpotlightCard>);

    fireEvent.mouseMove(card(), { clientX: 120, clientY: 64 });

    expect(card().style.getPropertyValue("--mx")).toBe("120px");
    expect(card().style.getPropertyValue("--my")).toBe("64px");
  });

  it("keeps tracking as the pointer moves", () => {
    render(<SpotlightCard>Payroll</SpotlightCard>);

    fireEvent.mouseMove(card(), { clientX: 10, clientY: 10 });
    fireEvent.mouseMove(card(), { clientX: 200, clientY: 90 });

    expect(card().style.getPropertyValue("--mx")).toBe("200px");
  });

  it("keeps the caller's own classes and custom properties", () => {
    render(
      <SpotlightCard
        className="rounded-2xl"
        style={{ "--i": 3 } as React.CSSProperties}
      >
        Payroll
      </SpotlightCard>,
    );

    expect(card()).toHaveClass("rounded-2xl");
    expect(card().style.getPropertyValue("--i")).toBe("3");
  });

  it("hides the glow from assistive technology", () => {
    render(<SpotlightCard>Payroll</SpotlightCard>);

    const glow = card().querySelector(".v1-spotlight");

    expect(glow).not.toBeNull();
    expect(glow).toHaveAttribute("aria-hidden");
  });
});
