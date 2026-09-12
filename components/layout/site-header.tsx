import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

// Structural placeholder — navigation, mobile sheet and calls to action land
// here once the designs arrive. Keep this a Server Component; push any
// interactive piece into its own client leaf.
export function SiteHeader() {
  return (
    <header className="border-border/60 border-b">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/brand/serbiz-mark.png"
            alt=""
            width={32}
            height={32}
            priority
          />
          <span className="font-semibold tracking-tight">
            {siteConfig.name}
          </span>
        </Link>
      </div>
    </header>
  );
}
