import type { Metadata } from "next";
import { poppins } from "@/modules/v1-classic/lib/fonts";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function V1Layout({ children }: LayoutProps<"/8sfz8dn5ts">) {
  return (
    <div
      className={`v1-root ${poppins.variable} font-poppins bg-v1-paper text-v1-ink`}
    >
      {/* First stop for a keyboard visitor, and invisible until it is focused.
          Without it every anchor jump means tabbing the whole nav again. */}
      <a
        href="#main"
        className="bg-v1-forest sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-60 focus:rounded-lg focus:px-4 focus:py-2 focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      {children}
    </div>
  );
}
