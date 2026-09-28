import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { BUSINESS } from "@/lib/business";
import { PAGES, ROUTES } from "@/lib/seo-content";

export const dynamic = "force-static";

const FONT_DIR = join(process.cwd(), "lib", "og-fonts");
const bricolage = readFileSync(join(FONT_DIR, "bricolage-800.woff"));
const spaceMono = readFileSync(join(FONT_DIR, "spacemono-700.woff"));

/** `/` is served at `/og/home`; every other route mirrors its own path. */
function slugToPath(slug: string[]): string {
  const joined = slug.join("/");
  return joined === "home" ? "/" : `/${joined}`;
}

export function generateStaticParams() {
  return ROUTES.map((path) => ({
    slug: path === "/" ? ["home"] : path.slice(1).split("/"),
  }));
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await context.params;
  const seo = PAGES[slugToPath(slug)];

  if (!seo) {
    return new Response("Not found", { status: 404 });
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          padding: "24px",
          backgroundColor: "#F5FAFD",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            border: "12px solid #0F2433",
            padding: "52px 56px",
          }}
        >
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                backgroundColor: "#55B0E0",
                border: "4px solid #0F2433",
                borderRadius: "999px",
                padding: "8px 22px",
                transform: "rotate(-2deg)",
                fontFamily: "Space Mono",
                fontSize: "26px",
                letterSpacing: "3px",
                color: "#0F2433",
              }}
            >
              {seo.ogKicker}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              fontFamily: "Bricolage Grotesque",
              fontSize: seo.ogTitle.length > 42 ? "66px" : "78px",
              lineHeight: 1.04,
              letterSpacing: "-2px",
              color: "#0F2433",
              maxWidth: "980px",
            }}
          >
            {seo.ogTitle}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              fontFamily: "Space Mono",
              fontSize: "25px",
              letterSpacing: "2px",
              color: "#0F2433",
              borderTop: "3px solid #D3E5F0",
              paddingTop: "22px",
            }}
          >
            <div style={{ display: "flex" }}>STELLAR CLEANING SOLUTIONS</div>
            <div style={{ display: "flex", color: "#1667A0" }}>{BUSINESS.phone}</div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Bricolage Grotesque", data: bricolage, weight: 800, style: "normal" },
        { name: "Space Mono", data: spaceMono, weight: 700, style: "normal" },
      ],
    }
  );
}
