import NoteCard from './NoteCard.jsx';

export default function NoteList({ notes, hasQuery, onEdit, onDelete }) {
  if (notes.length === 0) {
    return (
      <div className="empty-state">
        {hasQuery ? (
          <>
            <p className="empty-state__title">No cards match that search.</p>
            <p className="empty-state__hint">Try a different word, or clear the search.</p>
          </>
        ) : (
          <>
            <p className="empty-state__title">The box is empty.</p>
            <p className="empty-state__hint">Add your first note above.</p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="note-grid">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
