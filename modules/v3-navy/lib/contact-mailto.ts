import { siteConfig } from "@/lib/site-config";

export type ContactMessage = {
  name: string;
  business: string;
  message: string;
  /**
   * What prompted the message, set by the button that opened the form —
   * "Consultation request" from the hero, "Quote request" from the header —
   * so the inbox shows at a glance which call to action was pressed.
   * Defaults to a plain "Inquiry".
   */
  subject?: string;
};

/**
 * Builds the `mailto:` the v3 contact form opens.
 *
 * Percent-encoded rather than interpolated: a raw `&` or `?` in the message
 * would start a new mailto header field and silently truncate it.
 *
 * A preview stand-in for a real submission — see `TODO.md`.
 */
export function buildContactMailto({
  name,
  business,
  message,
  subject = "Inquiry",
}: ContactMessage): string {
  const lines = [`Name: ${name}`];

  if (business.trim().length > 0) {
    lines.push(`Business: ${business}`);
  }

  lines.push("", message);

  const params = new URLSearchParams({
    subject: `${subject} from ${name}`,
    body: lines.join("\n"),
  });

  return `mailto:${siteConfig.contact.email}?${params.toString()}`;
}
