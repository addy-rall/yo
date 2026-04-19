import React, { useState } from 'react';

import priyaImg from '../assets/img1.png';
import rahulImg from '../assets/img2.png';
import nadiaImg from '../assets/img3.png';
import arjunImg from '../assets/img4.png';
import image1 from '../assets/image1.png';
import imagk from '../assets/imgk.png';
import kyu from '../assets/w.png';

const speakers = [
  { id: '01', name: 'Dr. Vijendra Chauhan', role: 'Interviewer | Mentor',  img: arjunImg, bio: 'Dr. Vijender Singh Chauhan, widely known as Masijeevi, is a highly respected academician, mentor, and one of India’s most influential interview experts for civil services aspirants. He serves as an Associate Professor at the University of Delhi and has guided thousands of students in shaping not just their careers, but their personalities and thought processes. With experience as an interviewer at multiple prestigious platforms including 12+ TEDx talks and Josh Talks, he is known for his deep understanding of human behavior, communication, and real-world intelligence. His insights go beyond academics—focusing on clarity of thought, ethical grounding, and confidence building, which are crucial for success in life and competitive exams. Through his digital presence and mentorship, he has built a strong connection with millions of students across India. His unique approach blends intellectual depth with practical wisdom, making him a powerful voice for today’s youth', color: '#e62b1e', instagram: 'https://www.instagram.com/masijeevi/' },
  { id: '02', name: 'Dr. Gajendra Purohit', role: 'Educator | Mentor', img: nadiaImg, bio: 'Gajendra Purohit (MSc, NET, PhD), known as GP Sir, has 20+ years of math teaching experience. He is a full-time YouTuber and is known for his engaging and insightful teaching methods. He founded MathsCare for online courses and GPS Publication House, with six bestselling books. Additionally, he is a motivational speaker and career guide.', color: '#e62b1e', instagram: 'https://www.instagram.com/dr.gajendrapurohit' },
  { id: '03', name: 'Dr. Yogeshwar Nath Mishra', role: 'Ex Scientist at NASA', img: rahulImg, bio: 'Dr. Yogeshwar Nath Mishra is a former NASA scientist, Professor at IIT Jodhpur, and entrepreneur whose journey spans from a remote village in Uttar Pradesh to the forefront of global scientific innovation. He has co-developed the world’s fastest laser sheet imaging technology and one of the fastest wide-field microscopy techniques, pushing the boundaries of ultrafast optical diagnostics. His research has earned him several prestigious awards, fellowships, and invited talks at leading international platforms', color: '#e62b1e', instagram: 'https://www.instagram.com/yogeshwar.space/' },
  { id: '04', name: 'Mr. Aditya Ranjan', role: 'Educator | Mentor',  img: priyaImg, bio: 'Aditya Ranjan Sir is one of India’s most influential mathematics educators and a powerful youth motivator, known for transforming the way students approach competitive exams. He secured an All India Rank 114 in CHSL and cleared multiple prestigious exams like CHSL, CPO, and CDS, eventually serving as an Excise Inspector through SSC CGL 2019. From a humble background to becoming a nationally recognized educator, his journey reflects discipline, resilience, and consistency. Today, through platforms like YouTube and initiatives such as Vidyagram, he has guided lakhs of aspirants preparing for SSC, रेलवे, और अन्य competitive exams. What truly sets him apart is his concept-driven teaching style, where he simplifies complex mathematical problems into easy, logical approaches—making him especially popular among beginners and non-maths background students. Beyond academics, he is widely admired for his motivational mindset, clarity of thought, and real-life guidance, inspiring students not just to crack exams but to build discipline and confidence in life.', color: '#e62b1e', instagram: 'https://www.instagram.com/aditya___ranjan/' },
  { id: '05', name: 'Mr. Deepak Wadhwa', role: 'Trader | Mentor', img: image1, bio: ' Deepak Wadhwa is a trader, investor, and financial educator who simplifies financial markets for everyday investors. With experience in equities, derivatives, and crypto, he focuses on disciplined trading, risk management, and market psychology, helping thousands make smarter financial decisions.', color: '#e62b1e', instagram: 'https://www.instagram.com/thedeeptalks.official/' },
  { id: '06', name: 'Mr. Kiran Kumar', role: 'Edupreneur |  Author',  img: imagk, bio: 'With over 19 years of experience in academic leadership, competitive exam training, and student psychology, Kiran Sidde is an Edupreneur committed to transforming education through scientifically grounded, emotionally aware, and purpose-driven frameworks. Kiran Sidde is a Postgraduate in organic chemistry and Psychology along with multiple professional certifications in counselling.Debojit Sen is the Founder & CEO of Crack-ED, building job-ready education at scale. A first-generation entrepreneur backed by CarDekho Group, he is bridging India’s employability gap through outcome-driven programs, strong corporate partnerships, and a fast-scaling, profitable model shaping future-ready careers. Debojit is a recipient of the BW Disrupt 40 Under 40 Award and the Outstanding Achievement in Education Leadership 2026 Award. Under his leadership, Crack-ED was honored at the 7th BW Emerging Business Awards as the Best Skill Development Institution (MSME Category), recognizing its impact in transforming youth employability across India.As the Founder of Edu-Shrine Academic Services and Amatha Mentoring Services, he has impacted over 15,000+ students, engaged with 70+ institutions, and conducted 200+ workshops for students, parents, and educators. His work integrates academic excellence with emotional stability, enabling learners to achieve both performance and personal clarity.', color: '#e62b1e', instagram: 'https://www.instagram.com/kiran_sidde/' },
  { id: '07', name: 'Mr. Debojit Sen', role: 'Founder & CEO, Crack-ED',  img: kyu, bio: "Debojit Sen is the Founder & CEO of Crack-ED, building job-ready education at scale. A first-generation entrepreneur backed by CarDekho Group， he is bridging India’s employability gap through outcome-driven programs， strong corporate partnerships， and a fast-scaling， profitable model shaping future-ready careers。 Debojit is a recipient of the BW Disrupt 40 Under 40 Award and the Outstanding Achievement in Education Leadership 2026 Award。 Under his leadership， Crack-ED was honored at the 7th BW Emerging Business Awards as the Best Skill Development Institution (MSME Category)， recognizing its impact in transforming youth employability across India。", color: '#e62b1e', instagram: null },
];

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
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
    imgFrame: {
      width: '100%',
      height: '100%',
      backgroundColor: '#111',
      position: 'relative',
      zIndex: 2,
      border: '1px solid rgba(255,255,255,0.1)',
      transition: '0.5s ease',
    },
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
    },
    igButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      marginTop: '30px',
      padding: '12px 20px',
      borderRadius: '6px',
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.15)',
      color: '#fff',
      textDecoration: 'none',
      fontSize: '0.8rem',
      fontWeight: '600',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      transition: 'background 0.3s, border-color 0.3s',
    },
  };

  return (
    <div style={s.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;900&display=swap');
        .ig-btn:hover {
          background: rgba(230, 43, 30, 0.15) !important;
          border-color: #e62b1e !important;
        }
        .ig-btn svg { transition: transform 0.3s; }
        .ig-btn:hover svg { transform: scale(1.15); }
      `}</style>

      <div style={s.header}>
        <div style={s.massiveText}>Visionaries</div>
        <h1 style={s.title}>THE <span style={{ color: '#e62b1e' }}>LINEUP</span></h1>
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
                <div style={s.accentBox} />
                <div style={s.imgFrame}>
                  <img
                    src={speaker.img}
                    alt={speaker.name}
                    style={{
                      ...s.mainImg,
                      filter: isHovered ? 'grayscale(0%)' : 'grayscale(100%) contrast(1.1)',
                      transform: isHovered ? 'translate(15px, -15px)' : 'none',
                    }}
                  />
                </div>
              </div>

              {/* Text Side */}
              <div style={s.info}>
                <span style={s.number}>{speaker.id}</span>
                <h2 style={s.name}>{speaker.name}</h2>
                <p style={{ color: '#e62b1e', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '20px' }}>
                  {speaker.role} // {speaker.org}
                </p>
                <p style={s.bio}>{speaker.bio}</p>

                {speaker.instagram && (
                  
                   <a href={speaker.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ig-btn"
                    style={s.igButton}
                  >
                    <InstagramIcon />
                    Follow on Instagram
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}