import { formatTimestamp } from '../utils/noteUtils';

export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    <article className="card">
      <div className="card__rule" aria-hidden="true" />
      <div className="card__body">
        <h3 className="card__title">{note.title}</h3>
        {note.content && <p className="card__content">{note.content}</p>}
        <div className="card__meta">
          <span>Updated {formatTimestamp(note.updatedAt)}</span>
        </div>
      </div>
      <div className="card__actions">
        <button
          type="button"
          className="btn btn--small"
          onClick={() => onEdit(note)}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn--small btn--danger"
          onClick={() => onDelete(note.id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
