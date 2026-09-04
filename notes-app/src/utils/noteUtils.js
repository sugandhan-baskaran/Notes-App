/** Generates a reasonably unique id without pulling in a uuid dependency. */
export function generateId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

/** Formats an ISO timestamp as a short, human-friendly date + time. */
export function formatTimestamp(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

/**
 * Returns only the notes whose title or content contain the query
 * (case-insensitive). An empty/whitespace query returns every note.
 */
export function filterNotes(notes, query) {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return notes;
  return notes.filter(
    (note) =>
      note.title.toLowerCase().includes(trimmed) ||
      note.content.toLowerCase().includes(trimmed)
  );
}
