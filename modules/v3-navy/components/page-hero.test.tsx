import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PageHero } from "./page-hero";

const step = (el: HTMLElement) => ({
  stepped: /enter-step/.test(el.className),
  i: el.style.getPropertyValue("--i"),
});

describe("PageHero", () => {
  it("brings the kicker, title and lede in as separate steps, in reading order", () => {
    render(<PageHero kicker="Services" title="Title here" lede="Lede here" />);

    const kicker = step(screen.getByText("Services"));
    const title = step(screen.getByRole("heading", { level: 1 }));
    const lede = step(screen.getByText("Lede here"));

    expect([kicker.stepped, title.stepped, lede.stepped]).toEqual([true, true, true]);
    expect([kicker.i, title.i, lede.i]).toEqual(["0", "1", "2"]);
  });
});
