"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { serviceChips } from "../lib/content";
import { buildQuoteMailto } from "../lib/quote-mailto";

const fieldClass =
  "h-[46px] rounded-xl border border-white/20 bg-white/10 px-3.5 text-[15px] text-white outline-none transition-colors focus:border-v2-orange placeholder:text-white/45";

export function QuoteForm() {
  const [picked, setPicked] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  function toggle(chip: string) {
    setPicked((current) =>
      current.includes(chip)
        ? current.filter((item) => item !== chip)
        : [...current, chip],
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    window.location.href = buildQuoteMailto({
      name: String(data.get("name") ?? ""),
      business: String(data.get("business") ?? ""),
      contact: String(data.get("contact") ?? ""),
      services: picked,
      notes: String(data.get("notes") ?? ""),
    });

    setSent(true);
    window.setTimeout(() => setSent(false), 3000);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="reveal bg-v2-forest relative flex flex-col gap-3.5 overflow-hidden rounded-3xl p-[clamp(24px,3vw,36px)] text-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-60px] right-[-60px] size-[220px] rounded-full bg-[radial-gradient(closest-side,rgba(242,107,29,.35),transparent_70%)]"
      />

      <h3 className="font-sora mb-1 text-[22px] font-bold tracking-[-0.01em]">
        Request a quote
      </h3>

      <label className="text-v2-on-dark flex flex-col gap-1.5 text-[13px]">
        Your name
        <input required name="name" placeholder="Maria Santos" className={fieldClass} />
      </label>

      <label className="text-v2-on-dark flex flex-col gap-1.5 text-[13px]">
        Business name &amp; type
        <input
          required
          name="business"
          placeholder="Santos Trading · Sole Proprietor"
          className={fieldClass}
        />
      </label>

      <label className="text-v2-on-dark flex flex-col gap-1.5 text-[13px]">
        Email or mobile
        <input required name="contact" placeholder="you@company.ph" className={fieldClass} />
      </label>

      <fieldset className="text-v2-on-dark flex flex-col gap-2 border-0 p-0 text-[13px]">
        <legend className="p-0">Services you’re interested in</legend>
        <div className="flex flex-wrap gap-2">
          {serviceChips.map((chip) => {
            const active = picked.includes(chip);
            return (
              <button
                key={chip}
                type="button"
                onClick={() => toggle(chip)}
                aria-pressed={active}
                className={`min-h-9 cursor-pointer rounded-full border px-3.5 py-2 text-[13px] text-white transition-[background-color,border-color,transform] duration-200 ease-[cubic-bezier(.23,1,.32,1)] active:scale-[.96] ${active ? "bg-v2-orange border-v2-orange" : "border-white/20 bg-white/10"}`}
              >
                {chip}
              </button>
            );
          })}
        </div>
      </fieldset>

      <label className="text-v2-on-dark flex flex-col gap-1.5 text-[13px]">
        Anything else?
        <textarea
          name="notes"
          rows={3}
          placeholder="e.g. 8 employees, paid twice a month, need BIR filing help"
          className="resize-y rounded-xl border border-white/20 bg-white/10 px-3.5 py-3 text-[15px] text-white outline-none transition-colors focus:border-v2-orange placeholder:text-white/45"
        />
      </label>

      <button
        type="submit"
        className={`mt-1.5 h-[50px] cursor-pointer rounded-full border-0 text-[15px] font-semibold text-white transition-[transform,background-color] duration-200 ease-[cubic-bezier(.23,1,.32,1)] active:scale-[.97] ${sent ? "bg-[#2e7d4f]" : "bg-v2-orange"}`}
      >
        {sent ? "Opening your email app…" : "Send request"}
      </button>

      <p aria-live="polite" className="text-v2-on-dark-muted text-center text-xs">
        {sent
          ? `If nothing opened, write to ${siteConfig.contact.email}.`
          : `Opens your email app addressed to ${siteConfig.contact.email}.`}
      </p>
    </form>
  );
}
