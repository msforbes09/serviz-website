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

  it("strips a trailing slash so callers can concatenate paths", () => {
    const env = parseEnv({ NEXT_PUBLIC_SITE_URL: "https://serbiz.coop/" });

    expect(env.NEXT_PUBLIC_SITE_URL).toBe("https://serbiz.coop");
  });
});
