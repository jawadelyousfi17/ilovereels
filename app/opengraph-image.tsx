import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "iLoveReels — Instagram Reels Downloader";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 90px",
          background: "linear-gradient(135deg, #14141f 0%, #2a1240 45%, #4a1235 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              width: 64,
              height: 64,
              borderRadius: 20,
              background: "linear-gradient(135deg, #7c3aed, #ec4899 55%, #f97316)",
            }}
          />
          <div style={{ display: "flex", fontSize: 40, fontWeight: 800 }}>
            <span
              style={{
                background: "linear-gradient(100deg, #a78bfa, #f472b6 50%, #fb923c)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              iLove
            </span>
            <span>Reels</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 44,
            fontSize: 78,
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: -2,
            maxWidth: 940,
          }}
        >
          Download Instagram Reels in original quality
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 30,
            fontSize: 34,
            color: "#c9c9e0",
            maxWidth: 900,
          }}
        >
          Paste a link, get the real MP4. No watermark, no login, no app.
        </div>

        <div style={{ display: "flex", gap: 14, marginTop: 46 }}>
          {["Free forever", "HD quality", "Every device"].map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                padding: "12px 26px",
                borderRadius: 999,
                border: "2px solid rgba(255,255,255,0.22)",
                fontSize: 26,
                fontWeight: 600,
                color: "#efeff8",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
