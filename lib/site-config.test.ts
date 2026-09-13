import { describe, expect, it } from "vitest";
import { siteConfig } from "./site-config";

describe("contact numbers", () => {
  it("names each phone, so a component never has to index an array", () => {
    expect(siteConfig.contact.phones.landline).toBeTruthy();
    expect(siteConfig.contact.phones.mobile).toBeTruthy();
  });

  // The drift this catches actually happened: the config read "(0915) 816 2433"
  // while five components had retyped it as "0915 816 2433". One number cannot
  // have two printed forms, so the displayed string and the dialable one are
  // pinned to the same digits here.
  it("keeps the printed mobile and the dialable one in agreement", () => {
    const printed = siteConfig.contact.phones.mobile.replace(/\D/g, "");
    const dialable = siteConfig.contact.mobileTel.replace(/\D/g, "");

    expect(printed.startsWith("0")).toBe(true);
    expect(dialable).toBe(`63${printed.slice(1)}`);
  });
});

describe("business name", () => {
  it("carries no SRI abbreviation anywhere, at the user's request", () => {
    expect(JSON.stringify(siteConfig)).not.toMatch(/\bSRI\b/);
    expect("shortName" in siteConfig).toBe(false);
  });
});
