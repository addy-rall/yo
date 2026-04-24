import { useState, useRef } from "react";
import "./PRHighlights.css";
import reel1 from "../assets/reel1.mp4";
import reel2 from "../assets/reel2.mp4";
import reel3 from "../assets/reel3.mov";
import reel4 from "../assets/reel4.mp4";

const videos = [
  { id: 1, src: reel1, label: "Behind the Scenes", tag: "BTS" },
  { id: 2, src: reel2, label: "Glimpses", tag: "Team" },
  { id: 3, src: reel3, label: "Team Moments", tag: "Team" },
  { id: 4, src: reel4, label: "Event Highlights", tag: "Event" },
];

function VideoCard({ video, index }) {
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) { videoRef.current.pause(); setPlaying(false); }
    else { videoRef.current.play(); setPlaying(true); }
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={togglePlay}
      style={{
        position: "relative", borderRadius: "12px", overflow: "hidden",
        cursor: "pointer", aspectRatio: "9/16", background: "#111",
        border: hovered ? "1.5px solid rgba(230,43,30,0.7)" : "1.5px solid rgba(255,255,255,0.06)",
        transform: hovered ? "translateY(-6px) scale(1.015)" : "translateY(0)",
        transition: "all 0.3s ease",
        boxShadow: hovered ? "0 24px 60px rgba(230,43,30,0.18)" : "0 8px 24px rgba(0,0,0,0.5)",
      }}
    >
      <video ref={videoRef} src={video.src} loop playsInline
        style={{ width: "100%", height: "100%", objectFit: "cover" }} />

      {/* Overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: playing
          ? "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)"
          : "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
      }} />

      {/* Tag */}
      <div style={{
        position: "absolute", top: 12, left: 12,
        background: "#E62B1E", color: "#fff", fontSize: 10,
        fontWeight: 700, letterSpacing: "1.5px", padding: "3px 10px",
        borderRadius: 4, textTransform: "uppercase",
      }}>{video.tag}</div>

      {/* TEDxBBAU watermark */}
      <div style={{
        position: "absolute", top: 12, right: 12, color: "rgba(255,255,255,0.6)",
        fontSize: 11, fontWeight: 700, letterSpacing: "0.5px",
      }}>TED<span style={{ color: "#E62B1E" }}>x</span>BBAU</div>

      {/* Play Button */}
      {!playing && (
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 52, height: 52, borderRadius: "50%",
          background: "rgba(230,43,30,0.9)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
            <path d="M1 1L17 10L1 19V1Z" fill="white" />
          </svg>
        </div>
      )}

      {/* Label */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 14px 14px" }}>
        <p style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>{video.label}</p>
      </div>
    </div>
  );
}

export default function PRHighlights() {
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <section style={{ background: "#0a0a0a", padding: "72px 40px 80px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 52 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <div style={{ width: 28, height: 2, background: "#E62B1E" }} />
          <span style={{ color: "#E62B1E", fontSize: 11, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase" }}>PR Highlights</span>
          <div style={{ width: 28, height: 2, background: "#E62B1E" }} />
        </div>
        <h2 style={{ color: "#fff", fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 800, marginBottom: 14 }}>Behind the Scenes</h2>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15 }}>A glimpse into the movement.</p>
      </div>

      {/* Video Grid */}
      <div className="pr-highlights-scroll" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(260px, 1fr))", gap: 22, maxWidth: 1320, margin: "0 auto 52px", overflowX: "auto" }}>
        {videos.map((v, i) => <VideoCard key={v.id} video={v} index={i} />)}
      </div>

      {/* Explore More */}
      <div style={{ textAlign: "center" }}>
        <a
          href="https://www.instagram.com/tedxbbau/"
          target="_blank" rel="noopener noreferrer"
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "14px 32px", borderRadius: 50,
            background: btnHovered ? "linear-gradient(135deg, #E62B1E, #c0392b)" : "transparent",
            border: `1.5px solid ${btnHovered ? "#E62B1E" : "rgba(255,255,255,0.2)"}`,
            color: "#fff", fontSize: 14, fontWeight: 600, textDecoration: "none",
            transition: "all 0.3s ease",
          }}
        >
          Explore More on Instagram →
        </a>
      </div>
    </section>
  );
}