import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { QuickMessageDialog } from "./quick-message-dialog";

/**
 * Every "email us" call to action opens this modal instead of jumping straight
 * to a mailto: the visitor stays on the page and the message arrives with a
 * subject naming the button that prompted it.
 */
describe("QuickMessageDialog", () => {
  const original = window.location;

  beforeEach(() => {
    // jsdom does not navigate, so capture the mailto the form assigns.
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { href: "" },
    });
  });

  afterEach(() => {
    Object.defineProperty(window, "location", { configurable: true, value: original });
  });

  it("opens the quick-message form from its trigger", async () => {
    const user = userEvent.setup();
    render(
      <QuickMessageDialog subject="Consultation request" className="cta">
        Book a free consultation
      </QuickMessageDialog>,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Book a free consultation" }));

    const dialog = await screen.findByRole("dialog", { name: /send a quick message/i });
    expect(dialog).toContainElement(screen.getByLabelText("Your name"));
  });

  it("sends the trigger's subject with the message", async () => {
    const user = userEvent.setup();
    render(
      <QuickMessageDialog subject="Quote request" className="cta">
        Get a quote
      </QuickMessageDialog>,
    );

    await user.click(screen.getByRole("button", { name: "Get a quote" }));
    await user.type(await screen.findByLabelText("Your name"), "Ana Reyes");
    await user.type(screen.getByLabelText("What do you need help with?"), "Payroll for 12 staff");
    await user.click(screen.getByRole("button", { name: "Send via email" }));

    const subject = new URL(window.location.href).searchParams.get("subject");
    expect(subject).toBe("Quote request from Ana Reyes");
  });

  it("darkens the page behind it, so the navy card stands off a navy hero", async () => {
    const user = userEvent.setup();
    render(
      <QuickMessageDialog subject="Quote request" className="cta">
        Get a quote
      </QuickMessageDialog>,
    );

    await user.click(screen.getByRole("button", { name: "Get a quote" }));
    await screen.findByRole("dialog");

    const overlay = document.querySelector('[data-slot="dialog-overlay"]');
    expect(overlay?.className).toMatch(/bg-black\/60/);
  });
});
