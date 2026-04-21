import { useEffect, useRef, useState } from 'react'

const STATS = [
  { num:'15+',   label:'Inspiring Speakers' },
  { num:'1000+', label:'Attendees Expected' },
  { num:'1',    label:'Powerful Theme' },
  { num:'∞',    label:'Ideas to Take Home' },
]

const REASONS = [
  { n:'01', title:'Ignite Ideas',       desc:'Encounter perspectives that challenge your assumptions and expand what you believe is possible.',
    icon:<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="24" cy="20" r="10"/><path d="M24 30v6M20 36h8"/></svg> },
  { n:'02', title:'Connect Minds',      desc:'Network with innovators, researchers, students and industry leaders from across India.',
    icon:<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="24" cy="24" r="3"/><circle cx="8" cy="16" r="3"/><circle cx="40" cy="16" r="3"/><circle cx="8" cy="36" r="3"/><circle cx="40" cy="36" r="3"/><path d="M11 16l10 7M37 16l-10 7M11 36l10-7M37 36l-10-7"/></svg> },
  { n:'03', title:'Decode Complexity',  desc:'Gain deep insight into science, technology, society and the future through world-class talks.',
    icon:<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="8" y="12" width="32" height="24" rx="2"/><path d="M16 20h8M16 28h16M28 20h4"/></svg> },
  { n:'04', title:'Design Your Future', desc:'Leave with a new framework for thinking — tools for your craft, career, or cause.',
    icon:<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 36l8-20 8 12 6-8 6 16"/></svg> },
  { n:'05', title:'Disrupt Norms',      desc:'Conversations that question the status quo and celebrate courageous thinking.',
    icon:<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M24 8v8M24 32v8M8 24h8M32 24h8"/></svg> },
  { n:'06', title:'Carry the Spark',    desc:'A certified TEDx experience — memories, connections, and revelations that last a lifetime.',
    icon:<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M24 8l4 10h10l-8 6 3 10-9-6-9 6 3-10-8-6h10z"/></svg> },
]

/* ── Animated counter ── */
function StatCard({ s, visible }) {
  const [val, setVal] = useState('0')
  const started = useRef(false)

  useEffect(() => {
    if (!visible || started.current) return
    started.current = true
    if (s.num === '∞') { setVal('∞'); return }
    const end   = parseInt(s.num)
    const plus  = s.num.includes('+')
    const steps = 40
    let i = 0
    const id = setInterval(() => {
      i++
      const v = Math.round((i / steps) * end)
      setVal(plus ? `${v}+` : `${v}`)
      if (i >= steps) { setVal(s.num); clearInterval(id) }
    }, 1200 / steps)
    return () => clearInterval(id)
  }, [visible])

  return (
    <div className="stat-card">
      <span className="stat-card__num">{val}</span>
      <span className="stat-card__label">{s.label}</span>
    </div>
  )
}

/* ── Glitch text hook ── */
function useGlitch(text, active) {
  const [display, setDisplay] = useState(text)
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%'
  useEffect(() => {
    if (!active) return
    let frame = 0
    const total = 18
    const id = setInterval(() => {
      frame++
      if (frame >= total) { setDisplay(text); clearInterval(id); return }
      setDisplay(text.split('').map((c, i) => {
        if (c === ' ') return ' '
        return frame / total > i / text.length
          ? c
          : chars[Math.floor(Math.random() * chars.length)]
      }).join(''))
    }, 40)
    return () => clearInterval(id)
  }, [active])
  return display
}

/* ── Main section ── */
export default function Attend() {
  const ref     = useRef(null)
  const [vis, setVis] = useState(false)
  const [hovered, setHovered] = useState(null)
  const glitchSub = useGlitch(" ", vis)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect() }
    }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <style>{`
        /* ── Section shell ── */
        .attend-section {
          position: relative;
          background: #000;
          padding: 100px 5vw 120px;
          overflow: hidden;
          font-family: 'Georgia', serif;
        }

        /* Subtle noise grain overlay */
        .attend-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.35;
        }

        /* ── Heading block ── */
        .attend-heading-wrap {
          position: relative;
          text-align: center;
          margin-bottom: 72px;
          z-index: 1;
        }

        /* Giant ghost letters behind */
        .attend-ghost {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: clamp(80px, 16vw, 200px);
          font-weight: 900;
          letter-spacing: -0.02em;
          color: #5c000076;
          white-space: nowrap;
          user-select: none;
          pointer-events: none;
          line-height: 1;
          opacity: 0;
          transition: opacity 1s ease 0.2s;
          font-family: 'Impact', 'Arial Black', sans-serif;
        }
        .attend-ghost.visible { opacity: 1; }

        /* Eyebrow — glitch subtitle */
        .attend-eyebrow {
          font-size: 12px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #b0000011;
          margin-bottom: 14px;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s;
          font-family: 'Arial', sans-serif;
        }
        .attend-eyebrow.visible { opacity: 1; transform: translateY(0); }

        /* Main heading — Make Your Choice */
        .attend-title {
          position: relative;
          font-size: clamp(32px, 6vw, 68px);
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.02em;
          font-family: 'Arial Black', 'Impact', sans-serif;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s;
          margin: 0;
          line-height: 1.1;
        }
        .attend-title.visible { opacity: 1; transform: translateY(0); }



        /* ── Stat cards ── */
        .attend-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2px;
          margin-bottom: 64px;
          position: relative;
          z-index: 1;
        }
        @media (max-width: 700px) { .attend-stats { grid-template-columns: repeat(2,1fr); } }

        .stat-card {
          background: #0a0a0a;
          border: 1px solid #1a1a1a;
          padding: 36px 24px;
          text-align: center;
          position: relative;
          overflow: hidden;
          transition: background 0.35s, border-color 0.35s;
          cursor: default;
        }
        .stat-card::before {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #b00000, transparent);
          transform: scaleX(0);
          transition: transform 0.4s ease;
        }
        .stat-card:hover { background: #100000; border-color: #3a0000; }
        .stat-card:hover::before { transform: scaleX(1); }

        .stat-card__num {
          display: block;
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 900;
          color: #cc0000;
          font-family: 'Impact', 'Arial Black', sans-serif;
          letter-spacing: -0.02em;
          line-height: 1;
        }

        .stat-card__label {
          display: block;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #666;
          margin-top: 8px;
          font-family: 'Arial', sans-serif;
          transition: color 0.3s;
        }
        .stat-card:hover .stat-card__label { color: #999; }

        /* ── Reason cards grid ── */
        .attend-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          position: relative;
          z-index: 1;
        }
        @media (max-width: 900px) { .attend-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 560px) { .attend-grid { grid-template-columns: 1fr; } }

        .attend-card {
          background: #080808;
          border: 1px solid #161616;
          padding: 36px 30px;
          position: relative;
          overflow: hidden;
          cursor: default;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s ease, background 0.4s, border-color 0.4s;
        }
        .attend-card.in-view {
          opacity: 1;
          transform: translateY(0);
        }
        .attend-card:hover {
          background: #0e0000;
          border-color: #3a0000;
          transform: translateY(-4px);
          z-index: 2;
        }

        /* Sweep highlight on hover */
        .attend-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(160,0,0,0.06) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.4s;
        }
        .attend-card:hover::after { opacity: 1; }

        /* Red left accent line */
        .attend-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 2px; height: 0;
          background: #b00000;
          transition: height 0.5s ease;
        }
        .attend-card:hover::before { height: 100%; }

        .attend-card__num {
          font-size: 11px;
          letter-spacing: 0.22em;
          color: #b00000;
          font-family: 'Arial', sans-serif;
          margin-bottom: 18px;
          display: block;
        }

        .attend-card__icon {
          width: 40px;
          height: 40px;
          color: #555;
          margin-bottom: 18px;
          transition: color 0.3s;
        }
        .attend-card:hover .attend-card__icon { color: #cc3333; }

        .attend-card__title {
          font-size: 17px;
          font-weight: 700;
          color: #e8e8e8;
          margin: 0 0 12px;
          font-family: 'Arial Black', sans-serif;
          letter-spacing: 0.02em;
          transition: color 0.3s;
        }
        .attend-card:hover .attend-card__title { color: #fff; }

        .attend-card__desc {
          font-size: 13.5px;
          line-height: 1.7;
          color: #555;
          margin: 0;
          font-family: 'Georgia', serif;
          transition: color 0.3s;
        }
        .attend-card:hover .attend-card__desc { color: #888; }

        /* ── Scanline ── */
        @keyframes scanline {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .attend-scanline {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: rgba(180,0,0,0.08);
          pointer-events: none;
          animation: scanline 6s linear infinite;
          z-index: 0;
        }

        /* Pulsing corner dots */
        .attend-corner {
          position: absolute;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #b00000;
          animation: pulse-dot 2.5s ease-in-out infinite;
        }
        .attend-corner--tl { top: 24px; left: 24px; animation-delay: 0s; }
        .attend-corner--tr { top: 24px; right: 24px; animation-delay: 0.6s; }
        .attend-corner--bl { bottom: 24px; left: 24px; animation-delay: 1.2s; }
        .attend-corner--br { bottom: 24px; right: 24px; animation-delay: 1.8s; }

        @keyframes pulse-dot {
          0%,100% { opacity: 0.2; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.6); }
        }

        @media (max-width: 768px) {
          .attend-section { padding: 64px 5vw 80px; }
          .attend-heading-wrap { margin-bottom: 48px; }
          .attend-stats { margin-bottom: 40px; }
          .stat-card { padding: 24px 16px; }
          .attend-card { padding: 28px 20px; }
        }
      `}</style>

      <section className="attend-section" id="why" ref={ref}>
        <div className="attend-scanline" />
        <div className="attend-corner attend-corner--tl" />
        <div className="attend-corner attend-corner--tr" />
        <div className="attend-corner attend-corner--bl" />
        <div className="attend-corner attend-corner--br" />

        {/* ── Heading ── */}
        <div className="attend-heading-wrap">
          <div className={`attend-ghost${vis ? ' visible' : ''}`}>
            WHY TO ATTEND?
          </div>

          {/* Main heading */}
          <h2 className={`attend-title${vis ? ' visible' : ''}`}>
           WHY TO ATTEND
          </h2>
          {/* Glitch subtitle */}
          <div className={`attend-eyebrow${vis ? ' visible' : ''}`}>
            {glitchSub}
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="attend-stats">
          {STATS.map((s, i) => <StatCard key={i} s={s} visible={vis} />)}
        </div>

        {/* ── Reason cards ── */}
        <div className="attend-grid">
          {REASONS.map((r, i) => (
            <div
              key={r.n}
              className={`attend-card${vis ? ' in-view' : ''}`}
              style={{ transitionDelay: `${i * 0.09}s` }}
              onMouseEnter={() => setHovered(r.n)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className="attend-card__num">{r.n}</span>
              <div className="attend-card__icon">{r.icon}</div>
              <h3 className="attend-card__title">{r.title}</h3>
              <p className="attend-card__desc">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}