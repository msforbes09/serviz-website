import type { Metadata } from "next";
import { About } from "@/modules/v2-forest/components/about";
import { Contact } from "@/modules/v2-forest/components/contact";
import { Hero } from "@/modules/v2-forest/components/hero";
import { NewsEvents } from "@/modules/v2-forest/components/news-events";
import { Services } from "@/modules/v2-forest/components/services";
import { SiteFooter } from "@/modules/v2-forest/components/site-footer";
import { SiteHeader } from "@/modules/v2-forest/components/site-header";
import { WhySerbiz } from "@/modules/v2-forest/components/why-serbiz";

export const metadata: Metadata = {
  title: "v2 — Warm editorial",
  description:
    "Layout preview: cream ground, forest hero, expandable service cards and a news feed.",
};

export default function V2Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Services />
        <WhySerbiz />
        <About />
        <NewsEvents />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
