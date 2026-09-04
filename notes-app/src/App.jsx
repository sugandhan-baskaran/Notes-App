import { useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import SearchBar from './components/SearchBar.jsx';
import NoteForm from './components/NoteForm.jsx';
import NoteList from './components/NoteList.jsx';
import { useLocalStorage } from './hooks/useLocalStorage.js';
import { generateId, filterNotes } from './utils/noteUtils.js';

const STORAGE_KEY = 'card-catalog:notes';

export default function App() {
  const [notes, setNotes] = useLocalStorage(STORAGE_KEY, []);
  const [query, setQuery] = useState('');
  const [editingId, setEditingId] = useState(null);

  const editingNote = notes.find((note) => note.id === editingId) ?? null;

  // Most recently updated first, then filtered by the search query.
  const visibleNotes = useMemo(() => {
    const sorted = [...notes].sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );
    return filterNotes(sorted, query);
  }, [notes, query]);

  function handleSave({ id, title, content }) {
    const now = new Date().toISOString();

    if (id) {
      // Update: only the matching note changes, everything else is untouched.
      setNotes((prev) =>
        prev.map((note) =>
          note.id === id ? { ...note, title, content, updatedAt: now } : note
        )
      );
      setEditingId(null);
    } else {
      // Create: prepend a fresh note with a new id.
      const newNote = {
        id: generateId(),
        title,
        content,
        createdAt: now,
        updatedAt: now,
      };
      setNotes((prev) => [newNote, ...prev]);
    }
  }

  function handleDelete(id) {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    if (editingId === id) setEditingId(null);
  }

  function handleEdit(note) {
    setEditingId(note.id);
    // Scroll the form into view so editing feels responsive on mobile.
    document.getElementById('note-form-section')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="page">
      <Header noteCount={notes.length} />

      <section id="note-form-section" className="panel">
        <NoteForm
          editingNote={editingNote}
          onSave={handleSave}
          onCancelEdit={() => setEditingId(null)}
        />
      </section>

      <SearchBar query={query} onQueryChange={setQuery} />

      <NoteList
        notes={visibleNotes}
        hasQuery={query.trim().length > 0}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
