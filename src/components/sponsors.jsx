import React, { useState, useEffect } from 'react';

const partners = {
  mediaPartner: [
    { name: 'Media Partner Name', logo: 'https://via.placeholder.com/200x100?text=Media+Partner' },
  ],
  stallPartner: [
    { name: 'Stall Partner Name', logo: 'https://via.placeholder.com/200x100?text=Stall+Partner' },
  ],
};

export default function Partners() {
  const [hovered, setHovered] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const theme = {
    fontFamily: "'Poppins', sans-serif",
    dullRed: '#B32D2D', 
    darkBg: '#0F0F0F',
    white: '#FFFFFF',
  };

  const styles = {
    fontImport: `
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;900&display=swap');
    `,
    section: {
      backgroundColor: theme.darkBg,
      // Increased vertical padding (80px/120px)
      padding: isMobile ? '80px 24px' : '120px 40px',
      fontFamily: theme.fontFamily,
      textAlign: 'center',
      color: theme.white,
    },
    heading: {
      fontSize: isMobile ? '36px' : '52px',
      fontWeight: '900',
      // Increased space below the main heading
      marginBottom: isMobile ? '60px' : '80px',
      letterSpacing: '-1px',
    },
    redText: { 
      color: theme.dullRed,
      marginRight: '12px' 
    },
    grid: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'center',
      gap: isMobile ? '60px' : '100px', // Increased gap between categories
      maxWidth: '1100px',
      margin: '0 auto',
    },
    categoryWrapper: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    categoryTitle: {
      fontSize: '13px',
      letterSpacing: '3px',
      textTransform: 'uppercase',
      color: '#666',
      // Increased padding inside the category titles
      marginBottom: '35px',
      borderBottom: `1px solid ${theme.dullRed}`,
      paddingBottom: '8px',
    },
    frame: (id) => ({
      position: 'relative',
      // Added internal padding to the square frame
      padding: '15px',
      border: `2px solid ${hovered === id ? theme.dullRed : '#222'}`,
      transition: 'all 0.3s ease',
      backgroundColor: '#050505',
    }),
    imageContainer: {
      width: isMobile ? '220px' : '260px',
      height: '130px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    logo: (id) => ({
      maxWidth: '80%',
      maxHeight: '80%',
      filter: hovered === id ? 'grayscale(0%) brightness(1)' : 'grayscale(100%) brightness(0.6)',
      transition: 'all 0.4s ease',
    }),
    partnerName: {
      marginTop: '20px',
      fontSize: '15px',
      fontWeight: '600',
      color: theme.white,
      letterSpacing: '0.5px'
    }
  };

  const renderCategory = (title, data, idPrefix) => (
    <div style={styles.categoryWrapper}>
      <h3 style={styles.categoryTitle}>{title}</h3>
      {data.map((partner, idx) => {
        const id = `${idPrefix}-${idx}`;
        return (
          <div 
            key={id} 
            onMouseEnter={() => setHovered(id)} 
            onMouseLeave={() => setHovered(null)}
            style={{ cursor: 'pointer' }}
          >
            <div style={styles.frame(id)}>
              <div style={styles.imageContainer}>
                <img src={partner.logo} alt={partner.name} style={styles.logo(id)} />
              </div>
            </div>
            <p style={styles.partnerName}>{partner.name}</p>
          </div>
        );
      })}
    </div>
  );

  return (
    <section style={styles.section}>
      <style>{styles.fontImport}</style>
      
      <h2 style={styles.heading}>
        <span style={styles.redText}>Our</span>Partners
      </h2>

      <div style={styles.grid}>
        {renderCategory('Media Partner', partners.mediaPartner, 'media')}
        {renderCategory('Stall Partner', partners.stallPartner, 'stall')}
      </div>
    </section>
  );
}