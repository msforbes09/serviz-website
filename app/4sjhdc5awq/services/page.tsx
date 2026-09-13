import type { Metadata } from "next";
import { RevealController } from "@/components/motion/reveal-controller";
import { PageHero } from "@/modules/v3-navy/components/page-hero";
import {
  ServiceSections,
  ServicesCta,
} from "@/modules/v3-navy/components/services-sections";

export const metadata: Metadata = {
  title: "v3 — Services",
  description: "Layout preview: the v3 services page.",
};

export default function V3ServicesPage() {
  return (
    <>
      <PageHero
        kicker="Services"
        title="Back-office services shaped around how you actually work."
        lede="Pick one service or combine several into a package."
      />
      <ServiceSections />
      <ServicesCta />
      {/* A child of the page, not the layout, so its effect runs after this
          page has hydrated. See reveal-mount.test.ts. */}
      <RevealController />
    </>
  );
}
