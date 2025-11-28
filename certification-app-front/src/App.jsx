import {useState} from 'react';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {readNotes, createNote} from './firebase';
import './App.css';

function getNotesFromRes(res) {
  if (Array.isArray(res?.data)) return res.data;
  if (Array.isArray(res?.data?.notes)) return res.data.notes;
  if (Array.isArray(res)) return res;
  return [];
}

export default function App() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const queryClient = useQueryClient();

  const {
    data: notes = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['notes'],
    queryFn: async () => {
      const res = await readNotes();
      return getNotesFromRes(res);
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

  const mutation = useMutation({
    mutationFn: async (note) => {
      const res = await createNote(note);
      return res?.data?.note ?? null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['notes']});
    },
  });

  const handleCreate = (e) => {
    e.preventDefault();
    mutation.mutate({title, content});
    setTitle('');
    setContent('');
  };

  return (
    <div className="notes-app-container">
      <h1 className="notes-title">Notes App</h1>
      <form className="notes-form" onSubmit={handleCreate}>
        <label>
          Title:
          <input
            className="notes-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
        </label>
        <label>
          Content:
          <input
            className="notes-input"
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            required
          />
        </label>
        <button className="notes-add-btn" type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Adding...' : 'Add Note'}
        </button>
      </form>
      <h2 className="notes-list-title">All Notes</h2>
      {isLoading ? (
        <div className="notes-loading">Loading notes...</div>
      ) : isError ? (
        <div className="notes-error">Error: {error?.message || String(error)}</div>
      ) : notes.length === 0 ? (
        <div className="notes-empty">No notes yet</div>
      ) : (
        <ul className="notes-list">
          {notes.map((note) => (
            <li className="notes-list-item" key={note.id}>
              <span className="notes-list-title-text">{note.title}</span>
              <span className="notes-list-content-text">{note.content}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
