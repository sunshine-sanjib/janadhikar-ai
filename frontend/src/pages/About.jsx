import { Link } from 'react-router-dom'
import { ArrowRight, Scale, Shield, Heart, Zap } from 'lucide-react'
import styles from './About.module.css'

const comparison = [
  { feature: 'Explains rights in plain language', nyay: '~', cpgrams: '✗', jan: '✓' },
  { feature: 'Sector-specific coverage', nyay: '✗', cpgrams: '✗', jan: '✓' },
  { feature: 'Gives exact helpline numbers', nyay: '✗', cpgrams: '✗', jan: '✓' },
  { feature: 'Drafts complaint letters', nyay: '✗', cpgrams: '✗', jan: '✓' },
  { feature: 'Regional language support', nyay: '✗', cpgrams: '✗', jan: '✓' },
  { feature: 'WhatsApp accessible', nyay: '✗', cpgrams: '✗', jan: '✓' },
  { feature: 'Escalation roadmap', nyay: '✗', cpgrams: '✗', jan: '✓' },
  { feature: 'Available 24/7', nyay: '✗', cpgrams: '✗', jan: '✓' },
  { feature: 'No registration needed', nyay: '✗', cpgrams: '✗', jan: '✓' },
]

export default function About() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.badge}>Our Mission</div>
          <h1 className={styles.title}>
            Most people suffer because<br />
            <span className={styles.accent}>they don't know they have rights.</span>
          </h1>
          <p className={styles.sub}>
            JanAdhikar AI was built because legal knowledge in India has always been
            gatekept — by language, by money, by geography. We're changing that.
          </p>
        </div>
      </section>

      {/* Problem */}
      <section className={styles.problem}>
        <div className="container">
          <div className={styles.problemGrid}>
            <div className={styles.problemCard}>
              <div className={styles.problemNum}>1.4B</div>
              <p>Indians deserve to know their rights under the Constitution they live under.</p>
            </div>
            <div className={styles.problemCard}>
              <div className={styles.problemNum}>80%</div>
              <p>of citizens don't know they can file an FIR even if police initially refuse.</p>
            </div>
            <div className={styles.problemCard}>
              <div className={styles.problemNum}>0₹</div>
              <p>is what it should cost to know your legal rights in a democratic republic.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What makes it unique */}
      <section className={styles.unique}>
        <div className="container">
          <h2 className={styles.sectionTitle}>What Makes JanAdhikar Different</h2>
          <div className={styles.uniqueGrid}>
            {[
              { icon: Scale, title: 'Action, Not Just Information', desc: 'We don\'t stop at "here is the law." We draft your complaint, give you the helpline number, and tell you exactly what to do next.' },
              { icon: Shield, title: 'Built for the Powerless', desc: 'Every existing legal AI is built for lawyers. This is built for the patient, the daily worker, the woman facing harassment, the student denied admission.' },
              { icon: Heart, title: 'Plain Language Always', desc: 'Legal jargon fully translated into words a daily worker or student can understand and act on — in their own language.' },
              { icon: Zap, title: 'Complete Escalation Strategy', desc: 'If Step 1 fails, know Step 2, 3, 4. Consumer helpline → RTI → Consumer court → PIL. A full fighting strategy.' },
            ].map(u => (
              <div key={u.title} className={styles.uniqueCard}>
                <div className={styles.uniqueIcon}><u.icon size={20} /></div>
                <h3>{u.title}</h3>
                <p>{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className={styles.comparison}>
        <div className="container">
          <h2 className={styles.sectionTitle}>The Market Gap</h2>
          <p className={styles.sectionSub}>No existing product covers what JanAdhikar AI offers citizens.</p>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>NyayGuru</th>
                  <th>CPGRAMS</th>
                  <th className={styles.janCol}>JanAdhikar AI</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map(row => (
                  <tr key={row.feature}>
                    <td>{row.feature}</td>
                    <td className={row.nyay === '✓' ? styles.yes : row.nyay === '~' ? styles.partial : styles.no}>{row.nyay}</td>
                    <td className={row.cpgrams === '✓' ? styles.yes : styles.no}>{row.cpgrams}</td>
                    <td className={`${styles.janCol} ${styles.yes}`}>{row.jan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className={styles.tech}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Built With</h2>
          <div className={styles.techGrid}>
            {[
              { label: 'AI Engine', value: 'Claude API (Anthropic)' },
              { label: 'Frontend', value: 'React.js + Vite' },
              { label: 'Backend', value: 'Python FastAPI' },
              { label: 'WhatsApp', value: 'Twilio / Meta Cloud API' },
              { label: 'Hosting', value: 'Vercel + Render' },
              { label: 'Languages', value: 'English, Hindi, Odia' },
            ].map(t => (
              <div key={t.label} className={styles.techCard}>
                <span className={styles.techLabel}>{t.label}</span>
                <span className={styles.techValue}>{t.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer + CTA */}
      <section className={styles.disclaimer}>
        <div className="container">
          <div className={styles.disclaimerBox}>
            <p>⚠️ <strong>Disclaimer:</strong> JanAdhikar AI provides general legal information for educational purposes only. It is not a substitute for professional legal advice. For urgent matters, please consult a qualified lawyer or call NALSA at <strong>15100</strong> for free legal aid.</p>
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link to="/chat" className={styles.ctaBtn}>
              Try JanAdhikar AI Free
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
