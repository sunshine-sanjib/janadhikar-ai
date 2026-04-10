# JanAdhikar AI

**Your Rights. Your Voice. Your Power.**

India's first AI that doesn't just explain the law — it helps every citizen fight back. A conversational AI that tells you your constitutional, legal, police, court, and sector-specific rights in plain language, then helps you complain, escalate, and win.

---

## Project Structure

```
janadhikar-ai/
├── frontend/          # React.js app → deploy to Vercel
├── backend/           # Python FastAPI → deploy to Render
├── docs/              # Deployment guides
└── README.md
```

---

## Quick Start

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## Environment Variables

### Frontend — `frontend/.env`

```
VITE_API_URL=https://your-backend.onrender.com
```

### Backend — `backend/.env`

```
GROQ_API_KEY=your_groq_api_key
FRONTEND_URL=https://your-app.vercel.app
```

Get your free Groq API key at [console.groq.com](https://console.groq.com)

---

## Deploy

### Backend → Render

1. Go to [render.com](https://render.com) and create a **New Web Service**
2. Connect your GitHub repo, set **Root Directory** to `backend`
3. **Build Command:** `pip install -r requirements.txt`
4. **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables: `GROQ_API_KEY` and `FRONTEND_URL`

### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com) and create a **New Project**
2. Connect your GitHub repo, set **Root Directory** to `frontend`
3. Add environment variable: `VITE_API_URL` = your Render backend URL
4. Deploy

Full step-by-step guide in [`docs/deployment.md`](./docs/deployment.md)

---

## Features

- **Know Your Rights** — Constitutional, police, consumer, labour, healthcare and more
- **Instant Helplines** — Exact authority and phone number to call right now
- **Draft Complaints** — AI writes your complaint letter in minutes, for free
- **Escalation Roadmap** — Step-by-step strategy if your first attempt fails
- **Plain Language** — No legal jargon, built for everyday citizens

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React.js + Vite |
| Backend | Python FastAPI |
| AI Model | Groq — LLaMA 3.3 70B |
| Frontend Hosting | Vercel |
| Backend Hosting | Render |

---

## Mobile App

This React codebase can be wrapped with **Capacitor** for Android/iOS, or published as a **PWA** (no app store needed). See [`docs/app-deployment.md`](./docs/app-deployment.md) for full instructions.

---

## Disclaimer

JanAdhikar AI provides general legal information for educational purposes only. It is not a substitute for professional legal advice. For free legal aid, call **NALSA: 15100**.

---

*Built for every Indian citizen. Free forever.*
