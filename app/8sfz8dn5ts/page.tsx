import type { Metadata } from "next";
import { RevealController } from "@/components/motion/reveal-controller";
import { Contact } from "@/modules/v1-classic/components/contact";
import { Faq } from "@/modules/v1-classic/components/faq";
import {
  Hero,
  HowItWorks,
  Mission,
  News,
  Permits,
  Services,
  SiteFooter,
  Tagline,
  WhySerbiz,
} from "@/modules/v1-classic/components/sections";
import { SiteNav } from "@/modules/v1-classic/components/site-nav";
import { previewSocialMetadata } from "@/modules/previews/lib/preview-metadata";

export const metadata: Metadata = {
  // No `title`: the tab inherits the root default, so it reads the same as
  // v3's and names neither layout. The description is ours, for our own index.
  description:
    "Layout preview: one long page, generous white space, restrained type.",
  // The client's. A shared link unfurls from these, not from the two above, so
  // the card never announces the layout as attempt number one. See
  // `preview-metadata.ts` for why they are deliberately different. The image
  // itself comes from `opengraph-image.tsx` in this segment.
  openGraph: {
    type: "website",
    title: previewSocialMetadata.title,
    description: previewSocialMetadata.description,
  },
  twitter: {
    card: "summary_large_image",
    title: previewSocialMetadata.title,
    description: previewSocialMetadata.description,
  },
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
        <Mission />
        <Permits />
        <News />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
      {/* A child of the page, not the layout, so its effect runs after this
          page has hydrated. See reveal-mount.test.ts. */}
      <RevealController />
    </>
  );
}
