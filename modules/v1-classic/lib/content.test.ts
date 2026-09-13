import { describe, expect, it } from "vitest";
import { faqs, services } from "./content";

describe("web and software development", () => {
  // Was "IT consulting", invented by the design. Now the service the user
  // proposes to deliver with the cooperative as its development partner; the
  // copy names the partnership but not the partner, pending the
  // cooperative's agreement (see TODO.md).
  it("replaces IT consulting in the service list and the FAQ", () => {
    const service = services.find(
      (s) => s.title === "Web & software development",
    );
    expect(service?.isNew).toBe(true);
    expect(service?.body).toMatch(/development partner/);
    expect(services.some((s) => /IT consult/i.test(s.title))).toBe(false);

    const faq = faqs.find((f) => /software development/i.test(f.q));
    expect(faq?.a).toMatch(/development partner/);
    expect(faqs.some((f) => /IT consulting/.test(f.q))).toBe(false);
  });
});
