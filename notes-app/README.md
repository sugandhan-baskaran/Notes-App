# 1. Project Title

**Card Catalog** — a small, searchable notes application.

# 2. Objective

Build a Notes application where users can create, edit, delete, and search notes, using a front-end framework (React), with data persisted client-side so it survives a page refresh.

# 3. Problem Statement

Quick, unstructured thoughts (a reminder, a snippet, an idea) need somewhere faster than a full document editor and more organized than a text file. This app gives the user a single page where they can jot a note down, find it again later by keyword, and edit or remove it — with nothing lost if the tab is closed or refreshed, since everything is saved to the browser's `localStorage`.

# 4. Tech Stack

- **React 18** (function components + hooks: `useState`, `useMemo`, `useEffect`) for UI and state management
- **Vite** as the build tool / dev server
- **Plain CSS** (no UI framework) — a custom "index card" visual design, defined in `src/index.css`
- **Browser `localStorage` API** for persistence — no backend/database

# 5. Implementation Approach

- **State lives in `App.jsx`.** The `notes` array is the single source of truth, held with a custom `useLocalStorage` hook (`src/hooks/useLocalStorage.js`) that behaves exactly like `useState` but transparently reads from and writes to `localStorage`, so every create/edit/delete is persisted automatically without extra plumbing in the components that trigger those changes.
- **CRUD is centralized.** `App.jsx` owns `handleSave` (covers both create and update — it branches on whether an `id` is present), and `handleDelete`. Components below it are presentational: they receive data and callbacks as props and don't touch `localStorage` or global state directly.
- **One form, two modes.** Rather than a separate "add" form and "edit" form, `NoteForm` accepts an optional `editingNote` prop. When it's set, the form pre-fills and its submit button switches to "Save changes"; when it's `null`, it behaves as a blank "new note" form. This avoids duplicating form markup/validation.
- **Search is a pure filter, not a second copy of state.** `App.jsx` derives `visibleNotes` from `notes` + the search `query` with `useMemo` (sort by most-recently-updated, then filter by keyword in title or content). Nothing about search is stored separately, so it can never drift out of sync with the note list.
- **Component split** (see Features/folder structure below) follows single-responsibility: layout/chrome (`Header`), input (`SearchBar`, `NoteForm`), and display (`NoteList`, `NoteCard`) are each their own file.

### Folder structure

```
notes-app/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx              # React root
│   ├── App.jsx                # owns note state, wires up CRUD + search
│   ├── index.css              # all styling
│   ├── components/
│   │   ├── Header.jsx         # title + note count
│   │   ├── SearchBar.jsx      # keyword filter input
│   │   ├── NoteForm.jsx       # create AND edit form (shared)
│   │   ├── NoteList.jsx       # grid layout + empty states
│   │   └── NoteCard.jsx       # single note display + edit/delete buttons
│   ├── hooks/
│   │   └── useLocalStorage.js # useState that persists to localStorage
│   └── utils/
│       └── noteUtils.js       # id generation, date formatting, search filter
```

# 6. Features

- **Create** — fill in the form at the top and click "Add card"; empty title falls back to "Untitled".
- **Read** — all notes render as cards, most recently updated first.
- **Update** — click "Edit" on a card to load it into the form; "Save changes" updates it in place (this also refreshes its "Updated" timestamp), "Cancel" discards the edit.
- **Delete** — click "Delete" on a card to remove it immediately.
- **Search** — the search bar filters live, by title or content, case-insensitive; a clear (×) button appears once you've typed something.
- **Persistence** — every change writes to `localStorage` under the key `card-catalog:notes`, so a refresh (or reopening the tab later) restores exactly where you left off.
- **Empty states** — a friendly message when there are no notes yet, and a different one when a search returns nothing.
- **Responsive layout** — the card grid reflows down to a single column on narrow/mobile screens.

# 7. Screenshots

_Add screenshots or a short screen recording here after running the app locally — e.g. `screenshots/empty-state.png`, `screenshots/notes-grid.png`, `screenshots/editing.png`, `screenshots/search.png`._

# 8. How to Run

Requires [Node.js](https://nodejs.org/) 18+ and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Then open the URL Vite prints (typically `http://localhost:5173`).

To build a production bundle:

```bash
npm run build   # outputs to dist/
npm run preview # serve the production build locally
```

# 9. Future Improvements

- Tagging/categorizing notes and filtering by tag, not just free-text search
- Pinning important notes to the top independent of last-updated order
- Undo for deletes (a brief "Note deleted — Undo" toast) instead of an instant, unrecoverable removal
- Markdown support in note content
- Sync notes to a real backend/account so they aren't tied to a single browser
- Keyboard shortcuts (e.g. `n` for new note, `/` to focus search)
