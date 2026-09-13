import { describe, expect, it } from "vitest";
import {
  featuredServices,
  otherServices,
  serviceCards,
  serviceSections,
} from "./content";

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
    expect(accounting?.items?.map((i) => i.title)).not.toContain(
      "Tax Compliance",
    );
    expect(tax?.body).toMatch(/BIR/);
  });

  it("carries the payroll and accounting detail lists across", () => {
    expect(serviceSections[0].items?.length).toBe(4);
    expect(serviceSections[1].items?.length).toBe(3);
    expect(serviceSections[0].image?.src).toBeTruthy();
    expect(serviceSections[1].image?.src).toBeTruthy();
  });

  it("expounds tax and HR with an image and three to four items, like payroll and accounting", () => {
    for (const num of ["03", "04"]) {
      const section = serviceSections.find((s) => s.num === num);
      expect(section?.image?.src).toBeTruthy();
      expect(section?.items?.length).toBeGreaterThanOrEqual(3);
      expect(section?.items?.length).toBeLessThanOrEqual(4);
    }
  });
});

/**
 * The services page has two tiers: the first four services get a full section
 * each, the remaining three sit in the compact "Other services offered" grid.
 * Together they cover every home card exactly once.
 */
describe("featuredServices and otherServices", () => {
  it("split the seven cards into four expounded sections and three compact cards", () => {
    expect(featuredServices.map((s) => s.num)).toEqual([
      "01",
      "02",
      "03",
      "04",
    ]);
    expect(otherServices.map((s) => s.num)).toEqual(["05", "06", "07"]);
  });

  it("give every featured section a list, and every other card a one-line body", () => {
    for (const s of featuredServices)
      expect(s.items?.length).toBeGreaterThan(0);
    for (const s of otherServices) expect(s.body).toBeTruthy();
  });
});

describe("web and software development", () => {
  // Card 06 was "IT Consultant", invented by the design. It is now the
  // service the user proposes to deliver with the cooperative as its
  // development partner; the copy names the partnership but not the
  // partner, pending the cooperative's agreement (see TODO.md).
  it("replaces the IT consultant card and credits a development partner", () => {
    const card = serviceCards.find((c) => c.num === "06");
    expect(card?.title).toBe("Web & Software Development");
    expect(card?.isNew).toBe(true);

    const section = serviceSections.find((s) => s.num === "06");
    expect(section?.id).toBe("web");
    expect(section?.body).toMatch(/development partner/);
  });
});
