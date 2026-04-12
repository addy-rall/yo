import './Footer.css'

const quickLinks = ['About', 'Speakers', 'Sponsors', 'Team', 'Contact', 'Register']
const policies = ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Refund Policy']

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          {/* Logo link with simplified content */}
          <a href="#" className="footer-logo">
            TED<span className="ted-x">x</span>BBAU
          </a>
          <p className="footer-tagline">
            Inspiring ideas from Babasaheb Bhimrao Ambedkar University — Lucknow.
          </p>
          <div className="footer-socials">
            {['Instagram', 'Twitter', 'Facebook', 'YouTube', 'LinkedIn'].map(s => (
              <a href="#" key={s} aria-label={s} className="social-icon">
                {s[0]}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-cols">
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map(l => <li key={l}><a href="#">{l}</a></li>)}
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Policies</h4>
            <ul>
              {policies.map(l => <li key={l}><a href="#">{l}</a></li>)}
            </ul>
          </div>

          <div className="footer-col footer-map-col">
            <h4>Location</h4>
            <div className="map-container">
              {/* Free OpenStreetMap embed, dark-mode filtered */}
              <iframe 
                title="BBAU Lucknow Map"
                width="100%" 
                height="150" 
                frameBorder="0" 
                scrolling="no" 
                marginHeight="0" 
                marginWidth="0" 
                src="https://www.openstreetmap.org/export/embed.html?bbox=80.915,26.760,80.935,26.775&amp;layer=mapnik&amp;marker=26.768,80.924"
                style={{ border: 0, borderRadius: '8px', filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
              ></iframe>
              <p className="map-text">Vidya Vihar, Raebareli Road, Lucknow</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 TEDxBBAU. This independent TEDx event is operated under a license from TED.</p>
        <div className="footer-nav">
          <a href="#">Meet Our Team</a>
          <span>·</span>
          <a href="#">Our Speakers</a>
          <span>·</span>
          <a href="#">Contact Us</a>
        </div>
      </div>
    </footer>
  )
}