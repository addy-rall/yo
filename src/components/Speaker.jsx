import React, { useState } from 'react';

// Assets
import priyaImg from '../assets/img1.png';
import rahulImg from '../assets/img2.png';
import nadiaImg from '../assets/img3.png';
import arjunImg from '../assets/img4.png';
import image1 from '../assets/image1.png';
import imagk from '../assets/imgk.png';
import kyu from   '../assets/w.png';  

const speakers = [
  { id: '01', name: 'Dr. Vijendra Chauhan', role: 'AI Researcher', org: 'IIT Delhi', img: arjunImg, bio: 'A pioneering researcher in ethical AI with 15+ years of experience at leading tech institutions.', color: '#e62b1e' },
  { id: '02', name: 'Dr. Gajendra Purohit', role: 'Entrepreneur', org: 'FutureTech Labs', img: nadiaImg, bio: 'Serial entrepreneur and author. Mentored 8,000+ students through startup programmes.', color: '#e62b1e' },
  { id: '03', name: 'Dr. Yogeshwar Nath', role: 'Assistant Profesor and Scientist at NASA', org: 'IIT Jodhpur', img: rahulImg, bio: 'Renowned for research on memory. TED talk has over 4 million views.', color: '#e62b1e' },
  { id: '04', name: 'Mr. Aditya Ranjan', role: 'Climate Activist', org: 'GreenFuture India', img: priyaImg, bio: 'Named one of Forbes 30 Under 30 for his environmental movement work.', color: '#e62b1e' },
  { id: '05', name: 'Mr. Deepak Wadhwa', role: 'Innovator', org: 'Org 5', img: image1, bio: 'Leading breakthroughs in sustainable energy and modular design.', color: '#e62b1e' },
  { id: '06', name: 'Mr. Kiran Kumar', role: 'Tech Evangelist', org: 'Org 6', img: imagk , bio: 'Specialist in decentralized networks and the future of digital identity.', color: '#e62b1e' },
  { id: '07', name: 'Mr. Debojit Sen', role: 'Tech Evangelist', org: 'Org 7', img: kyu, bio: 'Debojit Sen is the Founder & CEO of Crack-ED, building job-ready education at scale. A first-generation entrepreneur backed by CarDekho Group, he is bridging India\'s employability gap through outcome-driven programs, strong corporate partnerships, and a fast-scaling, profitable model shaping future-ready careers. He is a recipient of the BW Disrupt 40 Under 40 Award, and under his leadership, Crack-ED was honored at the 7th BW Emerging Business Awards as the Best Skill Development Institution (MSME Category), recognizing its impact in transforming youth employability across India.', color: '#e62b1e' }
];

const LinkedInIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S.02 4.88.02 3.5 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V24h-4V8.5zm6.5 0h3.8v2.1h.05c.53-1 1.82-2.1 3.75-2.1 4.01 0 4.75 2.64 4.75 6.07V24h-4v-8.57c0-2.04-.04-4.67-2.85-4.67-2.85 0-3.29 2.23-3.29 4.53V24H7V8.5z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.974-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.516 2.497 5.783 2.225 7.15 2.163 8.416 2.105 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.013 8.332 0 8.741 0 12c0 3.259.013 3.668.072 4.948.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.987 8.741 24 12 24c3.259 0 3.668-.013 4.948-.072 1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038.059-1.28.072-1.689.072-4.948 0-3.259-.013-3.668-.072-4.948-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);

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
      gap: '150px',
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

                <div style={{marginTop: '30px', display: 'flex', gap: '18px', alignItems: 'center'}}>
                  <a href="#" style={{color: '#fff', opacity: 0.6, transition: 'opacity 0.2s', display: 'flex'}}
                    onMouseEnter={e => e.currentTarget.style.opacity = 1}
                    onMouseLeave={e => e.currentTarget.style.opacity = 0.6}>
                    <LinkedInIcon />
                  </a>
                  <a href="#" style={{color: '#e62b1e', opacity: 0.8, transition: 'opacity 0.2s', display: 'flex'}}
                    onMouseEnter={e => e.currentTarget.style.opacity = 1}
                    onMouseLeave={e => e.currentTarget.style.opacity = 0.8}>
                    <InstagramIcon />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}