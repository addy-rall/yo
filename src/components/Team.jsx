import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function UpdatingSoon() {
  const isMobile = window.innerWidth < 768;

  const s = {
    page: {
      backgroundColor: '#0a0a0a',
      color: '#fff',
      fontFamily: "'Poppins', sans-serif",
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    },
    hero: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '0 20px',
      position: 'relative',
    },
    // The Container for the abstract X
    canvas: {
      position: 'relative',
      width: isMobile ? '280px' : '500px',
      height: isMobile ? '280px' : '500px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '20px',
    },
    title: {
      fontSize: isMobile ? '2.2rem' : '4.5rem',
      fontWeight: 900,
      textTransform: 'uppercase',
      letterSpacing: isMobile ? '-1px' : '-3px',
      margin: '0',
      zIndex: 10,
    },
    subtitle: {
      color: '#666',
      fontSize: '1rem',
      maxWidth: '500px',
      marginTop: '15px',
      lineHeight: '1.6',
      zIndex: 10,
    }
  };

  return (
    <div style={s.page}>
      <Navbar />

      <style>{`
        /* The Pulsing Core */
        .node {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #e62b1e;
          border-radius: 50%;
          box-shadow: 0 0 15px #e62b1e, 0 0 30px #e62b1e;
          animation: pulse 3s infinite ease-in-out;
        }

        /* Connecting Lines */
        .line {
          position: absolute;
          background: linear-gradient(90deg, transparent, rgba(230, 43, 30, 0.2), transparent);
          height: 1px;
          transform-origin: left;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        .x-shape {
          animation: float 6s infinite ease-in-out;
          position: absolute;
          width: 100%;
          height: 100%;
        }

        /* Customizing the lines to form an abstract X */
        .l1 { width: 140%; transform: rotate(45deg); top: 0; left: 0; }
        .l2 { width: 140%; transform: rotate(-45deg); bottom: 0; left: 0; }
        
        .glow-text {
          background: linear-gradient(to bottom, #fff 30%, #444 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      <main style={s.hero}>
        <div style={s.canvas}>
          {/* Abstract Coded X */}
          <div className="x-shape">
            <div className="line l1" style={{ opacity: 0.4 }}></div>
            <div className="line l2" style={{ opacity: 0.4 }}></div>
            
            {/* Random Nodes across the X path */}
            <div className="node" style={{ top: '10%', left: '10%', animationDelay: '0s' }}></div>
            <div className="node" style={{ top: '50%', left: '50%', animationDelay: '0.5s' }}></div>
            <div className="node" style={{ top: '90%', left: '90%', animationDelay: '1s' }}></div>
            <div className="node" style={{ top: '10%', left: '90%', animationDelay: '1.5s' }}></div>
            <div className="node" style={{ top: '90%', left: '10%', animationDelay: '2s' }}></div>
            <div className="node" style={{ top: '30%', left: '30%', animationDelay: '0.2s' }}></div>
            <div className="node" style={{ top: '70%', left: '70%', animationDelay: '0.8s' }}></div>
          </div>

          <h1 style={s.title} className="glow-text">
            COMING <span style={{ color: '#e62b1e', WebkitTextFillColor: '#e62b1e' }}>SOON</span>
          </h1>
        </div>

        <p style={s.subtitle}>
          We are currently engineering a new digital experience. <br/>
          Stay tuned as we unveil the future of <strong>TEDxBBAU</strong>.
        </p>
      </main>

      <Footer />
    </div>
  );
}