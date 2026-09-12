import { siteConfig } from "@/lib/site-config";

export type QuoteRequest = {
  name: string;
  business: string;
  contact: string;
  services: string[];
  notes: string;
};

/**
 * Builds the `mailto:` the v2 quote form opens.
 *
 * Every value is user input, so subject and body are percent-encoded rather
 * than interpolated: a raw `&` or `?` in a business name would otherwise start
 * a new mailto header field and silently truncate the message.
 *
 * This is the preview's stand-in for a real submission. When the contact form
 * becomes a server action it gets validation, a rate limit and a destination
 * that does not depend on the visitor having a mail client — see `TODO.md`.
 */
export function buildQuoteMailto({
  name,
  business,
  contact,
  services,
  notes,
}: QuoteRequest): string {
  const lines = [
    `Name: ${name}`,
    `Business: ${business}`,
    `Contact: ${contact}`,
    `Services: ${services.length > 0 ? services.join(", ") : "Not specified"}`,
  ];

  if (notes.trim().length > 0) {
    lines.push("", notes);
  }

  const params = new URLSearchParams({
    subject: `Quote request — ${business}`,
    body: lines.join("\n"),
  });

  return `mailto:${siteConfig.contact.email}?${params.toString()}`;
}
