import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getVariant, variants } from "./variants";

describe("preview variants", () => {
  it("lists all three layouts", () => {
    expect(variants).toHaveLength(3);
  });

  it("gives each variant a unique slug", () => {
    const slugs = variants.map((v) => v.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("keeps every slug unguessable", () => {
    // The whole point of the random slugs is that seeing one preview never
    // reveals the others. A slug that drifted back to something like "v2" or
    // "classic" would quietly undo that.
    for (const variant of variants) {
      expect(variant.slug, variant.name).toMatch(/^[a-z0-9]{10}$/);
      expect(variant.slug, variant.name).not.toMatch(/^v\d/);
    }
  });

  it("has a real route behind every listed variant", () => {
    // Guards the drift that makes a link 404: a variant listed here whose route
    // segment was never created, or was deleted after the client chose.
    for (const variant of variants) {
      const page = join(process.cwd(), "app", variant.slug, "page.tsx");

      expect(existsSync(page), `${variant.name} has no app/${variant.slug}/page.tsx`).toBe(true);
    }
  });

  it("finds a variant by slug", () => {
    expect(getVariant(variants[1].slug)?.name).toBe(variants[1].name);
  });

  it("returns undefined for a slug that is not a variant", () => {
    expect(getVariant("v2")).toBeUndefined();
  });
});
