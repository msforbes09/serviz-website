import { describe, expect, it } from "vitest";
import { metadata as v1Home } from "@/app/8sfz8dn5ts/page";
import { metadata as v3About } from "@/app/4sjhdc5awq/about/page";
import { metadata as v3Contact } from "@/app/4sjhdc5awq/contact/page";
import { metadata as v3Home } from "@/app/4sjhdc5awq/page";
import { metadata as v3News } from "@/app/4sjhdc5awq/news/page";
import { metadata as v3Services } from "@/app/4sjhdc5awq/services/page";
import { variants } from "./variants";

/**
 * The browser tab is the one place the internal variant names still reached
 * the client: "v1 — Classic | SERBIZ" beside "v3 — Structured navy | SERBIZ"
 * announces the numbering the random slugs exist to hide. Both home pages now
 * leave `title` unset and inherit the root default, so their tabs read the
 * same; v3's inner pages carry just their own name, which the root template
 * suffixes with the cooperative's.
 */
describe("preview page titles", () => {
  it("read the same on both home pages", () => {
    expect(v1Home.title).toBeUndefined();
    expect(v3Home.title).toBeUndefined();
  });

  it("never carry an internal variant name on an inner page", () => {
    for (const page of [v3About, v3Services, v3News, v3Contact]) {
      const title = String(page.title);
      for (const variant of variants) {
        expect(title).not.toContain(variant.name);
      }
      expect(title).not.toMatch(/\bv[123]\b/i);
      expect(title.length).toBeGreaterThan(0);
    }
  });
});
