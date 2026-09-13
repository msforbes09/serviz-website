import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { officeAddress, officeMapsUrl } from "@/lib/site-config";
import { Contact } from "./contact";

const submit = () =>
  screen.getByRole("button", { name: /request my free consultation/i });

describe("v1 consultation form", () => {
  it("sends focus to the first field that failed", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.click(submit());

    expect(screen.getByLabelText(/your name/i)).toHaveFocus();
  });

  it("moves on to the next field once the one before it is filled", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.type(screen.getByLabelText(/your name/i), "Ana Reyes");
    await user.click(submit());

    expect(screen.getByLabelText(/^email$/i)).toHaveFocus();
  });

  it("marks only the failed field invalid", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.type(screen.getByLabelText(/your name/i), "Ana Reyes");
    await user.click(submit());

    expect(screen.getByLabelText(/^email$/i)).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText(/your name/i)).not.toHaveAttribute("aria-invalid", "true");
  });

  it("points the failed field at the message explaining why", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.click(submit());

    const name = screen.getByLabelText(/your name/i);
    const describedBy = name.getAttribute("aria-describedby");

    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy as string)).toHaveTextContent(
      "Please enter your name.",
    );
  });

  it("marks and describes the field before focus lands on it", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const name = screen.getByLabelText(/your name/i);
    let stateOnFocus: Record<string, string | null> | null = null;

    // A screen reader reads name, role, state and description at the instant
    // focus arrives. Attributes added by a later render are never announced,
    // so the invalid state has to be on the element before it is focused.
    name.addEventListener("focus", () => {
      stateOnFocus = {
        invalid: name.getAttribute("aria-invalid"),
        describedBy: name.getAttribute("aria-describedby"),
      };
    });

    await user.click(submit());

    expect(stateOnFocus).toEqual({
      invalid: "true",
      describedBy: expect.stringMatching(/\S/),
    });
  });

  it("clears the invalid state when the visitor starts fixing the field", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.click(submit());
    expect(screen.getByLabelText(/your name/i)).toHaveAttribute("aria-invalid", "true");

    await user.type(screen.getByLabelText(/your name/i), "A");

    expect(screen.getByLabelText(/your name/i)).not.toHaveAttribute("aria-invalid", "true");
  });
});

describe("v1 contact details", () => {
  it("links the office address to Google Maps in a new tab", () => {
    render(<Contact />);

    const link = screen.getByRole("link", { name: new RegExp(officeAddress) });

    expect(link).toHaveAttribute("href", officeMapsUrl);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener");
  });
});
