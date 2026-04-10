import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Search } from 'lucide-react'
import styles from './Rights.module.css'

const categories = [
  {
    id: 'constitutional',
    emoji: '⚖️',
    title: 'Constitutional Rights',
    color: 'saffron',
    rights: [
      { title: 'Right to Equality', article: 'Article 14', desc: 'Equal protection under law for all citizens regardless of religion, race, caste, sex, or place of birth.' },
      { title: 'Right Against Discrimination', article: 'Article 15', desc: 'No discrimination by State on grounds of religion, race, caste, sex or place of birth.' },
      { title: 'Right to Freedom', article: 'Articles 19–22', desc: 'Freedom of speech, expression, assembly, movement, profession, and protection against arbitrary arrest.' },
      { title: 'Right Against Exploitation', article: 'Articles 23–24', desc: 'Prohibition of human trafficking, forced labour, and child labour in hazardous industries.' },
      { title: 'Right to Education', article: 'Article 21A', desc: 'Free and compulsory education for children aged 6–14 years.' },
      { title: 'Right to Constitutional Remedies', article: 'Article 32', desc: 'Right to approach Supreme Court for enforcement of fundamental rights.' },
    ]
  },
  {
    id: 'police',
    emoji: '👮',
    title: 'Police & Arrest Rights',
    color: 'blue',
    rights: [
      { title: 'Right to File FIR', article: 'Section 154 CrPC', desc: 'Every person has the right to file an FIR at any police station for a cognizable offence. Police cannot refuse.' },
      { title: 'Right to Know Reason for Arrest', article: 'Article 22(1)', desc: 'No person can be arrested without being informed of the grounds of arrest.' },
      { title: 'Right to Lawyer', article: 'Article 22(1)', desc: 'Every arrested person has the right to consult a lawyer of their choice.' },
      { title: 'Protection from Torture', article: 'D.K. Basu Guidelines', desc: 'Supreme Court guidelines prohibit custodial torture. Police must follow strict arrest procedures.' },
      { title: '24-Hour Magistrate Rule', article: 'Article 22(2)', desc: 'Every arrested person must be presented before a magistrate within 24 hours of arrest.' },
      { title: 'Bail Rights', article: 'Sections 436–439 CrPC', desc: 'Right to bail for bailable offences. Right to apply for anticipatory bail before arrest.' },
    ]
  },
  {
    id: 'consumer',
    emoji: '🛒',
    title: 'Consumer Rights',
    color: 'green',
    rights: [
      { title: 'Right to Information', article: 'Consumer Protection Act 2019', desc: 'Right to be informed about quality, quantity, potency, purity, standard and price of goods.' },
      { title: 'Right Against Defective Goods', article: 'Section 2(10) CPA', desc: 'Right to replacement, repair, or refund for any defective product or deficient service.' },
      { title: 'Right Against Unfair Trade', article: 'Section 2(47) CPA', desc: 'Protection against misleading ads, false representations, and deceptive pricing.' },
      { title: 'E-Commerce Protection', article: 'E-Commerce Rules 2020', desc: 'Online sellers must display all charges upfront. Right to return defective products within 30 days.' },
      { title: 'Consumer Court Access', article: 'Section 34 CPA', desc: 'File complaints in District Forum (up to ₹1 crore), State (₹1–10 crore), National (above ₹10 crore).' },
      { title: 'National Consumer Helpline', article: 'Ministry of Consumer Affairs', desc: 'Call 1800-11-4000 (toll-free) or 1915 to register complaints 24/7.' },
    ]
  },
  {
    id: 'labour',
    emoji: '💼',
    title: 'Labour & Wage Rights',
    color: 'saffron',
    rights: [
      { title: 'Minimum Wage', article: 'Minimum Wages Act 1948', desc: 'Every employer must pay minimum wages notified by State/Central government for your occupation.' },
      { title: 'Provident Fund (PF)', article: 'EPF Act 1952', desc: 'Mandatory PF deduction for employees earning up to ₹15,000/month. Employer must also contribute.' },
      { title: 'ESIC Health Insurance', article: 'ESI Act 1948', desc: 'Employees earning up to ₹21,000/month are entitled to free medical care under ESIC.' },
      { title: 'Protection Against Harassment', article: 'POSH Act 2013', desc: 'Every workplace with 10+ employees must have an Internal Complaints Committee for sexual harassment.' },
      { title: 'Wrongful Termination', article: 'Industrial Disputes Act', desc: 'No worker can be terminated without due process, notice period, and retrenchment compensation.' },
      { title: 'Gratuity Rights', article: 'Payment of Gratuity Act 1972', desc: 'Employees completing 5 years of continuous service are entitled to gratuity payment.' },
    ]
  },
  {
    id: 'healthcare',
    emoji: '🏥',
    title: 'Healthcare Rights',
    color: 'blue',
    rights: [
      { title: 'Emergency Treatment', article: 'Article 21 + MCI Guidelines', desc: 'No hospital can refuse emergency treatment to any patient, regardless of ability to pay or documentation.' },
      { title: 'Informed Consent', article: 'MCI Code of Ethics', desc: 'Doctors must take written informed consent before any surgical procedure or major treatment.' },
      { title: 'Medical Records', article: 'NMC Regulations', desc: 'Patients have the right to access and receive copies of all their medical records and reports.' },
      { title: 'Right to Second Opinion', article: 'Patient Rights Charter', desc: 'Every patient has the right to seek a second medical opinion without prejudice.' },
      { title: 'Grievance Redressal', article: 'NMC Act 2019', desc: 'Complaints against doctors can be filed with State Medical Council or National Medical Commission.' },
      { title: 'Ayushman Bharat', article: 'PMJAY Scheme', desc: 'Families covered under PMJAY get ₹5 lakh annual health cover at empanelled hospitals.' },
    ]
  },
  {
    id: 'women',
    emoji: '👩',
    title: 'Women & Child Rights',
    color: 'green',
    rights: [
      { title: 'Protection from Domestic Violence', article: 'PWDVA 2005', desc: 'Women can file complaints for physical, sexual, verbal, or economic abuse. Protection orders available.' },
      { title: 'Anti-Dowry Protection', article: 'Dowry Prohibition Act 1961', desc: 'Demanding or giving dowry is a criminal offence with up to 5 years imprisonment.' },
      { title: 'Child Sexual Abuse', article: 'POCSO Act 2012', desc: 'Strict protection for children under 18 from sexual offences. Special courts for speedy trial.' },
      { title: 'Maternity Benefits', article: 'Maternity Benefit Act 1961', desc: '26 weeks paid maternity leave for women working in establishments with 10+ employees.' },
      { title: 'One Stop Crisis Centre', article: 'Ministry of WCD', desc: 'One Stop Centres provide free medical, legal, police, and counselling services to women in distress.' },
      { title: 'Women Helpline', article: 'National', desc: 'Call 181 for Women Helpline or 1091 for Women in Distress — 24/7 free service.' },
    ]
  },
  {
    id: 'digital',
    emoji: '💻',
    title: 'Digital & Privacy Rights',
    color: 'saffron',
    rights: [
      { title: 'Data Protection', article: 'DPDP Act 2023', desc: 'Right to know what personal data is collected, purpose of use, and right to correction or erasure.' },
      { title: 'Right to Withdraw Consent', article: 'DPDP Act 2023 S.6', desc: 'You can withdraw consent for data processing at any time. Company must honor within reasonable time.' },
      { title: 'Cybercrime Redressal', article: 'IT Act 2000', desc: 'Report cybercrime at cybercrime.gov.in or call 1930. Includes online fraud, hacking, and harassment.' },
      { title: 'Online Financial Fraud', article: 'RBI Circular', desc: 'Report unauthorized transactions within 3 days for zero liability. Bank must resolve in 10 days.' },
      { title: 'Right Against Cyber Defamation', article: 'Section 499 IPC + IT Act', desc: 'Publishing false content online to damage reputation is punishable under IPC and IT Act.' },
      { title: 'Social Media Grievance', article: 'IT Rules 2021', desc: 'Major social media platforms must have Grievance Officers. Complaints resolved within 15 days.' },
    ]
  },
  {
    id: 'rti',
    emoji: '📋',
    title: 'RTI & Government Rights',
    color: 'blue',
    rights: [
      { title: 'Right to Information', article: 'RTI Act 2005', desc: 'Every citizen can seek information from any government body within 30 days (48 hours for life/liberty).' },
      { title: 'RTI Filing', article: 'RTI Act 2005 S.6', desc: 'File RTI application with ₹10 fee (free for BPL). Send to Public Information Officer of the dept.' },
      { title: 'Whistleblower Protection', article: 'Whistleblowers Act 2014', desc: 'Protection for persons who disclose information about corruption or wilful misuse of power.' },
      { title: 'Public Servant Accountability', article: 'Prevention of Corruption Act', desc: 'Public servants can be prosecuted for taking bribes. Vigilance commissions in every state.' },
      { title: 'Lokpal & Lokayukta', article: 'Lokpal Act 2013', desc: 'Lokpal handles corruption complaints against public servants including PMs, Ministers, MPs.' },
      { title: 'Complaint Against Officials', article: 'DoPT Guidelines', desc: 'Citizens can file complaints against government officials through online portals and State Grievance cells.' },
    ]
  },
]

export default function Rights() {
  const [search, setSearch] = useState('')
  const [active, setActive] = useState(null)

  const filtered = categories.map(cat => ({
    ...cat,
    rights: cat.rights.filter(r =>
      !search ||
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.desc.toLowerCase().includes(search.toLowerCase()) ||
      r.article.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(cat => !search || cat.rights.length > 0)

  return (
    <div className={styles.page}>
      <div className={`container ${styles.header}`}>
        <h1 className={styles.title}>Know Your Rights</h1>
        <p className={styles.sub}>Every right you have as an Indian citizen — organized, searchable, and explained simply.</p>
        <div className={styles.searchBox}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search rights... e.g. 'arrest', 'consumer', 'salary'"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={`container ${styles.content}`}>
        {filtered.map(cat => (
          <div key={cat.id} className={styles.category}>
            <div className={styles.catHeader} onClick={() => setActive(active === cat.id ? null : cat.id)}>
              <div className={styles.catLeft}>
                <span className={styles.catEmoji}>{cat.emoji}</span>
                <div>
                  <h2 className={styles.catTitle}>{cat.title}</h2>
                  <span className={styles.catCount}>{cat.rights.length} rights</span>
                </div>
              </div>
              <div className={styles.catActions}>
                <Link
                  to={`/chat?q=Tell me about ${cat.title}`}
                  className={styles.askBtn}
                  onClick={e => e.stopPropagation()}
                >
                  Ask AI <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            <div className={styles.rightsGrid}>
              {cat.rights.map(right => (
                <div key={right.title} className={`${styles.rightCard} ${styles[`card_${cat.color}`]}`}>
                  <div className={styles.rightHeader}>
                    <h3 className={styles.rightTitle}>{right.title}</h3>
                    <span className={`${styles.rightArticle} ${styles[`art_${cat.color}`]}`}>{right.article}</span>
                  </div>
                  <p className={styles.rightDesc}>{right.desc}</p>
                  <Link
                    to={`/chat?q=My rights under ${right.title} - ${right.article}`}
                    className={styles.rightAsk}
                  >
                    Get Help With This <ArrowRight size={12} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
