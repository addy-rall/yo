import React, { useState } from 'react';

// Assets
import priyaImg from '../assets/img1.png';
import rahulImg from '../assets/img2.png';
import nadiaImg from '../assets/img3.png';
import arjunImg from '../assets/img4.png';
import image1 from '../assets/image1.png';

const speakers = [
  { id: '01', name: 'Vijendra Chauhan', role: 'AI Researcher', org: 'IIT Delhi', img: arjunImg, bio: 'A pioneering researcher in ethical AI with 15+ years of experience at leading tech institutions.', color: '#e62b1e' },
  { id: '02', name: 'Gajendra Purohit', role: 'Entrepreneur', org: 'FutureTech Labs', img: nadiaImg, bio: 'Serial entrepreneur and author. Mentored 8,000+ students through startup programmes.', color: '#e62b1e' },
  { id: '03', name: 'speaker3', role: 'Neuroscientist', org: 'AIIMS Delhi', img: rahulImg, bio: 'Renowned for research on memory. TED talk has over 4 million views.', color: '#e62b1e' },
  { id: '04', name: 'Arjun Verma', role: 'Climate Activist', org: 'GreenFuture India', img: priyaImg, bio: 'Named one of Forbes 30 Under 30 for his environmental movement work.', color: '#e62b1e' },
  { id: '05', name: 'Speaker 5', role: 'Innovator', org: 'Org 5', img: image1, bio: 'Leading breakthroughs in sustainable energy and modular design.', color: '#e62b1e' },
  { id: '06', name: 'Speaker 6', role: 'Tech Evangelist', org: 'Org 6', img: image1, bio: 'Specialist in decentralized networks and the future of digital identity.', color: '#e62b1e' },
];

export default function UniqueSpeakersPage() {
  const [hovered, setHovered] = useState(null);

  const s = {
    page: {
      backgroundColor: '#050505',
      color: '#fff',
      padding: '100px 5vw',
      fontFamily: "'Poppins', sans-serif",
      minHeight: '100vh',
    },
    header: {
      marginBottom: '100px',
      position: 'relative',
    },
    massiveText: {
      position: 'absolute',
      top: '-40px',
      left: '-20px',
      fontSize: '12vw',
      fontWeight: '900',
      color: 'rgba(255,255,255,0.03)',
      zIndex: 0,
      lineHeight: 0.8,
      pointerEvents: 'none',
      textTransform: 'uppercase',
    },
    title: {
      fontSize: 'clamp(3rem, 8vw, 6rem)',
      fontWeight: '900',
      position: 'relative',
      zIndex: 1,
      margin: 0,
    },
    grid: {
      display: 'flex',
      flexDirection: 'column',
      gap: '150px', // Large gap for a "one by one" editorial feel
      maxWidth: '1200px',
      margin: '0 auto',
    },
    row: (isEven) => ({
      display: 'flex',
      flexDirection: isEven ? 'row-reverse' : 'row',
      alignItems: 'center',
      gap: '60px',
      flexWrap: 'wrap',
    }),
    imgContainer: {
      flex: '1 1 500px',
      position: 'relative',
      height: '600px',
      overflow: 'visible',
    },
    imgFrame: (color) => ({
      width: '100%',
      height: '100%',
      backgroundColor: '#111',
      position: 'relative',
      zIndex: 2,
      border: `1px solid rgba(255,255,255,0.1)`,
      transition: '0.5s ease',
    }),
    mainImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      filter: 'grayscale(100%) contrast(1.1)',
      transition: '0.5s ease',
    },
    accentBox: {
      position: 'absolute',
      top: '30px',
      left: '-30px',
      width: '100%',
      height: '100%',
      border: '2px solid #e62b1e',
      zIndex: 1,
    },
    info: {
      flex: '1 1 400px',
      zIndex: 3,
    },
    number: {
      fontSize: '4rem',
      fontStyle: 'italic',
      fontWeight: '900',
      WebkitTextStroke: '1px rgba(255,255,255,0.2)',
      color: 'transparent',
      marginBottom: '10px',
      display: 'block',
    },
    name: {
      fontSize: '3rem',
      fontWeight: '800',
      lineHeight: 1.1,
      marginBottom: '15px',
      textTransform: 'uppercase',
    },
    bio: {
      fontSize: '1.1rem',
      lineHeight: '1.8',
      color: '#aaa',
      maxWidth: '450px',
    }
  };

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div style={s.massiveText}>Visionaries</div>
        <h1 style={s.title}>THE <span style={{color: '#e62b1e'}}>LINEUP</span></h1>
      </div>

      <div style={s.grid}>
        {speakers.map((speaker, i) => {
          const isHovered = hovered === i;
          return (
            <div 
              key={i} 
              style={s.row(i % 2 !== 0)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Image Side */}
              <div style={s.imgContainer}>
                <div style={s.accentBox}></div>
                <div style={s.imgFrame(speaker.color)}>
                  <img 
                    src={speaker.img} 
                    alt={speaker.name} 
                    style={{
                      ...s.mainImg,
                      filter: isHovered ? 'grayscale(0%)' : 'grayscale(100%) contrast(1.1)',
                      transform: isHovered ? 'translate(15px, -15px)' : 'none'
                    }} 
                  />
                </div>
              </div>

              {/* Text Side */}
              <div style={s.info}>
                <span style={s.number}>{speaker.id}</span>
                <h2 style={s.name}>{speaker.name}</h2>
                <p style={{color: '#e62b1e', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '20px'}}>
                  {speaker.role} // {speaker.org}
                </p>
                <p style={s.bio}>{speaker.bio}</p>
                
                <div style={{marginTop: '30px', display: 'flex', gap: '20px'}}>
                   <button style={{background: 'none', border: '1px solid #fff', color: '#fff', padding: '10px 25px', cursor: 'pointer', fontSize: '0.8rem', letterSpacing: '2px'}}>LINKEDIN</button>
                   <button style={{background: '#e62b1e', border: '1px solid #e62b1e', color: '#fff', padding: '10px 25px', cursor: 'pointer', fontSize: '0.8rem', letterSpacing: '2px'}}>INSTAGRAM</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}