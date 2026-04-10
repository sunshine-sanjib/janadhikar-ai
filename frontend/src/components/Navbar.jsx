import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Scale } from 'lucide-react'
import styles from './Navbar.module.css'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Know Your Rights', path: '/rights' },
  { label: 'About', path: '/about' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [location])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <Scale size={18} />
          </div>
          <span>JanAdhikar<span className={styles.logoAccent}>AI</span></span>
        </Link>

        {/* Desktop Links */}
        <div className={styles.links}>
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`${styles.link} ${location.pathname === link.path ? styles.active : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className={styles.actions}>
          <Link to="/chat" className={styles.cta}>
            Ask Your Rights
          </Link>
          <button className={styles.menuBtn} onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className={styles.mobileMenu}>
          {navLinks.map(link => (
            <Link key={link.path} to={link.path} className={styles.mobileLink}>
              {link.label}
            </Link>
          ))}
          <Link to="/chat" className={styles.mobileCta}>
            Ask Your Rights →
          </Link>
        </div>
      )}
    </nav>
  )
}
