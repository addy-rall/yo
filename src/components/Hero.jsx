import { useEffect, useRef } from 'react'
import './Hero.css'

export default function Hero() {
  const heroRef  = useRef(null)
  const starsRef = useRef(null)
  const dispRef  = useRef(null)
  const scaleRef = useRef(null)
  const velRef   = useRef(0)
  const lastPos  = useRef({ x: 0, y: 0 })
  const trailRef = useRef([])
  const frameRef = useRef(null)
  const mouseRef = useRef({ x: -999, y: -999 })

  /* ── Twinkling star canvas ── */
  useEffect(() => {
    const canvas = starsRef.current
    const ctx    = canvas.getContext('2d')

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const stars = Array.from({ length: 220 }, () => ({
      x:       Math.random(),
      y:       Math.random(),
      r:       Math.random() * 1.1 + 0.2,
      opacity: Math.random(),
      delta:   (Math.random() * 0.008 + 0.003) * (Math.random() < 0.5 ? 1 : -1),
    }))

    let id
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stars.forEach(s => {
        s.opacity += s.delta
        if (s.opacity >= 1 || s.opacity <= 0) s.delta *= -1
        ctx.beginPath()
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${Math.max(0, Math.min(1, s.opacity))})`
        ctx.fill()
      })
      id = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(id)
      window.removeEventListener('resize', resize)
    }
  }, [])

  /* ── Cursor trail ── */
  useEffect(() => {
    const TRAIL_COUNT = 16
    if (!heroRef.current) return

    // Small inner dot — snaps instantly
    const innerDot = document.createElement('div')
    innerDot.style.cssText = `
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.9);
      transform: translate(-50%, -50%);
      transition: left 0.04s linear, top 0.04s linear;
      will-change: left, top;
    `
    document.body.appendChild(innerDot)

    // Large outer ring — lags behind subtly
    const outerRing = document.createElement('div')
    outerRing.style.cssText = `
      position: fixed;
      pointer-events: none;
      z-index: 9998;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: transparent;
      border: 1px solid rgba(230, 43, 30, 0.45);
      transform: translate(-50%, -50%);
      transition: left 0.18s ease, top 0.18s ease, opacity 0.3s ease;
      will-change: left, top;
    `
    document.body.appendChild(outerRing)

    // Faint trailing dots
    const dots = Array.from({ length: TRAIL_COUNT }, (_, i) => {
      const el = document.createElement('div')
      const opacity = (1 - i / TRAIL_COUNT) * 0.18
      el.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 9997;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background: rgba(230, 43, 30, ${opacity});
        transform: translate(-50%, -50%);
        will-change: left, top;
      `
      document.body.appendChild(el)
      return { el, x: -999, y: -999 }
    })
    trailRef.current = dots

    const history = Array(TRAIL_COUNT).fill({ x: -999, y: -999 })
    let histIdx = 0

    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }

      innerDot.style.left = e.clientX + 'px'
      innerDot.style.top  = e.clientY + 'px'

      outerRing.style.left = e.clientX + 'px'
      outerRing.style.top  = e.clientY + 'px'

      history[histIdx % TRAIL_COUNT] = { x: e.clientX, y: e.clientY }
      histIdx++
    }
    window.addEventListener('mousemove', onMove)

    const animate = () => {
      dots.forEach((dot, i) => {
        const idx = ((histIdx - 1 - i * 1.5) | 0 + TRAIL_COUNT * 10) % TRAIL_COUNT
        const pos = history[idx] || { x: -999, y: -999 }
        dot.el.style.left = pos.x + 'px'
        dot.el.style.top  = pos.y + 'px'
      })
      frameRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(frameRef.current)
      dots.forEach(d => d.el.remove())
      innerDot.remove()
      outerRing.remove()
    }
  }, [])

  /* ── Mouse-move distortion on star canvas ── */
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    let animId
    let currentScale = 0
    let targetScale  = 0
    let phase        = 0

    const onMove = (e) => {
      const dx = e.clientX - lastPos.current.x
      const dy = e.clientY - lastPos.current.y
      const speed = Math.sqrt(dx * dx + dy * dy)
      lastPos.current = { x: e.clientX, y: e.clientY }

      const target = e.target
      const isHeadline = target.closest?.('.hero-title, .hero-tagline, .hero-theme')
      if (isHeadline) {
        targetScale = 0
        return
      }

      velRef.current = Math.min(speed * 2.2, 90)
      targetScale    = velRef.current
    }

    const tick = () => {
      currentScale += (targetScale - currentScale) * 0.12
      targetScale  *= 0.93
      phase        += 0.018

      if (scaleRef.current) {
        scaleRef.current.setAttribute('scale', currentScale.toFixed(2))
      }
      if (dispRef.current) {
        const base = 0.012 + Math.sin(phase) * 0.003
        dispRef.current.setAttribute('baseFrequency', `${base.toFixed(4)} ${(base * 0.8).toFixed(4)}`)
      }

      animId = requestAnimationFrame(tick)
    }

    hero.addEventListener('mousemove', onMove)
    animId = requestAnimationFrame(tick)

    return () => {
      hero.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  /* ── Ripple rings on click ── */
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const onClick = (e) => {
      const target = e.target
      if (target.closest?.('.hero-title, .hero-tagline, .hero-theme, .hero-actions')) return

      for (let i = 0; i < 3; i++) {
        const ring = document.createElement('div')
        ring.style.cssText = `
          position: fixed;
          pointer-events: none;
          z-index: 9998;
          left: ${e.clientX}px;
          top:  ${e.clientY}px;
          width: 0;
          height: 0;
          border-radius: 50%;
          border: 1.5px solid rgba(230,43,30,${0.7 - i * 0.2});
          transform: translate(-50%, -50%) scale(0);
          animation: rippleExpand ${0.7 + i * 0.2}s ease-out ${i * 0.12}s forwards;
        `
        document.body.appendChild(ring)
        setTimeout(() => ring.remove(), 1200)
      }
    }

    if (!document.getElementById('ripple-style')) {
      const style = document.createElement('style')
      style.id = 'ripple-style'
      style.textContent = `
        @keyframes rippleExpand {
          0%   { width: 0px;   height: 0px;   opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { width: 200px; height: 200px; opacity: 0; transform: translate(-50%, -50%) scale(1); }
        }
      `
      document.head.appendChild(style)
    }

    hero.addEventListener('click', onClick)
    return () => hero.removeEventListener('click', onClick)
  }, [])

  return (
    <section className="hero" ref={heroRef} style={{ cursor: 'none' }}>

      {/* SVG distortion filter */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
        <defs>
          <filter id="hero-distort" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              ref={dispRef}
              type="turbulence"
              baseFrequency="0.012 0.010"
              numOctaves="3"
              seed="5"
              result="noise"
            />
            <feDisplacementMap
              ref={scaleRef}
              in="SourceGraphic"
              in2="noise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Star canvas — distortion applied only here */}
      <canvas
        ref={starsRef}
        className="hero-stars"
        aria-hidden="true"
        style={{ filter: 'url(#hero-distort)' }}
      />

      {/* Wave layers */}
      <div className="hero-waves" aria-hidden="true">
        <svg className="wave wave--1" viewBox="0 0 1440 180" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,90 C240,160 480,20 720,90 C960,160 1200,20 1440,90 L1440,180 L0,180 Z"/>
        </svg>
        <svg className="wave wave--2" viewBox="0 0 1440 180" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,70 C200,140 440,10 720,80 C1000,150 1240,30 1440,70 L1440,180 L0,180 Z"/>
        </svg>
        <svg className="wave wave--3" viewBox="0 0 1440 180" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,110 C280,40 520,170 720,100 C920,30 1160,150 1440,110 L1440,180 L0,180 Z"/>
        </svg>
      </div>

      {/* Content — no filter, headlines unaffected */}
      <div className="hero-content">
        <p className="hero-tagline">
          <span className="tagline-line" />
          Ideas Worth Spreading
        </p>

        <h1 className="hero-title">
          <span className="ted">TED</span><span className="x-mark">x</span><span className="amu">BBAU</span>
        </h1>

        <div className="hero-theme">
          <span className="theme-word">Innovation</span>
        </div>

        <p className="hero-sub">
          A platform to share ideas that Challenge, Inspire, and Ignite change.
        </p>

        <div className="hero-actions">
          <a href="#" className="hero-btn primary">
            <span className="btn-shine" />
            Register Now
          </a>
        </div>
      </div>

    </section>
  )
}