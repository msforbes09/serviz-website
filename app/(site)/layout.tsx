import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

// Public marketing shell. A Server Component — keep it that way so every page
// under (site) can prerender. Interactive bits belong in client leaves inside
// the header/footer, not here.
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
