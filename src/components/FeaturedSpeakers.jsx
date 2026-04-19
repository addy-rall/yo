import { useEffect, useState, useRef } from 'react'

import priyaImg from '../assets/img1.png'
import rahulImg from '../assets/img2.png'
import nadiaImg from '../assets/img3.png'
import arjunImg from '../assets/img4.png'
import image1 from '../assets/image1.png'
import imagk from '../assets/imgk.png'
import kyu from '../assets/w.png'
import kyu2 from '../assets/imgg.png'

const speakers = [
  { name: 'Dr. Vijendra Chauhan', role: 'Interviewer | Mentor', img: arjunImg, color: '#c0392b', accent: '#e74c3c', initials: 'VC', bio: 'Dr. Vijender Singh Chauhan, widely known as Masijeevi, is a highly respected academician, mentor, and one of the most influential interview experts for civil services aspirants in India. He serves as an Associate Professor at the University of Delhi and has guided thousands of students in shaping not just their careers, but their personalities and thought processes. With experience as an interviewer at multiple prestigious platforms including 12+ TEDx talks and Josh Talks, he is known for his deep understanding of human behavior, communication, and real-world intelligence.', instagram: 'https://www.instagram.com/masijeevi/' },
  { name: 'Dr. Gajendra Purohit', role: 'Educator | Mentor', img: nadiaImg, color: '#6c3483', accent: '#9b59b6', initials: 'GP', bio: 'Gajendra Purohit (MSc, NET, PhD), known as GP Sir, has 20+ years of math teaching experience. He is a full-time YouTuber and is known for his engaging and insightful teaching methods. He founded MathsCare for online courses and GPS Publication House, with six bestselling books. Additionally, he is a motivational speaker and career guide.', instagram: 'https://www.instagram.com/dr.gajendrapurohit' },
  { name: 'Dr. Yogeshwar Nath Mishra', role: 'Ex NASA Scientist', img: rahulImg, color: '#0e6655', accent: '#1abc9c', initials: 'YM', bio: "Dr. Yogeshwar Nath Mishra is a former NASA scientist, Professor at IIT Jodhpur, and entrepreneur whose journey spans from a remote village in Uttar Pradesh to the forefront of global scientific innovation. He has co-developed the world's fastest laser sheet imaging technology and one of the fastest wide-field microscopy techniques.", instagram: 'https://www.instagram.com/yogeshwar.space/' },
  { name: 'Mr. Aditya Ranjan', role: 'Educator | Mentor', img: priyaImg, color: '#6f8c50', accent: '#729048', initials: 'AR', bio: "Aditya Ranjan Sir is one of India's most influential mathematics educators and a powerful youth motivator, known for transforming the way students approach competitive exams. He secured an All India Rank 114 in CHSL and cleared multiple prestigious exams like CHSL, CPO, and CDS, eventually serving as an Excise Inspector through SSC CGL 2019. From a humble background to becoming a nationally recognized educator, his journey reflects discipline, resilience, and consistency. Today, through platforms like YouTube and initiatives such as Vidyagram, he has guided lakhs of aspirants.", instagram: 'https://www.instagram.com/aditya___ranjan/' },
  { name: 'Mr. Deepak Wadhwa', role: 'Trader | Mentor', img: image1, color: '#784212', accent: '#e67e22', initials: 'DW', bio: 'Deepak Wadhwa is a trader, investor, and financial educator who simplifies financial markets for everyday investors. With experience in equities, derivatives, and crypto, he focuses on disciplined trading, risk management, and market psychology, helping thousands make smarter financial decisions.', instagram: 'https://www.instagram.com/thedeeptalks.official/' },
  { name: 'Mr. Kiran Kumar', role: 'Edupreneur | Author', img: imagk, color: '#974b8f', accent: '#9b549e', initials: 'KK', bio: 'With over 19 years of experience in academic leadership, competitive exam training, and student psychology, Kiran Sidde is an Edupreneur committed to transforming education through scientifically grounded, emotionally aware, and purpose-driven frameworks. He has impacted over 15,000+ students, engaged with 70+ institutions, and conducted 200+ workshops.', instagram: 'https://www.instagram.com/kiran_sidde/' },
  { name: 'Mr. Debojit Sen', role: 'Founder & CEO, Crack-ED', img: kyu, color: '#1a5276', accent: '#2e86c1', initials: 'DS', bio: "Debojit Sen is the Founder & CEO of Crack-ED, building job-ready education at scale. A first-generation entrepreneur backed by CarDekho Group, he is bridging India's employability gap through outcome-driven programs, strong corporate partnerships, and a fast-scaling, profitable model shaping future-ready careers.", instagram: null },
  { name: 'Ms. Annapoorna Kumaar', role: 'Animal Telepathic Communicator', img: kyu2, color: '#1a5276', accent: '#1c5276', initials: 'AK', bio: "Annapoorna Kumaar is an internationally recognized animal communicator who has worked with over 5,000 pet parents, helping them build deeper understanding and connection with their animals. Her work focuses on decoding animal behavior through intuitive communication, offering insights into emotional, behavioral, and relational dynamics between pets and their humans.", instagram: null },
]

const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.974-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.516 2.497 5.783 2.225 7.15 2.163 8.416 2.105 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.013 8.332 0 8.741 0 12c0 3.259.013 3.668.072 4.948.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.987 8.741 24 12 24c3.259 0 3.668-.013 4.948-.072 1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038.059-1.28.072-1.689.072-4.948 0-3.259-.013-3.668-.072-4.948-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
)

export default function FeaturedSpeakers() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [flippedCards, setFlippedCards] = useState({})

  const touchStart = useRef(null)
  const touchEnd = useRef(null)
  const touchStartY = useRef(null)
  const isSwiping = useRef(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const total = speakers.length
  const desktopVisible = 4

  const handleNext = () => { setFlippedCards({}); setCurrentIndex(p => (p + 1) % total) }
  const handlePrev = () => { setFlippedCards({}); setCurrentIndex(p => (p - 1 + total) % total) }

  const onStageTouchStart = e => {
    if (flippedCards[currentIndex]) return
    touchStart.current = e.targetTouches[0].clientX
    touchStartY.current = e.targetTouches[0].clientY
    touchEnd.current = null
    isSwiping.current = false
  }
  const onStageTouchMove = e => {
    if (flippedCards[currentIndex]) return
    touchEnd.current = e.targetTouches[0].clientX
    const dy = Math.abs(e.targetTouches[0].clientY - touchStartY.current)
    const dx = Math.abs(touchEnd.current - touchStart.current)
    if (dx > dy && dx > 10) isSwiping.current = true
  }
  const onStageTouchEnd = () => {
    if (flippedCards[currentIndex]) return
    if (!touchStart.current || !touchEnd.current) return
    const d = touchStart.current - touchEnd.current
    if (isSwiping.current) {
      if (d > 40) handleNext()
      if (d < -40) handlePrev()
    }
    touchStart.current = null; touchEnd.current = null; isSwiping.current = false
  }

  const toggleFlip = i => setFlippedCards(p => ({ ...p, [i]: !p[i] }))

  const visible = isMobile
    ? [{ ...speakers[currentIndex], gi: currentIndex }]
    : Array.from({ length: desktopVisible }, (_, i) => {
        const idx = (currentIndex + i) % total
        return { ...speakers[idx], gi: idx }
      })

  const CARD_W = isMobile ? 290 : 280
  const CARD_H = isMobile ? 460 : 420
  const PHOTO_H = isMobile ? 310 : 320

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&display=swap');
        .sp-flip-inner {
          transition: transform 0.8s cubic-bezier(0.4,0,0.2,1);
          transform-style: preserve-3d;
          position: relative;
          width: 100%;
          height: 100%;
        }
        .sp-card-wrap.flipped .sp-flip-inner { transform: rotateY(180deg); }
        @media (min-width: 769px) {
          .sp-card-wrap:hover .sp-flip-inner { transform: rotateY(180deg); }
          .sp-card-wrap:hover .sp-img-el { filter: grayscale(0%) !important; transform: scale(1.05); }
        }
        .sp-card-wrap.flipped .sp-img-el { filter: grayscale(0%) !important; transform: scale(1.05); }
        .sp-face { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .sp-back-face { transform: rotateY(180deg); }
        .sp-bio-scroll::-webkit-scrollbar { width: 4px; }
        .sp-bio-scroll::-webkit-scrollbar-track { background: transparent; }
        .sp-bio-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.3); border-radius: 4px; }
        .sp-nav-btn:hover { background: #d82020 !important; border-color: #d82020 !important; }
        .sp-dot-item { width:8px; height:8px; border-radius:50%; background:#333; cursor:pointer; transition:background 0.3s, transform 0.3s; display:block; flex-shrink:0; }
        .sp-dot-item.active { background:#d82020; transform:scale(1.3); }
        .sp-insta:hover { background: rgba(255,255,255,0.22) !important; }
        .sp-flip-hint {
          position: absolute;
          bottom: 10px; left: 0; right: 0;
          text-align: center;
          font-size: 0.55rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          pointer-events: none;
          font-family: 'Poppins', sans-serif;
          z-index: 2;
        }
        .sp-close-btn {
          position: absolute;
          top: 10px; right: 10px;
          width: 28px; height: 28px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.25);
          color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem;
          cursor: pointer;
          z-index: 10;
          transition: background 0.2s;
          font-family: 'Poppins', sans-serif;
          flex-shrink: 0;
        }
        .sp-close-btn:hover { background: rgba(255,255,255,0.3); }
      `}</style>

      <section style={{
        padding: '80px 0',
        background: '#0a0a0a',
        color: '#fff',
        fontFamily: "'Poppins', sans-serif",
        overflow: 'hidden',
        width: '100%',
        display: 'block',
      }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 20px' }}>

          {/* HEADER */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{
              color: '#888', fontSize: '0.75rem', letterSpacing: '3px',
              textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600,
              fontFamily: "'Poppins', sans-serif",
            }}>Lineup 2026</p>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900,
              color: '#e0e0e0', lineHeight: 1.1, margin: 0,
              fontFamily: "'Poppins', sans-serif",
            }}>
              Meet The <span style={{ color: '#d82020' }}>Speakers</span>
            </h2>
            <p style={{
              color: 'rgba(250,250,250,0.76)', fontSize: '0.85rem',
              letterSpacing: '3px', textTransform: 'uppercase',
              marginTop: '14px', fontWeight: 600,
              fontFamily: "'Poppins', sans-serif",
            }}>✦ {isMobile ? 'Tap a card to read more' : 'Click a card to read more'} ✦</p>
          </div>

          {/* LAYOUT */}
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: isMobile ? 0 : '30px',
          }}>

            {/* PREV ARROW — desktop only */}
            {!isMobile && (
              <button className="sp-nav-btn" onClick={handlePrev} style={{
                width: 50, height: 50, borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.05)',
                color: '#fff', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.2rem', flexShrink: 0, padding: 0,
                transition: 'background 0.3s, border-color 0.3s',
                fontFamily: 'inherit',
              }}>←</button>
            )}

            {/* STAGE */}
            <div
              style={{ display: 'flex', gap: 20, alignItems: 'center', justifyContent: 'center' }}
              onTouchStart={onStageTouchStart}
              onTouchMove={onStageTouchMove}
              onTouchEnd={onStageTouchEnd}
            >
              {visible.map(s => {
                const isFlipped = !!flippedCards[s.gi]
                return (
                  /* ── OUTER WRAPPER: gets sp-card-wrap + flipped class + onClick ── */
                  <div
                    key={s.gi}
                    className={`sp-card-wrap${isFlipped ? ' flipped' : ''}`}
                    onClick={() => toggleFlip(s.gi)}
                    style={{
                      width: CARD_W, height: CARD_H,
                      perspective: 1200, cursor: 'pointer',
                      flexShrink: 0, position: 'relative',
                    }}
                  >
                    {/* ── INNER: only sp-flip-inner, no sp-card-wrap ── */}
                    <div className="sp-flip-inner">

                      {/* ── FRONT ── */}
                      <div
                        className="sp-face"
                        style={{
                          position: 'absolute', inset: 0,
                          borderRadius: 8, overflow: 'hidden',
                          border: '1px solid rgba(255,255,255,0.1)',
                          background: '#161616',
                          display: 'flex', flexDirection: 'column',
                        }}
                      >
                        <div style={{
                          position: 'relative',
                          height: PHOTO_H,
                          background: '#111',
                          overflow: 'hidden',
                          flexShrink: 0,
                        }}>
                          <img
                            src={s.img}
                            alt={s.name}
                            className="sp-img-el"
                            style={{
                              position: 'absolute', top: 0, left: 0,
                              width: '100%', height: '100%',
                              objectFit: 'cover', objectPosition: 'top center',
                              filter: 'grayscale(100%)',
                              transition: 'filter 0.6s ease, transform 0.6s ease',
                              display: 'block', maxWidth: 'none',
                            }}
                          />
                          <span style={{
                            position: 'absolute', top: '50%', left: '50%',
                            transform: 'translate(-50%,-50%)',
                            fontSize: '6rem', fontWeight: 900,
                            color: s.color, opacity: 0.15,
                            pointerEvents: 'none', userSelect: 'none',
                            fontFamily: "'Poppins', sans-serif",
                          }}>{s.initials}</span>
                        </div>

                        <div style={{ background: '#1c1c1c', flexShrink: 0 }}>
                          <div style={{ padding: '12px 15px' }}>
                            <strong style={{
                              display: 'block', fontSize: '0.95rem',
                              marginBottom: 3, color: '#fff', fontWeight: 700,
                              fontFamily: "'Poppins', sans-serif",
                            }}>{s.name}</strong>
                            <em style={{
                              fontSize: '0.68rem', color: '#888',
                              textTransform: 'uppercase', fontStyle: 'normal',
                              letterSpacing: '0.5px',
                              fontFamily: "'Poppins', sans-serif",
                            }}>{s.role}</em>
                          </div>
                          <div style={{ height: 4, background: `linear-gradient(90deg, ${s.color}, ${s.accent})` }} />
                        </div>

                        {isMobile && (
                          <div className="sp-flip-hint">tap to read bio ↑</div>
                        )}
                      </div>

                      {/* ── BACK ── */}
                      <div
                        className="sp-face sp-back-face"
                        style={{
                          position: 'absolute', inset: 0,
                          borderRadius: 8, overflow: 'hidden',
                          border: '1px solid rgba(255,255,255,0.1)',
                          background: `linear-gradient(145deg, ${s.color}dd, #0a0a0a)`,
                          display: 'flex', flexDirection: 'column',
                          padding: 0,
                        }}
                      >
                        <button
                          className="sp-close-btn"
                          onClick={e => { e.stopPropagation(); toggleFlip(s.gi) }}
                        >✕</button>

                        <div
                          className="sp-bio-scroll"
                          onTouchStart={e => e.stopPropagation()}
                          onTouchMove={e => e.stopPropagation()}
                          onTouchEnd={e => e.stopPropagation()}
                          onClick={e => e.stopPropagation()}
                          style={{
                            flex: 1, overflowY: 'auto', overflowX: 'hidden',
                            padding: '22px',
                            paddingTop: '36px',
                            display: 'flex', flexDirection: 'column',
                            minHeight: 0,
                            scrollbarWidth: 'thin',
                            scrollbarColor: 'rgba(255,255,255,0.25) transparent',
                            WebkitOverflowScrolling: 'touch',
                          }}
                        >
                          <h3 style={{
                            fontSize: '1.1rem', fontWeight: 800,
                            margin: '0 0 4px', lineHeight: 1.2, color: '#fff',
                            fontFamily: "'Poppins', sans-serif",
                          }}>{s.name}</h3>
                          <p style={{
                            fontSize: '0.68rem', opacity: 0.75,
                            textTransform: 'uppercase', letterSpacing: '1px',
                            margin: '0 0 12px', color: '#fff',
                            fontFamily: "'Poppins', sans-serif",
                          }}>{s.role}</p>
                          <div style={{
                            width: 36, height: 3, background: '#fff',
                            borderRadius: 2, marginBottom: 12, flexShrink: 0,
                          }} />
                          <p style={{
                            fontSize: '0.8rem', lineHeight: 1.65,
                            color: '#eee', margin: '0 0 16px',
                            fontFamily: "'Poppins', sans-serif",
                          }}>{s.bio}</p>

                          {s.instagram && (
                            
                             <a
                              href={s.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={e => e.stopPropagation()}
                              className="sp-insta"
                              style={{
                                display: 'inline-flex', alignItems: 'center', gap: 8,
                                marginTop: 'auto', padding: '8px 14px',
                                borderRadius: 6,
                                background: 'rgba(255,255,255,0.1)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: '#fff', textDecoration: 'none',
                                fontSize: '0.72rem', fontWeight: 600,
                                letterSpacing: '0.5px', alignSelf: 'flex-start',
                                flexShrink: 0, transition: 'background 0.2s',
                                fontFamily: "'Poppins', sans-serif",
                              }}
                            >
                              <InstagramIcon /> Follow on Instagram
                            </a>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>
                )
              })}
            </div>

            {/* NEXT ARROW — desktop only */}
            {!isMobile && (
              <button className="sp-nav-btn" onClick={handleNext} style={{
                width: 50, height: 50, borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.05)',
                color: '#fff', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.2rem', flexShrink: 0, padding: 0,
                transition: 'background 0.3s, border-color 0.3s',
                fontFamily: 'inherit',
              }}>→</button>
            )}
          </div>

          {/* MOBILE DOTS + ARROWS */}
          {isMobile && (
            <div style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: 20, marginTop: 28,
            }}>
              <button className="sp-nav-btn" onClick={handlePrev} style={{
                width: 40, height: 40, borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.05)',
                color: '#fff', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1rem', padding: 0,
                transition: 'background 0.3s, border-color 0.3s',
                fontFamily: 'inherit',
              }}>←</button>

              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                {speakers.map((_, i) => (
                  <span
                    key={i}
                    className={`sp-dot-item${currentIndex === i ? ' active' : ''}`}
                    onClick={() => { setFlippedCards({}); setCurrentIndex(i) }}
                  />
                ))}
              </div>

              <button className="sp-nav-btn" onClick={handleNext} style={{
                width: 40, height: 40, borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.05)',
                color: '#fff', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1rem', padding: 0,
                transition: 'background 0.3s, border-color 0.3s',
                fontFamily: 'inherit',
              }}>→</button>
            </div>
          )}

        </div>
      </section>
    </>
  )
}