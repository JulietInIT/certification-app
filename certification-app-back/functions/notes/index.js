import { onCall } from "firebase-functions/v2/https";
import { getFirestore } from "firebase-admin/firestore";

const db = getFirestore();

export const readNotes = onCall(
  {
    allowedOrigins: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:5174",
    ],
  },
  async (request) => {
    const snapshot = await db.collection("notes").get();
    const notes = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return { notes };
  }
);

export const createNote = onCall(
  {
    allowedOrigins: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:5174",
    ],
  },
  async (request) => {
    const { title, content } = request.data;
    const docRef = await db.collection("notes").add({
      title,
      content,
      createdAt: Date.now(),
    });
    const newNote = { id: docRef.id, title, content };
    return { note: newNote };
  }
);
