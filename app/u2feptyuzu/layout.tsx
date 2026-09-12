import type { Metadata } from "next";
import { poppins, sora } from "@/modules/v2-forest/lib/fonts";

// Preview routes stay out of search results until the client picks one. Three
// near-duplicate versions of the same cooperative competing with each other
// would cost the real site later.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function V2Layout({ children }: LayoutProps<"/u2feptyuzu">) {
  return (
    <div className={`${sora.variable} ${poppins.variable} font-poppins bg-v2-cream text-v2-ink`}>
      {children}
    </div>
  );
}
