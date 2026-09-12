import { siteConfig } from "@/lib/site-config";

/**
 * What a preview link says about itself when it is shared.
 *
 * Deliberately not the page's own `title` and `description`, which read "v1 —
 * Classic" and "Layout preview: one long page…". Those are ours, for finding
 * our way around while we work. A link pasted into Messenger, Viber or Slack
 * unfurls with whatever Open Graph carries, and a card announcing a layout as
 * attempt number one defeats the point of the random slugs: no presentation
 * should reach the client pre-labelled or pre-ranked.
 *
 * So this speaks for the cooperative instead, entirely from `site-config`.
 * `preview-metadata.test.ts` fails if an internal name ever leaks back in.
 */
export const previewSocialMetadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  imageAlt: `${siteConfig.legalName}: ${siteConfig.tagline}`,
} as const;
