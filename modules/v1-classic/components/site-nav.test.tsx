import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SiteNav } from "./site-nav";

const toggle = () => screen.getByRole("button", { name: /menu/i });

const menuLinks = () =>
  within(document.getElementById("v1-menu") as HTMLElement).getAllByRole("link");

describe("v1 logo", () => {
  const logo = () => screen.getByRole("link", { name: "SERBIZ home" });

  it("returns the page to the very top, not to the top of the main landmark", async () => {
    const user = userEvent.setup();
    const scrollTo = vi.fn();
    vi.stubGlobal("scrollTo", scrollTo);
    render(<SiteNav />);

    await user.click(logo());

    expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ top: 0 }));

    vi.unstubAllGlobals();
  });

  it("leaves the scroll style to CSS, so reduced motion still applies", async () => {
    const user = userEvent.setup();
    const scrollTo = vi.fn();
    vi.stubGlobal("scrollTo", scrollTo);
    render(<SiteNav />);

    await user.click(logo());

    // `behavior: "smooth"` here would override the guarded CSS rule and animate
    // for someone who asked it not to. Anything but an explicit "smooth" defers.
    const [options] = scrollTo.mock.calls[0];
    expect(options.behavior).not.toBe("smooth");

    vi.unstubAllGlobals();
  });

  it("still carries a real href for a visitor without scripting", () => {
    render(<SiteNav />);

    expect(logo()).toHaveAttribute("href", "#top");
  });
});

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

  it("hides the page behind it from assistive technology while it is open", async () => {
    const user = userEvent.setup();
    render(<SiteNav />);

    const menu = document.getElementById("v1-menu") as HTMLElement;

    // The Tab cycle only constrains the keyboard. A screen reader's virtual
    // cursor walks the page underneath regardless, so the overlay has to
    // declare itself modal for the content behind it to be hidden too.
    expect(menu).not.toHaveAttribute("aria-modal");

    await user.click(toggle());

    expect(menu).toHaveAttribute("aria-modal", "true");
    expect(menu).toHaveAccessibleName("Menu");
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
