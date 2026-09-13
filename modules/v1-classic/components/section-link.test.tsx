import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SectionLink } from "./section-link";

describe("SectionLink", () => {
  const originalScrollIntoView = Element.prototype.scrollIntoView;

  afterEach(() => {
    Element.prototype.scrollIntoView = originalScrollIntoView;
    window.location.hash = "";
  });

  const withTarget = () => {
    const target = document.createElement("section");
    target.id = "contact";
    document.body.appendChild(target);
    return target;
  };

  it("scrolls to the section from script and leaves the address bar alone", async () => {
    const user = userEvent.setup();
    const scrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoView;
    const target = withTarget();
    render(<SectionLink href="#contact">Book</SectionLink>);

    await user.click(screen.getByRole("link", { name: "Book" }));

    // A fragment left in the URL makes a refresh reopen the page part way
    // down, past the hero and its entrance.
    expect(scrollIntoView).toHaveBeenCalledTimes(1);
    expect(scrollIntoView.mock.instances[0]).toBe(target);
    expect(window.location.hash).toBe("");

    target.remove();
  });

  it("moves focus to the section, as a real fragment jump would", async () => {
    const user = userEvent.setup();
    Element.prototype.scrollIntoView = vi.fn();
    const target = withTarget();
    render(<SectionLink href="#contact">Book</SectionLink>);

    await user.click(screen.getByRole("link", { name: "Book" }));

    expect(target).toHaveFocus();

    target.remove();
  });

  it("keeps the fragment href and its classes for a visitor without scripting", () => {
    render(
      <SectionLink href="#contact" className="cta">
        Book
      </SectionLink>,
    );

    const link = screen.getByRole("link", { name: "Book" });
    expect(link).toHaveAttribute("href", "#contact");
    expect(link).toHaveClass("cta");
  });
});
