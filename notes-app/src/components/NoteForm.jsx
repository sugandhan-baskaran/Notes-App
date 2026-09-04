import { useState, useEffect } from 'react';

const EMPTY_DRAFT = { title: '', content: '' };

/**
 * Single form used for both creating a new note and editing an
 * existing one. When `editingNote` is provided, the form is
 * pre-filled and switches to "update" mode; otherwise it behaves
 * as a blank "new note" form.
 */
export default function NoteForm({ editingNote, onSave, onCancelEdit }) {
  const [draft, setDraft] = useState(EMPTY_DRAFT);

  // Load the note into the form whenever the user starts editing it.
  useEffect(() => {
    if (editingNote) {
      setDraft({ title: editingNote.title, content: editingNote.content });
    } else {
      setDraft(EMPTY_DRAFT);
    }
  }, [editingNote]);

  function handleSubmit(event) {
    event.preventDefault();
    const title = draft.title.trim();
    const content = draft.content.trim();
    if (!title && !content) return; // nothing to save

    onSave({
      title: title || 'Untitled',
      content,
      id: editingNote?.id,
    });
    setDraft(EMPTY_DRAFT);
  }

  const isEditing = Boolean(editingNote);

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="note-form__title"
        placeholder="Title"
        value={draft.title}
        onChange={(event) => setDraft({ ...draft, title: event.target.value })}
        maxLength={120}
      />
      <textarea
        className="note-form__content"
        placeholder="Write a note…"
        value={draft.content}
        onChange={(event) => setDraft({ ...draft, content: event.target.value })}
        rows={4}
      />
      <div className="note-form__actions">
        <button type="submit" className="btn btn--primary">
          {isEditing ? 'Save changes' : 'Add card'}
        </button>
        {isEditing && (
          <button type="button" className="btn btn--ghost" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
