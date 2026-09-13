import { describe, expect, it } from "vitest";
import { serviceCards, serviceSections } from "./content";

/**
 * The services page is a walk through the home page's grid: the same seven
 * services, in the same order, under the same numbers, so a visitor who
 * clicks card 03 lands on section 03. The two lists are derived from one
 * source, and this pins that.
 */
describe("serviceSections", () => {
  it("mirrors the home cards one to one, in order", () => {
    expect(serviceSections.map((s) => [s.num, s.title])).toEqual(
      serviceCards.map((c) => [c.num, c.title]),
    );
  });

  it("gives every section a distinct anchor for the home cards to link to", () => {
    const ids = serviceSections.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^[a-z0-9-]+$/);
  });

  it("keeps tax compliance as its own section rather than an accounting item", () => {
    const accounting = serviceSections.find((s) => s.num === "02");
    const tax = serviceSections.find((s) => s.num === "03");
    expect(accounting?.items?.map((i) => i.title)).not.toContain("Tax Compliance");
    expect(tax?.body).toMatch(/BIR/);
  });

  it("carries the payroll and accounting detail lists across", () => {
    expect(serviceSections[0].items?.length).toBe(4);
    expect(serviceSections[1].items?.length).toBe(3);
    expect(serviceSections[0].image?.src).toBeTruthy();
    expect(serviceSections[1].image?.src).toBeTruthy();
  });
});
