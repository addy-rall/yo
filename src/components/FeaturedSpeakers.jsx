import { useEffect, useState, useRef } from 'react'

import priyaImg from '../assets/img1.png'
import rahulImg from '../assets/img2.png'
import nadiaImg from '../assets/img3.png'
import arjunImg from '../assets/img4.png'
import image1 from '../assets/image1.png'
import imagk from '../assets/imgk.png'
import kyu from '../assets/w.png'

const speakers = [
  { name: 'Dr. Vijendra Chauhan', role: 'AI Researcher', org: 'IIT Delhi', img: arjunImg, color: '#c0392b', accent: '#e74c3c', initials: 'VC', bio: 'A pioneering researcher in ethical AI with 15+ years of experience at leading tech institutions.', instagram: 'https://www.instagram.com/masijeevi/' },
  { name: 'Dr. Gajendra Purohit', role: 'Entrepreneur', org: 'FutureTech Labs', img: nadiaImg, color: '#6c3483', accent: '#9b59b6', initials: 'GP', bio: 'Serial entrepreneur and author. Mentored 8,000+ students through startup programmes.', instagram: 'https://www.instagram.com/dr.gajendrapurohit' },
  { name: 'Dr. Yogeshwar Nath Mishra', role: 'Assistant Professor & Scientist at NASA', org: 'IIT Jodhpur', img: rahulImg, color: '#0e6655', accent: '#1abc9c', initials: 'YM', bio: 'Renowned for research on memory. TED talk has over 4 million views.', instagram: 'https://www.instagram.com/yogeshwar.space/' },
  { name: 'Mr. Aditya Ranjan', role: 'Climate Activist', org: 'GreenFuture India', img: priyaImg, color: '#6f8c50', accent: '#729048', initials: 'AR', bio: "Named one of Forbes 30 Under 30 for his environmental movement work.", instagram: 'https://www.instagram.com/aditya___ranjan/' },
  { name: 'Mr. Deepak Wadhwa', role: 'Innovator', org: 'Org 5', img: image1, color: '#784212', accent: '#e67e22', initials: 'DW', bio: 'Leading breakthroughs in sustainable energy and modular design.', instagram: 'https://www.instagram.com/thedeeptalks.official/' },
  { name: 'Mr. Kiran Kumar', role: 'Tech Evangelist', org: 'Org 6', img: imagk, color: '#974b8f', accent: '#9b549e', initials: 'KK', bio: 'Specialist in decentralized networks and the future of digital identity.', instagram: 'https://www.instagram.com/kiran_sidde/' },
  { name: 'Mr. Debojit Sen', role: 'Founder & CEO, Crack-ED', org: 'Crack-ED', img: kyu, color: '#1a5276', accent: '#2e86c1', initials: 'DS', bio: "Founder & CEO of Crack-ED, building job-ready education at scale. Backed by CarDekho Group, recipient of BW Disrupt 40 Under 40 Award.", instagram: null },
]

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.974-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.516 2.497 5.783 2.225 7.15 2.163 8.416 2.105 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.013 8.332 0 8.741 0 12c0 3.259.013 3.668.072 4.948.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.987 8.741 24 12 24c3.259 0 3.668-.013 4.948-.072 1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038.059-1.28.072-1.689.072-4.948 0-3.259-.013-3.668-.072-4.948-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
)

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

  const handleNext = () => { setFlippedCards({}); setCurrentIndex((prev) => (prev + 1) % total) }
  const handlePrev = () => { setFlippedCards({}); setCurrentIndex((prev) => (prev - 1 + total) % total) }

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

  const toggleFlip = (index) => setFlippedCards(prev => ({ ...prev, [index]: !prev[index] }))

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
      position: 'relative', width: '100%', height: '100%',
      transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      transformStyle: 'preserve-3d',
      transform: flippedCards[id] ? 'rotateY(180deg)' : 'rotateY(0deg)'
    }),
    face: { position: 'absolute', inset: 0, backfaceVisibility: 'hidden', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' },
    front: { background: '#161616', display: 'flex', flexDirection: 'column' },
    photoArea: { position: 'relative', height: isMobile ? '300px' : '310px', background: '#111', overflow: 'hidden' },
    img: { width: '100%', height: '100%', objectFit: 'cover', transition: 'filter 0.6s ease, transform 0.6s ease', filter: 'grayscale(100%)' },
    initials: (color) => ({ position: 'absolute', fontSize: '6rem', fontWeight: '900', color: color, opacity: 0.15, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }),
    clickHint: {
      position: 'absolute', bottom: '8px', left: 0, right: 0,
      textAlign: 'center', fontSize: '0.6rem', letterSpacing: '2px',
      textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
      fontWeight: '600', pointerEvents: 'none',
    },
    nameplate: { background: '#1c1c1c', padding: '14px 15px' },
    nameplateBar: (color, accent) => ({ height: '4px', background: `linear-gradient(90deg, ${color}, ${accent})` }),
    back: (color) => ({
      background: `linear-gradient(145deg, ${color}dd, #0a0a0a)`,
      transform: 'rotateY(180deg)',
      padding: '24px',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    }),
    arrow: {
      width: '50px', height: '50px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)',
      background: 'rgba(255,255,255,0.05)', color: '#fff', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem',
      transition: 'background 0.3s, border-color 0.3s', flexShrink: 0,
    },
    mobileControls: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginTop: '25px' },
    dot: (active) => ({ width: '8px', height: '8px', borderRadius: '50%', background: active ? '#d82020' : '#333', transition: '0.3s', cursor: 'pointer' }),
  }

  return (
    <section style={styles.section} className="speakers-section">
      <div style={styles.inner}>
        <div style={styles.header}>
          <span style={styles.eyebrow}>Lineup 2026</span>
          <h2 style={styles.title}>Meet The <span style={{ color: '#d82020' }}>Speakers</span></h2>
          <p style={{ color: 'rgba(250, 250, 250, 0.76)', fontSize: '0.9rem', letterSpacing: '3px', textTransform: 'uppercase', marginTop: '14px', fontWeight: '600' }}>
    ✦ Click a card to read more ✦
  </p>
        </div>

        <div style={styles.layoutWrapper}>
          {!isMobile && (
            <button style={styles.arrow} onClick={handlePrev}
              onMouseEnter={e => { e.currentTarget.style.background = '#d82020'; e.currentTarget.style.borderColor = '#d82020' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}>
              ←
            </button>
          )}

          <div style={styles.stage} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
            {getVisibleSpeakers().map((s) => (
              <div key={s.globalIdx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={styles.card} className="speaker-card" onClick={() => toggleFlip(s.globalIdx)}>
                  <div style={styles.cardInner(s.globalIdx)}>

                    {/* FRONT */}
                    <div style={{ ...styles.face, ...styles.front }}>
                      <div style={styles.photoArea}>
                        <img src={s.img} alt={s.name} style={styles.img} className="sp-img" />
                        <div style={styles.initials(s.color)}>{s.initials}</div>
                      </div>
                      <div style={styles.nameplate}>
                        <strong style={{ display: 'block', fontSize: '0.95rem', marginBottom: '3px' }}>{s.name}</strong>
                        <em style={{ fontSize: '0.68rem', color: '#888', fontStyle: 'normal', textTransform: 'uppercase' }}>{s.role}</em>
                      </div>
                      <div style={styles.nameplateBar(s.color, s.accent)} />
                      
                    </div>

                    {/* BACK */}
                    <div style={{ ...styles.face, ...styles.back(s.color) }}>
                      <div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 4px', lineHeight: 1.2 }}>{s.name}</h3>
                        <p style={{ fontSize: '0.72rem', opacity: 0.75, textTransform: 'uppercase', marginBottom: '14px', letterSpacing: '1px' }}>{s.role} · {s.org}</p>
                        <div style={{ width: '36px', height: '3px', background: '#fff', marginBottom: '14px', borderRadius: '2px' }} />
                        <p style={{ fontSize: '0.82rem', lineHeight: '1.65', color: '#eee', margin: 0 }}>{s.bio}</p>
                      </div>

                      {/* Instagram Link */}
                      {s.instagram && (
                        
                         <a href={s.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                            marginTop: '18px', padding: '8px 14px', borderRadius: '6px',
                            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                            color: '#fff', textDecoration: 'none', fontSize: '0.75rem',
                            fontWeight: '600', letterSpacing: '0.5px', alignSelf: 'flex-start',
                            transition: 'background 0.2s',
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                        >
                          <InstagramIcon /> Follow on Instagram
                        </a>
                      )}
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>

          {!isMobile && (
            <button style={styles.arrow} onClick={handleNext}
              onMouseEnter={e => { e.currentTarget.style.background = '#d82020'; e.currentTarget.style.borderColor = '#d82020' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}>
              →
            </button>
          )}

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
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&display=swap');
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @media (min-width: 769px) {
          .speaker-card:hover .sp-img { filter: grayscale(0%) !important; transform: scale(1.05); }
        }
        .sp-img { transition: filter 0.6s ease, transform 0.6s ease !important; }
      `}</style>
    </section>
  )
}