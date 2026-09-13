import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { newsPosts } from "./news";

/**
 * One list, transcribed from the cooperative's Facebook page, that every
 * layout renders. The dates are ISO so each layout can format them its own
 * way; the photos are placeholders chosen to match the post, which the
 * sign-off list already notes.
 */
describe("news posts", () => {
  it("carries the four Facebook posts, newest first", () => {
    expect(newsPosts.map((post) => post.date)).toEqual([
      "2026-08-24",
      "2026-08-10",
      "2026-08-06",
      "2026-07-07",
    ]);
  });

  it("points every post at a photo that exists", () => {
    for (const post of newsPosts) {
      expect(existsSync(join(process.cwd(), "public", post.image)), post.image).toBe(true);
      expect(post.alt.length).toBeGreaterThan(10);
    }
  });
});
