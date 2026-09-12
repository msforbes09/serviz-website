import type { Metadata } from "next";
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
    </>
  );
}
