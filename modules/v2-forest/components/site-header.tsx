import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { MobileMenu } from "./mobile-menu";
import { navLinks } from "../lib/content";

// Server-rendered shell. Only the collapsing menu is a client leaf.
export function SiteHeader() {
  return (
    <header className="border-v2-forest/10 sticky top-0 z-50 border-b bg-[color-mix(in_srgb,var(--color-v2-cream)_86%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-5 py-3">
        <a href="#top" className="flex items-center gap-2.5">
          <Image
            src="/brand/serbiz-mark.png"
            alt=""
            width={36}
            height={36}
            className="size-9 object-contain"
            priority
          />
          <span className="flex flex-col leading-none">
            <span className="font-sora text-v2-forest text-xl font-extrabold tracking-[0.14em]">
              {siteConfig.name}
            </span>
            <span className="text-v2-muted mt-[3px] text-[9.5px] tracking-[0.04em]">
              Resources Income Workers Cooperative
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-sm font-medium min-[860px]:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-v2-ink hover:text-v2-orange transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-v2-forest hover:bg-v2-orange rounded-full px-[18px] py-2.5 text-white transition-[transform,background-color] duration-200 ease-[cubic-bezier(.23,1,.32,1)] active:scale-[.97]"
          >
            Get a quote
          </a>
        </nav>

        <MobileMenu />
      </div>
    </header>
  );
}
