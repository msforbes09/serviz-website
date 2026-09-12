import { describe, expect, it } from "vitest";
import { buildConsultationMailto, validateConsultation } from "./consultation";

const valid = { name: "Ana Reyes", email: "ana@reyes.ph", message: "Payroll for 12 staff" };

describe("validateConsultation", () => {
  it("accepts a complete enquiry", () => {
    expect(validateConsultation(valid)).toEqual({ ok: true });
  });

  it("asks for a name first", () => {
    const result = validateConsultation({ ...valid, name: "   " });

    expect(result).toEqual({
      ok: false,
      field: "name",
      message: "Please enter your name.",
    });
  });

  it("names the field at fault so the form can focus it", () => {
    expect(validateConsultation({ ...valid, email: "nope" })).toMatchObject({
      field: "email",
    });
    expect(validateConsultation({ ...valid, message: " " })).toMatchObject({
      field: "message",
    });
  });

  it("rejects an address that is not an email", () => {
    for (const email of ["ana", "ana@", "ana@reyes", "a b@reyes.ph", ""]) {
      expect(validateConsultation({ ...valid, email }).ok, email).toBe(false);
    }
  });

  it("asks what they need when the message is blank", () => {
    const result = validateConsultation({ ...valid, message: "  " });

    expect(result).toEqual({
      ok: false,
      field: "message",
      message: "Tell us a little about what you need.",
    });
  });

  it("reports the first problem only, in field order", () => {
    const result = validateConsultation({ name: "", email: "nope", message: "" });

    expect(result).toEqual({
      ok: false,
      field: "name",
      message: "Please enter your name.",
    });
  });
});

describe("buildConsultationMailto", () => {
  it("names the sender in the subject and carries a reply address", () => {
    const url = new URL(buildConsultationMailto(valid));

    expect(url.searchParams.get("subject")).toBe("Consultation request from Ana Reyes");
    expect(url.searchParams.get("body")).toContain("Reply to: ana@reyes.ph");
    expect(url.searchParams.get("body")).toContain("Payroll for 12 staff");
  });

  it("escapes characters that would otherwise split the mailto", () => {
    const url = buildConsultationMailto({ ...valid, message: "a&b?c" });

    expect(url).not.toContain("a&b?c");
    expect(new URL(url).searchParams.get("body")).toContain("a&b?c");
  });
});
