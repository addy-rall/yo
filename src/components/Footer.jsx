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

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const YouTubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

const TEDIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
    <text x="4" y="16" fontSize="9" fontWeight="900" fill="currentColor" fontFamily="Helvetica,Arial,sans-serif">TED</text>
  </svg>
)

// Clean TED globe-like icon
const TEDGlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 100 100" fill="currentColor">
    <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fontSize="52" fontWeight="900" fontFamily="Helvetica Neue,Helvetica,Arial,sans-serif">TED</text>
  </svg>
)

const socials = [
  {
    href: 'https://www.instagram.com/tedxbbau/',
    label: 'Instagram',
    icon: <InstagramIcon />,
  },
  {
    href: 'https://in.linkedin.com/company/tedxbbau',
    label: 'LinkedIn',
    icon: <LinkedInIcon />,
  },
  {
    href: 'https://www.youtube.com/watch?v=NI3u07of3co&list=PLZ4vvmNukajzhLZyDYHc2O_qteW97R_Hw',
    label: 'YouTube',
    icon: <YouTubeIcon />,
  },
  {
    href: 'https://www.ted.com/',
    label: 'TED',
    icon: <TEDGlobeIcon />,
  },
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
          <a href="/" className="footer-logo" onClick={(e) => handleNav('/', e)} style={{ display: 'inline-flex', alignItems: 'baseline', whiteSpace: 'nowrap' }}>
            TED<span className="ted-x" style={{ display: 'inline' }}>x</span>BBAU
          </a>
          <p className="footer-tagline">
            Inspiring ideas from Babasaheb Bhimrao Ambedkar University — Lucknow.
          </p>

          <div className="footer-socials">
            {socials.map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label={label}
              >
                {icon}
              </a>
            ))}
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