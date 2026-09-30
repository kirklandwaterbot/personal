import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexWrap: "wrap",
          gap: "4px",
          background: "#07111f",
        }}
      >
        <div style={{ width: "14px", height: "14px", background: "#67e8f9", borderRadius: "3px" }} />
        <div style={{ width: "14px", height: "14px", background: "#38bdf8", borderRadius: "3px" }} />
        <div style={{ width: "14px", height: "14px", background: "#3b82f6", borderRadius: "3px" }} />
        <div style={{ width: "14px", height: "14px", background: "#818cf8", borderRadius: "3px" }} />
      </div>
    ),
    { ...size },
  );
}
