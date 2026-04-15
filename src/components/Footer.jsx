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
]

export default function Footer() {
  const navigate = useNavigate()

  const handleNav = (path, e) => {
    e.preventDefault()
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          {/* Logo updated to stay on the same horizontal plane */}
          <a href="/" className="footer-logo" onClick={(e) => handleNav('/', e)} style={{ display: 'inline-flex', alignItems: 'baseline', whiteSpace: 'nowrap' }}>
            TED<span className="ted-x" style={{ display: 'inline' }}>x</span>BBAU
          </a>
          <p className="footer-tagline">
            Inspiring ideas from Babasaheb Bhimrao Ambedkar University — Lucknow.
          </p>
          
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
            {/* Added your specific YouTube link */}
            <a 
              href="https://www.youtube.com/watch?v=NI3u07of3co&list=PLZ4vvmNukajzhLZyDYHc2O_qteW97R_Hw" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              aria-label="YouTube"
            >
              Y
            </a>
            {/* Added link to TED.com */}
            <a 
              href="https://www.ted.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              aria-label="TED"
            >
              T
            </a>
            
          </div>
        </div>

        <div className="footer-cols">
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map(l => (
                <li key={l.label}>
                  <a onClick={(e) => handleNav(l.path, e)} style={{ cursor: 'pointer' }}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Policies</h4>
            <ul>
              {policies.map(l => (
                <li key={l.label}>
                  <a onClick={(e) => handleNav(l.path, e)} style={{ cursor: 'pointer' }}>{l.label}</a>
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
          <a onClick={(e) => handleNav('/#team', e)} style={{ cursor: 'pointer' }}>Meet Our Team</a>
          <span>·</span>
          <a onClick={(e) => handleNav('/speakers', e)} style={{ cursor: 'pointer' }}>Our Speakers</a>
          <span>·</span>
          <a onClick={(e) => handleNav('/contact', e)} style={{ cursor: 'pointer' }}>Contact Us</a>
        </div>
      </div>
    </footer>
  )
}