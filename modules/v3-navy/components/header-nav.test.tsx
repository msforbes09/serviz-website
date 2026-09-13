import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { HeaderNav } from "./header-nav";

let pathname = "/4sjhdc5awq";
vi.mock("next/navigation", () => ({ usePathname: () => pathname }));

const toggle = () => screen.getByRole("button", { name: /menu/i });

/**
 * The panel is a dropdown under the header, not a full-screen overlay, so it
 * owes Escape and focus return but not a focus trap, a scroll lock or
 * `aria-modal`. Those belong to modal dialogs; v1's overlay is one, this is not.
 */
describe("v3 mobile menu", () => {
  it("closes when the route changes, so tapping the logo does not leave it open on the new page", async () => {
    const user = userEvent.setup();
    pathname = "/4sjhdc5awq";
    const view = render(<HeaderNav />);

    await user.click(toggle());
    expect(toggle()).toHaveAttribute("aria-expanded", "true");

    pathname = "/4sjhdc5awq/about";
    view.rerender(<HeaderNav />);

    expect(toggle()).toHaveAttribute("aria-expanded", "false");
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    render(<HeaderNav />);

    await user.click(toggle());
    expect(toggle()).toHaveAttribute("aria-expanded", "true");

    await user.keyboard("{Escape}");

    expect(toggle()).toHaveAttribute("aria-expanded", "false");
  });

  it("returns focus to the toggle after Escape, from inside the panel", async () => {
    const user = userEvent.setup();
    render(<HeaderNav />);

    await user.click(toggle());

    // Focus has to leave the toggle first, or this passes for the wrong reason:
    // clicking the toggle already leaves focus on it.
    const panel = document.getElementById("v3-mobile-menu") as HTMLElement;
    panel.querySelector("a")?.focus();
    expect(toggle()).not.toHaveFocus();

    await user.keyboard("{Escape}");

    expect(toggle()).toHaveFocus();
  });

  it("closes on a tap outside the panel, so the logo or the page behind dismisses it", async () => {
    const user = userEvent.setup();
    render(<HeaderNav />);

    await user.click(toggle());
    expect(toggle()).toHaveAttribute("aria-expanded", "true");

    await user.click(document.body);

    expect(toggle()).toHaveAttribute("aria-expanded", "false");
  });
});
