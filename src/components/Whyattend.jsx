import { useEffect, useRef, useState } from 'react'
import Matter from 'matter-js'
import clgImage from '../assets/clg.png'
import bbauEventImg from '../assets/img.png'

const { Engine, Bodies, Body, World } = Matter

const BALLS = [
  { label: 'DECODE', color: 'red', size: 80 },
  { label: 'DESIGN', color: 'white', size: 75 },
  { label: 'DISRUPT', color: 'charcoal', size: 85 },
  { label: 'TEDx', color: 'red', size: 70 },
  { label: 'BBAU', color: 'charcoal', size: 75 },
]

const GRAD = {
  red: 'radial-gradient(circle at 34% 29%, #ff8a7a 0%, #b32d2d 36%, #7a1b1b 70%, #2d0503 100%)',
  white: 'radial-gradient(circle at 34% 29%, #ffffff 0%, #eeeeee 36%, #d0d0d0 70%, #aaaaaa 100%)',
  charcoal: 'radial-gradient(circle at 34% 29%, #484848 0%, #242424 36%, #111111 70%, #030303 100%)',
}

const TCOLOR = { red: '#fff', white: '#b32d2d', charcoal: '#fff' }

/* --- Logic for Physics --- */
function BallField({ containerRef, onDone }) {
  const elsRef = useRef([])
  const rafRef = useRef(null)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const box = containerRef.current
    if (!box) return
    const W = box.offsetWidth
    const H = box.offsetHeight
    const engine = Engine.create({ gravity: { x: 0, y: 1.2 } })
    const boundaries = [
      Bodies.rectangle(W / 2, H + 20, W, 40, { isStatic: true }),
      Bodies.rectangle(-20, H / 2, 40, H, { isStatic: true }),
      Bodies.rectangle(W + 20, H / 2, 40, H, { isStatic: true }),
      Bodies.rectangle(W / 2, -20, W, 40, { isStatic: true })
    ]
    const bodies = BALLS.map((cfg) => Bodies.circle(W / 2, H / 2, cfg.size / 2, { restitution: 0.6 }))
    World.add(engine.world, [...boundaries, ...bodies])

    const run = () => {
      Engine.update(engine, 16.66)
      bodies.forEach((b, i) => {
        if (elsRef.current[i]) {
          elsRef.current[i].style.transform = `translate(${b.position.x - BALLS[i].size / 2}px, ${b.position.y - BALLS[i].size / 2}px) rotate(${b.angle}rad)`
        }
      })
      rafRef.current = requestAnimationFrame(run)
    }
    run()
    const timer = setTimeout(() => { setFading(true); setTimeout(onDone, 600) }, 3000)
    return () => { cancelAnimationFrame(rafRef.current); Engine.clear(engine); clearTimeout(timer) }
  }, [onDone])

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {BALLS.map((cfg, i) => (
        <div key={i} ref={el => elsRef.current[i] = el} style={{
          position: 'absolute', width: cfg.size, height: cfg.size, borderRadius: '50%',
          background: GRAD[cfg.color], opacity: fading ? 0 : 1, transition: 'opacity 0.6s',
          display: 'flex', alignItems: 'center', justifyContent: 'center', willChange: 'transform'
        }}>
          <span style={{ color: TCOLOR[cfg.color], fontSize: 10, fontWeight: 900 }}>{cfg.label}</span>
        </div>
      ))}
    </div>
  )
}

/* --- Simplified 3D Cube (No Framer Motion to avoid Hook Error) --- */
function ThemeCube({ bursting }) {
  const cubeRef = useRef(null)
  useEffect(() => {
    let rot = 0, raf
    const animate = () => {
      if (cubeRef.current && !bursting) {
        rot += 0.6
        cubeRef.current.style.transform = `rotateX(-20deg) rotateY(${rot}deg)`
      }
      raf = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(raf)
  }, [bursting])

  if (bursting) return null

  return (
    <div style={{ width: 160, height: 160, position: 'relative', transformStyle: 'preserve-3d', transition: 'opacity 0.3s' }} ref={cubeRef}>
      {['front', 'back', 'right', 'left', 'top', 'bottom'].map((face) => (
        <div key={face} className={`tcube-face tcube-${face}`} style={{
          position: 'absolute', width: 160, height: 160, background: '#0a0a0a', border: '1px solid #b32d2d',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900,
          backfaceVisibility: 'hidden'
        }}>{face.toUpperCase()}</div>
      ))}
    </div>
  )
}

const sections = [
  { id: 'tedx', eyebrow: 'About', title: <>What is <span style={{ color: '#b32d2d' }}>TEDx</span>?</>, visual: 'tedx' },
  { id: 'bbau', eyebrow: 'University', title: <>BBAU Lucknow</>, visual: 'bbau' },
  { id: 'tedxbbau', eyebrow: 'Event', title: <>What is <span style={{ color: '#b32d2d' }}>TEDxBBAU</span>?</>, visual: 'tedxbbau' }
]

export default function WhatIsTedx() {
  const [active, setActive] = useState(0)
  const [bursting, setBursting] = useState(false)
  const visualRef = useRef(null)

  return (
    <section style={{ background: '#000', padding: '80px 20px', display: 'flex', justifyContent: 'center' }}>
      <style>{`
        .tcube-front { transform: rotateY(0deg) translateZ(80px); }
        .tcube-back  { transform: rotateY(180deg) translateZ(80px); }
        .tcube-right { transform: rotateY(90deg) translateZ(80px); }
        .tcube-left  { transform: rotateY(-90deg) translateZ(80px); }
        .tcube-top    { transform: rotateX(90deg) translateZ(80px); }
        .tcube-bottom { transform: rotateX(-90deg) translateZ(80px); }
      `}</style>

      <div style={{ width: '100%', maxWidth: '1200px', border: '1.5px solid #b32d2d', background: '#050505', padding: '60px', position: 'relative' }}>
        <div style={{ display: 'flex', gap: '50px', alignItems: 'center' }}>
          
          <div style={{ flex: 1.2, height: '400px', background: '#0a0a0a', borderRadius: '12px', border: '1px solid #222', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }} ref={visualRef}>
            {active === 0 && <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(https://images.unsplash.com/photo-1505373633560-247b74681608?auto=format&fit=crop&q=80&w=1000)`, backgroundSize: 'cover', opacity: 0.4 }} />}
            {active === 1 && <img src={clgImage} alt="BBAU" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
            {active === 2 && (
              <div onDoubleClick={() => setBursting(true)} style={{ cursor: 'pointer', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ThemeCube bursting={bursting} />
                {bursting && <BallField containerRef={visualRef} onDone={() => setBursting(false)} />}
              </div>
            )}
          </div>

          <div style={{ flex: 1 }}>
            <p style={{ color: '#b32d2d', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '2px' }}>{sections[active].eyebrow}</p>
            <h2 style={{ color: '#fff', fontSize: '42px', margin: '15px 0' }}>{sections[active].title}</h2>
            <p style={{ color: '#888', lineHeight: '1.7' }}>Explore the vision of {sections[active].id === 'tedxbbau' ? 'TEDxBBAU' : 'our university'}.</p>
            <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
              {[0, 1, 2].map(i => (
                <div key={i} onClick={() => { setActive(i); setBursting(false); }} style={{ width: 12, height: 12, borderRadius: '50%', background: active === i ? '#b32d2d' : '#333', cursor: 'pointer' }} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}