import { siteConfig } from "@/lib/site-config";

export type Consultation = {
  name: string;
  email: string;
  message: string;
};

export type ValidationResult = { ok: true } | { ok: false; message: string };

// Deliberately loose. An address is only truly validated by sending to it, and
// a stricter pattern rejects legitimate addresses far more often than it
// catches typos. This only catches the shapes that cannot be an address at all.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Checks the v1 consultation form, reporting one problem at a time in field
 * order so the message always points at the field the visitor should fix next.
 */
export function validateConsultation({
  name,
  email,
  message,
}: Consultation): ValidationResult {
  if (name.trim().length === 0) {
    return { ok: false, message: "Please enter your name." };
  }

  if (!EMAIL.test(email.trim())) {
    return { ok: false, message: "Please enter a valid email address." };
  }

  if (message.trim().length === 0) {
    return { ok: false, message: "Tell us a little about what you need." };
  }

  return { ok: true };
}

/**
 * Builds the `mailto:` the v1 form opens. Percent-encoded rather than
 * interpolated, so an `&` or `?` in the message cannot start a new mailto
 * header field and truncate it. A preview stand-in — see `TODO.md`.
 */
export function buildConsultationMailto({ name, email, message }: Consultation): string {
  const params = new URLSearchParams({
    subject: `Consultation request from ${name}`,
    body: `${message}\n\nReply to: ${email}`,
  });

  return `mailto:${siteConfig.contact.email}?${params.toString()}`;
}
