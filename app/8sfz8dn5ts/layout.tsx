import type { Metadata } from "next";
import { poppins } from "@/modules/v1-classic/lib/fonts";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function V1Layout({ children }: LayoutProps<"/8sfz8dn5ts">) {
  return (
    <div className={`${poppins.variable} font-poppins bg-v1-paper text-v1-ink`}>
      {children}
    </div>
  );
}
