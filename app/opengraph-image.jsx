import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logoBytes = await readFile(
    join(process.cwd(), "public/brand/mx-icon-v2.png")
  );
  const logoSrc = `data:image/png;base64,${logoBytes.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 88px",
          background:
            "linear-gradient(135deg, #060814 0%, #0b1228 48%, #101a38 100%)",
          color: "#f8fafc",
          fontFamily: "Inter, Arial, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 18% 20%, rgba(79,124,255,0.28), transparent 42%), radial-gradient(circle at 82% 78%, rgba(34,211,238,0.18), transparent 40%)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            position: "relative",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            width={168}
            height={168}
            alt=""
            style={{ objectFit: "contain" }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div
              style={{
                fontSize: 64,
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
              }}
            >
              {SITE_NAME}
            </div>
            <div
              style={{
                fontSize: 34,
                fontWeight: 600,
                color: "#c7d6ff",
                maxWidth: 760,
                lineHeight: 1.25,
              }}
            >
              {SITE_TAGLINE}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
