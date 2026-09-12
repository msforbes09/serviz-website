import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { variants } from "@/modules/previews/lib/variants";

// Our index, not the client's. It lists all three layouts, which is exactly
// what the separate links exist to avoid showing them — hence the random slug
// and the noindex.
export const metadata: Metadata = {
  title: "Layout previews",
  description: "Internal index of the three SERBIZ layout previews.",
  robots: { index: false, follow: false },
};

export default function PreviewIndexPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
        {siteConfig.legalName}
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance">
        Three ways the site could look
      </h1>
      <p className="text-muted-foreground mt-4 max-w-2xl text-lg text-pretty">
        Internal index. The client gets the three links separately and never
        sees this page, so nothing here links back from a preview.
      </p>

      <ul className="mt-12 grid list-none gap-4">
        {variants.map((variant) => (
          <li key={variant.slug}>
            <Link
              href={`/${variant.slug}`}
              className="border-border hover:border-foreground/30 flex flex-col gap-3 rounded-2xl border p-6 transition-colors"
            >
              <span className="flex flex-wrap items-center gap-3">
                <span className="text-xl font-semibold tracking-tight">
                  {variant.name}
                </span>
                <span className="ml-auto flex gap-1.5" aria-hidden>
                  {variant.swatches.map((swatch) => (
                    <span
                      key={swatch}
                      style={{ background: swatch }}
                      className="border-border size-5 rounded-full border"
                    />
                  ))}
                </span>
              </span>
              <span className="text-muted-foreground text-pretty">
                {variant.description}
              </span>
              <span className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                <span className="text-muted-foreground">{variant.type}</span>
                <code className="text-muted-foreground bg-muted rounded px-2 py-0.5 font-mono text-xs">
                  /{variant.slug}
                </code>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="text-muted-foreground mt-10 text-sm">
        All four routes are hidden from search engines. Some copy is placeholder
        text awaiting confirmation — see TODO.md.
      </p>
    </main>
  );
}
