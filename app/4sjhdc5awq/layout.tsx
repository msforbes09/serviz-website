import type { Metadata } from "next";
import { SiteFooter } from "@/modules/v3-navy/components/site-footer";
import { SiteHeader } from "@/modules/v3-navy/components/site-header";
import { previewSocialMetadata } from "@/modules/previews/lib/preview-metadata";
import { outfit, poppins } from "@/modules/v3-navy/lib/fonts";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  // Set on the layout so all five v3 routes inherit one card. Every page's own
  // `title` starts with "v3 — ", which is ours for navigating while we work; a
  // link unfurling with it would announce the layout as a numbered attempt and
  // undo the reason the slugs are random. `preview-metadata.ts` holds the
  // client-facing copy and its test fails if a variant name leaks back in.
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
      className={`v3-root ${outfit.variable} ${poppins.variable} font-poppins bg-v3-paper text-v3-ink flex min-h-dvh flex-col`}
    >
      {/* First stop for a keyboard visitor, invisible until focused. Without it
          every page means tabbing the whole header again. */}
      <a
        href="#main"
        className="bg-v3-navy sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-60 focus:rounded-lg focus:px-4 focus:py-2 focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
