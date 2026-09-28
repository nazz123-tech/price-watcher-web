import { ImageResponse } from "next/og";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/appInfo";

// The picture shown when a link to the app is shared (Messenger, Slack, iMessage…).
// Generated once at build time; every page uses it unless it has its own.
export const alt = `${APP_NAME}: ${APP_DESCRIPTION}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#22403a";
const OLIVE = "#7a9a5a";
const LIME = "#d9ee6f";
const PAPER = "#f4f3ee";
const CARD = "#fcfbf7";
const MUTED = "#7d8a80";

// Loads Space Grotesk (the heading font) from Google Fonts, only the letters we use.
// If that fails (e.g. no network during the build), the default font is used.
async function loadSpaceGrotesk(text) {
  try {
    const url = `https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url)).text();
    const fontUrl = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    if (!fontUrl) return [];
    const data = await (await fetch(fontUrl)).arrayBuffer();
    return [{ name: "Space Grotesk", data, weight: 700, style: "normal" }];
  } catch {
    return [];
  }
}

// lucide "list-plus", the icon in the logo
function ListPlusIcon({ size: s }) {
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={LIME}
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M16 5H3" />
      <path d="M11 12H3" />
      <path d="M16 19H3" />
      <path d="M18 9v6" />
      <path d="M21 12h-6" />
    </svg>
  );
}

export default async function Image() {
  const texts = [
    APP_NAME,
    "Groceries at",
    "your price.",
    APP_DESCRIPTION,
    "Lettmelk",
    "16,40 kr",
    "Now",
    "REMA 1000",
    "R",
    "Target 19 kr",
  ];
  const fonts = await loadSpaceGrotesk(texts.join(""));
  const heading = fonts.length ? "Space Grotesk" : undefined;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: PAPER,
        padding: 72,
        position: "relative",
        fontFamily: heading,
        color: INK,
      }}
    >
      {/* Decorative lime ring, like the tip card */}
      <div
        style={{
          position: "absolute",
          top: -160,
          right: -160,
          width: 520,
          height: 520,
          borderRadius: 9999,
          border: `56px solid ${LIME}`,
          opacity: 0.6,
          display: "flex",
        }}
      />

      {/* Left: logo, headline, description */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 20,
              background: INK,
              border: `6px solid ${LIME}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ListPlusIcon size={38} />
          </div>
          <div style={{ fontSize: 40, fontWeight: 700 }}>{APP_NAME}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 0.95, letterSpacing: -3 }}>
            Groceries at
          </div>
          <div style={{ fontSize: 96, fontWeight: 700, lineHeight: 0.95, letterSpacing: -3, color: OLIVE }}>
            your price.
          </div>
          <div style={{ fontSize: 32, color: MUTED, marginTop: 28 }}>{APP_DESCRIPTION}</div>
        </div>
      </div>

      {/* Right: an example deal card */}
      <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: 8 }}>
        <div
          style={{
            width: 380,
            display: "flex",
            flexDirection: "column",
            background: CARD,
            border: "2px solid #e3e1d6",
            borderRadius: 28,
            padding: 32,
            gap: 18,
          }}
        >
          <div style={{ fontSize: 34, fontWeight: 700 }}>Lettmelk</div>
          <div style={{ fontSize: 60, fontWeight: 700, color: "#4c8a3e", letterSpacing: -2 }}>16,40 kr</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 26, fontWeight: 700 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "#e4322b",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
              }}
            >
              R
            </div>
            REMA 1000
          </div>
          <div
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 6 }}
          >
            <div style={{ fontSize: 24, color: MUTED }}>Target 19 kr</div>
            <div
              style={{
                background: LIME,
                borderRadius: 9999,
                padding: "8px 20px",
                fontSize: 24,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke={INK}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Now
            </div>
          </div>
        </div>
      </div>
    </div>,
    { ...size, fonts },
  );
}
