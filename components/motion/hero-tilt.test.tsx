import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HeroTilt } from "./hero-tilt";

/**
 * The leaf reads the pointer and writes two unit-range variables the CSS
 * turns into a tilt and a glare. It owns nothing visual itself, so the test
 * is about the numbers: where the pointer is, and that leaving lets go.
 */
describe("HeroTilt", () => {
  function mount() {
    render(
      <HeroTilt data-testid="tilt">
        <span>photo</span>
      </HeroTilt>,
    );
    const el = screen.getByTestId("tilt");
    el.getBoundingClientRect = () =>
      ({ left: 100, top: 50, width: 200, height: 100 }) as DOMRect;
    return el;
  }

  it("maps the pointer to -1..1 across the element", () => {
    const el = mount();

    fireEvent.pointerMove(el, { clientX: 250, clientY: 75 });

    expect(el.style.getPropertyValue("--tilt-x")).toBe("0.5");
    expect(el.style.getPropertyValue("--tilt-y")).toBe("-0.5");
  });

  it("lets go when the pointer leaves", () => {
    const el = mount();
    fireEvent.pointerMove(el, { clientX: 250, clientY: 75 });

    fireEvent.pointerLeave(el);

    expect(el.style.getPropertyValue("--tilt-x")).toBe("0");
    expect(el.style.getPropertyValue("--tilt-y")).toBe("0");
  });
});
