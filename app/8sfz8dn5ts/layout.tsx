import type { Metadata } from "next";
import { orbitron, poppins } from "@/modules/v1-classic/lib/fonts";

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
      className={`v1-root ${orbitron.variable} ${poppins.variable} font-poppins bg-v1-paper overflow-x-clip text-v1-ink`}
    >
      {children}
    </div>
  );
}
