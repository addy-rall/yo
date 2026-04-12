import { useEffect, useRef, useState } from 'react'
import clgImage from '../assets/clg.png'

const sections = [
  {
    id: 'tedx',
    eyebrow: 'About',
    title: <>What is <span style={{ color: '#b32d2d' }}>TEDx</span>?</>,
    desc: [
      'TEDx is a global initiative designed to bring the spirit of TED — Technology, Entertainment, Design — to local communities. Organized independently under a license from TED, these events spark meaningful conversations and inspire change.',
      'TEDxBBAU brings together the brightest minds from Babasaheb Bhimrao Ambedkar University and beyond to share ideas that challenge perspectives.',
    ],
    pills: ['Technology', 'Entertainment', 'Design'],
    cta: { label: 'Discover TEDx', href: 'https://www.ted.com' },
    visual: 'tedx',
    videoUrl: 'https://www.youtube.com/@TEDx',
    thumb: 'https://img.youtube.com/vi/d0NHOpeczko/maxresdefault.jpg'
  },
  {
    id: 'bbau',
    eyebrow: 'The University',
    title: <>BBAU Lucknow</>,
    desc: [
      'Babasaheb Bhimrao Ambedkar University (BBAU) is a central university located in Lucknow, Uttar Pradesh, established in 1996.',
      'Named after Dr. B.R. Ambedkar, the university stands as a beacon of education, social justice, and research excellence in India.',
    ],
    pills: ['Central University', 'Research', 'Social Justice'],
    cta: { label: 'Visit BBAU', href: 'https://www.bbau.ac.in' },
    visual: 'bbau',
  },
  {
    id: 'tedxbbau',
    eyebrow: 'Our Event',
    title: <>What is <span style={{ color: '#b32d2d' }}>TEDxBBAU</span>?</>,
    desc: [
      'TEDxBBAU is an independently organized TED event hosted at Babasaheb Bhimrao Ambedkar University, Lucknow.',
      'Our mission is to surface powerful ideas from students and change-makers that resonate far beyond the campus.',
    ],
    pills: ['Ideas', 'Community', 'Innovation'],
    cta: { label: 'Register Now', href: 'https://in.bookmyshow.com/events/tedxbbau/ET00494884' },
    visual: 'tedxbbau',
  },
]

function TedxVisual() {
  return (
    <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">
      <circle cx="200" cy="125" r="85" fill="none" stroke="#b32d2d" strokeWidth="0.5" opacity="0.4"/>
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => (
        <line key={i} x1="200" y1="125" x2={200 + 95 * Math.cos(deg * Math.PI / 180)} y2={125 + 95 * Math.sin(deg * Math.PI / 180)} stroke="#b32d2d" strokeWidth="1" opacity="0.3" />
      ))}
      <circle cx="200" cy="125" r="35" fill="rgba(17,17,17,0.6)" stroke="#b32d2d" strokeWidth="2"/>
      <circle cx="200" cy="125" r="15" fill="#b32d2d"/>
      <polygon points="197,118 197,132 208,125" fill="white"/>
    </svg>
  )
}

function TedxBbauVisual() {
  return (
    <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">
      <circle cx="200" cy="125" r="90" fill="none" stroke="#b32d2d" strokeWidth="0.5" opacity="0.2"/>
      <circle cx="200" cy="125" r="60" fill="none" stroke="#b32d2d" strokeWidth="0.5" opacity="0.3"/>
      <text x="200" y="135" textAnchor="middle" fill="#b32d2d" fontSize="18" fontWeight="bold">TEDx</text>
    </svg>
  )
}

const visuals = {
  tedx: TedxVisual,
  bbau: () => <img src={clgImage} alt="BBAU" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />,
  tedxbbau: TedxBbauVisual,
}

export default function WhatIsTedx() {
  const [active, setActive] = useState(0)
  const [hoverSide, setHoverSide] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const nextPage = () => setActive((prev) => (prev + 1) % sections.length)
  const prevPage = () => setActive((prev) => (prev - 1 + sections.length) % sections.length)

  const styles = {
    wrapper: {
      background: '#000',
      padding: isMobile ? '40px 15px' : '100px 20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: "'Arial', sans-serif",
    },
    container: {
      position: 'relative',
      width: '100%',
      maxWidth: isMobile ? '100%' : '1300px', // INCREASED WIDTH
      minHeight: isMobile ? 'auto' : '650px', // INCREASED HEIGHT
      border: '1.5px solid #b32d2d',
      background: '#050505',
      padding: isMobile ? '40px 20px' : '80px 60px', // INCREASED PADDING
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 0 25px rgba(179, 45, 45, 0.15)',
    },
    arrow: (side) => ({
      position: isMobile ? 'static' : 'absolute',
      top: '50%',
      transform: isMobile ? 'none' : 'translateY(-50%)',
      background: hoverSide === side ? '#b32d2d' : 'transparent',
      border: `1px solid ${hoverSide === side ? '#b32d2d' : 'rgba(255, 255, 255, 0.2)'}`,
      color: '#fff',
      width: isMobile ? '45px' : '60px',
      height: isMobile ? '45px' : '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      zIndex: 10,
      transition: 'all 0.3s ease',
      borderRadius: '50%',
      [side === 'L' ? 'left' : 'right']: '20px',
    }),
    sliderTrack: {
      display: 'flex',
      transition: 'transform 0.8s cubic-bezier(0.77, 0, 0.18, 1)',
      width: `${sections.length * 100}%`,
      transform: `translateX(-${active * (100 / sections.length)}%)`,
    },
    panel: {
      width: `${100 / sections.length}%`,
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? '25px' : '60px',
      alignItems: 'center',
      padding: isMobile ? '0' : '0 40px',
      boxSizing: 'border-box',
    },
    visualWrap: {
      flex: 1.2, // Slightly larger visual area
      width: '100%',
      height: isMobile ? '220px' : '400px', // INCREASED VISUAL HEIGHT
      background: '#111',
      borderRadius: '12px',
      overflow: 'hidden',
      position: 'relative',
      border: '1px solid #222'
    },
    textWrap: {
      flex: 1,
      textAlign: isMobile ? 'center' : 'left'
    }
  }

  return (
    <section style={styles.wrapper}>
      <div style={styles.container}>
        
        {!isMobile && (
          <>
            <button style={styles.arrow('L')} onClick={prevPage} onMouseEnter={() => setHoverSide('L')} onMouseLeave={() => setHoverSide(null)}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button style={styles.arrow('R')} onClick={nextPage} onMouseEnter={() => setHoverSide('R')} onMouseLeave={() => setHoverSide(null)}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </>
        )}

        <div style={{ overflow: 'hidden' }}>
          <div style={styles.sliderTrack}>
            {sections.map((s) => {
              const Visual = visuals[s.visual]
              return (
                <div key={s.id} style={styles.panel}>
                  <div style={styles.visualWrap}>
                    {s.visual === 'tedx' ? (
                      <a href={s.videoUrl} target="_blank" rel="noreferrer" style={{ display: 'block', height: '100%' }}>
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${s.thumb})`, backgroundSize: 'cover', filter: 'brightness(0.4)' }} />
                        <Visual />
                      </a>
                    ) : <Visual />}
                  </div>

                  <div style={styles.textWrap}>
                    <p style={{ color: '#b32d2d', textTransform: 'uppercase', fontSize: '13px', letterSpacing: '3px', margin: '0 0 10px' }}>{s.eyebrow}</p>
                    <h2 style={{ color: '#fff', fontSize: isMobile ? '28px' : '42px', fontWeight: '800', margin: '0 0 20px' }}>{s.title}</h2>
                    {s.desc.map((d, idx) => (
                      <p key={idx} style={{ color: '#aaa', fontSize: isMobile ? '14px' : '16px', lineHeight: '1.8', marginBottom: '18px' }}>{d}</p>
                    ))}
                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px', justifyContent: isMobile ? 'center' : 'flex-start', flexWrap: 'wrap' }}>
                      {s.pills.map(p => (
                        <span key={p} style={{ background: '#111', color: '#b32d2d', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', border: '1px solid #333' }}>{p}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '25px', marginTop: isMobile ? '30px' : '50px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            {sections.map((_, i) => (
              <div 
                key={i} 
                onClick={() => setActive(i)}
                style={{ 
                  width: '10px', height: '10px', borderRadius: '50%', cursor: 'pointer',
                  background: i === active ? '#b32d2d' : '#333',
                  transition: 'background 0.3s'
                }} 
              />
            ))}
          </div>

          {isMobile && (
            <div style={{ display: 'flex', gap: '20px' }}>
               <button style={styles.arrow('L')} onClick={prevPage}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <button style={styles.arrow('R')} onClick={nextPage}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}