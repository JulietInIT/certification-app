# Certification App

A full-stack notes app using Firebase Functions (ESM), React, and TanStack Query.

## Prerequisites
- Node.js (v18+ recommended)
- npm
- Firebase CLI (`npm install -g firebase-tools`)

## 1. Clone the repository
```bash
git clone https://github.com/JulietInIT/certification-app.git
cd certification-app
```

## 2. Install dependencies
```bash
# Install root dev tools (optional)
npm install

# Install backend dependencies
cd certification-app-back/functions
npm install

# Install frontend dependencies
cd ../../certification-app-front
npm install
```

## 3. Set up Firebase
- Create a Firebase project at https://console.firebase.google.com/
- Add a web app and copy your config.
- Enable Firestore in the Firebase console.
- (Optional) Set up Firebase emulators for local development.

## 4. Configure frontend Firebase
Create `.env` in `certification-app-front`:
```env
VITE_FIREBASE_API_KEY=yourApiKey
VITE_FIREBASE_AUTH_DOMAIN=yourAuthDomain
VITE_FIREBASE_PROJECT_ID=yourProjectId
VITE_USE_FIREBASE_EMULATOR=false # set to true for local emulator
VITE_FUNCTIONS_EMULATOR_PORT=5002 # match your emulator port if using
```

## 5. Run the backend (Cloud Functions)
### Local emulator (recommended for dev)
```bash
cd ../certification-app-back
npx firebase emulators:start --only functions
```

### Deploy to Firebase (for production)
```bash
cd functions
npx firebase deploy --only functions
```

## 6. Run the frontend
```bash
cd ../../certification-app-front
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

## 7. Lint and format
```bash
# Lint
npm run lint
# Format
npx prettier --write .
```

## 8. Inspect queries (dev only)
- React Query Devtools are enabled in development mode.

## 9. Troubleshooting
- If you see CORS errors, make sure your functions are deployed with the correct CORS config or use the emulator.
- If the emulator port is busy, change it in `firebase.json` and `.env`.

---

**Enjoy your notes app!**
