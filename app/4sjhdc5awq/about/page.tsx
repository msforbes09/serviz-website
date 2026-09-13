import type { Metadata } from "next";
import { RevealController } from "@/components/motion/reveal-controller";
import {
  AboutIntro,
  MissionVision,
  WhyClientsStay,
} from "@/modules/v3-navy/components/about-sections";

export const metadata: Metadata = {
  title: "v3 — About",
  description: "Layout preview: the v3 about page.",
};

export default function V3AboutPage() {
  return (
    <>
      <AboutIntro />
      <MissionVision />
      <WhyClientsStay />
      {/* A child of the page, not the layout, so its effect runs after this
          page has hydrated. See reveal-mount.test.ts. */}
      <RevealController />
    </>
  );
}
