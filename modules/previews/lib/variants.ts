/**
 * The three layout presentations the client picks between.
 *
 * One entry per preview route. The chooser at `/previews` renders this list,
 * and `variants.test.ts` asserts every entry has a route behind it — so
 * deleting a losing variant's route without removing it here fails the build
 * rather than shipping a dead link.
 */
export type Variant = {
  /** Route segment and the name everyone uses in conversation. */
  slug: string;
  /** Short label for the chooser card. */
  name: string;
  /** What distinguishes this presentation, in the client's terms. */
  description: string;
  /** Palette summary, shown as swatches on the chooser. */
  swatches: string[];
  /** Typeface pairing, so the client can see why the three read differently. */
  type: string;
};

export const variants: Variant[] = [
  {
    slug: "v1",
    name: "Classic",
    description:
      "One long page, generous white space, restrained type. Reads as an established professional firm.",
    swatches: ["#0B4A24", "#F26A1B", "#FAFAF7"],
    type: "Poppins throughout",
  },
  {
    slug: "v2",
    name: "Warm editorial",
    description:
      "Cream ground with a deep forest hero, expandable service cards and a news feed. Approachable and current.",
    swatches: ["#0B3D1F", "#F26B1D", "#F6F5F1"],
    type: "Sora headings, Poppins body",
  },
  {
    slug: "v3",
    name: "Structured navy",
    description:
      "Five separate pages with angular shapes and a navy-and-rust palette. The most corporate of the three.",
    swatches: ["#0F2A44", "#C9502C", "#F7F9FB"],
    type: "Outfit headings, Poppins body",
  },
];

export function getVariant(slug: string): Variant | undefined {
  return variants.find((variant) => variant.slug === slug);
}
