import { useState } from 'react'

const reels = [
  {
    label: 'Opening Highlights',
    thumb: '/assets/thumb-smile.jpg',
    user: 'tedx_bbau',
    location: 'Campus Event',
    videoUrl: '#',
  },
  {
    label: 'Speaker Reel',
    thumb: '/assets/thumb-impact.jpg',
    user: 'tedx_bbau',
    location: 'Main Stage',
    videoUrl: '#',
  },
  {
    label: 'Fun Facts Series',
    thumb: '/assets/thumb-didyouknow.jpg',
    user: 'tedx_bbau',
    location: 'Studio',
    videoUrl: '#',
  },
  {
    label: 'Audience Moments',
    thumb: '/assets/thumb-guess.jpg',
    user: 'tedx_bbau',
    location: 'Live Session',
    videoUrl: '#',
  },
]

function PlayIcon() {
  return (
    <svg viewBox="0 0 20 20" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
      <polygon points="5,3 5,17 17,10" fill="white" />
    </svg>
  )
}

// Heart Icon Component
function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="#ff2b2b" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
}

export default function PRHighlights() {
  const [active, setActive] = useState(null)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap');

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

        /* Styling for the RED TEDx part */
        .pr-title span.red {
          color: #ff2b2b;
        }

        .pr-sub {
          font-size: 16px;
          color: #666;
          margin: 0 0 4rem;
        }

        .reel-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 30px;
          width: 100%;
          max-width: 1400px; 
          margin: 0 auto;
        }

        .polaroid {
          background: #1a1a1a;
          padding: 15px 15px 40px;
          position: relative;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 2px solid transparent;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          width: 320px; 
          box-sizing: border-box;
        }

        .polaroid:hover,
        .polaroid.active {
          transform: translateY(-10px);
          border-color: #ff2b2b;
          box-shadow: 0 15px 40px rgba(255, 43, 43, 0.15);
        }

        .ig-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          padding: 0 2px;
        }

        .ig-meta {
          text-align: left;
        }

        .ig-username {
          font-size: 11px;
          font-weight: 700;
          color: #eee;
          text-transform: lowercase;
        }

        .ig-location {
          font-size: 9px;
          color: #555;
        }

        .polaroid-screen {
          width: 100%;
          aspect-ratio: 9 / 13; 
          overflow: hidden;
          position: relative;
          background: #000;
        }

        .polaroid-thumb {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          filter: grayscale(20%) brightness(0.7);
          transition: all 0.4s ease;
        }

        .polaroid:hover .polaroid-thumb {
          filter: grayscale(0%) brightness(0.9);
          transform: scale(1.05);
        }

        .play-btn {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 50px;
          height: 50px;
          background: rgba(255, 43, 43, 0.8);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: all 0.3s ease;
          box-shadow: 0 0 20px rgba(255, 43, 43, 0.4);
        }

        .polaroid:hover .play-btn {
          opacity: 1;
        }

        /* Updated Label Container for Heart alignment */
        .polaroid-label {
          margin-top: 25px;
          padding: 0 5px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .label-name {
          font-family: 'Permanent Marker', cursive;
          font-size: 20px;
          color: #ddd;
          display: block;
          text-align: left;
        }

        .pr-cta {
          margin-top: 4rem;
        }

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
        }

        .pr-link:hover {
          background: #ff2b2b;
          border-color: #ff2b2b;
          color: #fff;
        }

        @media (max-width: 400px) {
          .polaroid {
            width: 100%;
          }
        }
      `}</style>

      <section className="pr-section">
        <p className="pr-eyebrow">On the Feed</p>
        <h2 className="pr-title"> 
          <span className="red">TEDx</span>BBAU on Socials
        </h2>
        <p className="pr-sub">Behind the scenes of the movement.</p>

        <div className="reel-grid">
          {reels.map((r, i) => (
            <div
              key={i}
              className={`polaroid${active === i ? ' active' : ''}`}
              onClick={() => setActive(active === i ? null : i)}
            >
              <div className="ig-header">
                <div className="ig-meta">
                  <div className="ig-username">@{r.user}</div>
                  <div className="ig-location">{r.location}</div>
                </div>
                <div style={{ color: '#333', fontSize: '12px' }}>•••</div>
              </div>

              <div className="polaroid-screen">
                <div
                  className="polaroid-thumb"
                  style={{ backgroundImage: `url('${r.thumb}')` }}
                />
                <div className="play-btn">
                  <PlayIcon />
                </div>
              </div>

              {/* Heart and Label */}
              <div className="polaroid-label">
                <HeartIcon />
                <span className="label-name">{r.label}</span>
              </div>
            </div>
          ))}
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