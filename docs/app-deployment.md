# 📱 Mobile App Guide — JanAdhikar AI

---

## Option A: PWA (Recommended — Easiest, No App Store)

A Progressive Web App lets users install JanAdhikar AI directly from the browser.

### Install the PWA plugin
```bash
cd frontend
npm install vite-plugin-pwa --save-dev
```

### Update vite.config.js
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'JanAdhikar AI',
        short_name: 'JanAdhikar',
        description: 'Your Rights. Your Voice. Your Power.',
        theme_color: '#FF9933',
        background_color: '#0a0a0f',
        display: 'standalone',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        ]
      }
    })
  ],
})
```

Users can install via "Add to Home Screen" in Chrome/Safari. Works on Android and iOS!

---

## Option B: Capacitor (Native Android + iOS)

### Setup
```bash
cd frontend
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android @capacitor/ios

# Initialize
npx cap init "JanAdhikar AI" "com.janadhikar.ai" --web-dir dist

# Build React app first
npm run build

# Add platforms
npx cap add android
npx cap add ios

# Sync
npx cap sync
```

### Update API URL for mobile
In `frontend/src/pages/Chat.jsx`, the API call will go to your Render backend URL automatically since you set `VITE_API_URL` in the env.

### Open in IDE and build
```bash
npx cap open android   # Opens Android Studio — build APK/AAB
npx cap open ios       # Opens Xcode — build IPA
```

### Publish to Play Store
1. In Android Studio: Build → Generate Signed Bundle/APK
2. Create keystore file
3. Upload AAB to Google Play Console
4. Fill out store listing (icon, screenshots, description)
5. Submit for review (~3 days)

### Publish to App Store
1. In Xcode: Product → Archive
2. Upload to App Store Connect
3. Submit for TestFlight first, then App Store review (~1-2 days)

---

## Option C: React Native (Full Native App)

For a truly native app in the future, you can migrate to React Native:
- Most component logic stays the same
- Replace CSS Modules with StyleSheet
- Use React Navigation instead of React Router
- API calls work identically

Start with: `npx create-expo-app JanAdhikarApp`
