import { useState } from 'react'
import './FeaturedSpeakers.css'

const speakers = [
  {
    name: 'Priya Sharma',
    role: 'AI Researcher',
    org: 'IIT Delhi',
    bio: 'A pioneering researcher in ethical AI with 15+ years of experience at leading tech institutions.',
    color: '#c0392b',
    accent: '#e74c3c',
    initials: 'PS',
    instagram: '#',
    linkedin: '#',
  },
  {
    name: 'Rahul Mehta',
    role: 'Entrepreneur',
    org: 'FutureTech Labs',
    bio: 'Serial entrepreneur and author. Mentored 8,000+ students through startup programmes.',
    color: '#6c3483',
    accent: '#9b59b6',
    initials: 'RM',
    instagram: '#',
    linkedin: '#',
  },
  {
    name: 'Dr. Nadia Khan',
    role: 'Neuroscientist',
    org: 'AIIMS Delhi',
    bio: 'Renowned for research on memory. TED talk has over 4 million views.',
    color: '#0e6655',
    accent: '#1abc9c',
    initials: 'NK',
    instagram: '#',
    linkedin: '#',
  },
  {
    name: 'Arjun Verma',
    role: 'Climate Activist',
    org: 'GreenFuture India',
    bio: 'Named one of Forbes 30 Under 30 for his environmental movement work.',
    color: '#784212',
    accent: '#e67e22',
    initials: 'AV',
    instagram: '#',
    linkedin: '#',
  }
]

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
)

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
)

const CARD_HEIGHT = 460 
const PHOTO_HEIGHT = 380

export default function FeaturedSpeakers() {
  const [active, setActive] = useState(null)
  const [flipped, setFlipped] = useState(null)
  const total = speakers.length

  const handlePrev = () => { setFlipped(null); setActive(prev => (prev === null ? total - 1 : (prev - 1 + total) % total)); }
  const handleNext = () => { setFlipped(null); setActive(prev => (prev === null ? 0 : (prev + 1) % total)); }

  return (
    <section className="speakers" id="speakers">
      <div className="speakers-inner">
        <div className="speakers-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p className="section-eyebrow">Lineup 2025</p>
          <h2 className="section-title">Meet The <span className="red">Speakers</span></h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '30px' }}>
          <button className="nav-arrow" onClick={handlePrev}>←</button>

          <div className="sp-stage">
            {speakers.map((s, i) => (
              <div
                key={s.name}
                className={`sp-card ${active === i ? 'sp-card--active' : ''}`}
                style={{
                  '--card-color': s.color, '--card-accent': s.accent,
                  perspective: '1200px', height: CARD_HEIGHT, flex: '0 1 320px',
                }}
              >
                <div style={{
                  position: 'relative', width: '100%', height: '100%',
                  transformStyle: 'preserve-3d', transition: 'transform 0.6s',
                  transform: flipped === i ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}>
                  {/* FRONT */}
                  <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div className="sp-photo" onClick={() => setFlipped(i)} style={{ height: PHOTO_HEIGHT, cursor: 'pointer' }}>
                      <div className="sp-initials">{s.initials}</div>
                    </div>
                    <div className="sp-nameplate" onClick={() => setActive(i)}>
                      <div className="sp-nameplate-inner">
                        <div className="sp-nameplate-text">
                          <strong>{s.name}</strong>
                          <em>{s.role}</em>
                        </div>
                      </div>
                      <div className="sp-nameplate-bar" />
                    </div>
                  </div>

                  {/* BACK */}
                  <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: s.color, padding: '20px', display: 'flex', flexDirection: 'column' }}>
                    <p style={{ fontWeight: 700, fontSize: '1.2rem', margin: '0 0 5px' }}>{s.name}</p>
                    <p style={{ fontSize: '0.8rem', opacity: 0.8, margin: '0 0 15px' }}>{s.role} · {s.org}</p>
                    <p style={{ fontSize: '0.85rem', lineHeight: 1.5, flex: 1 }}>{s.bio}</p>
                    <div style={{ display: 'flex', gap: '15px' }}>
                      <a href={s.instagram} className="sp-social-btn"><InstagramIcon /></a>
                      <a href={s.linkedin} className="sp-social-btn"><LinkedInIcon /></a>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); setFlipped(null); }} style={{ position: 'absolute', top: 10, right: 10, background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>✕</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="nav-arrow" onClick={handleNext}>→</button>
        </div>
      </div>
    </section>
  )
}