import type { Metadata } from "next";
import {
  ContactAside,
  ContactDetails,
} from "@/modules/v3-navy/components/contact-sections";

export const metadata: Metadata = {
  title: "v3 — Contact",
  description: "Layout preview: the v3 contact page.",
};

export default function V3ContactPage() {
  return (
    <section className="bg-white">
      {/* The two columns arrive in sequence rather than as one block. This page
          is short enough to sit above the fold, so a scroll reveal would never
          fire here — a load entrance is the right tool, the same one the heroes
          use. */}
      <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start gap-12 px-5 pt-18 pb-22">
        <div
          style={{ "--i": 0 } as React.CSSProperties}
          className="enter-rise enter-step"
        >
          <ContactDetails />
        </div>
        <div
          style={{ "--i": 1 } as React.CSSProperties}
          className="enter-rise enter-step"
        >
          <ContactAside />
        </div>
      </div>
    </section>
  );
}
