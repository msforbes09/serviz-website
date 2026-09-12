import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SiteNav } from "./site-nav";

const toggle = () => screen.getByRole("button", { name: /menu/i });

const menuLinks = () =>
  within(document.getElementById("v1-menu") as HTMLElement).getAllByRole("link");

describe("v1 mobile menu", () => {
  it("closes on Escape", async () => {
    const user = userEvent.setup();
    render(<SiteNav />);

    await user.click(toggle());
    expect(toggle()).toHaveAttribute("aria-expanded", "true");

    await user.keyboard("{Escape}");

    expect(toggle()).toHaveAttribute("aria-expanded", "false");
  });

  it("moves focus into the menu when it opens", async () => {
    const user = userEvent.setup();
    render(<SiteNav />);

    await user.click(toggle());

    expect(menuLinks()[0]).toHaveFocus();
    expect(menuLinks()[0]).toHaveAccessibleName("Services");
  });

  it("returns focus to the toggle after Escape", async () => {
    const user = userEvent.setup();
    render(<SiteNav />);

    await user.click(toggle());
    expect(toggle()).not.toHaveFocus();

    await user.keyboard("{Escape}");

    expect(toggle()).toHaveFocus();
  });

  it("keeps Tab inside the overlay instead of walking into the page behind", async () => {
    const user = userEvent.setup();
    render(<SiteNav />);

    await user.click(toggle());

    const links = menuLinks();
    links[links.length - 1].focus();
    await user.tab();

    expect(toggle()).toHaveFocus();

    await user.tab({ shift: true });

    expect(links[links.length - 1]).toHaveFocus();
  });

  it("holds the page still while the overlay covers it", async () => {
    const user = userEvent.setup();
    render(<SiteNav />);

    await user.click(toggle());
    expect(document.body).toHaveStyle({ overflow: "hidden" });

    await user.click(toggle());
    expect(document.body).not.toHaveStyle({ overflow: "hidden" });
  });

  it("releases the page when unmounted while open", async () => {
    const user = userEvent.setup();
    const view = render(<SiteNav />);

    await user.click(toggle());
    view.unmount();

    expect(document.body).not.toHaveStyle({ overflow: "hidden" });
  });
});
