import { useEffect, useState } from 'react'

const themes = [
  { word: 'DECODE', num: '01', tagline: 'Unravel the hidden.', visual: '010101' },
  { word: 'DESIGN', num: '02', tagline: 'Shape with intent.', visual: '■ □ ■' },
  { word: 'DISRUPT', num: '03', tagline: 'Break the norm.', visual: '⚡' },
]

export default function Theme() {
  const [active, setActive] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const s = {
    section: {
      backgroundColor: '#0a0a0a',
      color: '#fff',
      padding: isMobile ? '60px 15px' : '100px 20px',
      fontFamily: "'Poppins', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    header: { textAlign: 'center', marginBottom: '50px', width: '100%' },
    eyebrow: {
      fontSize: '12px',
      letterSpacing: '4px',
      color: '#a31d1d',
      textTransform: 'uppercase',
      fontWeight: 700,
      display: 'block',
      marginBottom: '15px'
    },
    title: {
      fontSize: isMobile ? '50px' : 'clamp(40px, 6vw, 64px)', 
      fontWeight: 900,
      margin: '0',
      letterSpacing: isMobile ? '-1px' : '-2px',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: isMobile ? '0px' : '20px',
      lineHeight: isMobile ? '0.9' : '1.1',
      textTransform: 'uppercase'
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
      padding: '35px',
      borderRadius: '4px',
      transition: 'all 0.4s ease',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
    }),
    cardWord: (isActive) => ({
      fontSize: '32px',
      fontWeight: 900,
      color: isActive ? '#fff' : '#444',
      margin: '0 0 5px',
      transition: 'color 0.3s',
    })
  }

  const AnimatedWord = ({ text, delayOffset = 0 }) => (
    <span style={{ display: 'inline-flex' }}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="wave-letter"
          style={{
            animationDelay: `${(i + delayOffset) * 0.1}s`,
            whiteSpace: char === " " ? "pre" : "normal"
          }}
        >
          {char}
        </span>
      ))}
    </span>
  )

  return (
    <section style={s.section}>
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
        <span style={s.eyebrow}>THEME 2026</span>
        <h2 style={s.title}>
          <div style={{ display: isMobile ? 'block' : 'contents' }}>
            <AnimatedWord text="DECODE." />
            {!isMobile && " "}
            <AnimatedWord text="DESIGN." delayOffset={7} />
          </div>
          <AnimatedWord text="DISRUPT." delayOffset={14} />
        </h2>
      </div>

      <div style={s.grid}>
        {themes.map((t, i) => (
          <div 
            key={t.word} 
            style={s.card(active === i)}
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(i)}
          >
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#444', marginBottom: '10px', display: 'block' }}>{t.num}</span>
            <h3 style={s.cardWord(active === i)}>{t.word}</h3>
            <p style={{ fontSize: '14px', color: '#a31d1d', fontStyle: 'italic', marginBottom: '15px', fontWeight: 500 }}>{t.tagline}</p>
            <p style={{ fontSize: '13px', color: '#888', lineHeight: '1.6', margin: 0 }}>
              {i === 0 && "See past the noise to find the core pattern."}
              {i === 1 && "Shape systems with purpose and precision."}
              {i === 2 && "Forge new paths where none existed."}
            </p>
            
            <div style={{
              position: 'absolute', bottom: 0, left: 0, height: '3px',
              background: '#a31d1d', width: active === i ? '100%' : '0%',
              transition: 'width 0.4s ease'
            }} />
          </div>
        ))}
      </div>
    </section>
  )
}