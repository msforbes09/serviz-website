import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
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

  it("clears the invalid state when the visitor starts fixing the field", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.click(submit());
    expect(screen.getByLabelText(/your name/i)).toHaveAttribute("aria-invalid", "true");

    await user.type(screen.getByLabelText(/your name/i), "A");

    expect(screen.getByLabelText(/your name/i)).not.toHaveAttribute("aria-invalid", "true");
  });
});
