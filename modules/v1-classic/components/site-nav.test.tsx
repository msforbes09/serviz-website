import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { siteConfig } from "@/lib/site-config";
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

  it("sets the cooperative's name in text beside the mark, not as a picture", () => {
    render(<SiteNav />);

    // The full wordmark was a PNG with a white ground baked in, which showed
    // as a box against the paper bar. Real text takes the bar's own colour.
    // Same two lines as the v3 bar: the name, then the descriptor on its own,
    // without the short name tacked on.
    expect(logo()).toHaveTextContent(
      new RegExp(`^${siteConfig.name}Resources Income Workers Cooperative$`),
    );
    expect(within(logo()).queryByRole("img")).toBeNull();
  });
});

describe("v1 section links", () => {
  // The overlay repeats every link, so ask the bar itself.
  const servicesLink = () =>
    within(screen.getByRole("navigation", { name: "Main" })).getByRole("link", {
      name: "Services",
    });

  const withTarget = () => {
    const target = document.createElement("section");
    target.id = "services";
    document.body.appendChild(target);
    return target;
  };

  it("scrolls to the section from script and leaves the address bar alone", async () => {
    const user = userEvent.setup();
    const scrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoView;
    const target = withTarget();
    render(<SiteNav />);

    await user.click(servicesLink());

    // A fragment left in the URL is what made a refresh reopen the page part
    // way down. The scroll happens without one.
    expect(scrollIntoView).toHaveBeenCalledTimes(1);
    expect(scrollIntoView.mock.instances[0]).toBe(target);
    expect(window.location.hash).toBe("");

    target.remove();
  });

  it("moves focus to the section, as a real fragment jump would", async () => {
    const user = userEvent.setup();
    Element.prototype.scrollIntoView = vi.fn();
    const target = withTarget();
    render(<SiteNav />);

    await user.click(servicesLink());

    expect(target).toHaveFocus();

    target.remove();
  });

  it("keeps the fragment href for a visitor without scripting", () => {
    render(<SiteNav />);

    expect(servicesLink()).toHaveAttribute("href", "#services");
  });

  it("waits for the menu to release the page before scrolling from it", async () => {
    const user = userEvent.setup();
    const overflowWhenScrolled: string[] = [];
    Element.prototype.scrollIntoView = vi.fn(function () {
      overflowWhenScrolled.push(document.body.style.overflow);
    });
    const target = withTarget();
    render(<SiteNav />);

    await user.click(screen.getByRole("button", { name: /menu/i }));
    await user.click(
      within(document.getElementById("v1-menu") as HTMLElement).getByRole("link", {
        name: "Services",
      }),
    );

    // The open menu holds the body at overflow: hidden. A smooth scroll begun
    // under that lock is thrown away when the lock lifts a frame later, so the
    // jump has to start after the menu has let go of the page.
    expect(overflowWhenScrolled).toEqual([""]);
    expect(window.location.hash).toBe("");

    target.remove();
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
