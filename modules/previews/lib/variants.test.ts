import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getVariant, variants } from "./variants";

describe("preview variants", () => {
  it("exposes every variant the client has to choose between", () => {
    expect(variants.map((v) => v.slug)).toEqual(["v1", "v2", "v3"]);
  });

  it("gives each variant a unique slug", () => {
    const slugs = variants.map((v) => v.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has a real route behind every listed variant", () => {
    // Guards the drift that makes a chooser link 404: a variant listed here
    // whose route segment was never created, or was deleted after selection.
    for (const variant of variants) {
      const page = join(process.cwd(), "app", variant.slug, "page.tsx");

      expect(existsSync(page), `${variant.slug} has no app/${variant.slug}/page.tsx`).toBe(true);
    }
  });

  it("finds a variant by slug", () => {
    expect(getVariant("v2")?.name).toBe(variants[1].name);
  });

  it("returns undefined for a slug that is not a variant", () => {
    expect(getVariant("v9")).toBeUndefined();
  });
});
