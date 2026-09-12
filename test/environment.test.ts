import { describe, expect, it } from "vitest";

/**
 * Vercel sets `NODE_ENV=production` for the whole build, and `prebuild` runs
 * this suite inside it. Vitest only defaults `NODE_ENV` to "test" when it is
 * unset, so on Vercel the suite inherited "production" — which makes Vite
 * resolve React's production bundle, where `act` throws. Every test that
 * renders then fails: 19 of them, while passing locally.
 *
 * `vitest.config.mts` pins the value. This fails loudly if that pin is ever
 * removed, rather than the deploy failing for a reason that looks unrelated.
 */
describe("test environment", () => {
  it("runs as test whatever the ambient NODE_ENV", () => {
    expect(process.env.NODE_ENV).toBe("test");
  });
});
