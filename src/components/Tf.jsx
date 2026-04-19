import React from 'react';

// ─── IMAGE IMPORTS ───
// These assume the images are in the same folder or 'src' directory
import  honorImg from '../assets/img4.png';
import  chiefImg from '../assets/y.png';
import priyaimg from '../assets/img1.png';
import who from '../assets/ho.png';

const GUESTS = [
  {
    type: "Chief Guest",
    name: "Prof. (Dr.) Raj Kumar Mittal",
    designation: "Vice Chancellor, BBAU, Lucknow",
    image: chiefImg 
  },
  {
    type: "Guest of Honour",
    name: "Dr. Vijendra Chauhan",
    designation: "Distinguished Guest",
    image: honorImg 
  },

  {
    type: "Guest of Honour",
    name: "Mr. Shishir Dixit",
    designation: "Honorary Speaker",
    image: who
  },
 
  {
    type: "Guest of Honour",
    name: "Mr. Aditya Ranjan",
    designation: "Honorary Speaker",
    image: priyaimg
  }
];

export default function VIPGuestSection() {
  return (
    <>
      <style>{`
        .vip-section {
          padding: 80px 20px;
          background: #000;
          color: #F4EFE9;
          font-family: 'Inter', sans-serif;
          overflow: hidden;
        }
        .vip-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        /* ── LARGE GRADIENT HEADING ── */
        .vip-heading {
          font-size: clamp(2rem, 9vw, 4.5rem); 
          font-weight: 800;
          line-height: 0.75;
          margin-bottom: 60px;
          text-transform: uppercase;
          letter-spacing: -3px;
          text-align: center;
          /* White to Dull Red Gradient */
          background: linear-gradient(to bottom, #FFFFFF 30%, #B22222 90%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Desktop: Horizontal Line */
        .vip-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }
        .vip-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .vip-card:hover {
          transform: scale(1.02);
          border-color: #B22222;
          background: rgba(255,255,255,0.05);
        }
        .vip-image-wrap {
          width: 100%;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          background: #111;
        }
        .vip-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .vip-info {
          padding: 25px;
          text-align: center;
        }
        .vip-type {
          font-size: 0.75rem;
          color: #B22222;
          text-transform: uppercase;
          letter-spacing: 4px;
          margin-bottom: 10px;
          display: block;
          font-weight: 700;
        }
        .vip-name {
          font-size: 1.3rem;
          margin: 0 0 6px 0;
          font-weight: 800;
          color: #FFF;
        }
        .vip-designation {
          font-size: 0.85rem;
          color: #999;
          line-height: 1.4;
        }

        /* Phone View: Horizontal Scrolling */
        @media (max-width: 850px) {
          .vip-heading {
            text-align: left;
            font-size: 3.5rem;
            margin-bottom: 40px;
          }
          .vip-grid {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            gap: 20px;
            padding-bottom: 40px;
            margin: 0 -20px;
            padding-left: 20px;
            -webkit-overflow-scrolling: touch;
          }
          .vip-grid::-webkit-scrollbar {
            height: 5px;
          }
          .vip-grid::-webkit-scrollbar-track {
            background: rgba(255,255,255,0.05);
          }
          .vip-grid::-webkit-scrollbar-thumb {
            background: #B22222;
            border-radius: 10px;
          }
          .vip-card {
            min-width: 80%; 
            scroll-snap-align: center;
          }
        }
      `}</style>

      <section className="vip-section">
        <div className="vip-container">
          <h2 className="vip-heading">
            EVENT<br />DIGNITARIES
          </h2>
          
          <div className="vip-grid">
            {GUESTS.map((guest, index) => (
              <div key={index} className="vip-card">
                <div className="vip-image-wrap">
                  <img src={guest.image} alt={guest.name} />
                </div>
                <div className="vip-info">
                  <span className="vip-type">{guest.type}</span>
                  <h3 className="vip-name">{guest.name}</h3>
                  <p className="vip-designation">{guest.designation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}