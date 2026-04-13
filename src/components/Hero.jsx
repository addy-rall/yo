import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'

/* ── Floating 3D geometry config ── */
const SHAPES = [
  { type: 'ring',   size: 52, top: '12%', left: '7%',  delay: 0,   dur: 7.2, rotX: 62, rotZ: 20  },
  { type: 'square', size: 18, top: '22%', left: '18%', delay: 1.4, dur: 5.8, rotX: 45, rotZ: 30  },
  { type: 'ring',   size: 28, top: '68%', left: '5%',  delay: 2.1, dur: 9.0, rotX: 70, rotZ: -15 },
  { type: 'dot',    size: 5,  top: '40%', left: '12%', delay: 0.7, dur: 6.4, rotX: 0,  rotZ: 0   },
  { type: 'line',   size: 44, top: '80%', left: '22%', delay: 3.3, dur: 8.1, rotX: 0,  rotZ: 55  },
  { type: 'ring',   size: 70, top: '8%',  left: '80%', delay: 1.0, dur: 10.5,rotX: 55, rotZ: -30 },
  { type: 'square', size: 24, top: '25%', left: '88%', delay: 2.8, dur: 6.9, rotX: 40, rotZ: 60  },
  { type: 'dot',    size: 4,  top: '55%', left: '93%', delay: 0.3, dur: 7.7, rotX: 0,  rotZ: 0   },
  { type: 'ring',   size: 38, top: '75%', left: '85%', delay: 1.9, dur: 8.8, rotX: 65, rotZ: 10  },
  { type: 'line',   size: 36, top: '15%', left: '60%', delay: 4.1, dur: 7.3, rotX: 0,  rotZ: -40 },
  { type: 'square', size: 14, top: '88%', left: '55%', delay: 0.6, dur: 9.2, rotX: 50, rotZ: 25  },
  { type: 'dot',    size: 6,  top: '30%', left: '75%', delay: 2.5, dur: 5.5, rotX: 0,  rotZ: 0   },
]

function Shape({ type, size, top, left, delay, dur, rotX, rotZ }) {
  const animName = `bobble${type.charAt(0).toUpperCase() + type.slice(1)}`
  const base = {
    position: 'absolute', top, left,
    pointerEvents: 'none',
    animation: `${animName} ${dur}s ease-in-out ${delay}s infinite`,
    transform: `perspective(400px) rotateX(${rotX}deg) rotateZ(${rotZ}deg)`,
  }
  if (type === 'ring')   return <div style={{ ...base, width: size, height: size, borderRadius: '50%', border: '1px solid rgba(160,28,20,0.20)' }} />
  if (type === 'square') return <div style={{ ...base, width: size, height: size, border: '1px solid rgba(210,210,210,0.09)' }} />
  if (type === 'dot')    return <div style={{ ...base, width: size, height: size, borderRadius: '50%', background: 'rgba(160,28,20,0.28)' }} />
  if (type === 'line')   return <div style={{ ...base, width: size, height: 1, background: 'linear-gradient(90deg,transparent,rgba(160,28,20,0.18),transparent)' }} />
  return null
}

/* ── Red outline rocket SVG matching reference image ── */
const ROCKET_SVG = `
<svg viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg"
     style="width:72px;height:96px;overflow:visible;display:block;">

  <!-- rocket body -->
  <path d="
    M60 8
    C60 8 38 28 35 70
    L35 102
    L60 114
    L85 102
    L85 70
    C82 28 60 8 60 8
    Z"
    fill="none" stroke="#c0302a" stroke-width="3.2" stroke-linejoin="round"/>

  <!-- nose tip highlight band -->
  <path d="M46 40 C48 24 60 10 60 10 C60 10 72 24 74 40 Z"
    fill="none" stroke="#c0302a" stroke-width="2.4" stroke-linejoin="round"/>

  <!-- porthole outer ring -->
  <circle cx="60" cy="68" r="16"
    fill="none" stroke="#c0302a" stroke-width="3.2"/>

  <!-- porthole inner ring -->
  <circle cx="60" cy="68" r="10"
    fill="none" stroke="#c0302a" stroke-width="2.2"/>

  <!-- engine band / belt -->
  <rect x="35" y="96" width="50" height="12" rx="2"
    fill="none" stroke="#c0302a" stroke-width="2.8"/>

  <!-- left fin -->
  <path d="M35 76 C24 80 16 98 18 108 L35 102 Z"
    fill="none" stroke="#c0302a" stroke-width="3" stroke-linejoin="round"/>

  <!-- right fin -->
  <path d="M85 76 C96 80 104 98 102 108 L85 102 Z"
    fill="none" stroke="#c0302a" stroke-width="3" stroke-linejoin="round"/>

  <!-- left small side fin -->
  <path d="M35 88 C28 90 24 100 26 106 L35 100 Z"
    fill="none" stroke="#c0302a" stroke-width="2.2" stroke-linejoin="round"/>

  <!-- right small side fin -->
  <path d="M85 88 C92 90 96 100 94 106 L85 100 Z"
    fill="none" stroke="#c0302a" stroke-width="2.2" stroke-linejoin="round"/>

  <!-- flame outer left -->
  <path d="
    M48 112
    C44 118 36 124 38 134
    C40 144 46 148 50 142
    C52 150 48 158 54 156
    C56 162 62 154 60 146
    C64 154 68 152 67 144
    C70 150 74 144 72 136
    C74 128 68 118 65 112
    Z"
    fill="none" stroke="#c0302a" stroke-width="2.8" stroke-linejoin="round"/>

  <!-- flame inner right tendril -->
  <path d="
    M55 114
    C52 122 56 130 54 138
    C56 144 60 140 61 134
    C63 140 66 138 65 130
    C67 122 63 116 60 112
    Z"
    fill="none" stroke="#c0302a" stroke-width="2" stroke-linejoin="round"/>

</svg>
`

export default function Hero() {
  const heroRef  = useRef(null)
  const frameRef = useRef(null)
  const mouseRef = useRef({ x: -1, y: -1 })

  /* ── Spiral cursor trail ── */
  useEffect(() => {
    const canvas = document.createElement('canvas')
    canvas.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;`
    document.body.appendChild(canvas)
    const ctx = canvas.getContext('2d')
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const particles = []
    let angle = 0
    let mx = -999, my = -999

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY
      mouseRef.current = { x: mx, y: my }
      for (let i = 0; i < 3; i++) {
        angle += 0.42
        const radius = 6 + Math.random() * 10
        const isWhite = Math.random() < 0.28
        particles.push({
          x: mx + Math.cos(angle) * radius, y: my + Math.sin(angle) * radius,
          vx: (Math.random() - 0.5) * 0.6 + Math.cos(angle) * 0.8,
          vy: (Math.random() - 0.5) * 0.6 + Math.sin(angle) * 0.8,
          life: 1, decay: 0.022 + Math.random() * 0.018,
          size: isWhite ? 1.2 + Math.random() * 1.2 : 1.5 + Math.random() * 2, isWhite,
        })
      }
    }
    window.addEventListener('mousemove', onMove)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx; p.y += p.vy; p.vx *= 0.97; p.vy *= 0.97; p.life -= p.decay
        if (p.life <= 0) { particles.splice(i, 1); continue }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.isWhite ? `rgba(255,240,240,${p.life * 0.22})` : `rgba(200,30,20,${p.life * 0.55})`
        ctx.fill()
      }
      if (mx > 0) {
        ctx.beginPath(); ctx.arc(mx, my, 3, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.fill()
        ctx.beginPath(); ctx.arc(mx, my, 14, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(200,30,20,0.4)'; ctx.lineWidth = 1; ctx.stroke()
      }
      frameRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(frameRef.current)
      canvas.remove()
    }
  }, [])

  /* ── 🚀 Rocket: orbits page, chases & parks at cursor ── */
  useEffect(() => {
    const SIZE = 72   // px — half-width/height offset
    const HALF = SIZE / 2

    const wrapper = document.createElement('div')
    wrapper.id = 'hero-rocket'
    wrapper.style.cssText = `
      position: fixed;
      top: 0; left: 0;
      width: ${SIZE}px; height: 96px;
      z-index: 9997;
      pointer-events: none;
      will-change: transform;
    `
    wrapper.innerHTML = ROCKET_SVG
    document.body.appendChild(wrapper)

    let rx = window.innerWidth  * 0.20
    let ry = window.innerHeight * 0.20
    let vx = 0, vy = 0
    let heading = -90   // degrees; SVG nose points up
    let orbitAngle = 0
    let frameId

    const tick = () => {
      const W  = window.innerWidth
      const H  = window.innerHeight
      const cx = W * 0.5
      const cy = H * 0.5
      const m  = mouseRef.current
      const hasMouse = m.x > 0

      if (!hasMouse) {
        /* Figure-8 Lissajous swirl */
        orbitAngle += 0.013
        const tx = cx + Math.cos(orbitAngle)     * (W * 0.37)
        const ty = cy + Math.sin(orbitAngle * 2) * (H * 0.28)
        vx += (tx - rx) * 0.048
        vy += (ty - ry) * 0.048
        vx *= 0.86; vy *= 0.86
      } else {
        /* Chase cursor */
        const dx = m.x - rx
        const dy = m.y - ry
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist > 22) {
          const pull = Math.min(dist * 0.07, 12)
          vx += (dx / dist) * pull * 0.45
          vy += (dy / dist) * pull * 0.45
          vx *= 0.80; vy *= 0.80
        } else {
          /* Parked — hard brake */
          vx *= 0.50; vy *= 0.50
        }
      }

      rx += vx; ry += vy

      /* Heading — only update when moving meaningfully */
      const speed = Math.sqrt(vx * vx + vy * vy)
      if (speed > 0.5) {
        heading = Math.atan2(vy, vx) * (180 / Math.PI) + 90
      }

      /* Single clean transform: position then rotate */
      wrapper.style.transform = `translate(${rx - HALF}px, ${ry - HALF}px) rotate(${heading}deg)`

      frameId = requestAnimationFrame(tick)
    }
    tick()

    return () => { cancelAnimationFrame(frameId); wrapper.remove() }
  }, [])

  /* ── Ripple rings on click ── */
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    const onClick = (e) => {
      if (e.target.closest?.('.hero-title, .hero-tagline, .hero-theme, .hero-actions')) return
      for (let i = 0; i < 3; i++) {
        const ring = document.createElement('div')
        ring.style.cssText = `
          position:fixed; pointer-events:none; z-index:9998;
          left:${e.clientX}px; top:${e.clientY}px;
          width:0; height:0; border-radius:50%;
          border:1.5px solid rgba(230,43,30,${0.7 - i * 0.2});
          transform:translate(-50%,-50%);
          animation:rippleExpand ${0.7 + i * 0.2}s ease-out ${i * 0.12}s forwards;
        `
        document.body.appendChild(ring)
        setTimeout(() => ring.remove(), 1200)
      }
    }
    if (!document.getElementById('ripple-style')) {
      const s = document.createElement('style')
      s.id = 'ripple-style'
      s.textContent = `@keyframes rippleExpand {
        0%   { width:0;     height:0;     opacity:1; }
        100% { width:200px; height:200px; opacity:0; }
      }`
      document.head.appendChild(s)
    }
    hero.addEventListener('click', onClick)
    return () => hero.removeEventListener('click', onClick)
  }, [])

  return (
    <section className="hero" ref={heroRef} style={{ cursor: 'none' }}>

      {/* Floating 3D geometry */}
      <div className="hero-geometry" aria-hidden="true">
        {SHAPES.map((s, i) => <Shape key={i} {...s} />)}
      </div>

      {/* Wave layers */}
      <div className="hero-waves" aria-hidden="true">
        <svg className="wave wave--1" viewBox="0 0 1440 220" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,80 C180,160 360,20 540,90 C720,160 900,20 1080,90 C1260,160 1350,40 1440,80 L1440,220 L0,220 Z"/>
        </svg>
        <svg className="wave wave--2" viewBox="0 0 1440 220" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,60 C160,140 320,10 540,75 C760,140 960,20 1200,70 C1320,100 1400,40 1440,60 L1440,220 L0,220 Z"/>
        </svg>
        <svg className="wave wave--3" viewBox="0 0 1440 220" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,110 C200,40 440,180 720,100 C1000,20 1240,160 1440,110 L1440,220 L0,220 Z"/>
        </svg>
        <svg className="wave wave--4" viewBox="0 0 1440 220" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,140 C240,60 480,180 720,120 C960,60 1200,170 1440,140 L1440,220 L0,220 Z"/>
        </svg>
      </div>

      {/* Content */}
      <div className="hero-content">
        <p className="hero-tagline">
          <span className="tagline-line" />
          Ideas Worth Spreading
        </p>

        <h1 className="hero-title">
          <span className="ted">TED</span>
          <span className="x-mark">x</span>
          <span className="bbau">BBAU</span>
        </h1>

        <div className="hero-theme">
          <span className="theme-word">Innovation</span>
        </div>

        <p className="hero-sub">
          A platform to share ideas that Challenge, Inspire, and Ignite change.
        </p>

        <div className="hero-actions">
          <Link to="/register" className="hero-btn primary">
            <span className="btn-shine" />
            Register Now
          </Link>
        </div>
      </div>

    </section>
  )
}