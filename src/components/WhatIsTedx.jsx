import { useEffect, useRef, useState } from 'react'
import clgImage from '../assets/clg.png' // Importing your provided image

const VIDEO_ID = 'd0NHOpeczUU'

// --- 3D CUBE COMPONENT ---
function ThemeCube({ isMobile }) {
  const sceneRef = useRef(null)
  const cubeRef = useRef(null)

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return
    let baseY = -30, tx = 0, ty = 0, sx = 0, sy = 0
    
    const onMove = e => {
      const r = scene.getBoundingClientRect()
      tx = Math.max(-1, Math.min(1, ((e.clientX - (r.left + r.width / 2)) / window.innerWidth) * 2.5))
      ty = Math.max(-1, Math.min(1, ((e.clientY - (r.top + r.height / 2)) / window.innerHeight) * 2.5))
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    
    let raf
    const tick = () => {
      raf = requestAnimationFrame(tick)
      const cube = cubeRef.current
      if (!cube) return
      baseY += 0.28; sx += (tx - sx) * .055; sy += (ty - sy) * .055
      cube.style.transform = `rotateX(${-22 + sy * -35}deg) rotateY(${baseY + sx * 55}deg)`
    }
    tick()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  const size = isMobile ? 120 : 180 
  const translateZ = size / 2

  const faceStyle = (transform) => ({
    position: 'absolute',
    width: `${size}px`,
    height: `${size}px`,
    border: '1px solid rgba(179, 45, 45, 0.6)',
    background: 'rgba(5, 5, 5, 0.95)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'visible',
    boxShadow: 'inset 0 0 30px rgba(179, 45, 45, 0.2)',
    transform
  })

  const textStyle = { 
    color: '#fff', 
    fontWeight: '900', 
    fontSize: isMobile ? '20px' : '28px', 
    textAlign: 'center', 
    lineHeight: 1,
    fontFamily: 'Poppins, sans-serif'
  }
  
  const redText = { ...textStyle, color: '#b32d2d' }

  return (
    <div ref={sceneRef} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '1000px' }}>
      <div ref={cubeRef} style={{ width: `${size}px`, height: `${size}px`, position: 'relative', transformStyle: 'preserve-3d', willChange: 'transform' }}>
        <div style={faceStyle(`rotateY(0deg) translateZ(${translateZ}px)`)}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={textStyle}>TED<span style={{ color: '#b32d2d' }}>x</span></span>
            <span style={{ ...textStyle, WebkitTextStroke: '1px white', color: 'transparent' }}>BBAU</span>
          </div>
        </div>
        <div style={faceStyle(`rotateY(180deg) translateZ(${translateZ}px)`)}>
          <span style={{ ...textStyle, border: '1px solid white', padding: '4px 8px', fontSize: isMobile ? '16px' : '22px' }}>BBAU</span>
        </div>
        <div style={faceStyle(`rotateY(90deg) translateZ(${translateZ}px)`)}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={redText}>DIS-</span><span style={redText}>RUPT</span>
          </div>
        </div>
        <div style={faceStyle(`rotateY(-90deg) translateZ(${translateZ}px)`)}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={textStyle}>DE</span><span style={textStyle}>CODE</span>
          </div>
        </div>
        <div style={faceStyle(`rotateX(90deg) translateZ(${translateZ}px)`)}>
          <span style={{ ...textStyle, fontSize: isMobile ? '30px' : '48px', opacity: 0.8 }}>2026</span>
        </div>
        <div style={faceStyle(`rotateX(-90deg) translateZ(${translateZ}px)`)}>
          <span style={{ ...redText, letterSpacing: '4px' }}>LKO</span>
        </div>
      </div>
    </div>
  )
}

// --- VIDEO COMPONENT ---
function TedxVisual({ isMobile }) {
  const [playing, setPlaying] = useState(false)
  const iframeRef = useRef(null)
  const thumb = `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`

  const handlePause = () => {
    setPlaying(false)
    if (iframeRef.current) iframeRef.current.src = iframeRef.current.src
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: '#000', borderRadius: '12px', overflow: 'hidden' }}>
      {!playing ? (
        <div onClick={() => setPlaying(true)} style={{ cursor: 'pointer', height: '100%' }}>
          <img src={thumb} alt="TEDx" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.4)' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: isMobile ? '50px' : '70px', height: isMobile ? '50px' : '70px', borderRadius: '50%', background: '#b32d2d', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(179,45,45,0.5)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21" /></svg>
            </div>
          </div>
        </div>
      ) : (
        <>
          <iframe ref={iframeRef} src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1`} title="TEDx" allow="autoplay; encrypted-media" allowFullScreen style={{ width: '100%', height: '100%', border: 'none' }} />
          <button onClick={handlePause} style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.8)', border: '1px solid #444', color: '#fff', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', zIndex: 10 }}>✕</button>
        </>
      )}
    </div>
  )
}

const sections = [
  { id: 'tedx', eyebrow: 'About', title: <>What is <span style={{ color: '#b32d2d' }}>TEDx</span>?</>, desc: ['TEDx is a global initiative designed to bring the spirit of TED to local communities.', 'Organized independently, these events spark meaningful conversations.'], pills: ['Technology', 'Entertainment', 'Design'], visual: 'tedx' },
  { id: 'bbau', eyebrow: 'The University', title: <>BBAU Lucknow</>, desc: ['Babasaheb Bhimrao Ambedkar University is a central university in Lucknow.', 'Established in 1996, it stands as a beacon of research and social justice.'], pills: ['Central University', 'Lucknow'], visual: 'bbau' },
  { id: 'tedxbbau', eyebrow: 'Our Event', title: <>What is <span style={{ color: '#b32d2d' }}>TEDxBBAU</span>?</>, desc: ['TEDxBBAU brings the TED spirit to BBAU Lucknow.', 'We focus on sharing powerful ideas from change-makers that resonate far beyond the campus.'], pills: ['Innovation', 'Community'], visual: 'tedxbbau' }
]

export default function WhatIsTedx() {
  const [active, setActive] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile(); window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const styles = {
    wrapper: { background: '#000', padding: isMobile ? '40px 10px' : '100px 20px', display: 'flex', justifyContent: 'center' },
    container: { position: 'relative', width: '100%', maxWidth: '1200px', border: '1.5px solid #b32d2d', background: '#050505', padding: isMobile ? '40px 15px' : '80px 60px', overflow: 'hidden', boxShadow: '0 0 40px rgba(179,45,45,0.1)' },
    sliderTrack: { display: 'flex', transition: 'transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)', width: `${sections.length * 100}%`, transform: `translateX(-${active * (100 / sections.length)}%)` },
    panel: { width: `${100 / sections.length}%`, display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '40px' : '70px', alignItems: 'center', boxSizing: 'border-box' },
    visualWrap: { flex: 1.2, width: '100%', height: isMobile ? '280px' : '420px', borderRadius: '12px', overflow: 'hidden', background: '#0a0a0a', border: '1px solid #222' },
    textWrap: { flex: 1, textAlign: isMobile ? 'center' : 'left' },
    arrow: (side) => ({ position: 'absolute', top: '50%', transform: 'translateY(-50%)', background: 'rgba(10, 10, 10, 0.8)', border: '1px solid #b32d2d', color: '#fff', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', zIndex: 10, [side === 'L' ? 'left' : 'right']: '15px', display: isMobile ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center' })
  }

  const visuals = {
    tedx: () => <TedxVisual isMobile={isMobile} />,
    bbau: () => <img src={clgImage} alt="BBAU Lucknow" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />,
    tedxbbau: () => <ThemeCube isMobile={isMobile} />
  }

  return (
    <section style={styles.wrapper} id='this'>
      <div style={styles.container}>
        <button style={styles.arrow('L')} onClick={() => setActive((active - 1 + sections.length) % sections.length)}>←</button>
        <button style={styles.arrow('R')} onClick={() => setActive((active + 1) % sections.length)}>→</button>

        <div style={{ overflow: 'hidden' }}>
          <div style={styles.sliderTrack}>
            {sections.map((s) => {
              const Visual = visuals[s.visual]
              return (
                <div key={s.id} style={styles.panel}>
                  <div style={styles.visualWrap}><Visual /></div>
                  <div style={styles.textWrap}>
                    <p style={{ color: '#b32d2d', textTransform: 'uppercase', fontSize: '13px', letterSpacing: '3px', fontWeight: '600', marginBottom: '10px' }}>{s.eyebrow}</p>
                    <h2 style={{ color: '#fff', fontSize: isMobile ? '32px' : '48px', fontWeight: '800', margin: '0 0 20px', fontFamily: 'Poppins, sans-serif' }}>{s.title}</h2>
                    {s.desc.map((d, i) => <p key={i} style={{ color: '#aaa', fontSize: '16px', lineHeight: '1.8', marginBottom: '20px' }}>{d}</p>)}
                    <div style={{ display: 'flex', gap: '12px', justifyContent: isMobile ? 'center' : 'flex-start', flexWrap: 'wrap', marginTop: '10px' }}>
                      {s.pills.map(p => <span key={p} style={{ border: '1px solid #333', padding: '6px 16px', borderRadius: '30px', color: '#b32d2d', fontSize: '12px', fontWeight: '600', background: '#000' }}>{p}</span>)}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: isMobile ? '40px' : '60px' }}>
          {sections.map((_, i) => (
            <div key={i} onClick={() => setActive(i)} style={{ width: '12px', height: '12px', borderRadius: '50%', background: i === active ? '#b32d2d' : '#333', cursor: 'pointer', transition: '0.3s' }} />
          ))}
        </div>
      </div>
    </section>
  )
}