import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { basePath } from "../lib/content";
import { HeaderNav } from "./header-nav";

// Server-rendered. Only the navigation, which tracks the current route and
// slides a pill behind it, is a client leaf.
export function SiteHeader() {
  return (
    <header className="border-v3-navy/10 sticky top-0 z-50 h-(--v3-nav-height) border-b bg-[color-mix(in_srgb,var(--color-v3-paper)_92%,transparent)] backdrop-blur-[10px]">
      <div className="mx-auto flex max-w-[1200px] h-full items-center justify-between gap-4 px-5">
        <Link href={basePath} className="flex min-w-0 items-center gap-2.5">
          <Image
            src="/designs/v3/logo-mark.png"
            alt=""
            width={40}
            height={40}
            priority
            className="size-10 shrink-0 object-contain"
          />
          <span className="flex min-w-0 flex-col leading-[1.05]">
            <span className="font-outfit text-v3-ink text-[22px] font-extrabold tracking-[0.12em]">
              {siteConfig.name}
            </span>
            <span className="text-v3-slate truncate text-[10px] tracking-[0.02em]">
              Resources Income Workers Cooperative
            </span>
          </span>
        </Link>

        <HeaderNav />
      </div>
    </header>
  );
}
