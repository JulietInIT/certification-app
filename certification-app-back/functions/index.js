const { onCall } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp();
const db = getFirestore();

// READ NOTES
// Allow cross-origin requests from local dev server(s) during development.
// onCall in v2 accepts an options object as the first parameter.
exports.readNotes = onCall(

  async (request) => {
    const snapshot = await db.collection("notes").get();
    const notes = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    // return an explicit object so client gets a predictable shape
    return { notes };
  }
);

// CREATE NOTE
exports.createNote = onCall(

    async (request) => {
    const { title, content } = request.data;

    const docRef = await db.collection("notes").add({
      title,
      content,
      createdAt: Date.now(),
    });

    const newNote = { id: docRef.id, title, content };
    // return as an object for predictable client parsing
    return { note: newNote };
  }
);
