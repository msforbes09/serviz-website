import type { Metadata } from "next";
import { PageHero } from "@/modules/v3-navy/components/page-hero";
import {
  OtherServices,
  ServiceGroups,
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
      <ServiceGroups />
      <OtherServices />
    </>
  );
}
