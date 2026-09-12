import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Partial Prerendering. Every page must be statically shell-renderable:
  // anything request-time (cookies/headers/searchParams/fetch) belongs inside a
  // <Suspense> boundary, never awaited at the page root.
  cacheComponents: true,
};

export default nextConfig;
