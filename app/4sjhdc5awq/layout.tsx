import type { Metadata } from "next";
import { RouteTopArmer } from "@/modules/v3-navy/components/route-top";
import { SiteFooter } from "@/modules/v3-navy/components/site-footer";
import { SiteHeader } from "@/modules/v3-navy/components/site-header";
import { previewSocialMetadata } from "@/modules/previews/lib/preview-metadata";
import { orbitron, outfit, poppins } from "@/modules/v3-navy/lib/fonts";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  // Set on the layout so all five v3 routes inherit one card, with the
  // client-facing copy from `preview-metadata.ts` rather than each page's own
  // title; its test fails if a variant name leaks back in.
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

export default function V3Layout({ children }: LayoutProps<"/4sjhdc5awq">) {
  return (
    <div
      className={`v3-root ${orbitron.variable} ${outfit.variable} ${poppins.variable} font-poppins bg-v3-paper text-v3-ink flex min-h-dvh flex-col`}
    >
      <RouteTopArmer />
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
