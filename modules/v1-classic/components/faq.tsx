"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { faqs } from "../lib/content";

/** Single-open accordion. The panel animates on grid-template-rows. */
export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="scroll-mt-8 bg-[#eaf4ec]">
      <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-12 px-6 py-20">
        <div className="reveal max-w-[420px]">
          <p className="text-v1-orange text-sm font-semibold tracking-[0.08em] uppercase">
            Questions
          </p>
          <h2 className="text-v1-forest mt-3 text-[clamp(30px,4vw,48px)] leading-[1.1] font-bold text-balance">
            Things owners ask us{" "}
            <span className="text-v1-orange">before signing.</span>
          </h2>
          <p className="mt-4 text-base leading-6 text-[#3f4b43]">
            Something else on your mind?{" "}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="text-v1-forest underline"
            >
              Email {siteConfig.contact.email}
            </a>{" "}
            and a member will reply within one working day.
          </p>
        </div>

        <div className="grid gap-2">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const panelId = `v1-faq-${index}`;

            return (
              <div
                key={faq.q}
                className="border-v1-line overflow-hidden rounded-xl border bg-white"
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="text-v1-ink focus-visible:outline-v1-orange flex min-h-11 w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent p-4 text-left text-base leading-6 font-semibold focus-visible:-outline-offset-2"
                  >
                    {faq.q}
                    <Plus
                      aria-hidden
                      className={`text-v1-forest size-5 shrink-0 transition-transform duration-[250ms] ease-[cubic-bezier(.23,1,.32,1)] ${isOpen ? "rotate-45" : ""}`}
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  className={`grid transition-[grid-template-rows] duration-[250ms] ease-[cubic-bezier(.23,1,.32,1)] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="px-4 pb-4 text-base leading-6 text-[#3f4b43]">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
