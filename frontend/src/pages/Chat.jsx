import { useState, useRef, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Send, Scale, RotateCcw, Copy, ThumbsUp, AlertCircle } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import styles from './Chat.module.css'

const QUICK_PROMPTS = [
  'Hospital refused to treat me',
  'Police won\'t file my FIR',
  'Employer not paying salary',
  'Got cheated online shopping',
  'School denied RTE admission',
  'Domestic violence help',
]

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function Chat() {
  const [searchParams] = useSearchParams()
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `**Jai Hind! I'm JanAdhikar AI.** 🇮🇳\n\nI'm here to help you understand your legal rights and take action. Tell me what problem you're facing — whether it's with police, hospitals, employers, consumer issues, or anything else.\n\n*I'll identify your rights, give you exact helpline numbers, and draft a complaint for you — all for free.*`,
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const q = searchParams.get('q')
    if (q) { setInput(q); inputRef.current?.focus() }
  }, [searchParams])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async (text) => {
    const userMsg = text || input.trim()
    if (!userMsg) return

    setMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setInput('')
    setLoading(true)
    setError(null)

    try {
      // Build API payload: only user/assistant msgs, must start with user
      const allMsgs = [...messages, { role: 'user', content: userMsg }]
      const onlyValid = allMsgs.filter(m => m.role === 'user' || m.role === 'assistant')
      const firstUser = onlyValid.findIndex(m => m.role === 'user')
      const apiMessages = firstUser >= 0 ? onlyValid.slice(firstUser) : onlyValid

      const res = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      })

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.detail || `Server error ${res.status}`)
      }
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
    } catch (err) {
      setError(`Could not get a response: ${err.message}`)
      setMessages(prev => prev.slice(0, -1))
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const copyMessage = (text) => {
    navigator.clipboard.writeText(text)
  }

  const reset = () => {
    setMessages([{
      role: 'assistant',
      content: `**Jai Hind! I'm JanAdhikar AI.** 🇮🇳\n\nI'm here to help you understand your legal rights and take action. Tell me what problem you're facing.\n\n*I'll identify your rights, give you exact helpline numbers, and draft a complaint for you — all for free.*`
    }])
    setError(null)
  }

  return (
    <div className={styles.page}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <Scale size={16} />
          <span>Quick Problems</span>
        </div>
        <div className={styles.quickList}>
          {QUICK_PROMPTS.map(p => (
            <button key={p} className={styles.quickBtn} onClick={() => sendMessage(p)}>
              {p}
            </button>
          ))}
        </div>

        <div className={styles.sidebarDivider} />

        <div className={styles.helplines}>
          <div className={styles.sidebarHeader}>📞 Key Helplines</div>
          {[
            { label: 'Police', number: '100' },
            { label: 'Women', number: '1091' },
            { label: 'Consumer', number: '1800-11-4000' },
            { label: 'NALSA Legal', number: '15100' },
            { label: 'Cyber Crime', number: '1930' },
            { label: 'Medical', number: '104' },
          ].map(h => (
            <div key={h.label} className={styles.helplineItem}>
              <span>{h.label}</span>
              <a href={`tel:${h.number}`} className={styles.helplineNum}>{h.number}</a>
            </div>
          ))}
        </div>
      </aside>

      {/* Chat */}
      <div className={styles.chatArea}>
        <div className={styles.chatHeader}>
          <div className={styles.chatHeaderLeft}>
            <div className={styles.aiAvatar}>
              <Scale size={16} />
            </div>
            <div>
              <div className={styles.aiName}>JanAdhikar AI</div>
              <div className={styles.aiStatus}>
                <span className={styles.statusDot} />
                Always available · Free · Confidential
              </div>
            </div>
          </div>
          <button className={styles.resetBtn} onClick={reset} title="New conversation">
            <RotateCcw size={15} />
            New Chat
          </button>
        </div>

        {/* Messages */}
        <div className={styles.messages}>
          {messages.map((msg, i) => (
            <div key={i} className={`${styles.messageRow} ${styles[msg.role]}`}>
              {msg.role === 'assistant' && (
                <div className={styles.msgAvatar}>
                  <Scale size={14} />
                </div>
              )}
              <div className={styles.bubble}>
                {msg.role === 'assistant' ? (
                  <div className="prose">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  <p>{msg.content}</p>
                )}
                {msg.role === 'assistant' && (
                  <div className={styles.msgActions}>
                    <button onClick={() => copyMessage(msg.content)} title="Copy">
                      <Copy size={12} />
                    </button>
                    <button title="Helpful">
                      <ThumbsUp size={12} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className={`${styles.messageRow} ${styles.assistant}`}>
              <div className={styles.msgAvatar}>
                <Scale size={14} />
              </div>
              <div className={styles.bubble}>
                <div className={styles.typing}>
                  <span /><span /><span />
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className={styles.errorMsg}>
              <AlertCircle size={14} />
              {error}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className={styles.inputArea}>
          <div className={styles.inputBox}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Describe your problem... (e.g. 'My employer hasn't paid me for 3 months')"
              rows={1}
              className={styles.textarea}
            />
            <button
              className={styles.sendBtn}
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
            >
              <Send size={16} />
            </button>
          </div>
          <p className={styles.inputNote}>
            JanAdhikar AI provides general legal information, not legal advice. For emergencies, call 112.
          </p>
        </div>
      </div>
    </div>
  )
}
