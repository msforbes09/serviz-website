import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: siteConfig.tagline,
  description: siteConfig.description,
};

// Placeholder home page. Real sections land here once the designs arrive;
// build them as components under `modules/landing/`, not inline in this file.
export default function HomePage() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-4 px-6 py-24">
      <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
        {siteConfig.legalName} ({siteConfig.shortName})
      </p>
      <h1 className="text-4xl font-semibold tracking-tight text-balance">
        {siteConfig.tagline}
      </h1>
      <p className="text-muted-foreground text-lg text-pretty">
        {siteConfig.description}
      </p>
    </section>
  );
}
