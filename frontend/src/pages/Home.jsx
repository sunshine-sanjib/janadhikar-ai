import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Scale, Zap, Users, MessageSquare, FileText, Phone, ChevronRight } from 'lucide-react'
import styles from './Home.module.css'

const stats = [
  { value: '12+', label: 'Rights Categories' },
  { value: '100+', label: 'Helpline Numbers' },
  { value: '3', label: 'Languages' },
  { value: '0₹', label: 'Always Free' },
]

const features = [
  {
    icon: Scale,
    color: 'saffron',
    title: 'Know Your Rights',
    desc: 'Constitutional, police, consumer, labour, healthcare — all rights explained in plain language you can act on.',
  },
  {
    icon: Phone,
    color: 'blue',
    title: 'Exact Helplines',
    desc: 'Get the precise authority and helpline number to call. No more googling dead ends.',
  },
  {
    icon: FileText,
    color: 'green',
    title: 'Draft Complaints',
    desc: 'AI writes your complaint letter, RTI application, or legal notice — in minutes, for free.',
  },
  {
    icon: Zap,
    color: 'saffron',
    title: 'Escalation Roadmap',
    desc: 'If Step 1 fails, know Step 2, 3, 4. Consumer court, PIL, RTI — a full strategy, not just one number.',
  },
  {
    icon: MessageSquare,
    color: 'blue',
    title: 'WhatsApp Ready',
    desc: 'No app download needed. Send a WhatsApp message and get your rights — even in rural India.',
  },
  {
    icon: Users,
    color: 'green',
    title: 'Built for Citizens',
    desc: 'Not for lawyers. For patients, workers, students, women, consumers — every Indian who deserves better.',
  },
]

const scenarios = [
  { emoji: '🏥', text: 'Hospital refused emergency treatment', cat: 'Healthcare' },
  { emoji: '🚌', text: 'Bus conductor overcharged me', cat: 'Transport' },
  { emoji: '💼', text: 'My employer didn\'t pay my salary', cat: 'Labour' },
  { emoji: '👮', text: 'Police refusing to file my FIR', cat: 'Police' },
  { emoji: '🛒', text: 'Got a defective product online', cat: 'Consumer' },
  { emoji: '📚', text: 'School denied admission under RTE', cat: 'Education' },
]

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.orb1} />
          <div className={styles.orb2} />
          <div className={styles.grid} />
        </div>

        <div className={`container ${styles.heroContent}`}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            India's First Citizen Rights AI
          </div>

          <h1 className={styles.heroTitle}>
            Your Rights.<br />
            <span className={styles.gradient}>Your Voice.</span><br />
            Your Power.
          </h1>

          <p className={styles.heroSub}>
            Denied treatment? Overcharged? Unpaid? Harassed?<br />
            <strong>JanAdhikar AI</strong> tells you your exact legal rights, drafts your complaint,
            and guides you step-by-step — in plain language, for free.
          </p>

          <div className={styles.heroCtas}>
            <Link to="/chat" className={styles.primaryBtn}>
              Ask Your Rights Now
              <ArrowRight size={18} />
            </Link>
            <Link to="/rights" className={styles.secondaryBtn}>
              Explore All Rights
            </Link>
          </div>

          {/* Stats */}
          <div className={styles.stats}>
            {stats.map(s => (
              <div key={s.label} className={styles.stat}>
                <span className={styles.statVal}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scenarios */}
      <section className={styles.scenarios}>
        <div className="container">
          <div className={styles.scenariosLabel}>
            <Shield size={14} />
            Real Situations We Handle
          </div>
          <div className={styles.scenarioGrid}>
            {scenarios.map(s => (
              <Link to={`/chat?q=${encodeURIComponent(s.text)}`} key={s.text} className={styles.scenarioCard}>
                <span className={styles.scenarioEmoji}>{s.emoji}</span>
                <div>
                  <p className={styles.scenarioText}>{s.text}</p>
                  <span className={styles.scenarioCat}>{s.cat}</span>
                </div>
                <ChevronRight size={16} className={styles.scenarioArrow} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={styles.features}>
        <div className="container">
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Everything You Need to Fight Back</h2>
            <p className={styles.sectionSub}>Not just information — a complete action system for every citizen.</p>
          </div>
          <div className={styles.featureGrid}>
            {features.map(f => (
              <div key={f.title} className={`${styles.featureCard} ${styles[`card_${f.color}`]}`}>
                <div className={`${styles.featureIcon} ${styles[`icon_${f.color}`]}`}>
                  <f.icon size={20} />
                </div>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className={styles.howItWorks}>
        <div className="container">
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>How It Works</h2>
            <p className={styles.sectionSub}>From problem to action in under 60 seconds.</p>
          </div>
          <div className={styles.steps}>
            {[
              { n: '01', title: 'Describe Your Problem', desc: 'Tell the AI what happened to you in your own words.' },
              { n: '02', title: 'AI Identifies Your Rights', desc: 'Instantly learn which laws protect you and what violations occurred.' },
              { n: '03', title: 'Get Exact Helplines', desc: 'The precise authority and phone number you need to call right now.' },
              { n: '04', title: 'Draft Your Complaint', desc: 'AI writes a formal complaint letter ready to send.' },
              { n: '05', title: 'Escalation Strategy', desc: 'If step one fails, know exactly what comes next.' },
            ].map((step, i) => (
              <div key={step.n} className={styles.step}>
                <div className={styles.stepNum}>{step.n}</div>
                {i < 4 && <div className={styles.stepLine} />}
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className={styles.ctaBanner}>
        <div className="container">
          <div className={styles.ctaCard}>
            <div className={styles.ctaBg} />
            <h2 className={styles.ctaTitle}>Don't suffer in silence.<br />Your rights are real. Use them.</h2>
            <p className={styles.ctaSub}>Free forever. No sign-up needed. Available 24/7.</p>
            <Link to="/chat" className={styles.ctaBtn}>
              Start for Free
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
