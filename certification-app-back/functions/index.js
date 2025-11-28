import { initializeApp } from "firebase-admin/app";
import { readNotes } from "./handlers/readNotes.js";
import { createNote } from "./handlers/createNote.js";

initializeApp();

export { readNotes, createNote };
