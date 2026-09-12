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

export function parseEnv(source: Record<string, string | undefined>): Env {
  const result = envSchema.safeParse(source);

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
});
