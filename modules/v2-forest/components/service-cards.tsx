"use client";

import { useState } from "react";
import { services } from "../lib/content";

/**
 * Single-open accordion of service cards.
 *
 * Buttons rather than clickable divs: the design used a div with a role and a
 * tab index, which gets keyboard focus but not the space-bar activation or the
 * native semantics a button gives for free. The panel animates on
 * `grid-template-rows` so it transitions to its natural height.
 */
export function ServiceCards() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-4">
      {services.map((service, index) => {
        const isOpen = openIndex === index;
        const panelId = `v2-service-panel-${index}`;

        return (
          <div
            key={service.title}
            className={`reveal border-v2-forest/10 flex flex-col rounded-[20px] border transition-colors duration-200 ${isOpen ? "bg-v2-forest text-white" : "text-v2-ink bg-white"}`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex cursor-pointer flex-col gap-3.5 px-6 pt-[26px] pb-2 text-left"
            >
              <span className="flex items-start justify-between gap-3">
                <span className="font-sora text-v2-orange text-[13px] font-extrabold tracking-[0.08em]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  aria-hidden
                  className={`grid size-[30px] shrink-0 place-items-center rounded-full border border-current text-sm transition-transform duration-200 ease-[cubic-bezier(.23,1,.32,1)] ${isOpen ? "rotate-180" : ""}`}
                >
                  ↓
                </span>
              </span>
              <span className="font-sora text-xl leading-tight font-bold tracking-[-0.01em]">
                {service.title}
              </span>
              <span
                className={`text-[14.5px] leading-relaxed text-pretty ${isOpen ? "text-v2-on-dark" : "text-v2-muted"}`}
              >
                {service.blurb}
              </span>
            </button>

            <div
              id={panelId}
              className={`grid px-6 pb-[22px] transition-[grid-template-rows] duration-[260ms] ease-[cubic-bezier(.23,1,.32,1)] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <ul className="flex min-h-0 list-none flex-col gap-2 overflow-hidden">
                {service.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-normal">
                    <span aria-hidden className="text-v2-orange shrink-0 font-bold">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
