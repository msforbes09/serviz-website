import type { Metadata } from "next";
import { RevealController } from "@/components/motion/reveal-controller";
import { HomeHero } from "@/modules/v3-navy/components/home-hero";
import {
  AudienceStrip,
  HomeCta,
  Permits,
  ServicesGrid,
  WhyUs,
} from "@/modules/v3-navy/components/home-sections";

export const metadata: Metadata = {
  title: "v3 — Structured navy",
  description:
    "Layout preview: five pages, angular shapes, a navy-and-rust palette.",
};

export default function V3HomePage() {
  return (
    <>
      <HomeHero />
      <AudienceStrip />
      <ServicesGrid />
      <WhyUs />
      <Permits />
      <HomeCta />
      {/* A child of the page, not the layout, so its effect runs after this
          page has hydrated. See reveal-mount.test.ts. */}
      <RevealController />
    </>
  );
}
