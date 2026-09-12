import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";
import { previewSocialMetadata } from "@/modules/previews/lib/preview-metadata";

export const alt = previewSocialMetadata.imageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Read at module scope so it happens once at build rather than per request.
// Nothing here touches a request-time API, which keeps the route static under
// `cacheComponents`.
const logo = await readFile(
  join(process.cwd(), "public/designs/v3/logo-wordmark.png"),
);
const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

// v3's palette, restated rather than imported: `globals.css` is a stylesheet
// and these are inline styles in a separate renderer. Keep in step with the
// `--color-v3-*` block if the palette moves.
const navy = "#0f2a44";
const rustBright = "#de5e3a";
const onDark = "#d6e2ee";

// Navy rather than the light ground v1's card uses. v3's wordmark is drawn for
// a dark surface — it is used that way in the footer — and the three previews
// are meant to look like different presentations, so their cards should too.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: navy,
          padding: "72px 80px",
          borderLeft: `24px solid ${rustBright}`,
        }}
      >
        {/* On a white chip, the same lockup the v3 footer uses. The wordmark
            carries an opaque white background in its own pixels, so on navy it
            reads as a pale box floating behind the type unless the white is
            made deliberate. */}
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            background: "#ffffff",
            borderRadius: 20,
            padding: "16px 22px",
          }}
        >
          <img src={logoSrc} alt="" height={64} />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 66,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#ffffff",
            }}
          >
            <span>Payroll and accounting outsourcing for&nbsp;</span>
            <span style={{ color: rustBright }}>growing Philippine businesses</span>
          </div>
          <div style={{ display: "flex", fontSize: 30, color: onDark, marginTop: 28 }}>
            {siteConfig.legalName}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
