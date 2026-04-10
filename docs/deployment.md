# 🚀 Complete Deployment Guide — JanAdhikar AI

---

## STEP 1: Get Your Groq API Key

1. Go to https://console.groq.com
2. Sign up / log in
3. Click **API Keys** → **Create Key**
4. Copy and save the key (starts with `sk-ant-...`)

---

## STEP 2: Push to GitHub

```bash
# From the project root (janadhikar-ai/)
git init
git add .
git commit -m "Initial commit — JanAdhikar AI"

# Create a new repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/janadhikar-ai.git
git branch -M main
git push -u origin main
```

---

## STEP 3: Deploy Backend to Render (Free)

1. Go to https://render.com → Sign up with GitHub
2. Click **New** → **Web Service**
3. Connect your GitHub repo
4. Set **Root Directory** to `backend`
5. Set these fields:
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Add **Environment Variables**:
   - `GROQ_API_KEY` = your Claude API key
   - `FRONTEND_URL` = https://your-app.vercel.app (set after Vercel deploy)
7. Click **Deploy**
8. Wait ~3 minutes. Copy your Render URL: `https://janadhikar-ai-backend.onrender.com`

---

## STEP 4: Deploy Frontend to Vercel (Free)

1. Go to https://vercel.com → Sign up with GitHub
2. Click **New Project** → Import your GitHub repo
3. Set **Root Directory** to `frontend`
4. Add **Environment Variables**:
   - `VITE_API_URL` = your Render backend URL (from Step 3)
5. Click **Deploy**
6. Your site is live at `https://janadhikar-ai.vercel.app` 🎉

---

## STEP 5: Link Frontend URL in Render

1. Go back to Render dashboard → your backend service
2. Go to **Environment** tab
3. Update `FRONTEND_URL` = your Vercel URL
4. Click **Save Changes** → auto-deploys

---

## STEP 6: Test Everything

Visit your Vercel URL and:
- [ ] Homepage loads correctly
- [ ] "Ask Your Rights" button opens the chat
- [ ] Send a message in chat — AI responds
- [ ] Rights page shows all categories
- [ ] About page loads

---

## 🔄 Future Updates

Any push to `main` branch will **auto-deploy** on both Vercel and Render.

```bash
git add .
git commit -m "Your update message"
git push
```

---

## 📱 Mobile App (Future)

### Option A: Capacitor (wrap React as native app)
```bash
cd frontend
npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios
npx cap init "JanAdhikar AI" "com.janadhikar.ai"
npm run build
npx cap add android
npx cap add ios
npx cap sync
npx cap open android   # Opens Android Studio
npx cap open ios       # Opens Xcode
```

### Option B: PWA (Progressive Web App — easiest)
Add to `frontend/vite.config.js`:
```js
import { VitePWA } from 'vite-plugin-pwa'
// Add VitePWA() to plugins array
```
Users can then "Add to Home Screen" from their browser — no app store needed!

---

## 💬 WhatsApp Integration (Future)

1. Get Twilio account at twilio.com
2. Enable Twilio WhatsApp Sandbox
3. Add to backend:
```
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
```
4. Add `/api/whatsapp` webhook route in backend
5. Point Twilio webhook to: `https://your-backend.onrender.com/api/whatsapp`

---

## 🆘 Troubleshooting

| Problem | Fix |
|---|---|
| Chat not working | Check `VITE_API_URL` in Vercel env vars |
| CORS error | Check `FRONTEND_URL` in Render env vars |
| "API key not configured" | Add `GROQ_API_KEY` in Render |
| Render cold start (slow) | Free tier sleeps after 15min inactivity — upgrade to paid for always-on |
| Build failed | Check Node version ≥18 in Vercel settings |
