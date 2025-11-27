import { useEffect, useState } from "react";
import { readNotes, createNote } from "./firebase";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await readNotes();
      console.log("readNotes result:", res);

      // Normalize possible shapes:
      // - res.data is an array (older shape)
      // - res.data.notes is an array (our backend)
      // - res is an array (unlikely for callable, but handle defensively)
      let data = [];
      if (Array.isArray(res?.data)) data = res.data;
      else if (Array.isArray(res?.data?.notes)) data = res.data.notes;
      else if (Array.isArray(res)) data = res;

      setNotes(data);
    } catch (err) {
      console.error("fetchNotes error:", err);
      setError(err?.message || String(err));
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await createNote({ title, content });
      console.log("createNote result:", res);

      // Backend may return { note } or the note directly
      const newNote = res?.data?.note ?? (res?.data && res.data.id ? res.data : null) ?? (res && res.id ? res : null);

      if (newNote) setNotes((prev) => [...prev, newNote]);

      setTitle("");
      setContent("");
    } catch (err) {
      console.error("handleCreate error:", err);
      setError(err?.message || String(err));
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Notes</h1>

      <form onSubmit={handleCreate} style={{ marginBottom: 20 }}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Create Note</button>
      </form>

      {loading ? (
        <div>Loading notes…</div>
      ) : error ? (
        <div style={{ color: "red" }}>Error: {error}</div>
      ) : notes.length === 0 ? (
        <div>No notes yet</div>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <strong>{note.title}</strong>: {note.content}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
