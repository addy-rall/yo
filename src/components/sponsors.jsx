import React, { useState, useEffect } from 'react';

import sponsor1 from '../assets/stall1.PNG';
import sponsor2 from '../assets/cent.png';
import sponsor3 from '../assets/kanga.jpeg';

const partners = {
  mainSponsor: [
    { name: 'Centurion Defence Academy', logo: sponsor2 },
  ],
  stallPartners: [
    { name: 'The Fancave', logo: sponsor1 },
    { name: 'Kangaroo Trampoline Park', logo: sponsor3 },
  ],
};

export default function Partners() {
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

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
    globalStyle: `
      .partner-frame {
        transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
      }
      .partner-frame:hover {
        transform: translateY(-6px);
        border-color: #B32D2D !important;
        box-shadow: 0 12px 32px rgba(179, 45, 45, 0.25);
      }
      .partner-name {
        transition: color 0.3s ease;
      }
      .partner-card:hover .partner-name {
        color: #B32D2D !important;
      }
    `,
    section: {
      backgroundColor: theme.darkBg,
      padding: isMobile ? '60px 16px' : '120px 40px',
      fontFamily: theme.fontFamily,
      textAlign: 'center',
      color: theme.white,
    },
    heading: {
      fontSize: isMobile ? '32px' : '52px',
      fontWeight: '900',
      marginBottom: isMobile ? '48px' : '80px',
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
    sectionGap: {
      marginTop: isMobile ? '60px' : '100px',
    },
    sponsorCardsRow: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: isMobile ? '32px' : '64px',
      flexWrap: 'wrap',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    frame: (size) => ({
      padding: '12px',
      border: '2px solid #222',
      backgroundColor: '#050505',
      overflow: 'hidden',
      width: size.width,
      height: size.height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),
    logo: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
    },
    partnerName: {
      marginTop: '16px',
      fontSize: isMobile ? '13px' : '15px',
      fontWeight: '600',
      color: theme.white,
      letterSpacing: '0.5px',
    },
  };

  // main sponsor gets a bigger frame
  const getFrameSize = (isMain) => {
    if (isMain) {
      return {
        width: isMobile ? '260px' : '400px',
        height: isMobile ? '180px' : '260px',
      };
    }
    return {
      width: isMobile ? '200px' : '300px',
      height: isMobile ? '130px' : '180px',
    };
  };

  const renderCard = (partner, id, isMain = false) => {
    const size = getFrameSize(isMain);
    return (
      <div
        key={id}
        className="partner-card"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
      >
        <div className="partner-frame" style={styles.frame(size)}>
          <img src={partner.logo} alt={partner.name} style={styles.logo} />
        </div>
        <p className="partner-name" style={styles.partnerName}>{partner.name}</p>
      </div>
    );
  };

  return (
    <section style={styles.section}>
      <style>{styles.fontImport}</style>
      <style>{styles.globalStyle}</style>

      <h2 style={styles.heading}>
        <span style={styles.redText}>Our</span>Partners
      </h2>

      {/* Sponsors */}
      <h3 style={styles.categoryTitle}>Sponsors</h3>
      <div style={styles.sponsorCardsRow}>
        {partners.mainSponsor.map((partner, idx) =>
          renderCard(partner, `main-${idx}`, true)
        )}
      </div>

      {/* Stall Partners */}
      <div style={styles.sectionGap}>
        <h3 style={styles.categoryTitle}>Stall Partners</h3>
        <div style={styles.sponsorCardsRow}>
          {partners.stallPartners.map((partner, idx) =>
            renderCard(partner, `stall-${idx}`, false)
          )}
        </div>
      </div>
    </section>
  );
}