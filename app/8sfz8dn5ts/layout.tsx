import type { Metadata } from "next";
import { SectionLink } from "@/modules/v1-classic/components/section-link";
import { outfit, poppins } from "@/modules/v1-classic/lib/fonts";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function V1Layout({ children }: LayoutProps<"/8sfz8dn5ts">) {
  return (
    /* `overflow-x-clip`: the hero photo and the FAQ cards start past the right
       edge and slide in, and a transformed element still widens the page's
       scrollable area. Without the clip a phone scrolls sideways and the
       sticky nav drifts with it. Clip, not hidden — hidden would make this a
       scroll container and unstick the nav. */
    <div
      className={`v1-root ${outfit.variable} ${poppins.variable} font-poppins bg-v1-paper overflow-x-clip text-v1-ink`}
    >
      {/* First stop for a keyboard visitor, and invisible until it is focused.
          Without it every anchor jump means tabbing the whole nav again. */}
      <SectionLink
        href="#main"
        className="bg-v1-forest sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-60 focus:rounded-lg focus:px-4 focus:py-2 focus:font-semibold focus:text-white"
      >
        Skip to content
      </SectionLink>
      {children}
    </div>
  );
}
