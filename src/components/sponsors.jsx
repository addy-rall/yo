import React, { useState, useEffect } from 'react';

import sponsor1 from '../assets/stall.png';
import sponsor2 from '../assets/cent.png';
import sponsor3 from '../assets/kang.png';

const partners = {
  mainSponsor: [
    { name: 'Centurion Defence Academy',   logo: sponsor2 },
    { name: 'The Fancave',   logo: sponsor1 },
    { name: 'Kangaroo Trampoline Park ', logo: sponsor3 },
  ],
};

export default function Partners() {
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
      padding: isMobile ? '80px 24px' : '120px 40px',
      fontFamily: theme.fontFamily,
      textAlign: 'center',
      color: theme.white,
    },
    heading: {
      fontSize: isMobile ? '36px' : '52px',
      fontWeight: '900',
      marginBottom: isMobile ? '60px' : '80px',
      letterSpacing: '-1px',
    },
    redText: {
      color: theme.dullRed,
      marginRight: '12px',
    },
    categoryTitle: {
      fontSize: '13px',
      letterSpacing: '3px',
      textTransform: 'uppercase',
      color: '#666',
      marginBottom: '40px',
      borderBottom: `1px solid ${theme.dullRed}`,
      paddingBottom: '8px',
      display: 'inline-block',
    },
    sponsorCardsRow: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: isMobile ? '40px' : '64px',
      flexWrap: 'wrap',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    frame: {
      padding: '24px',
      border: '2px solid #222',
      backgroundColor: '#050505',
    },
    imageContainer: {
      width: isMobile ? '240px' : '320px',
      height: isMobile ? '150px' : '200px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    logo: {
      maxWidth: '90%',
      maxHeight: '90%',
      objectFit: 'contain',
    },
    partnerName: {
      marginTop: '20px',
      fontSize: '15px',
      fontWeight: '600',
      color: theme.white,
      letterSpacing: '0.5px',
    },
  };

  const renderCard = (partner, id) => (
    <div
      key={id}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div style={styles.frame}>
        <div style={styles.imageContainer}>
          <img src={partner.logo} alt={partner.name} style={styles.logo} />
        </div>
      </div>
      <p style={styles.partnerName}>{partner.name}</p>
    </div>
  );

  return (
    <section style={styles.section}>
      <style>{styles.fontImport}</style>

      <h2 style={styles.heading}>
        <span style={styles.redText}>Our</span>Partners
      </h2>

      <h3 style={styles.categoryTitle}>Sponsors</h3>

      <div style={styles.sponsorCardsRow}>
        {partners.mainSponsor.map((partner, idx) =>
          renderCard(partner, `main-${idx}`)
        )}
      </div>
    </section>
  );
}
