import { describe, expect, it } from "vitest";
import { parseEnv } from "./env";

describe("parseEnv", () => {
  it("accepts a complete environment", () => {
    const env = parseEnv({
      NEXT_PUBLIC_SITE_URL: "https://serbiz.coop",
      NEXT_PUBLIC_SITE_NAME: "SERBIZ",
    });

    expect(env.NEXT_PUBLIC_SITE_URL).toBe("https://serbiz.coop");
    expect(env.NEXT_PUBLIC_SITE_NAME).toBe("SERBIZ");
  });

  it("defaults the site URL to localhost for local development", () => {
    const env = parseEnv({});

    expect(env.NEXT_PUBLIC_SITE_URL).toBe("http://localhost:3000");
  });

  it("rejects a site URL that is not a URL", () => {
    expect(() => parseEnv({ NEXT_PUBLIC_SITE_URL: "serbiz.coop" })).toThrow(
      /NEXT_PUBLIC_SITE_URL/,
    );
  });

  it("falls back to the host's production domain when no site URL is set", () => {
    // Vercel injects this on every build, which spares us having to deploy
    // once just to learn the URL and then redeploy with it configured.
    const env = parseEnv({ VERCEL_PROJECT_PRODUCTION_URL: "serbiz.vercel.app" });

    expect(env.NEXT_PUBLIC_SITE_URL).toBe("https://serbiz.vercel.app");
  });

  it("prefers an explicit site URL over the host's domain", () => {
    const env = parseEnv({
      NEXT_PUBLIC_SITE_URL: "https://serbiz.coop",
      VERCEL_PROJECT_PRODUCTION_URL: "serbiz.vercel.app",
    });

    expect(env.NEXT_PUBLIC_SITE_URL).toBe("https://serbiz.coop");
  });

  it("ignores a host domain that already carries a protocol", () => {
    // The variable is documented as a bare hostname; if that ever changes,
    // blindly prefixing would produce https://https://…
    const env = parseEnv({ VERCEL_PROJECT_PRODUCTION_URL: "https://serbiz.vercel.app" });

    expect(env.NEXT_PUBLIC_SITE_URL).toBe("https://serbiz.vercel.app");
  });

  it("strips a trailing slash so callers can concatenate paths", () => {
    const env = parseEnv({ NEXT_PUBLIC_SITE_URL: "https://serbiz.coop/" });

    expect(env.NEXT_PUBLIC_SITE_URL).toBe("https://serbiz.coop");
  });
});
