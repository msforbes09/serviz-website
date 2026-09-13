import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/**
 * Where `RevealController` is mounted matters, and a wrong answer is
 * invisible in the browser until the console is opened.
 *
 * It has to be a child of the page, not the layout. A layout hydrates first,
 * and a nested page's segment sits inside its own Suspense boundary that can
 * hydrate later. Mounted in the layout, the controller ran its sweep against
 * the server HTML before React had hydrated the page, and then React found a
 * `data-revealed` attribute it never rendered — a hydration mismatch on every
 * hard load of a nested v3 page. A child of the page hydrates with the page,
 * so its effect runs after that.
 *
 * This is a guard on source, not behaviour: jsdom has no hydration to race.
 */
const pages = [
  "app/8sfz8dn5ts/page.tsx",
  "app/4sjhdc5awq/page.tsx",
  "app/4sjhdc5awq/about/page.tsx",
  "app/4sjhdc5awq/services/page.tsx",
  "app/4sjhdc5awq/news/page.tsx",
  "app/4sjhdc5awq/contact/page.tsx",
];

const layouts = ["app/8sfz8dn5ts/layout.tsx", "app/4sjhdc5awq/layout.tsx"];

describe("RevealController mounting", () => {
  it.each(pages)("%s mounts the controller itself", (file) => {
    expect(readFileSync(file, "utf8")).toContain("<RevealController />");
  });

  it.each(layouts)(
    "%s does not, so it cannot run before the page hydrates",
    (file) => {
      expect(readFileSync(file, "utf8")).not.toContain("RevealController");
    },
  );
});
