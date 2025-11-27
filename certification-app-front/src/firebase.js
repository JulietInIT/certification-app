import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyDZa_25cMG4vl8XOMwYu06G8DG04Y74SpI",
  authDomain: "certification-app-d7140.firebaseapp.com",
  projectId: "certification-app-d7140",
  storageBucket: "certification-app-d7140.firebasestorage.app",
  messagingSenderId: "60210595686",
  appId: "1:60210595686:web:2e56e05081f0242e4feaa7",
  measurementId: "G-YNJ4YD2PBD"
};

const app = initializeApp(firebaseConfig);
export const functions = getFunctions(app);

if (import.meta.env.DEV) {
  connectFunctionsEmulator(functions, "localhost", 5002);
  }

export const readNotes = httpsCallable(functions, "readNotes");
export const createNote = httpsCallable(functions, "createNote");
