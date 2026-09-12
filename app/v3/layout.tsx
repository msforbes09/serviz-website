import type { Metadata } from "next";
import { PreviewBar } from "@/modules/previews/components/preview-bar";
import { SiteFooter } from "@/modules/v3-navy/components/site-footer";
import { SiteHeader } from "@/modules/v3-navy/components/site-header";
import { outfit, poppins } from "@/modules/v3-navy/lib/fonts";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function V3Layout({ children }: LayoutProps<"/v3">) {
  return (
    <div
      className={`${outfit.variable} ${poppins.variable} font-poppins bg-v3-paper text-v3-ink flex min-h-dvh flex-col`}
    >
      <PreviewBar current="v3" />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
