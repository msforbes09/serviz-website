"use client";

import { siteConfig } from "@/lib/site-config";
import { buildContactMailto } from "../lib/contact-mailto";

const fieldClass =
  "rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 text-[15px] text-white outline-none transition-colors focus:border-v3-sky placeholder:text-white/50";

export function ContactForm() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    window.location.href = buildContactMailto({
      name: String(data.get("name") ?? ""),
      business: String(data.get("business") ?? ""),
      message: String(data.get("message") ?? ""),
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-v3-navy grid gap-3 rounded-3xl p-6 text-white [--v3-focus-ring:var(--color-v3-paper)]"
    >
      <h2 className="font-outfit text-xl font-bold">Send a quick message</h2>

      <label className="sr-only" htmlFor="v3-contact-name">
        Your name
      </label>
      <input
        id="v3-contact-name"
        name="name"
        required
        placeholder="Your name"
        className={fieldClass}
      />

      <label className="sr-only" htmlFor="v3-contact-business">
        Business name and type
      </label>
      <input
        id="v3-contact-business"
        name="business"
        placeholder="Business name / type (SP, OPC, SME)"
        className={fieldClass}
      />

      <label className="sr-only" htmlFor="v3-contact-message">
        What do you need help with?
      </label>
      <textarea
        id="v3-contact-message"
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
