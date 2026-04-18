import { useState } from 'react'

const HEADER_H  = 72    // clip more of the top header bar
const IFRAME_H  = 900
const CLIP_H    = 580   // tighter window = less footer chrome visible
const ZOOM      = 1.30  // more zoom = white side bars pushed further off-card

const reels = [
  { shortcode: 'DXMgkqzk2Oz', path: 'reel' },
  { shortcode: 'DV_ohMfk-zQ', path: 'reel' },
  { shortcode: 'DV6OFBSiB88', path: 'reel' },
  { shortcode: 'DWMObwvE1AA', path: 'reel' },
]

export default function PRHighlights() {
  const [loaded, setLoaded] = useState({})
  const [failed, setFailed] = useState({})

  return (
    <>
      <style>{`
        .pr-section {
          padding: 5rem 2rem;
          text-align: center;
          background: #000;
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

        .reel-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .reel-card {
          border-radius: 16px;
          overflow: hidden;
          border: none;
          background: #000;
          transition: border-color 0.3s, transform 0.3s;
        }
        .reel-card:hover { border-color: #ff2b2b; transform: translateY(-4px); }

        .reel-clip {
          height: ${CLIP_H}px;
          overflow: hidden;
          position: relative;
          background: #222;
        }

        /* black rectangle over the white Instagram footer */
        .reel-clip::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 165px;
          background: #000;
          pointer-events: none;
          z-index: 3;
        }

        .reel-clip iframe {
          position: absolute;
          top: -${HEADER_H}px;
          left: 50%;
          width: ${Math.round(100 / ZOOM)}%;
          height: ${Math.round(IFRAME_H)}px;
          border: none;
          transform: translateX(-50%) scale(${ZOOM});
          transform-origin: top center;
          z-index: 1;
        }

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

        @media (max-width: 900px) {
          .reel-grid { grid-template-columns: repeat(2, 1fr); }
          .reel-clip { height: 420px; }
          .reel-fallback { height: 420px; }
        }
        @media (max-width: 500px) {
          .reel-grid { grid-template-columns: 1fr; }
          .reel-clip { height: 500px; }
          .reel-fallback { height: 500px; }
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
            const embedUrl = `https://www.instagram.com/${r.path}/${r.shortcode}/embed/`
            const postUrl  = `https://www.instagram.com/${r.path}/${r.shortcode}/`

            return (
              <div className="reel-card" key={i}>
                {failed[i] ? (
                  <a
                    className="reel-fallback"
                    href={postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
                      src={embedUrl}
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