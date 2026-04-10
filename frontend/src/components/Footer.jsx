import { Link } from 'react-router-dom'
import { Scale, Github, MessageSquare } from 'lucide-react'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <Scale size={16} />
            <span>JanAdhikar<span>AI</span></span>
          </div>
          <p>Your Rights. Your Voice. Your Power.<br />Built for every Indian citizen.</p>
        </div>

        <div className={styles.links}>
          <div className={styles.col}>
            <h4>Navigate</h4>
            <Link to="/">Home</Link>
            <Link to="/chat">Ask AI</Link>
            <Link to="/rights">Know Your Rights</Link>
            <Link to="/about">About</Link>
          </div>
          <div className={styles.col}>
            <h4>Rights</h4>
            <Link to="/rights?cat=constitutional">Constitutional</Link>
            <Link to="/rights?cat=police">Police & Arrest</Link>
            <Link to="/rights?cat=consumer">Consumer</Link>
            <Link to="/rights?cat=labour">Labour</Link>
          </div>
          <div className={styles.col}>
            <h4>Important</h4>
            <a href="https://nalsa.gov.in" target="_blank" rel="noopener">NALSA — Free Legal Aid</a>
            <a href="https://consumerhelpline.gov.in" target="_blank" rel="noopener">Consumer Helpline</a>
            <a href="https://cybercrime.gov.in" target="_blank" rel="noopener">Cyber Crime Portal</a>
          </div>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>© 2025 JanAdhikar AI. Not a substitute for professional legal advice.</p>
        <div className={styles.social}>
          <a href="https://github.com" target="_blank" rel="noopener" aria-label="GitHub"><Github size={16} /></a>
          <a href="#" aria-label="WhatsApp"><MessageSquare size={16} /></a>
        </div>
      </div>
    </footer>
  )
}
