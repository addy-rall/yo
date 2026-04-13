import { useEffect, useRef } from 'react'

const ROCKET_SVG = `
<svg viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg"
     style="width:72px;height:96px;overflow:visible;display:block;">
  <path d="M60 8 C60 8 38 28 35 70 L35 102 L60 114 L85 102 L85 70 C82 28 60 8 60 8 Z"
    fill="none" stroke="#c0302a" stroke-width="3.2" stroke-linejoin="round"/>
  <path d="M46 40 C48 24 60 10 60 10 C60 10 72 24 74 40 Z"
    fill="none" stroke="#c0302a" stroke-width="2.4" stroke-linejoin="round"/>
  <circle cx="60" cy="68" r="16" fill="none" stroke="#c0302a" stroke-width="3.2"/>
  <circle cx="60" cy="68" r="10" fill="none" stroke="#c0302a" stroke-width="2.2"/>
  <rect x="35" y="96" width="50" height="12" rx="2" fill="none" stroke="#c0302a" stroke-width="2.8"/>
  <path d="M35 76 C24 80 16 98 18 108 L35 102 Z" fill="none" stroke="#c0302a" stroke-width="3" stroke-linejoin="round"/>
  <path d="M85 76 C96 80 104 98 102 108 L85 102 Z" fill="none" stroke="#c0302a" stroke-width="3" stroke-linejoin="round"/>
  <path d="M35 88 C28 90 24 100 26 106 L35 100 Z" fill="none" stroke="#c0302a" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="M85 88 C92 90 96 100 94 106 L85 100 Z" fill="none" stroke="#c0302a" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="M48 112 C44 118 36 124 38 134 C40 144 46 148 50 142 C52 150 48 158 54 156 C56 162 62 154 60 146 C64 154 68 152 67 144 C70 150 74 144 72 136 C74 128 68 118 65 112 Z"
    fill="none" stroke="#c0302a" stroke-width="2.8" stroke-linejoin="round"/>
  <path d="M55 114 C52 122 56 130 54 138 C56 144 60 140 61 134 C63 140 66 138 65 130 C67 122 63 116 60 112 Z"
    fill="none" stroke="#c0302a" stroke-width="2" stroke-linejoin="round"/>
</svg>
`

export default function CursorFX() {
  const mouseRef = useRef({ x: -1, y: -1 })
  const frameRef = useRef(null)

  /* ── Spiral cursor trail (mouse + touch) ── */
  useEffect(() => {
    // Force hide cursor via injected style — more reliable than App.css alone
    const styleTag = document.createElement('style')
    styleTag.id = 'cursor-none-global'
    styleTag.textContent = `
      *, *::before, *::after { cursor: none !important; }
      iframe, video { cursor: auto !important; }
    `
    document.head.appendChild(styleTag)

    const canvas = document.createElement('canvas')
    canvas.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99999;`
    document.body.appendChild(canvas)
    const ctx = canvas.getContext('2d')

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const particles = []
    let angle = 0
    let mx = -999, my = -999

    const spawnParticles = (clientX, clientY) => {
      mx = clientX; my = clientY
      mouseRef.current = { x: mx, y: my }
      for (let i = 0; i < 3; i++) {
        angle += 0.42
        const radius = 6 + Math.random() * 10
        const isWhite = Math.random() < 0.28
        particles.push({
          x: mx + Math.cos(angle) * radius,
          y: my + Math.sin(angle) * radius,
          vx: (Math.random() - 0.5) * 0.6 + Math.cos(angle) * 0.8,
          vy: (Math.random() - 0.5) * 0.6 + Math.sin(angle) * 0.8,
          life: 1,
          decay: 0.022 + Math.random() * 0.018,
          size: isWhite ? 1.2 + Math.random() * 1.2 : 1.5 + Math.random() * 2,
          isWhite,
        })
      }
    }

    const onMouseMove = (e) => spawnParticles(e.clientX, e.clientY)
    const onTouchMove = (e) => {
      const t = e.touches[0]
      spawnParticles(t.clientX, t.clientY)
    }
    const onTouchEnd = () => {
      // fade out gracefully — don't reset mx/my abruptly
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx; p.y += p.vy
        p.vx *= 0.97; p.vy *= 0.97
        p.life -= p.decay
        if (p.life <= 0) { particles.splice(i, 1); continue }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.isWhite
          ? `rgba(255,240,240,${p.life * 0.22})`
          : `rgba(200,30,20,${p.life * 0.55})`
        ctx.fill()
      }
      // dot + ring only on mouse (not touch — no persistent cursor on phones)
      const isTouchDevice = window.matchMedia('(hover: none)').matches
      if (mx > 0 && !isTouchDevice) {
        ctx.beginPath(); ctx.arc(mx, my, 3, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.fill()
        ctx.beginPath(); ctx.arc(mx, my, 14, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(200,30,20,0.4)'; ctx.lineWidth = 1; ctx.stroke()
      }
      frameRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(frameRef.current)
      canvas.remove()
      styleTag.remove()
    }
  }, [])

  /* ── Rocket (mouse + touch) ── */
  useEffect(() => {
    const SIZE = 72
    const HALF = SIZE / 2

    const wrapper = document.createElement('div')
    wrapper.id = 'cursor-rocket'
    wrapper.style.cssText = `
      position: fixed;
      top: 0; left: 0;
      width: ${SIZE}px; height: 96px;
      z-index: 99997;
      pointer-events: none;
      will-change: transform;
    `
    wrapper.innerHTML = ROCKET_SVG
    document.body.appendChild(wrapper)

    let rx = window.innerWidth  * 0.20
    let ry = window.innerHeight * 0.20
    let vx = 0, vy = 0
    let heading = -90
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
        orbitAngle += 0.013
        const tx = cx + Math.cos(orbitAngle)     * (W * 0.37)
        const ty = cy + Math.sin(orbitAngle * 2) * (H * 0.28)
        vx += (tx - rx) * 0.048
        vy += (ty - ry) * 0.048
        vx *= 0.86; vy *= 0.86
      } else {
        const dx = m.x - rx
        const dy = m.y - ry
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist > 22) {
          const pull = Math.min(dist * 0.07, 12)
          vx += (dx / dist) * pull * 0.45
          vy += (dy / dist) * pull * 0.45
          vx *= 0.80; vy *= 0.80
        } else {
          vx *= 0.50; vy *= 0.50
        }
      }

      rx += vx; ry += vy

      const speed = Math.sqrt(vx * vx + vy * vy)
      if (speed > 0.5) {
        heading = Math.atan2(vy, vx) * (180 / Math.PI) + 90
      }

      wrapper.style.transform = `translate(${rx - HALF}px, ${ry - HALF}px) rotate(${heading}deg)`
      frameId = requestAnimationFrame(tick)
    }
    tick()

    return () => { cancelAnimationFrame(frameId); wrapper.remove() }
  }, [])

  /* ── Ripple rings on click + tap ── */
  useEffect(() => {
    const spawnRipple = (clientX, clientY) => {
      for (let i = 0; i < 3; i++) {
        const ring = document.createElement('div')
        ring.style.cssText = `
          position:fixed; pointer-events:none; z-index:99998;
          left:${clientX}px; top:${clientY}px;
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

    const onClick = (e) => spawnRipple(e.clientX, e.clientY)
    const onTouchStart = (e) => {
      const t = e.touches[0]
      spawnRipple(t.clientX, t.clientY)
    }

    window.addEventListener('click', onClick)
    window.addEventListener('touchstart', onTouchStart, { passive: true })

    return () => {
      window.removeEventListener('click', onClick)
      window.removeEventListener('touchstart', onTouchStart)
    }
  }, [])

  return null
}
