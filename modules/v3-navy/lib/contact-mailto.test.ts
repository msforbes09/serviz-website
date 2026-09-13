import { describe, expect, it } from "vitest";
import { buildContactMailto } from "./contact-mailto";

const base = { name: "Jose Cruz", business: "Cruz OPC", message: "Need payroll help" };

describe("buildContactMailto", () => {
  it("addresses the cooperative's inbox", () => {
    expect(buildContactMailto(base).startsWith("mailto:serbiz.mgt@gmail.com?")).toBe(true);
  });

  it("names the sender in the subject", () => {
    const subject = new URL(buildContactMailto(base)).searchParams.get("subject");

    expect(subject).toBe("Inquiry from Jose Cruz");
  });

  it("carries every answer into the body", () => {
    const body = new URL(buildContactMailto(base)).searchParams.get("body");

    expect(body).toContain("Jose Cruz");
    expect(body).toContain("Cruz OPC");
    expect(body).toContain("Need payroll help");
  });

  it("omits the business line when it was left blank", () => {
    const body = new URL(buildContactMailto({ ...base, business: "  " })).searchParams.get("body");

    expect(body).not.toContain("Business:");
  });

  it("escapes characters that would otherwise split the mailto", () => {
    const url = buildContactMailto({ ...base, message: "a&b?c=d" });

    expect(url).not.toContain("a&b?c=d");
    expect(new URL(url).searchParams.get("body")).toContain("a&b?c=d");
  });
});

describe("buildContactMailto with a preset subject", () => {
  it("uses the trigger's subject and still names the sender", () => {
    const subject = new URL(
      buildContactMailto({ ...base, subject: "Consultation request" }),
    ).searchParams.get("subject");

    expect(subject).toBe("Consultation request from Jose Cruz");
  });
});
