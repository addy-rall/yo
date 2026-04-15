import { useState } from 'react'

const reels = [
  { shortcode: 'DXHPisPDdW5' },
  { shortcode: 'DV_ohMfk-zQ' },
  { shortcode: 'DV6OFBSiB88' },
  { shortcode: 'DWMObwvE1AA' },
]

/*
  Instagram embed iframe vertical layout (approximate):
    ┌──────────────────┐  ← y = 0
    │  header bar      │  ~52px  (account name / avatar)
    ├──────────────────┤  ← y = 52
    │                  │
    │   VIDEO          │  ~var (depends on card width × 16/9)
    │                  │
    ├──────────────────┤  ← y = 52 + videoH
    │  footer actions  │  ~130px (likes, comment, "View more")
    └──────────────────┘

  We use:
    - position:absolute  top: -52px  → header scrolled above the clip window
    - clip window height: 400px      → footer falls below the clip boundary
    - iframe total height: 620px     → gives enough room for the video
*/

const CLIP_H   = 400   // px — visible window (video only)
const HEADER_H = 52    // px — header to scroll above window
const IFRAME_H = 620   // px — full iframe height (header + video + footer)

export default function PRHighlights() {
  const [loaded,  setLoaded]  = useState({})
  const [failed,  setFailed]  = useState({})

  return (
    <>
      <style>{`
        .pr-section {
          padding: 5rem 2rem;
          text-align: center;
          background: #0a0a0a;
        }
        .pr-eyebrow {
          font-size: 12px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #ff2b2b;
          margin: 0 0 10px;
          font-weight: 600;
        }
        .pr-title {
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 900;
          color: #fff;
          margin: 0 0 12px;
          letter-spacing: -0.02em;
        }
        .pr-title span.red { color: #ff2b2b; }
        .pr-sub {
          font-size: 16px;
          color: #666;
          margin: 0 0 4rem;
        }

        /* ── Grid ── */
        .reel-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          max-width: 1100px;
          margin: 0 auto;
        }

        /* ── Card shell ── */
        .reel-card {
          border-radius: 16px;
          overflow: hidden;
          border: 1.5px solid #1e1e1e;
          background: #000;
          transition: border-color 0.3s, transform 0.3s;
        }
        .reel-card:hover { border-color: #ff2b2b; transform: translateY(-4px); }

        /* ── Clip window — key to hiding header + footer ── */
        .reel-clip {
          height: ${CLIP_H}px;
          overflow: hidden;
          position: relative;
          background: #000;
        }

        .reel-clip iframe {
          position: absolute;
          top: -${HEADER_H}px;   /* shifts header above the clip boundary */
          left: 0;
          width: 100%;
          height: ${IFRAME_H}px;
          border: none;
          /* footer hangs below CLIP_H and is hidden by overflow:hidden */
        }

        /* ── Shimmer ── */
        .shimmer {
          position: absolute;
          inset: 0;
          background: #111;
          z-index: 2;
          transition: opacity 0.5s 0.3s;
          pointer-events: none;
        }
        .shimmer::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(110deg, transparent 30%, #1c1c1c 50%, transparent 70%);
          background-size: 200% 100%;
          animation: sh 1.5s infinite;
        }
        @keyframes sh {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .shimmer.done { opacity: 0; }

        /* ── Fallback card for posts Instagram won't embed ── */
        .reel-fallback {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: ${CLIP_H}px;
          gap: 14px;
          background: #111;
          text-decoration: none;
          color: #fff;
          transition: background 0.3s;
        }
        .reel-fallback:hover { background: #1a1a1a; }
        .reel-fallback svg   { opacity: 0.5; }
        .reel-fallback span  { font-size: 12px; color: #555; letter-spacing: 0.1em; text-transform: uppercase; }

        /* ── CTA ── */
        .pr-cta { margin-top: 4rem; }
        .pr-link {
          font-size: 13px;
          color: #fff;
          text-decoration: none;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 700;
          padding: 12px 30px;
          border: 1px solid #333;
          transition: all 0.3s;
          display: inline-block;
        }
        .pr-link:hover { background: #ff2b2b; border-color: #ff2b2b; }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .reel-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 500px) {
          .reel-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="pr-section">
        <p className="pr-eyebrow">On the Feed</p>
        <h2 className="pr-title">
          <span className="red">TEDx</span>BBAU on Socials
        </h2>
        <p className="pr-sub">Behind the scenes of the movement.</p>

        <div className="reel-grid">
          {reels.map((r, i) => {
            const url = `https://www.instagram.com/p/${r.shortcode}/`
            return (
              <div className="reel-card" key={i}>
                {failed[i] ? (
                  /* Post blocked embedding — show a clean fallback link */
                  <a
                    className="reel-fallback"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {/* Instagram logo */}
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"
                        stroke="#fff" strokeWidth="1.5"/>
                      <circle cx="12" cy="12" r="4.5" stroke="#fff" strokeWidth="1.5"/>
                      <circle cx="17.5" cy="6.5" r="1" fill="#fff"/>
                    </svg>
                    <span>Watch on Instagram</span>
                  </a>
                ) : (
                  <div className="reel-clip">
                    <div className={`shimmer${loaded[i] ? ' done' : ''}`} />
                    <iframe
                      src={`https://www.instagram.com/p/${r.shortcode}/embed/`}
                      scrolling="no"
                      allowTransparency="true"
                      allowFullScreen={true}
                      title={`TEDxBBAU reel ${i + 1}`}
                      onLoad={() => setLoaded(prev => ({ ...prev, [i]: true }))}
                      onError={() => setFailed(prev => ({ ...prev, [i]: true }))}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="pr-cta">
          <a
            href="https://www.instagram.com/tedxbbau/"
            className="pr-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore More
          </a>
        </div>
      </section>
    </>
  )
}