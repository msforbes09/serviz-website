import type { Metadata } from "next";
import { Contact } from "@/modules/v1-classic/components/contact";
import { Faq } from "@/modules/v1-classic/components/faq";
import {
  Hero,
  HowItWorks,
  News,
  Permits,
  Services,
  SiteFooter,
  Tagline,
  WhySerbiz,
} from "@/modules/v1-classic/components/sections";
import { SiteNav } from "@/modules/v1-classic/components/site-nav";

export const metadata: Metadata = {
  title: "v1 — Classic",
  description:
    "Layout preview: one long page, generous white space, restrained type.",
};

export default function V1Page() {
  return (
    <>
      <SiteNav />
      <main id="main">
        <Hero />
        <Services />
        <Tagline />
        <WhySerbiz />
        <HowItWorks />
        <Permits />
        <News />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
