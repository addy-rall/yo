import { useEffect, useState, useRef } from 'react'

// Asset Imports
import priyaImg from '../assets/img1.png'
import rahulImg from '../assets/img2.png'
import nadiaImg from '../assets/img3.png'
import arjunImg from '../assets/img4.png'
import image1 from '../assets/image1.png'
import imagk from '../assets/imgk.png'

const speakers = [
  { name: 'Dr. Vijendra Chauhan', role: 'role', org: 'org', img: arjunImg, color: '#c0392b', accent: '#e74c3c', initials: 'VC', bio: 'bio' },
  { name: 'Dr. Gajendra Purohit', role: 'role', org: 'org', img: nadiaImg, color: '#6c3483', accent: '#9b59b6', initials: 'GP', bio: 'bio' },
  { name: 'Dr. Yogeshwar Nath', role: 'role', org: 'org', img: rahulImg, color: '#0e6655', accent: '#1abc9c', initials: 'S3', bio: 'bio' },
  { name: 'Mr. Aditya Ranjan', role: 'role', org: 'org', img: priyaImg , color: '#6f8c50', accent: '#729048', initials: 'S5', bio: 'bio' },
  { name: 'Mr. Deepak Wadhwa', role: 'role', org: 'org', img: image1, color: '#784212', accent: '#e67e22', initials: 'S4', bio: 'bio' },
  
  { name: 'Mr. Kiran Kumar', role: 'role', org: 'org', img: imagk, color: '#974b8f', accent: '#9b549e', initials: 'S6', bio: 'bio' },
  { name: 'Mr. Debojit Sen ', role: 'role', org: 'org', img: imagk, color: '#974b8f', accent: '#9b549e', initials: 'S6', bio: 'bio' }
]

export default function FeaturedSpeakers() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [flippedCards, setFlippedCards] = useState({})
  const touchStart = useRef(null)
  const touchEnd = useRef(null)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const total = speakers.length
  const desktopVisible = 4

  const handleNext = () => {
    setFlippedCards({})
    setCurrentIndex((prev) => (prev + 1) % total)
  }

  const handlePrev = () => {
    setFlippedCards({})
    setCurrentIndex((prev) => (prev - 1 + total) % total)
  }

  const onTouchStart = (e) => (touchStart.current = e.targetTouches[0].clientX)
  const onTouchMove = (e) => (touchEnd.current = e.targetTouches[0].clientX)
  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return
    const distance = touchStart.current - touchEnd.current
    if (distance > 50) handleNext()
    if (distance < -50) handlePrev()
    touchStart.current = null
    touchEnd.current = null
  }

  const toggleFlip = (index) => {
    setFlippedCards(prev => ({ ...prev, [index]: !prev[index] }))
  }

  const getVisibleSpeakers = () => {
    if (isMobile) return [{ ...speakers[currentIndex], globalIdx: currentIndex }]
    let items = []
    for (let i = 0; i < desktopVisible; i++) {
      items.push({ ...speakers[(currentIndex + i) % total], globalIdx: (currentIndex + i) % total })
    }
    return items
  }

  const styles = {
    section: { padding: isMobile ? '60px 0' : '80px 0', background: '#0a0a0a', color: '#fff', fontFamily: "'Poppins', sans-serif", overflow: 'hidden' },
    inner: { maxWidth: '1440px', margin: '0 auto', padding: '0 20px' },
    header: { textAlign: 'center', marginBottom: isMobile ? '2.5rem' : '4rem' },
    eyebrow: { color: '#888', fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '10px', fontWeight: '600', display: 'block' },
    title: { fontSize: isMobile ? '2rem' : '3.5rem', fontWeight: '900', color: '#e0e0e0', margin: 0, lineHeight: 1.1 },
    layoutWrapper: { display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', justifyContent: 'center', gap: isMobile ? '0' : '30px' },
    stage: { display: 'flex', gap: '20px', justifyContent: 'center' },
    card: { width: isMobile ? '290px' : '280px', height: isMobile ? '430px' : '420px', perspective: '1200px', cursor: 'pointer', position: 'relative' },
    cardInner: (id) => ({
      position: 'relative', width: '100%', height: '100%', transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      transformStyle: 'preserve-3d', transform: flippedCards[id] ? 'rotateY(180deg)' : 'rotateY(0deg)'
    }),
    face: { position: 'absolute', inset: 0, backfaceVisibility: 'hidden', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.1)' },
    front: { background: '#161616', display: 'flex', flexDirection: 'column' },
    photoArea: { position: 'relative', height: isMobile ? '310px' : '320px', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
    img: {
      width: '100%', height: '100%', objectFit: 'cover', 
      transition: 'filter 0.6s ease, transform 0.6s ease',
      // Inline filter only applied for mobile view logic
      filter: isMobile ? 'grayscale(0%)' : 'grayscale(100%)'
    },
    initials: (color) => ({ position: 'absolute', fontSize: '6rem', fontWeight: '900', color: color, opacity: 0.15 }),
    nameplate: { background: '#1c1c1c', padding: '15px' },
    nameplateBar: (color, accent) => ({ height: '4px', background: `linear-gradient(90deg, ${color}, ${accent})` }),
    back: (color) => ({ background: color, transform: 'rotateY(180deg)', padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }),
    arrow: { 
      width: '50px', height: '50px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)',
      background: 'rgba(255,255,255,0.05)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' 
    },
    mobileControls: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginTop: '25px' },
    dot: (active) => ({ width: '8px', height: '8px', borderRadius: '50%', background: active ? '#d82020' : '#333', transition: '0.3s' }),
    mobileBioBox: {
      marginTop: '20px', background: '#1a1a1a', padding: '15px', borderRadius: '8px',
      width: '290px', borderLeft: '4px solid #d82020', textAlign: 'left', animation: 'fadeIn 0.5s ease'
    }
  }

  return (
    <section style={styles.section} className="speakers-section">
      <div style={styles.inner}>
        
        <div style={styles.header}>
          <span style={styles.eyebrow}>Lineup 2026</span>
          <h2 style={styles.title}>Meet The <span style={{ color: '#d82020' }}>Speakers</span></h2>
        </div>

        <div style={styles.layoutWrapper}>
          
          {!isMobile && <button style={styles.arrow} onClick={handlePrev}>←</button>}

          <div 
            style={styles.stage}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {getVisibleSpeakers().map((s) => (
              <div key={s.globalIdx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div 
                  style={styles.card}
                  className="speaker-card"
                  onClick={() => toggleFlip(s.globalIdx)}
                >
                  <div style={styles.cardInner(s.globalIdx)}>
                    {/* FRONT */}
                    <div style={{ ...styles.face, ...styles.front }}>
                      <div style={styles.photoArea}>
                        <img src={s.img} alt={s.name} style={styles.img} className="sp-img" />
                        <div style={styles.initials(s.color)}>{s.initials}</div>
                      </div>
                      <div style={styles.nameplate}>
                        <strong style={{ display: 'block', fontSize: '1rem' }}>{s.name}</strong>
                        <em style={{ fontSize: '0.7rem', color: '#888', fontStyle: 'normal', textTransform: 'uppercase' }}>{s.role}</em>
                      </div>
                      <div style={styles.nameplateBar(s.color, s.accent)} />
                    </div>

                    {/* BACK */}
                    <div style={{ ...styles.face, ...styles.back(s.color) }}>
                      <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 5px' }}>{s.name}</h3>
                      <p style={{ fontSize: '0.8rem', opacity: 0.8, textTransform: 'uppercase', marginBottom: '15px' }}>{s.role} @ {s.org}</p>
                      <div style={{ width: '40px', height: '3px', background: '#fff', marginBottom: '15px' }} />
                      <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#eee' }}>{s.bio}</p>
                    </div>
                  </div>
                </div>

                {isMobile && !flippedCards[s.globalIdx] && (
                  <div style={styles.mobileBioBox}>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#bbb', lineHeight: '1.4' }}>
                      <strong>About:</strong> {s.bio}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {!isMobile && <button style={styles.arrow} onClick={handleNext}>→</button>}

          {isMobile && (
            <div style={styles.mobileControls}>
              <button style={{ ...styles.arrow, width: '40px', height: '40px' }} onClick={handlePrev}>←</button>
              <div style={{ display: 'flex', gap: '8px' }}>
                {speakers.map((_, i) => (
                  <div key={i} style={styles.dot(currentIndex === i)} onClick={() => setCurrentIndex(i)} />
                ))}
              </div>
              <button style={{ ...styles.arrow, width: '40px', height: '40px' }} onClick={handleNext}>→</button>
            </div>
          )}

        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        
        /* Desktop Hover Effect */
        @media (min-width: 769px) {
          .speaker-card:hover .sp-img {
            filter: grayscale(0%) !important;
            transform: scale(1.05);
          }
        }

        .speakers-section * { transition: all 0.3s ease; }
        .sp-img { transition: filter 0.6s ease, transform 0.6s ease !important; }
      `}</style>
    </section>
  )
}