import Link from "next/link";
import { getVariant, variants } from "../lib/variants";

/**
 * Thin bar across the top of every preview route.
 *
 * Two jobs: let the client jump between the three presentations without going
 * back to the chooser, and make it unmistakable that this is a draft. It sits
 * outside each variant's own shell so it never inherits a variant's palette.
 */
export function PreviewBar({ current }: { current: string }) {
  const variant = getVariant(current);

  return (
    <div className="border-b border-neutral-800 bg-neutral-950 text-neutral-300">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center gap-x-4 gap-y-2 px-5 py-2 text-[13px]">
        <Link href="/previews" className="font-medium text-white hover:underline">
          SERBIZ previews
        </Link>
        <span aria-hidden className="text-neutral-600">
          /
        </span>
        <span className="text-neutral-400">
          {variant ? `${variant.slug} · ${variant.name}` : current}
        </span>

        <nav aria-label="Switch preview" className="ml-auto flex items-center gap-1">
          {variants.map((option) => {
            const active = option.slug === current;
            return (
              <Link
                key={option.slug}
                href={`/${option.slug}`}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-3 py-1 transition-colors ${active ? "bg-white text-neutral-950" : "hover:bg-neutral-800"}`}
              >
                {option.slug}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
