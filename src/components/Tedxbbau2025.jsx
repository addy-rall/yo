import React, { useState, useEffect } from 'react';
import skylineImg from '../assets/skyline.png'; 

// Array for the 2024 Showcase Gallery
const galleryImages = [
  {
    id: 1,
    url: 'https://via.placeholder.com/1200x600/111/fff?text=TEDxBBAU+2024+Main+Stage',
    label: 'UNVEILING HIDDEN TRUTHS',
    description: 'Our most ambitious event yet, bringing together 500+ attendees to explore technology and human intent.'
  },
  {
    id: 2,
    url: 'https://via.placeholder.com/1200x600/b32318/fff?text=2024+Speakers+Highlights',
    label: 'Powerful Conversations',
    description: 'Visionaries from diverse fields shared ideas that challenge perspectives and spark change.'
  },
  {
    id: 3,
    url: 'https://via.placeholder.com/1200x600/333/fff?text=Networking+and+Community',
    label: 'Connecting Minds',
    description: 'A vibrant community of students and professionals engaging in deep discussions.'
  }
];

export default function TedxBbau2025() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = window.innerWidth < 768;

  // Navigation Logic
  const handleNext = () => {
    setCurrentSlide((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const s = {
    page: { backgroundColor: '#050505', color: '#fff', fontFamily: "'Poppins', sans-serif", minHeight: '100vh' },
    
    // --- Hero Section ---
    hero: {
      position: 'relative',
      width: '100%',
      height: isMobile ? '70vh' : '85vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '0 20px',
      overflow: 'hidden'
    },
    skylineBg: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      maxWidth: '1400px',
      opacity: 0.4,
      zIndex: 1,
      pointerEvents: 'none',
    },
    heroContent: { position: 'relative', zIndex: 5, maxWidth: '900px' },
    eyebrow: { color: '#e62b1e', fontSize: '14px', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 800, marginBottom: '20px', display: 'block' },
    mainTitle: { fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, lineHeight: 1.1, margin: '0 0 40px' },
    
    // --- Buttons ---
    btnPrimary: {
      display: 'inline-block',
      padding: '14px 32px',
      background: '#e62b1e',
      color: '#fff',
      textDecoration: 'none',
      fontWeight: 700,
      borderRadius: '4px',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      fontSize: '0.85rem',
      transition: 'all 0.3s ease',
      border: 'none',
      cursor: 'pointer'
    },

    // --- Last Year Spotlight (Slider) ---
    spotlight: { padding: isMobile ? '80px 20px' : '120px 60px', background: '#0a0a0a' },
    sliderContainer: {
      maxWidth: '1100px',
      margin: '0 auto',
      position: 'relative',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.05)'
    },
    spotlightImg: {
      width: '100%',
      height: isMobile ? '350px' : '550px',
      objectFit: 'cover',
      filter: isHovered ? 'grayscale(0%)' : 'grayscale(100%)',
      transition: 'all 0.8s ease'
    },
    navArrow: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'rgba(0,0,0,0.5)',
      color: 'white',
      border: 'none',
      width: '45px',
      height: '45px',
      borderRadius: '50%',
      cursor: 'pointer',
      fontSize: '20px',
      zIndex: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background 0.3s'
    },
    dotContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '8px',
      marginTop: '20px'
    },
    dot: (active) => ({
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      backgroundColor: active ? '#e62b1e' : '#333',
      cursor: 'pointer',
      transition: 'background 0.3s'
    })
  };

  return (
    <div style={s.page} id='tedxbbau2025'>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade { animation: fadeIn 1s ease-out forwards; }
      `}</style>

      {/* HERO SECTION */}
      <section style={s.hero}>
        <div style={s.heroContent} className="animate-fade">
          <span style={s.eyebrow}>TEDx<span style={{color:'#fff'}}>BBAU</span> 2025</span>
          <h1 style={s.mainTitle}>Unveiling <br/> <span style={{color:'#e62b1e'}}>Hidden Truths</span></h1>
          
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a 
              href="https://tedxbbau.com" 
              target="_blank" 
              rel="noreferrer" 
              style={s.btnPrimary}
              onMouseEnter={(e) => e.target.style.background = '#b32318'}
              onMouseLeave={(e) => e.target.style.background = '#e62b1e'}
            >
              Visit Previous Website →
            </a>
          </div>
        </div>
        <img src={skylineImg} alt="Lucknow Skyline" style={s.skylineBg} />
      </section>

      {/* SHOWCASING 2024 GALLERY */}
      <section style={s.spotlight}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={s.eyebrow}>The Legacy</span>
          <h2 style={{ fontSize: isMobile ? '2rem' : '3rem', fontWeight: 800 }}>GALLERY <span style={{color:'#e62b1e'}}>TEDxBBAU 2025</span></h2>
        </div>

        <div 
          style={s.sliderContainer}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Navigation Arrows */}
          <button style={{ ...s.navArrow, left: '20px' }} onClick={handlePrev}>❮</button>
          <button style={{ ...s.navArrow, right: '20px' }} onClick={handleNext}>❯</button>

          {/* Current Slide Image */}
          <img 
            src={galleryImages[currentSlide].url} 
            alt={galleryImages[currentSlide].label} 
            style={s.spotlightImg} 
          />
          
          {/* Slide Caption Overlay */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: isMobile ? '40px 20px 20px' : '60px 50px 40px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.9) 20%, transparent 100%)',
            textAlign: 'left'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '10px' }}>{galleryImages[currentSlide].label}</h3>
            <p style={{ color: '#aaa', maxWidth: '600px', fontSize: '0.95rem', lineHeight: '1.6' }}>
              {galleryImages[currentSlide].description}
            </p>
          </div>
        </div>

        {/* Slider Dots */}
        <div style={s.dotContainer}>
          {galleryImages.map((_, index) => (
            <div 
              key={index} 
              style={s.dot(currentSlide === index)} 
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* ABOUT THEME 2025 */}
      <section style={{ padding: '100px 20px', textAlign: 'center', background: '#050505' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '30px' }}>About the <span style={{color:'#e62b1e'}}>2025 Theme</span></h2>
          <p style={{ color: '#888', lineHeight: '1.8', fontSize: '1.1rem' }}>
            "Unveiling Hidden Truths" is an invitation to look deeper. In a world of surface-level information, we gather to decode the complex, design the necessary, and disrupt the comfortable. This year, we spotlight the ideas that remain in the shadows, waiting to be brought to light by the change-makers of BBAU.
          </p>
        </div>
      </section>
    </div>
  );
}