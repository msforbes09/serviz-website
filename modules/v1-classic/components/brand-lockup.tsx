import Image from "next/image";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

// "Resources Income Workers Cooperative", read off the legal name rather than
// typed a second time, so neither the bar nor the footer can drift from
// `site-config.ts`.
export const descriptor = siteConfig.legalName.replace(siteConfig.name, "").trim();

type BrandLockupProps = {
  /** Paper ground in the nav, forest ground in the footer. */
  tone: "ink" | "paper";
  priority?: boolean;
};

/**
 * The mark plus real text, not the full wordmark PNG: that file carried its
 * own white ground, which sat as a box on the paper bar. The mark alone is
 * transparent, and type takes whatever is behind it. Shared by the nav and
 * the footer so the two lockups stay identical.
 */
export function BrandLockup({ tone, priority }: BrandLockupProps) {
  return (
    <>
      <Image
        src="/designs/v1/logo-mark.png"
        alt=""
        width={40}
        height={40}
        priority={priority}
        className="size-10 shrink-0 object-contain"
      />
      <span className="flex min-w-0 flex-col leading-[1.05]">
        <span
          className={cn(
            "font-orbitron text-[21px] font-black tracking-[0.06em]",
            tone === "ink" ? "text-v1-ink" : "text-white",
          )}
        >
          {siteConfig.name}
        </span>
        <span
          className={cn(
            "truncate text-[10px] tracking-[0.02em]",
            tone === "ink" ? "text-v1-muted" : "text-[#cfe0d4]",
          )}
        >
          {descriptor}
        </span>
      </span>
    </>
  );
}
