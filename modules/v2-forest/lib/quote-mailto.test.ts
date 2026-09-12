import { describe, expect, it } from "vitest";
import { buildQuoteMailto } from "./quote-mailto";

const base = {
  name: "Maria Santos",
  business: "Santos Trading",
  contact: "maria@santos.ph",
  services: ["Payroll & Benefits"],
  notes: "8 employees",
};

describe("buildQuoteMailto", () => {
  it("addresses the cooperative's inbox", () => {
    expect(buildQuoteMailto(base).startsWith("mailto:serbiz.mgt@gmail.com?")).toBe(true);
  });

  it("names the business in the subject", () => {
    const url = new URL(buildQuoteMailto(base));

    expect(url.searchParams.get("subject")).toBe("Quote request — Santos Trading");
  });

  it("puts every answer in the body", () => {
    const body = new URL(buildQuoteMailto(base)).searchParams.get("body");

    expect(body).toContain("Maria Santos");
    expect(body).toContain("Santos Trading");
    expect(body).toContain("maria@santos.ph");
    expect(body).toContain("Payroll & Benefits");
    expect(body).toContain("8 employees");
  });

  it("says so when no service was picked, rather than leaving a blank line", () => {
    const body = new URL(buildQuoteMailto({ ...base, services: [] })).searchParams.get("body");

    expect(body).toContain("Not specified");
  });

  it("escapes characters that would otherwise split the mailto", () => {
    // A name containing & or ? would start a new mailto field and silently
    // truncate the body if it were interpolated raw.
    const url = buildQuoteMailto({ ...base, name: "A & B?", notes: "x=1&y=2" });
    const body = new URL(url).searchParams.get("body");

    expect(url).not.toContain("A & B?");
    expect(body).toContain("A & B?");
    expect(body).toContain("x=1&y=2");
  });

  it("omits the notes line when nothing was written", () => {
    const body = new URL(buildQuoteMailto({ ...base, notes: "" })).searchParams.get("body");

    expect(body?.trimEnd().endsWith("Payroll & Benefits")).toBe(true);
  });
});
