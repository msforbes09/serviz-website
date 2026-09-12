"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { officeAddress, siteConfig } from "@/lib/site-config";
import { buildConsultationMailto, validateConsultation } from "../lib/consultation";

const inputClass =
  "border-v1-line/80 bg-v1-paper text-v1-ink focus-visible:border-v1-forest focus-visible:outline-v1-forest rounded-lg border px-3 py-3 text-base placeholder:text-v1-placeholder";

type Feedback = { tone: "error" | "success"; message: string } | null;

export function Contact() {
  const [feedback, setFeedback] = useState<Feedback>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const enquiry = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    const result = validateConsultation(enquiry);

    if (!result.ok) {
      setFeedback({ tone: "error", message: result.message });
      return;
    }

    setFeedback({
      tone: "success",
      message: `Your email app should open with the message ready. If not, write to ${siteConfig.contact.email}.`,
    });
    window.location.href = buildConsultationMailto(enquiry);
  }

  return (
    <section
      id="contact"
      className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-12 px-6 py-20"
    >
      <div className="reveal">
        <p className="text-v1-orange text-sm font-semibold tracking-[0.08em] uppercase">
          Free consultation
        </p>
        <h2 className="text-v1-forest mt-3 max-w-[680px] text-[clamp(30px,4vw,48px)] leading-[1.1] font-bold text-balance">
          Tell us about your business. We will map out what to take off your
          plate.
        </h2>
        <p className="mt-4 max-w-[520px] text-base leading-6 text-[#3f4b43]">
          A 30 minute call, no obligation. You leave with a written quote within
          three working days.
        </p>

        <ul className="mt-8 grid list-none gap-4 text-base leading-6">
          <li>
            <a
              href={`tel:${siteConfig.contact.mobileTel}`}
              className="text-v1-ink flex items-center gap-3"
            >
              <Phone aria-hidden className="text-v1-forest size-6" /> 0915 816
              2433
            </a>
          </li>
          <li>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="text-v1-ink flex items-center gap-3"
            >
              <Mail aria-hidden className="text-v1-forest size-6" />{" "}
              {siteConfig.contact.email}
            </a>
          </li>
          <li className="flex items-start gap-3">
            <MapPin aria-hidden className="text-v1-forest size-6 shrink-0" />
            <span>{officeAddress}</span>
          </li>
        </ul>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="reveal border-v1-line grid gap-4 self-start rounded-2xl border bg-white p-6"
      >
        <label className="grid gap-1 text-sm font-semibold">
          Your name
          <input name="name" placeholder="Maria Santos" className={inputClass} />
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          Email
          <input
            type="email"
            name="email"
            placeholder="maria@yourbusiness.ph"
            className={inputClass}
          />
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          What do you need help with?
          <textarea
            name="message"
            rows={4}
            placeholder="e.g. Payroll for 12 staff and monthly BIR filings"
            className={`${inputClass} resize-y`}
          />
        </label>

        <p
          role="alert"
          aria-live="polite"
          className={`m-0 rounded-lg px-3 py-2 text-sm leading-5 ${feedback ? "" : "hidden"} ${feedback?.tone === "error" ? "bg-[#fef3f2] text-[#b42318]" : "text-v1-forest bg-[#eaf4ec]"}`}
        >
          {feedback?.message}
        </p>

        <button
          type="submit"
          className="bg-v1-orange hover:bg-v1-forest focus-visible:outline-v1-forest min-h-11 cursor-pointer rounded-lg border-0 px-6 py-3 text-base font-semibold text-white transition-[background-color,transform] duration-200 focus-visible:outline-offset-2 active:scale-[.98]"
        >
          Request my free consultation
        </button>
        <p className="text-xs leading-4 text-[#6b7a70]">
          We reply within one working day. Your details are used only to respond
          to you.
        </p>
      </form>
    </section>
  );
}
