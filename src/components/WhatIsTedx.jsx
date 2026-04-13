import { useEffect, useRef, useState, useCallback } from 'react'
import clgImage from '../assets/clg.png'

const VIDEO_ID = 'd0NHOpeczUU'

// --- UPGRADED 3D CUBE (matching the image style) ---
function ThemeCube({ isMobile }) {
  const sceneRef = useRef(null)
  const cubeRef = useRef(null)
  const [burst, setBurst] = useState(false)

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return
    let baseY = -30, tx = 0, ty = 0, sx = 0, sy = 0

    const updateTilt = (clientX, clientY) => {
      const r = scene.getBoundingClientRect()
      tx = Math.max(-1, Math.min(1, ((clientX - (r.left + r.width / 2)) / window.innerWidth) * 2.5))
      ty = Math.max(-1, Math.min(1, ((clientY - (r.top + r.height / 2)) / window.innerHeight) * 2.5))
    }

    const onMove = e => updateTilt(e.clientX, e.clientY)
    const onTouch = e => {
      e.preventDefault()
      updateTilt(e.touches[0].clientX, e.touches[0].clientY)
    }
    const onTouchEnd = () => { tx = 0; ty = 0 }

    window.addEventListener('mousemove', onMove, { passive: true })
    scene.addEventListener('touchmove', onTouch, { passive: false })
    scene.addEventListener('touchend', onTouchEnd, { passive: true })
    scene.addEventListener('touchcancel', onTouchEnd, { passive: true })

    let raf
    const tick = () => {
      raf = requestAnimationFrame(tick)
      const cube = cubeRef.current
      if (!cube) return
      baseY += 0.28; sx += (tx - sx) * 0.055; sy += (ty - sy) * 0.055
      cube.style.transform = `rotateX(${-22 + sy * -35}deg) rotateY(${baseY + sx * 55}deg)`
    }
    tick()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      scene.removeEventListener('touchmove', onTouch)
      scene.removeEventListener('touchend', onTouchEnd)
      scene.removeEventListener('touchcancel', onTouchEnd)
    }
  }, [])

  const handleDoubleClick = () => {
    setBurst(true)
    setTimeout(() => setBurst(false), 800)
  }

  const size = isMobile ? 130 : 190
  const tz = size / 2

  const face = (transform, children, extraStyle = {}) => ({
    style: {
      position: 'absolute',
      width: `${size}px`,
      height: `${size}px`,
      border: '1.5px solid rgba(200, 40, 40, 0.75)',
      background: 'rgba(6, 6, 6, 0.97)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backfaceVisibility: 'visible',
      boxShadow: 'inset 0 0 25px rgba(179,45,45,0.18), 0 0 12px rgba(179,45,45,0.15)',
      transform,
      ...extraStyle
    },
    children
  })

  const mono = { fontFamily: '"Courier New", Courier, monospace' }
  const poppins = { fontFamily: 'Poppins, sans-serif' }
  const white = { color: '#fff' }
  const red = { color: '#c82828' }

  // Scan-line overlay
  const scanLines = (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.18) 3px, rgba(0,0,0,0.18) 4px)',
      zIndex: 2
    }} />
  )

  // Corner brackets
  const corners = (
    <>
      {[['0','0','right','bottom'],['0','auto','right','top'],['auto','0','left','bottom'],['auto','auto','left','top']].map(([b,r,bw,rw],i) => (
        <div key={i} style={{
          position:'absolute',
          [b==='0'?'bottom':'top']: '6px',
          [r==='0'?'right':'left']: '6px',
          width:'14px', height:'14px',
          borderBottom: b==='0' ? '1.5px solid rgba(200,40,40,0.7)' : 'none',
          borderTop: b!=='0' ? '1.5px solid rgba(200,40,40,0.7)' : 'none',
          borderRight: r==='0' ? '1.5px solid rgba(200,40,40,0.7)' : 'none',
          borderLeft: r!=='0' ? '1.5px solid rgba(200,40,40,0.7)' : 'none',
          zIndex: 3
        }} />
      ))}
    </>
  )

  const faces = [
    // FRONT: BBAU main face
    face(`rotateY(0deg) translateZ(${tz}px)`, (
      <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-start', padding:'14px', width:'100%', height:'100%', position:'relative', boxSizing:'border-box' }}>
        {scanLines}{corners}
        <span style={{ ...mono, color:'#888', fontSize: isMobile ? '8px':'10px', letterSpacing:'2px', marginBottom:'auto' }}>EST. 2024</span>
        <div>
          <div style={{ ...poppins, ...white, fontWeight:'900', fontSize: isMobile ? '36px':'52px', lineHeight:1, WebkitTextStroke:'1.5px #fff', color:'transparent', letterSpacing:'-1px' }}>BBAU</div>
          <div style={{ ...mono, color:'#999', fontSize: isMobile ? '7px':'9px', letterSpacing:'2px', marginTop:'4px' }}>BABASAHEB BHIMRAO</div>
          <div style={{ ...mono, color:'#999', fontSize: isMobile ? '7px':'9px', letterSpacing:'2px' }}>AMBEDKAR UNIVERSITY</div>
        </div>
      </div>
    )),
    // BACK
    face(`rotateY(180deg) translateZ(${tz}px)`, (
      <div style={{ position:'relative', width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center' }}>
        {scanLines}{corners}
        <div style={{ ...poppins, ...white, fontWeight:'900', fontSize: isMobile ? '20px':'28px', textAlign:'center' }}>
          TED<span style={{ color:'#c82828' }}>x</span><br/>
          <span style={{ fontSize: isMobile ? '13px':'18px', color:'#777', fontWeight:'400', ...mono }}>BBAU LUCKNOW</span>
        </div>
      </div>
    )),
    // RIGHT
    face(`rotateY(90deg) translateZ(${tz}px)`, (
      <div style={{ position:'relative', width:'100%', height:'100%', display:'flex', flexDirection:'column', alignItems:'flex-start', justifyContent:'flex-end', padding:'12px', boxSizing:'border-box' }}>
        {scanLines}{corners}
        <div style={{ ...mono, color:'#c82828', fontSize: isMobile ? '9px':'11px', letterSpacing:'3px', writingMode:'horizontal-tb', marginBottom:'6px' }}>DISRUPT · DECODE</div>
        <div style={{ ...poppins, ...red, fontWeight:'900', fontSize: isMobile ? '28px':'40px', lineHeight:0.9 }}>DIS-<br/>RUPT</div>
      </div>
    )),
    // LEFT
    face(`rotateY(-90deg) translateZ(${tz}px)`, (
      <div style={{ position:'relative', width:'100%', height:'100%', display:'flex', flexDirection:'column', alignItems:'flex-end', justifyContent:'flex-start', padding:'12px', boxSizing:'border-box' }}>
        {scanLines}{corners}
        <div style={{ ...poppins, ...white, fontWeight:'900', fontSize: isMobile ? '28px':'40px', lineHeight:0.9, textAlign:'right' }}>DE<br/>CODE</div>
        <div style={{ ...mono, color:'#555', fontSize: isMobile ? '8px':'10px', letterSpacing:'2px', marginTop:'auto' }}>2026</div>
      </div>
    )),
    // TOP: "IDEAS WORTH SPREADING"
    face(`rotateX(90deg) translateZ(${tz}px)`, (
      <div style={{ position:'relative', width:'100%', height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
        {scanLines}{corners}
        <div style={{ ...mono, color:'#c82828', fontSize: isMobile ? '9px':'12px', letterSpacing:'3px', textAlign:'center', lineHeight:1.6 }}>
          IDEAS WORTH<br/>SPREADING
        </div>
        <div style={{ ...poppins, ...white, fontWeight:'900', fontSize: isMobile ? '28px':'42px', marginTop:'6px' }}>2026</div>
      </div>
    )),
    // BOTTOM: SEASON
    face(`rotateX(-90deg) translateZ(${tz}px)`, (
      <div style={{ position:'relative', width:'100%', height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
        {scanLines}{corners}
        <div style={{ ...mono, color:'#555', fontSize: isMobile ? '9px':'11px', letterSpacing:'4px' }}>SEASON</div>
        <div style={{ ...mono, color:'#c82828', fontSize: isMobile ? '24px':'36px', fontWeight:'bold' }}>01</div>
        <div style={{ ...mono, color:'#444', fontSize: isMobile ? '7px':'9px', letterSpacing:'3px' }}>LKO · INDIA</div>
      </div>
    )),
  ]

  return (
    <div ref={sceneRef} style={{ width:'100%', height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', perspective:'1000px', touchAction:'none' }}>
      <div
        ref={cubeRef}
        onDoubleClick={handleDoubleClick}
        style={{
          width:`${size}px`, height:`${size}px`, position:'relative',
          transformStyle:'preserve-3d', willChange:'transform', cursor:'pointer',
          transition: burst ? 'transform 0.1s' : 'none',
          filter: burst ? 'brightness(2) saturate(2)' : 'none',
          animation: burst ? 'none' : undefined
        }}
      >
        {faces.map((f, i) => (
          <div key={i} style={f.style}>{f.children}</div>
        ))}
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
    <div style={{ position:'relative', width:'100%', height:'100%', background:'#000', borderRadius:'12px', overflow:'hidden' }}>
      {!playing ? (
        <div onClick={() => setPlaying(true)} style={{ cursor:'pointer', height:'100%' }}>
          <img src={thumb} alt="TEDx" style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(0.4)' }} />
          <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <div style={{ width: isMobile ? '50px':'70px', height: isMobile ? '50px':'70px', borderRadius:'50%', background:'#b32d2d', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 0 30px rgba(179,45,45,0.5)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21" /></svg>
            </div>
          </div>
        </div>
      ) : (
        <>
          <iframe ref={iframeRef} src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1`} title="TEDx" allow="autoplay; encrypted-media" allowFullScreen style={{ width:'100%', height:'100%', border:'none' }} />
          <button onClick={handlePause} style={{ position:'absolute', top:'10px', right:'10px', background:'rgba(0,0,0,0.8)', border:'1px solid #444', color:'#fff', borderRadius:'50%', width:'32px', height:'32px', cursor:'pointer', zIndex:10 }}>✕</button>
        </>
      )}
    </div>
  )
}

const sections = [
  { id:'tedx', eyebrow:'About', title:<>What is <span style={{ color:'#b32d2d' }}>TEDx</span>?</>, desc:['TEDx is a global initiative designed to bring the spirit of TED to local communities.','Organized independently, these events spark meaningful conversations.'], pills:['Technology','Entertainment','Design'], visual:'tedx' },
  { id:'bbau', eyebrow:'The University', title:<>BBAU Lucknow</>, desc:['Babasaheb Bhimrao Ambedkar University is a central university in Lucknow.','Established in 1996, it stands as a beacon of research and social justice.'], pills:['Central University','Lucknow'], visual:'bbau' },
  { id:'tedxbbau', eyebrow:'Our Event', title:<>What is <span style={{ color:'#b32d2d' }}>TEDxBBAU</span>?</>, desc:['TEDxBBAU brings the TED spirit to BBAU Lucknow.','We focus on sharing powerful ideas from change-makers that resonate far beyond the campus.'], pills:['Innovation','Community'], visual:'tedxbbau' }
]

export default function WhatIsTedx() {
  const [active, setActive] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Touch swipe state
  const touchStartX = useRef(null)
  const touchStartY = useRef(null)
  const isDragging = useRef(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const goNext = useCallback(() => setActive(a => (a + 1) % sections.length), [])
  const goPrev = useCallback(() => setActive(a => (a - 1 + sections.length) % sections.length), [])

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    isDragging.current = false
  }

  const onTouchMove = (e) => {
    if (touchStartX.current === null) return
    const dx = e.touches[0].clientX - touchStartX.current
    const dy = e.touches[0].clientY - touchStartY.current
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
      isDragging.current = true
    }
  }

  const onTouchEnd = (e) => {
    if (!isDragging.current || touchStartX.current === null) {
      touchStartX.current = null
      return
    }
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (dx < -40) goNext()
    else if (dx > 40) goPrev()
    touchStartX.current = null
    isDragging.current = false
  }

  const styles = {
    wrapper: { background:'#000', padding: isMobile ? '40px 10px':'100px 20px', display:'flex', justifyContent:'center' },
    container: { position:'relative', width:'100%', maxWidth:'1200px', border:'1.5px solid #b32d2d', background:'#050505', padding: isMobile ? '40px 15px':'80px 60px', overflow:'hidden', boxShadow:'0 0 40px rgba(179,45,45,0.1)' },
    sliderTrack: { display:'flex', transition:'transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)', width:`${sections.length * 100}%`, transform:`translateX(-${active * (100 / sections.length)}%)` },
    panel: { width:`${100 / sections.length}%`, display:'flex', flexDirection: isMobile ? 'column':'row', gap: isMobile ? '40px':'70px', alignItems:'center', boxSizing:'border-box' },
    visualWrap: { flex:1.2, width:'100%', height: isMobile ? '300px':'420px', borderRadius:'12px', overflow:'hidden', background:'#0a0a0a', border:'1px solid #222' },
    textWrap: { flex:1, textAlign: isMobile ? 'center':'left' },
    arrow: (side) => ({ position:'absolute', top:'50%', transform:'translateY(-50%)', background:'rgba(10,10,10,0.8)', border:'1px solid #b32d2d', color:'#fff', width:'50px', height:'50px', borderRadius:'50%', cursor:'pointer', zIndex:10, [side==='L'?'left':'right']:'15px', display: isMobile ? 'none':'flex', alignItems:'center', justifyContent:'center' })
  }

  const visuals = {
    tedx: () => <TedxVisual isMobile={isMobile} />,
    bbau: () => <img src={clgImage} alt="BBAU Lucknow" style={{ width:'100%', height:'100%', objectFit:'cover' }} />,
    tedxbbau: () => <ThemeCube isMobile={isMobile} />
  }

  return (
    <section style={styles.wrapper} id="this">
      <div style={styles.container}>
        <button style={styles.arrow('L')} onClick={goPrev}>←</button>
        <button style={styles.arrow('R')} onClick={goNext}>→</button>

        {/* Swipeable track */}
        <div
          style={{ overflow:'hidden', touchAction:'pan-y' }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div style={styles.sliderTrack}>
            {sections.map((s) => {
              const Visual = visuals[s.visual]
              return (
                <div key={s.id} style={styles.panel}>
                  <div style={styles.visualWrap}><Visual /></div>
                  <div style={styles.textWrap}>
                    <p style={{ color:'#b32d2d', textTransform:'uppercase', fontSize:'13px', letterSpacing:'3px', fontWeight:'600', marginBottom:'10px' }}>{s.eyebrow}</p>
                    <h2 style={{ color:'#fff', fontSize: isMobile ? '32px':'48px', fontWeight:'800', margin:'0 0 20px', fontFamily:'Poppins, sans-serif' }}>{s.title}</h2>
                    {s.desc.map((d, i) => <p key={i} style={{ color:'#aaa', fontSize:'16px', lineHeight:'1.8', marginBottom:'20px' }}>{d}</p>)}
                    <div style={{ display:'flex', gap:'12px', justifyContent: isMobile ? 'center':'flex-start', flexWrap:'wrap', marginTop:'10px' }}>
                      {s.pills.map(p => <span key={p} style={{ border:'1px solid #333', padding:'6px 16px', borderRadius:'30px', color:'#b32d2d', fontSize:'12px', fontWeight:'600', background:'#000' }}>{p}</span>)}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Dot indicators — tap to jump on mobile */}
        <div style={{ display:'flex', gap:'12px', justifyContent:'center', marginTop: isMobile ? '40px':'60px' }}>
          {sections.map((_, i) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              style={{ width: i === active ? '28px':'12px', height:'12px', borderRadius:'6px', background: i === active ? '#b32d2d':'#333', cursor:'pointer', transition:'all 0.3s' }}
            />
          ))}
        </div>

        {/* Mobile swipe hint — shown only once */}
        {isMobile && (
          <p style={{ textAlign:'center', color:'#444', fontSize:'11px', letterSpacing:'2px', fontFamily:'"Courier New", monospace', marginTop:'16px', textTransform:'uppercase' }}>
            ← swipe to explore →
          </p>
        )}
      </div>
    </section>
  )
}
