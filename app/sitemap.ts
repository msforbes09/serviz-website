import type { MetadataRoute } from "next";
import { env } from "@/lib/env";

// Add every new public route here as it is created — a page missing from the
// sitemap is a page search engines have to find by luck.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: env.NEXT_PUBLIC_SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
