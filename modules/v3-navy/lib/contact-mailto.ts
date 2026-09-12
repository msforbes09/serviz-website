import { siteConfig } from "@/lib/site-config";

export type ContactMessage = {
  name: string;
  business: string;
  message: string;
};

/**
 * Builds the `mailto:` the v3 contact form opens.
 *
 * Percent-encoded rather than interpolated: a raw `&` or `?` in the message
 * would start a new mailto header field and silently truncate it.
 *
 * A preview stand-in for a real submission — see `TODO.md`.
 */
export function buildContactMailto({ name, business, message }: ContactMessage): string {
  const lines = [`Name: ${name}`];

  if (business.trim().length > 0) {
    lines.push(`Business: ${business}`);
  }

  lines.push("", message);

  const params = new URLSearchParams({
    subject: `Inquiry from ${name}`,
    body: lines.join("\n"),
  });

  return `mailto:${siteConfig.contact.email}?${params.toString()}`;
}
