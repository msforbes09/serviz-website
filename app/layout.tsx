import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";
import { env } from "@/lib/env";
import { siteConfig } from "@/lib/site-config";
import { startReloadAtTopScript } from "@/lib/start-reload-at-top";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Makes every per-page `openGraph`/`alternates` entry resolvable from a
  // relative path.
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* `beforeInteractive` so it runs before the browser restores the
            scroll position; that strategy is only honoured in the root
            layout. See `lib/start-reload-at-top.ts`. */}
        <Script id="start-reload-at-top" strategy="beforeInteractive">
          {startReloadAtTopScript}
        </Script>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
