import React, { useState, useEffect } from 'react';

const sponsors = {
  platinum: [
    { name: 'Global Tech Corp', logo: 'https://via.placeholder.com/200x100?text=Platinum+Partner', desc: 'Innovation Lead' },
  ],
  gold: [
    { name: 'Future Systems', logo: 'https://via.placeholder.com/180x80?text=Gold+Partner' },
    { name: 'Creative Labs', logo: 'https://via.placeholder.com/180x80?text=Gold+Partner' },
  ],
  silver: [
    { name: 'Eco Energy', logo: 'https://via.placeholder.com/150x60?text=Silver+Partner' },
    { name: 'Digital Trust', logo: 'https://via.placeholder.com/150x60?text=Silver+Partner' },
    { name: 'Venture Plus', logo: 'https://via.placeholder.com/150x60?text=Silver+Partner' },
  ],
};

export default function Sponsors() {
  const [hovered, setHovered] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const styles = {
    section: {
      backgroundColor: '#000',
      padding: isMobile ? '60px 20px' : '100px 40px',
      fontFamily: "'Arial', sans-serif",
      display: 'flex',
      justifyContent: 'center',
    },
    container: {
      width: '100%',
      maxWidth: '1300px',
      border: '1.5px solid #b32d2d',
      backgroundColor: '#050505',
      padding: isMobile ? '40px 20px' : '80px 60px',
      textAlign: 'center',
      boxShadow: '0 0 25px rgba(179, 45, 45, 0.15)',
    },
    eyebrow: {
      color: '#b32d2d',
      textTransform: 'uppercase',
      fontSize: '13px',
      letterSpacing: '4px',
      marginBottom: '10px',
      display: 'block',
    },
    title: {
      color: '#fff',
      fontSize: isMobile ? '32px' : '48px',
      fontWeight: '800',
      marginBottom: '20px',
      marginTop: '0',
    },
    sub: {
      color: '#888',
      fontSize: '16px',
      maxWidth: '700px',
      margin: '0 auto 60px',
      lineHeight: '1.6',
    },
    tierWrapper: {
      marginBottom: '50px',
    },
    tierTitle: {
      color: '#555',
      fontSize: '12px',
      textTransform: 'uppercase',
      letterSpacing: '3px',
      marginBottom: '30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '15px',
    },
    line: {
      height: '1px',
      background: '#222',
      flex: 1,
    },
    grid: (tier) => ({
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: tier === 'platinum' ? '40px' : '20px',
    }),
    card: (tier, id) => ({
      backgroundColor: '#0a0a0a',
      border: `1px solid ${hovered === id ? '#b32d2d' : '#1a1a1a'}`,
      borderRadius: '12px',
      padding: tier === 'platinum' ? '40px' : '25px',
      width: tier === 'platinum' ? '350px' : tier === 'gold' ? '280px' : '200px',
      transition: 'all 0.4s ease',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      transform: hovered === id ? 'translateY(-10px)' : 'translateY(0)',
      boxShadow: hovered === id ? '0 10px 20px rgba(0,0,0,0.5)' : 'none',
    }),
    logo: {
      maxWidth: '100%',
      height: 'auto',
      filter: 'grayscale(100%) brightness(0.8)',
      transition: 'filter 0.3s ease',
    },
    cta: {
      marginTop: '60px',
      padding: '15px 35px',
      backgroundColor: 'transparent',
      border: '1px solid #b32d2d',
      color: '#fff',
      fontSize: '14px',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      cursor: 'pointer',
      borderRadius: '4px',
      transition: 'all 0.3s ease',
    }
  };

  const renderTier = (tierName, data) => (
    <div style={styles.tierWrapper}>
      <div style={styles.tierTitle}>
        <div style={styles.line} />
        {tierName} PARTNERS
        <div style={styles.line} />
      </div>
      <div style={styles.grid(tierName)}>
        {data.map((item, idx) => {
          const id = `${tierName}-${idx}`;
          return (
            <div
              key={id}
              style={styles.card(tierName, id)}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
            >
              <img 
                src={item.logo} 
                alt={item.name} 
                style={{
                  ...styles.logo,
                  filter: hovered === id ? 'grayscale(0%) brightness(1)' : 'grayscale(100%) brightness(0.8)'
                }} 
              />
              {tierName === 'platinum' && (
                <p style={{ color: '#666', fontSize: '12px', marginTop: '15px', letterSpacing: '1px' }}>
                  {item.desc}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <span style={styles.eyebrow}>Our Partners</span>
        <h2 style={styles.title}>Supported By</h2>
        <p style={styles.sub}>
          We are proud to collaborate with organizations that share our commitment to 
          spreading ideas that challenge and inspire change.
        </p>

        {renderTier('platinum', sponsors.platinum)}
        {renderTier('gold', sponsors.gold)}
        {renderTier('silver', sponsors.silver)}

        <button 
          style={{
            ...styles.cta,
            backgroundColor: hovered === 'btn' ? '#b32d2d' : 'transparent'
          }}
          onMouseEnter={() => setHovered('btn')}
          onMouseLeave={() => setHovered(null)}
          onClick={() => window.location.href = 'mailto:sponsors@tedxbbau.in'}
        >
          Become a Sponsor
        </button>
      </div>
    </section>
  );
}