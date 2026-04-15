import React, { useState, useEffect } from 'react';

// Assets
import img4 from '../assets/img4.png';
import k from '../assets/y.png';

const ChiefGuestSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const theme = {
    fontFamily: "'Poppins', sans-serif",
    tedRed: '#ED1C24',
    darkBg: '#0F0F0F',
    white: '#FFFFFF',
  };

  const styles = {
    fontImport: `
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;900&display=swap');
    `,
    container: {
      backgroundColor: theme.darkBg,
      padding: isMobile ? '20px 10px' : '40px 20px', // Reduced padding
      color: theme.white,
      textAlign: 'center',
      fontFamily: theme.fontFamily,
    },
    // Split color heading with camelCase
    heading: {
      fontSize: isMobile ? '32px' : '56px',
      fontWeight: '900',
      textTransform: 'none', // Allows camelCase to show
      letterSpacing: '-1px',
      marginBottom: '40px',
    },
    redText: { color: theme.tedRed },
    whiteText: { color: theme.white },

    grid: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: isMobile ? '50px' : '80px',
      maxWidth: '1100px',
      margin: '0 auto',
    },
    // Square Frame Decoration
    imageWrapper: {
      position: 'relative',
      padding: '10px',
      border: `2px solid ${theme.tedRed}`, // Red border around photo
      display: 'inline-block',
    },
    // Decorative "Corner" or "Frame" offset
    decoration: {
      position: 'absolute',
      top: '-10px',
      right: '-10px',
      width: '40px',
      height: '40px',
      borderTop: `4px solid ${theme.tedRed}`,
      borderRight: `4px solid ${theme.tedRed}`,
      zIndex: 1,
    },
    imageContainer: {
      width: isMobile ? '260px' : '320px',
      height: isMobile ? '300px' : '380px',
      overflow: 'hidden',
      backgroundColor: '#1a1a1a',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      filter: 'grayscale(20%)', // Optional: adds to the serious TED tone
    },
    info: {
      marginTop: '20px',
      textAlign: isMobile ? 'center' : 'left',
    },
    name: {
      fontSize: '22px',
      fontWeight: '700',
      margin: '0',
      textTransform: 'uppercase',
    },
    title: {
      fontSize: '14px',
      color: theme.tedRed,
      margin: '5px 0 0',
      fontWeight: '600',
      letterSpacing: '1px',
    }
  };

  return (
    <>
      <style>{styles.fontImport}</style>
      <section style={styles.container}>
        
        <h2 style={styles.heading}>
          <span style={styles.redText}>Chief </span>
          
          <span style={styles.whiteText}>Guests</span>
        </h2>

        <div style={styles.grid}>
          {/* Guest 1 */}
          <div style={{ textAlign: 'center' }}>
            <div style={styles.imageWrapper}>
              <div style={styles.decoration}></div>
              <div style={styles.imageContainer}>
                <img src={img4} alt="Chief Guest" style={styles.image} />
              </div>
            </div>
            <div style={styles.info}>
              <h3 style={styles.name}>Guest Name One</h3>
              <p style={styles.title}>CHIEF GUEST</p>
            </div>
          </div>

          {/* Guest 2 */}
          <div style={{ textAlign: 'center' }}>
            <div style={styles.imageWrapper}>
              <div style={styles.decoration}></div>
              <div style={styles.imageContainer}>
                <img src={k} alt="Honorable Guest" style={styles.image} />
              </div>
            </div>
            <div style={styles.info}>
              <h3 style={styles.name}>Guest Name Two</h3>
              <p style={styles.title}>SPECIAL INVITEE</p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default ChiefGuestSection;