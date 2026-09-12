import type { Metadata } from "next";
import { SiteFooter } from "@/modules/v3-navy/components/site-footer";
import { SiteHeader } from "@/modules/v3-navy/components/site-header";
import { outfit, poppins } from "@/modules/v3-navy/lib/fonts";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function V3Layout({ children }: LayoutProps<"/4sjhdc5awq">) {
  return (
    <div
      className={`${outfit.variable} ${poppins.variable} font-poppins bg-v3-paper text-v3-ink flex min-h-dvh flex-col`}
    >
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
