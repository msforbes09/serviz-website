import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";
import { previewSocialMetadata } from "@/modules/previews/lib/preview-metadata";

export const alt = previewSocialMetadata.imageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Read at module scope, so this happens once at build rather than per request.
// Nothing here touches a request-time API, which is what keeps the route
// statically generated under `cacheComponents`.
const logo = await readFile(
  join(process.cwd(), "public/designs/v1/logo-mark.png"),
);
const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

// v1's palette, restated rather than imported: `globals.css` is a stylesheet
// and these are inline styles in a separate renderer. Keep them in step with
// the `--color-v1-*` block if the palette moves.
// White rather than the site's #fafaf7 paper: the logo PNG carries an opaque
// white background in its own pixels, so on paper it reads as a pale rectangle
// floating behind the wordmark. Nobody can tell white from paper on a social
// card; a patch around the logo is obvious.
const paper = "#ffffff";
const forest = "#0b4a24";
const orange = "#e36419";
const muted = "#3f4b43";

// Light rather than forest because the logo is drawn for a light ground; on
// green its wordmark disappears. That also matches the page the link opens.
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
          background: paper,
          padding: "72px 80px",
          // The accent rule down the left edge is the one piece of chrome, and
          // it is the same orange the headings use.
          borderLeft: `24px solid ${orange}`,
        }}
      >
        {/* Mark plus text: the full-logo PNG spelled out an "(SRI)" the
            cooperative no longer uses. */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <img src={logoSrc} alt="" width={84} height={84} />
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.05 }}>
            <span style={{ fontSize: 44, fontWeight: 900, letterSpacing: "0.08em", color: "#14211a" }}>
              SERBIZ
            </span>
            <span style={{ fontSize: 20, color: muted }}>
              Resources Income Workers Cooperative
            </span>
          </div>
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
              color: forest,
            }}
          >
            <span>Payroll and accounting outsourcing for&nbsp;</span>
            <span style={{ color: orange }}>growing Philippine businesses</span>
          </div>
          <div style={{ display: "flex", fontSize: 30, color: muted, marginTop: 28 }}>
            {siteConfig.legalName}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
