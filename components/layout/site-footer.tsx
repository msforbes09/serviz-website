import { cacheLife } from "next/cache";
import { siteConfig } from "@/lib/site-config";

// `new Date()` is unstable, so under Cache Components it cannot run during the
// prerender. Caching it for a day keeps the footer in the static shell instead
// of pushing the whole page to request time for one number.
async function CopyrightYear() {
  "use cache";
  cacheLife("days");

  return <>{new Date().getFullYear()}</>;
}

// Structural placeholder — sitemap columns and social links land here once the
// designs arrive.
export function SiteFooter() {
  return (
    <footer className="border-border/60 border-t">
      <div className="text-muted-foreground mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-sm">
        <p className="text-foreground font-medium">{siteConfig.legalName}</p>
        <p>
          <a href={`mailto:${siteConfig.contact.email}`} className="underline">
            {siteConfig.contact.email}
          </a>
        </p>
        <p>{Object.values(siteConfig.contact.phones).join(" · ")}</p>
        <p>
          © <CopyrightYear /> {siteConfig.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
