import { ImageResponse } from "next/og";
import { portfolioData } from "@/data/portfolio";

export const alt = `${portfolioData.profile.name} — ${portfolioData.profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const { profile, osName } = portfolioData;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          color: "#f8fbff",
          fontFamily: "sans-serif",
          background:
            "linear-gradient(135deg, #07111f 0%, #102a52 42%, #281650 72%, #07111f 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              width: "72px",
              height: "72px",
            }}
          >
            <div style={{ width: "32px", height: "32px", background: "#67e8f9", borderRadius: "6px" }} />
            <div style={{ width: "32px", height: "32px", background: "#38bdf8", borderRadius: "6px" }} />
            <div style={{ width: "32px", height: "32px", background: "#3b82f6", borderRadius: "6px" }} />
            <div style={{ width: "32px", height: "32px", background: "#818cf8", borderRadius: "6px" }} />
          </div>
          <div
            style={{
              fontSize: "28px",
              letterSpacing: "8px",
              color: "rgba(255,255,255,0.72)",
              textTransform: "uppercase",
            }}
          >
            {osName}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ fontSize: "88px", fontWeight: 700, lineHeight: 1.05 }}>
            {profile.name}
          </div>
          <div style={{ fontSize: "40px", color: "#7edcff" }}>
            {profile.title}
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "rgba(248,251,255,0.7)",
            }}
          >
            {profile.location}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
