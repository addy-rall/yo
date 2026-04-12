import { useEffect, useState } from 'react'

const themes = [
  { word: 'DECODE', num: '01', tagline: 'Unravel the hidden.', visual: '010101' },
  { word: 'DESIGN', num: '02', tagline: 'Shape with intent.', visual: '■ □ ■' },
  { word: 'DISRUPT', num: '03', tagline: 'Break the norm.', visual: '⚡' },
]

export default function Theme() {
  const [active, setActive] = useState(0)

  // We split the heading into characters to apply the animation delay to each
  const headingText = "DECODE. DESIGN. DISRUPT.".split("")

  const s = {
    section: {
      backgroundColor: '#0a0a0a',
      color: '#fff',
      padding: '60px 20px',
      fontFamily: "'Poppins', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    header: { textAlign: 'center', marginBottom: '40px' },
    eyebrow: {
      fontSize: '10px',
      letterSpacing: '3px',
      color: '#a31d1d',
      textTransform: 'uppercase',
      fontWeight: 600,
      display: 'block',
      marginBottom: '10px'
    },
    title: {
      fontSize: 'clamp(32px, 5vw, 56px)',
      fontWeight: 900,
      margin: '0',
      letterSpacing: '-1px',
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '20px',
      width: '100%',
      maxWidth: '1100px',
    },
    card: (isActive) => ({
      background: isActive ? '#111' : '#0d0d0d',
      border: `1px solid ${isActive ? '#a31d1d' : '#1a1a1a'}`,
      padding: '30px',
      borderRadius: '4px',
      transition: 'all 0.4s ease',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
    }),
    cardWord: (isActive) => ({
      fontSize: '28px',
      fontWeight: 900,
      color: isActive ? '#fff' : '#444',
      margin: '0 0 5px',
      transition: 'color 0.3s',
    })
  }

  return (
    <section style={s.section}>
      {/* Dynamic Style Tag for the Animation */}
      <style>{`
        @keyframes letterWave {
          0%, 100% { color: #fff; }
          20% { color: #a31d1d; }
          40% { color: #fff; }
        }
        .wave-letter {
          animation: letterWave 3s infinite;
        }
      `}</style>

      <div style={s.header}>
        <span style={s.eyebrow}>2026 Mandate</span>
        <h2 style={s.title}>
          {headingText.map((char, i) => (
            <span 
              key={i} 
              className="wave-letter" 
              style={{ 
                animationDelay: `${i * 0.1}s`,
                whiteSpace: char === " " ? "pre" : "normal"
              }}
            >
              {char}
            </span>
          ))}
        </h2>
      </div>

      <div style={s.grid}>
        {themes.map((t, i) => (
          <div 
            key={t.word} 
            style={s.card(active === i)}
            onMouseEnter={() => setActive(i)}
          >
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#444', marginBottom: '10px', display: 'block' }}>{t.num}</span>
            <h3 style={s.cardWord(active === i)}>{t.word}</h3>
            <p style={{ fontSize: '13px', color: '#a31d1d', fontStyle: 'italic', marginBottom: '15px' }}>{t.tagline}</p>
            <p style={{ fontSize: '12px', color: '#666', lineHeight: '1.6', margin: 0 }}>
              {i === 0 && "See past the noise to find the core pattern."}
              {i === 1 && "Shape systems with purpose and precision."}
              {i === 2 && "Forge new paths where none existed."}
            </p>
            
            <div style={{
              position: 'absolute', bottom: 0, left: 0, height: '2px',
              background: '#a31d1d', width: active === i ? '100%' : '0%',
              transition: 'width 0.4s ease'
            }} />
          </div>
        ))}
      </div>
    </section>
  )
}