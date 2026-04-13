import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Team() {
  const isMobile = window.innerWidth < 768;

  const s = {
    page: {
      backgroundColor: '#0a0a0a',
      color: '#fff',
      fontFamily: "'Poppins', sans-serif",
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
    container: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '0 20px',
      position: 'relative',
    },
    visualContainer: {
      position: 'relative',
      width: isMobile ? '200px' : '300px',
      height: isMobile ? '200px' : '300px',
      marginBottom: '40px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    statusBadge: {
      background: 'rgba(230, 43, 30, 0.1)',
      color: '#e62b1e',
      padding: '8px 16px',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: 700,
      letterSpacing: '2px',
      textTransform: 'uppercase',
      marginBottom: '20px',
      border: '1px solid rgba(230, 43, 30, 0.3)',
    },
    title: {
      fontSize: isMobile ? '2.5rem' : '4.5rem',
      fontWeight: 900,
      textTransform: 'uppercase',
      letterSpacing: isMobile ? '-1px' : '-3px',
      margin: 0,
    },
    description: {
      color: '#666',
      fontSize: '1rem',
      maxWidth: '450px',
      marginTop: '15px',
      lineHeight: '1.6',
    }
  };

  return (
    <div style={s.page}>
      <Navbar />

      <style>{`
        /* Pulsing Core Animation */
        @keyframes pulseRing {
          0% { transform: scale(0.8); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.2; }
          100% { transform: scale(0.8); opacity: 0.5; }
        }

        @keyframes rotateBeam {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .outer-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 2px solid rgba(230, 43, 30, 0.2);
          border-radius: 50%;
          animation: pulseRing 4s infinite ease-in-out;
        }

        .scanning-beam {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: conic-gradient(from 0deg, transparent 70%, rgba(230, 43, 30, 0.4) 100%);
          animation: rotateBeam 3s linear infinite;
        }

        .core-dot {
          width: 12px;
          height: 12px;
          background: #e62b1e;
          border-radius: 50%;
          box-shadow: 0 0 20px #e62b1e, 0 0 40px #e62b1e;
        }
      `}</style>

      <main style={s.container}>
        <div style={s.visualContainer}>
          <div className="outer-ring"></div>
          <div className="scanning-beam"></div>
          <div className="core-dot"></div>
        </div>

        <div style={s.statusBadge}>System: Processing</div>
        
        <h1 style={s.title}>
          TEAM <span style={{ color: '#e62b1e' }}>2026</span>
        </h1>
        
        <p style={s.description}>
          Our board of curators and organizers is currently being finalized. 
          The full lineup of visionaries behind <strong>TEDxBBAU</strong> will be revealed soon.
        </p>
      </main>

      <Footer />
    </div>
  );
}
