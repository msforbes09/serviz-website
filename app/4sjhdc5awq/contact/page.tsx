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
      <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start gap-12 px-5 pt-18 pb-22 enter-rise">
        <ContactDetails />
        <ContactAside />
      </div>
    </section>
  );
}
