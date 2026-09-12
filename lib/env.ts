import { z } from "zod";

// Every environment value passes through here. App code imports `env`, never
// `process.env.X` — a missing or malformed value then fails loudly at startup
// instead of surfacing as `undefined` deep inside a render.
//
// Anything read in the browser must be prefixed NEXT_PUBLIC_ and must not be a
// secret: Next inlines those into the client bundle at build time.
const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z
    .url({ error: "NEXT_PUBLIC_SITE_URL must be an absolute URL" })
    .default("http://localhost:3000")
    // Canonical URLs, sitemap entries and JSON-LD all concatenate a path onto
    // this, so the trailing slash is stripped once here rather than at each
    // call site.
    .transform((value) => value.replace(/\/+$/, "")),
  NEXT_PUBLIC_SITE_NAME: z.string().min(1).default("SERBIZ"),
});

export type Env = z.infer<typeof envSchema>;

/**
 * Vercel injects `VERCEL_PROJECT_PRODUCTION_URL` into every build as a bare
 * hostname. Using it as the fallback means a fresh deploy has correct canonical
 * URLs on its first build, instead of needing one deploy to learn the URL and a
 * second to apply it.
 *
 * This is a server-side variable, which is safe here only because `env` is
 * imported by the root layout, the sitemap and robots — never by a client
 * component. Were that to change, the browser would see a different value from
 * the server and hydration would diverge.
 */
function resolveSiteUrl(source: Record<string, string | undefined>): string | undefined {
  const explicit = source.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit;

  const host = source.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (!host) return undefined;

  return /^https?:\/\//.test(host) ? host : `https://${host}`;
}

export function parseEnv(source: Record<string, string | undefined>): Env {
  const result = envSchema.safeParse({
    NEXT_PUBLIC_SITE_URL: resolveSiteUrl(source),
    NEXT_PUBLIC_SITE_NAME: source.NEXT_PUBLIC_SITE_NAME,
  });

  if (!result.success) {
    const detail = result.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");

    throw new Error(`Invalid environment: ${detail}`);
  }

  return result.data;
}

// Destructured explicitly: Next only inlines NEXT_PUBLIC_* values it can see as
// a literal property access at build time, so `process.env` as a whole object
// arrives empty in the browser.
export const env = parseEnv({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
  VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
});
