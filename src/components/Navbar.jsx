import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Navbar.css'
import logo from '../assets/lg.png'

const links = [
  { name: 'Speakers', path: '/#speakers' },
  { name: 'Team', path: '/#team' },
  { name: 'Sponsors', path: '/sponsors', isRoute: true },
  { name: 'Contact', path: '/contact', isRoute: true }
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleRouteClick = (path) => {
    setMenuOpen(false)
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const handleHomeClick = () => {
    setMenuOpen(false)
    navigate('/')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <button className="navbar-logo-btn" onClick={handleHomeClick}>
          <img src={logo} alt="Logo" className="navbar-logo-img" />
        </button>

        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <li>
            <button className="nav-btn" onClick={handleHomeClick}>Home</button>
          </li>

          {links.map((l) => (
            <li key={l.name}>
              {l.isRoute ? (
                <button className="nav-btn" onClick={() => handleRouteClick(l.path)}>
                  {l.name}
                </button>
              ) : (
                <a href={l.path} onClick={() => setMenuOpen(false)}>{l.name}</a>
              )}
            </li>
          ))}

          <li>
            <a
              href="https://in.bookmyshow.com/events/tedxbbau/ET00494884"
              className="btn-register"
              target="_blank"
              rel="noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              Register Now
            </a>
          </li>
        </ul>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={menuOpen ? 'cross' : ''} />
          <span className={menuOpen ? 'cross' : ''} />
          <span className={menuOpen ? 'cross' : ''} />
        </button>
      </div>
    </nav>
  )
}