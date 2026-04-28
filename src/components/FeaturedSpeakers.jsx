import { useEffect, useState, useRef } from 'react'

// Asset Imports
import priyaImg from '../assets/img1.png'
import rahulImg from '../assets/img2.png'
import nadiaImg from '../assets/img3.png'
import arjunImg from '../assets/img4.png'
import image1 from '../assets/image1.png'
import imagk from '../assets/imgk.png'
import kyu from '../assets/w.png'
import kyu2 from '../assets/imgg.png'
import image3 from '../assets/imgsi.png'
import image4 from '../assets/mm.png'
// New Asset Imports
import tsImg from '../assets/tssp.png'
import rvImg from '../assets/rv.png'
import dnImg from '../assets/dn.png'

const speakers = [
  { name: 'Dr. Vijendra Chauhan', role: 'Interviewer | Mentor', img: arjunImg, color: '#c0392b', accent: '#e74c3c', initials: 'VC', bio: 'Dr. Vijender Singh Chauhan, widely known as Masijeevi, is a highly respected academician, mentor, and one of the most influential interview experts for civil services aspirants in India.', instagram: 'https://www.instagram.com/masijeevi/', type: 'instagram' },
  { name: 'Dr. Gajendra Purohit', role: 'Educator | Mentor', img: nadiaImg, color: '#6c3483', accent: '#9b59b6', initials: 'GP', bio: 'Gajendra Purohit (MSc, NET, PhD), known as GP Sir, has 20+ years of math teaching experience. He is a full-time YouTuber and motivational speaker.', instagram: 'https://www.instagram.com/dr.gajendrapurohit', type: 'instagram' },
  { name: 'Dr. Yogeshwar Nath Mishra', role: 'Ex NASA Scientist', img: rahulImg, color: '#0e6655', accent: '#1abc9c', initials: 'YM', bio: "Dr. Yogeshwar Nath Mishra is a former NASA scientist, Professor at IIT Jodhpur, and entrepreneur whose journey spans from a remote village in UP to global scientific innovation.", instagram: 'https://www.instagram.com/yogeshwar.space/', type: 'instagram' },
  { name: 'Ms. Annapoorna Kumaar', role: 'Telepathic Animal Communicator', img: kyu2, color: '#1a5276', accent: '#1c5276', initials: 'AK', bio: "Annapoorna Kumaar is an internationally recognized animal communicator who has worked with over 5,000 pet parents, helping them build deeper connections with their animals.", instagram: 'https://www.instagram.com/annapoorna_kumaar?igsh=dWh6eW84Y2p2dDBw', type: 'instagram' },
  { name: 'Mr. Aditya Ranjan', role: 'Educator | Mentor', img: priyaImg, color: '#6f8c50', accent: '#729048', initials: 'AR', bio: "Aditya Ranjan Sir is one of India's most influential mathematics educators and a powerful youth motivator, known for transforming the way students approach competitive exams.", instagram: 'https://www.instagram.com/aditya___ranjan/', type: 'instagram' },
  { name: 'Mr. Deepak Wadhwa', role: 'Trader | Mentor', img: image1, color: '#784212', accent: '#e67e22', initials: 'DW', bio: 'Deepak Wadhwa is a trader, investor, and financial educator who simplifies financial markets for everyday investors.', instagram: 'https://www.instagram.com/thedeeptalks.official/', type: 'instagram' },
  { name: 'Mr. Kiran Kumar', role: 'Edupreneur | Author', img: imagk, color: '#974b8f', accent: '#9b549e', initials: 'KK', bio: 'With over 19 years of experience in academic leadership, Kiran Sidde is an Edupreneur committed to transforming education.', instagram: 'https://www.instagram.com/kiran_sidde/', type: 'instagram' },
  { name: 'Mr. Debojit Sen', role: 'Founder & CEO, Crack-ED', img: kyu, color: '#1a5276', accent: '#2e86c1', initials: 'DS', bio: "Debojit Sen is the Founder & CEO of Crack-ED, building job-ready education at scale and bridging India's employability gap.", instagram: null },
  { name: 'Mr. Sandeep Israni', role: 'Ex Agency Owner | Passionate Educator', img: image3, color: '#cf5096', accent: '#d22b4f', initials: 'SI', bio: "Sandeep Israni is Director & Partner at Varma Corp with 20+ years of experience in real estate sales and marketing.", instagram: 'https://www.instagram.com/sandeep.israni.re', type: 'instagram' },
  { name: 'Mr. Manish Maheshwari', role: 'Market Educator | Trading Researcher', img: image4, color: '#1bc332', accent: '#1c7625', initials: 'MM', bio: "Manish Maheshwari is a market educator, trading researcher, and finance mentor, known for a data-driven approach to trading.", instagram: 'https://www.instagram.com/manishmaheshwariunfiltered/', type: 'instagram' },
  // ADDED AT THE LAST
  { name: 'Mr. Tanmay Singhania', role: 'Author | Project Leader', img: tsImg, color: '#2c3e50', accent: '#34495e', initials: 'TS', bio: "Tanmay Singhania is a B.Tech and MBA graduate and currently serves as a Project Leader in data analytics. Beyond his professional role, he is a fiction author who explores the transformative journeys of his characters through inner awakening and self-discovery. Deeply passionate about spiritual literature, he weaves timeless principles into his storytelling, bringing them to life through his novels.", instagram: 'https://www.instagram.com/tanmaynawabofficial/', type: 'instagram' },
  { name: 'Dr. Divyashree Nageswaran', role: 'Founder | Motivator', img: dnImg, color: '#512e5f', accent: '#8e44ad', initials: 'DN', bio: "Dr. Divyashree Nageswaran is a founder, speaker, and entrepreneur with over five years of experience in the textile supply chain. Holding a PhD in Plant Sciences, she began her journey in research before transitioning into entrepreneurship. She reflects on resilience, identity, and the courage it takes to rebuild one’s path.", instagram: 'https://www.instagram.com/divyashreenageswaran/', type: 'instagram' },
  { name: 'Dr. Rakesh Varma', role: 'Ex IAS Officer | Motivator', img: rvImg, color: '#1b4f72', accent: '#2874a6', initials: 'RV', bio: "Dr. Rakesh Varma, Ex-IAS (VR), Uttar Pradesh Cadre, is a distinguished expert in Public Policy and Govt Affairs with over three decades of experience. An alumnus of the Lee Kuan Yew School of Public Policy, he is a successful entrepreneur who developed ESGmitra, a cutting-edge ESG data analytics platform.", instagram: 'https://www.linkedin.com/in/dr-rakesh-varmaias', type: 'linkedin' },
]

const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.974-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.516 2.497 5.783 2.225 7.15 2.163 8.416 2.105 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.013 8.332 0 8.741 0 12c0 3.259.013 3.668.072 4.948.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.987 8.741 24 12 24c3.259 0 3.668-.013 4.948-.072 1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038.059-1.28.072-1.689.072-4.948 0-3.259-.013-3.668-.072-4.948-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
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

          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ color: '#888', fontSize: '0.75rem', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600 }}>Lineup 2026</p>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#e0e0e0', lineHeight: 1.1, margin: 0 }}>
              Meet The <span style={{ color: '#d82020' }}>Speakers</span>
            </h2>
            <p style={{ color: 'rgba(250,250,250,0.76)', fontSize: '0.85rem', letterSpacing: '3px', textTransform: 'uppercase', marginTop: '14px', fontWeight: 600 }}>
              ✦ {isMobile ? 'Tap a card to read more' : 'Hover a card to read more'} ✦
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', justifyContent: 'center', gap: isMobile ? 0 : '30px' }}>
            
            {!isMobile && (
              <button className="sp-nav-btn" onClick={handlePrev} style={{ width: 50, height: 50, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>←</button>
            )}

            <div style={{ display: 'flex', gap: 20, alignItems: 'center', justifyContent: 'center' }} onTouchStart={onStageTouchStart} onTouchMove={onStageTouchMove} onTouchEnd={onStageTouchEnd}>
              {visible.map(s => {
                const isFlipped = !!flippedCards[s.gi]
                return (
                  <div key={s.gi} className={`sp-card-wrap${isFlipped ? ' flipped' : ''}`} onClick={() => isMobile && toggleFlip(s.gi)} style={{ width: CARD_W, height: CARD_H, perspective: 1200, cursor: 'pointer', flexShrink: 0, position: 'relative' }}>
                    <div className="sp-flip-inner">
                      {/* FRONT */}
                      <div className="sp-face" style={{ position: 'absolute', inset: 0, borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: '#161616', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ position: 'relative', height: PHOTO_H, background: '#111', overflow: 'hidden' }}>
                          <img src={s.img} alt={s.name} className="sp-img-el" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', filter: 'grayscale(100%)', transition: 'filter 0.6s ease, transform 0.6s ease' }} />
                          <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: '6rem', fontWeight: 900, color: s.color, opacity: 0.15, pointerEvents: 'none' }}>{s.initials}</span>
                        </div>
                        <div style={{ background: '#1c1c1c', flexGrow: 1 }}>
                          <div style={{ padding: '12px 15px' }}>
                            <strong style={{ display: 'block', fontSize: '0.95rem', color: '#fff', fontWeight: 700 }}>{s.name}</strong>
                            <em style={{ fontSize: '0.68rem', color: '#888', textTransform: 'uppercase', fontStyle: 'normal' }}>{s.role}</em>
                          </div>
                          <div style={{ height: 4, background: `linear-gradient(90deg, ${s.color}, ${s.accent})` }} />
                        </div>
                        {isMobile && <div className="sp-flip-hint">tap to read bio ↑</div>}
                      </div>

                      {/* BACK */}
                      <div className="sp-face sp-back-face" style={{ position: 'absolute', inset: 0, borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: `linear-gradient(145deg, ${s.color}dd, #0a0a0a)`, display: 'flex', flexDirection: 'column' }}>
                        <button className="sp-close-btn" onClick={e => { e.stopPropagation(); toggleFlip(s.gi) }}>✕</button>
                        <div className="sp-bio-scroll" style={{ flex: 1, overflowY: 'auto', padding: '22px', paddingTop: '36px' }}>
                          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', margin: '0 0 4px' }}>{s.name}</h3>
                          <p style={{ fontSize: '0.68rem', opacity: 0.75, textTransform: 'uppercase', color: '#fff', marginBottom: '12px' }}>{s.role}</p>
                          <div style={{ width: 36, height: 3, background: '#fff', borderRadius: 2, marginBottom: 12 }} />
                          <p style={{ fontSize: '0.8rem', lineHeight: 1.65, color: '#eee', marginBottom: '16px' }}>{s.bio}</p>
                          
                          {s.instagram && (
                            <a href={s.instagram} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="sp-insta" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 6, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', textDecoration: 'none', fontSize: '0.72rem', fontWeight: 600 }}>
                              {s.type === 'linkedin' ? <LinkedInIcon /> : <InstagramIcon />}
                              {s.type === 'linkedin' ? 'Connect on LinkedIn' : 'Follow on Instagram'}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {!isMobile && (
              <button className="sp-nav-btn" onClick={handleNext} style={{ width: 50, height: 50, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>→</button>
            )}
          </div>

          {isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: 28 }}>
              <button className="sp-nav-btn" onClick={handlePrev} style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '1rem' }}>←</button>
              <div style={{ display: 'flex', gap: 8 }}>
                {speakers.map((_, i) => (
                  <span key={i} className={`sp-dot-item${currentIndex === i ? ' active' : ''}`} onClick={() => { setFlippedCards({}); setCurrentIndex(i) }} />
                ))}
              </div>
              <button className="sp-nav-btn" onClick={handleNext} style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '1rem' }}>→</button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
