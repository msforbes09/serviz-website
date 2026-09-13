/**
 * The three layout presentations the client picks between.
 *
 * Each goes to the client as its own link, and nothing on any of them leads to
 * the others — no switcher, no link back to the index. The slugs are random so
 * that seeing one preview never reveals that the others exist, which also keeps
 * the client's first impression of a layout free of any implied ranking.
 *
 * `variants.test.ts` asserts every entry still has a route behind it, so
 * deleting a losing variant's folder without removing it here fails the suite
 * rather than shipping a dead link.
 */

/**
 * Our own index of the three, for moving between them while we work. It is not
 * for the client, so it carries a random slug like the previews do: a
 * memorable path such as /previews would be trivial to stumble onto, and one
 * visit there would show all three layouts at once — exactly what the separate
 * links exist to prevent.
 */
export const previewIndexPath = "/m796ajxcp5";

export type Variant = {
  /** Route segment. Unguessable by design; see the note above. */
  slug: string;
  /** The name we use for it in conversation. Never shown to the client. */
  name: string;
  /** What distinguishes this presentation. */
  description: string;
  /** Palette summary. */
  swatches: string[];
  /** Typeface pairing. */
  type: string;
};

export const variants: Variant[] = [
  {
    slug: "8sfz8dn5ts",
    name: "v1 — Classic",
    description:
      "One long page, generous white space, restrained type. Reads as an established professional firm.",
    swatches: ["#0B4A24", "#E36419", "#FAFAF7"],
    type: "Poppins throughout",
  },
  {
    slug: "u2feptyuzu",
    name: "v2 — Warm editorial",
    description:
      "Cream ground with a deep forest hero, expandable service cards and a news feed. Approachable and current.",
    swatches: ["#0B3D1F", "#F26B1D", "#F6F5F1"],
    type: "Sora headings, Poppins body",
  },
  {
    slug: "4sjhdc5awq",
    name: "v3 — Structured navy",
    description:
      "Five separate pages with angular shapes and a navy-and-rust palette. The most corporate of the three.",
    swatches: ["#0F2A44", "#C9502C", "#F7F9FB"],
    type: "Outfit headings, Poppins body",
  },
];

export function getVariant(slug: string): Variant | undefined {
  return variants.find((variant) => variant.slug === slug);
}
