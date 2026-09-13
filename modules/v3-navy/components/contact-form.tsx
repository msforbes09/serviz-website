"use client";

import { useId } from "react";
import { siteConfig } from "@/lib/site-config";
import { buildContactMailto } from "../lib/contact-mailto";

const fieldClass =
  "rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 text-[15px] text-white outline-none transition-colors focus:border-v3-sky placeholder:text-white/50";

type ContactFormProps = {
  /** Subject prefix for the email; see `buildContactMailto`. */
  subject?: string;
  /**
   * The form's heading. Defaults to an `h2`; the quick-message dialog passes
   * its own `DialogTitle` so the modal is labelled by the same words.
   */
  heading?: React.ReactNode;
};

export function ContactForm({ subject, heading }: ContactFormProps) {
  // Generated rather than fixed: the contact page and an open dialog can both
  // mount this form, and two fields sharing an id would break the labels.
  const id = useId();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    window.location.href = buildContactMailto({
      name: String(data.get("name") ?? ""),
      business: String(data.get("business") ?? ""),
      message: String(data.get("message") ?? ""),
      subject,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-v3-navy grid gap-3 rounded-3xl p-6 text-white [--v3-focus-ring:var(--color-v3-paper)]"
    >
      {heading ?? (
        <h2 className="font-outfit text-xl font-bold">Send a quick message</h2>
      )}

      <label className="sr-only" htmlFor={`${id}-name`}>
        Your name
      </label>
      <input
        id={`${id}-name`}
        name="name"
        required
        placeholder="Your name"
        className={fieldClass}
      />

      <label className="sr-only" htmlFor={`${id}-business`}>
        Business name and type
      </label>
      <input
        id={`${id}-business`}
        name="business"
        placeholder="Business name / type (SP, OPC, SME)"
        className={fieldClass}
      />

      <label className="sr-only" htmlFor={`${id}-message`}>
        What do you need help with?
      </label>
      <textarea
        id={`${id}-message`}
        name="message"
        required
        rows={4}
        placeholder="What do you need help with?"
        className={`${fieldClass} resize-y`}
      />

      <button
        type="submit"
        className="bg-v3-rust hover:bg-v3-rust-bright cursor-pointer rounded-full border-0 px-[22px] py-[15px] text-base font-bold text-white transition-colors max-md:w-full"
      >
        Send via email
      </button>

      <p className="text-v3-on-dark-muted text-xs">
        Opens your email app with the message pre-filled, addressed to{" "}
        {siteConfig.contact.email}.
      </p>
    </form>
  );
}
