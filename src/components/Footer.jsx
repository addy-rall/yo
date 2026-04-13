import { useNavigate } from 'react-router-dom'
import './Footer.css'

const quickLinks = [
  { label: 'About', path: '/#about' },
  { label: 'Speakers', path: '/speakers' },
  { label: 'Sponsors', path: '/sponsors' },
  { label: 'Team', path: '/#team' },
  { label: 'Contact', path: '/contact' },
  { label: 'Register', path: '/register' },
]

const policies = [
  { label: 'Privacy Policy', path: '/privacy' },
  { label: 'Terms of Service', path: '/terms' },
  { label: 'Cookie Policy', path: '/cookie' },
  { label: 'Refund Policy', path: '/refund' },
]

export default function Footer() {
  const navigate = useNavigate()

  const handleNav = (path) => {
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <a href="#" className="footer-logo" onClick={handleNav.bind(null, '/')}>
            TED<span className="ted-x">x</span>BBAU
          </a>
          <p className="footer-tagline">
            Inspiring ideas from Babasaheb Bhimrao Ambedkar University — Lucknow.
          </p>
          
          {/* UPDATED SOCIALS SECTION */}
          <div className="footer-socials">
            <a 
              href="https://www.instagram.com/tedxbbau/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              aria-label="Instagram"
            >
              I
            </a>
            <a 
              href="https://in.linkedin.com/company/tedxbbau" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              aria-label="LinkedIn"
            >
              L
            </a>
            {/* Keeping other placeholders for consistency, update as needed */}
            {['Twitter', 'Facebook', 'YouTube'].map(s => (
              <a href="#" key={s} aria-label={s} className="social-icon">{s[0]}</a>
            ))}
          </div>
        </div>

        <div className="footer-cols">
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map(l => (
                <li key={l.label}>
                  <a onClick={() => handleNav(l.path)} style={{ cursor: 'pointer' }}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Policies</h4>
            <ul>
              {policies.map(l => (
                <li key={l.label}>
                  <a onClick={() => handleNav(l.path)} style={{ cursor: 'pointer' }}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col footer-map-col">
            <h4>Location</h4>
            <div className="map-container">
              <iframe
                title="BBAU Lucknow Map"
                width="100%"
                height="150"
                frameBorder="0"
                src="https://www.openstreetmap.org/export/embed.html?bbox=80.915,26.760,80.935,26.775&amp;layer=mapnik&amp;marker=26.768,80.924"
                style={{ border: 0, borderRadius: '8px', filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
              />
              <p className="map-text">Vidya Vihar, Raebareli Road, Lucknow</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 TEDxBBAU. This independent TEDx event is operated under a license from TED.</p>
        <div className="footer-nav">
          <a onClick={() => handleNav('/#team')} style={{ cursor: 'pointer' }}>Meet Our Team</a>
          <span>·</span>
          <a onClick={() => handleNav('/speakers')} style={{ cursor: 'pointer' }}>Our Speakers</a>
          <span>·</span>
          <a onClick={() => handleNav('/contact')} style={{ cursor: 'pointer' }}>Contact Us</a>
        </div>
      </div>
    </footer>
  )
}
