import Image from "next/image";
import { cacheLife } from "next/cache";
import { officeAddress, siteConfig } from "@/lib/site-config";
import { navLinks } from "../lib/content";

// `new Date()` is unstable and cannot run during the prerender under Cache
// Components. Caching it for a day keeps the footer in the static shell.
async function CopyrightYear() {
  "use cache";
  cacheLife("days");

  return <>{new Date().getFullYear()}</>;
}

export function SiteFooter() {
  return (
    <footer className="bg-v2-forest-deep text-v2-on-dark-muted px-5 py-10">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-x-10 gap-y-5 text-[13px]">
        <div className="flex items-center gap-2.5">
          <Image
            src="/brand/serbiz-mark.png"
            alt=""
            width={28}
            height={28}
            className="size-7 object-contain"
          />
          <span className="flex flex-col leading-snug">
            <span className="font-sora font-bold tracking-[0.12em] text-white">
              {siteConfig.name}
            </span>
            <span>
              Resources Income Workers Cooperative
            </span>
          </span>
        </div>

        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-white">
              {link.label}
            </a>
          ))}
          <a
            href={siteConfig.contact.facebook}
            target="_blank"
            rel="noopener"
            className="hover:text-white"
          >
            Facebook
          </a>
        </nav>

        <span>
          © <CopyrightYear /> {siteConfig.name} · {officeAddress}
        </span>
      </div>
    </footer>
  );
}
