import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Navbar.css'
import logo from '../assets/Untitled (1)_260411003225.png'

const links = [
  { 
    name: 'About', 
    isDropdown: true,
    subLinks: [
      { name: 'About TEDx', path: '/#this', isAnchor: true },
      { name: 'About BBAU', path: '/#bbau', isAnchor: true },
      { name: 'About TEDxBBAU', path: '/#tedxbbau', isAnchor: true }
    ]
  },
  { name: 'Speakers', path: '/speakers', isRoute: true },
  { name: 'Sponsors', path: '/sponsors', isRoute: true },
  { name: 'Team', path: '/teamy', isRoute: true },
  { name: 'Contact', path: '/contact', isRoute: true }
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const onClickOutside = (e) => {
      if (!e.target.closest('.dropdown-container')) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('click', onClickOutside)
    return () => document.removeEventListener('click', onClickOutside)
  }, [])

  const handleRouteClick = (path) => {
    setMenuOpen(false)
    setDropdownOpen(false)
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const handleHomeClick = () => {
    setMenuOpen(false)
    setDropdownOpen(false)
    navigate('/')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const handleAnchorClick = (path) => {
    setMenuOpen(false)
    setDropdownOpen(false)
    const id = path.replace('/#', '')
    
    if (window.location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <button className="navbar-logo-btn" onClick={handleHomeClick}>
          <img src={logo} alt="Logo" className="navbar-logo-img" />
        </button>

        {menuOpen && (
          <div className="navbar-overlay" onClick={() => setMenuOpen(false)} />
        )}

        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <li>
            <button className="nav-btn" onClick={handleHomeClick}>Home</button>
          </li>

          {links.map((l) => (
            <li key={l.name} className={l.isDropdown ? 'dropdown-container' : ''}>
              {l.isDropdown ? (
                <>
                  <button 
                    className="nav-btn dropdown-trigger" 
                    onClick={(e) => {
                      e.stopPropagation()
                      setDropdownOpen(!dropdownOpen)
                    }}
                  >
                    {l.name} <span className={`arrow-down ${dropdownOpen ? 'rotated' : ''}`}>▾</span>
                  </button>
                  <ul className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
                    {l.subLinks.map(sub => (
                      <li key={sub.name}>
                        {sub.isExternal ? (
                          <a href={sub.path} target="_blank" rel="noreferrer" className="dropdown-item">
                            {sub.name}
                          </a>
                        ) : (
                          <button 
                            className="dropdown-item" 
                            onClick={() => handleAnchorClick(sub.path)}
                          >
                            {sub.name}
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <button 
                  className="nav-btn" 
                  onClick={() => l.isRoute ? handleRouteClick(l.path) : handleAnchorClick(l.path)}
                >
                  {l.name}
                </button>
              )}
            </li>
          ))}

          <li className="nav-register-li">
            <button className="btn-register" onClick={() => handleRouteClick('/register')}>
              Register Now
            </button>
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