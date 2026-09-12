import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { HeaderNav } from "./header-nav";

vi.mock("next/navigation", () => ({ usePathname: () => "/4sjhdc5awq" }));

const toggle = () => screen.getByRole("button", { name: /menu/i });

/**
 * The panel is a dropdown under the header, not a full-screen overlay, so it
 * owes Escape and focus return but not a focus trap, a scroll lock or
 * `aria-modal`. Those belong to modal dialogs; v1's overlay is one, this is not.
 */
describe("v3 mobile menu", () => {
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
});
