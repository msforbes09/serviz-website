import { describe, expect, it } from "vitest";
import { previewSocialMetadata } from "./preview-metadata";
import { variants } from "./variants";

describe("preview social metadata", () => {
  const text = [
    previewSocialMetadata.title,
    previewSocialMetadata.description,
    previewSocialMetadata.imageAlt,
  ].join(" ");

  // The whole reason the previews sit on random slugs is that no layout should
  // reach the client pre-labelled as a first or second attempt. A link unfurls
  // in Messenger or Viber with this copy attached, so our internal names for
  // them must never travel with it.
  it("never carries an internal variant name", () => {
    for (const variant of variants) {
      expect(text).not.toContain(variant.name);
    }
    expect(text).not.toMatch(/\bv[123]\b/i);
  });

  it("does not describe itself as a preview or a layout", () => {
    expect(text).not.toMatch(/preview|layout|mockup|draft/i);
  });

  it("speaks for the cooperative rather than for us", () => {
    expect(previewSocialMetadata.title).toContain("SERBIZ");
    expect(previewSocialMetadata.description.length).toBeGreaterThan(40);
  });
});
