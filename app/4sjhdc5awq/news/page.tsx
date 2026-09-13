import type { Metadata } from "next";
import { RevealController } from "@/components/motion/reveal-controller";
import { siteConfig } from "@/lib/site-config";
import {
  NewsList,
  UpcomingEvents,
} from "@/modules/v3-navy/components/news-sections";
import { PageHero } from "@/modules/v3-navy/components/page-hero";

export const metadata: Metadata = {
  title: "News & Events",
  description: "Layout preview: the v3 news and events page.",
};

export default function V3NewsPage() {
  return (
    <>
      <PageHero
        kicker="News & Events"
        title="Deadlines, reminders and what’s new at SERBIZ."
        corner="bottom"
        lede={
          <>
            Follow our{" "}
            <a
              href={siteConfig.contact.facebook}
              target="_blank"
              rel="noopener"
              className="text-v3-sky underline"
            >
              Facebook page
            </a>
            .
          </>
        }
      />
      <section className="bg-v3-paper">
        <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start gap-10 px-5 pt-16 pb-22">
          <NewsList />
          <UpcomingEvents />
        </div>
      </section>
      {/* A child of the page, not the layout, so its effect runs after this
          page has hydrated. See reveal-mount.test.ts. */}
      <RevealController />
    </>
  );
}
