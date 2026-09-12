import type { Metadata } from "next";
import { PreviewBar } from "@/modules/previews/components/preview-bar";
import { poppins } from "@/modules/v1-classic/lib/fonts";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function V1Layout({ children }: LayoutProps<"/v1">) {
  return (
    <div className={`${poppins.variable} font-poppins bg-v1-paper text-v1-ink`}>
      <PreviewBar current="v1" />
      {children}
    </div>
  );
}
