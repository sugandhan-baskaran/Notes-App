# 1. Project Title
Card Catalog – React Notes Application

# 2. Objective
Build a Notes application where users can create, edit, delete, and search notes using a modern front-end framework, demonstrating component-based architecture, state management, and client-side data persistence. 

# 3. Problem Statement
Users need a fast, reliable, and lightweight way to capture and manage text-based notes directly in the browser. The application must ensure that data is not lost during page refreshes, provide an intuitive interface for managing (CRUD) multiple notes, and include a robust search mechanism to quickly locate specific information without requiring a backend server.

# 4. Tech Stack
* **Framework:** React (via Vite)
* **Styling:** Custom CSS (Tactile index-card design system)
* **State Management:** React Hooks (`useState`, `useMemo`)
* **Data Persistence:** Browser `localStorage` API

# 5. Implementation Approach
* **Component-Based Architecture:** The UI is divided into modular components (`NoteForm`, `NoteList`, `NoteCard`, `SearchBar`) to keep the codebase clean and maintainable.
* **Unified Form Logic:** A single `NoteForm` component handles both note creation and note editing by dynamically switching modes based on the presence of an `editingNote` prop.
* **Separation of Concerns:** Data persistence is abstracted into a custom `useLocalStorage` hook, keeping the storage logic separate from the UI rendering logic.
* **Non-Destructive Filtering:** The search functionality utilizes a derived state approach. The full array of notes is preserved in state, while a filtered array is calculated on the fly during render to display search results.

# 6. Features
* **Full CRUD Functionality:** Create, Read, Update, and Delete notes seamlessly.
* **Live Search Filtering:** Instantly filter notes by keyword (case-insensitive across both title and content).
* **Automatic Data Persistence:** Notes are automatically saved to `localStorage` and survive browser restarts or page refreshes.
* **Tactile UI Design:** A custom "kraft paper and index card" aesthetic featuring monospace body text and serif headers.

# 7. Screenshots
<img width="1072" height="836" alt="Screenshot 2026-09-04 231822" src="https://github.com/user-attachments/assets/91ff3d15-5985-429a-a58d-86332c81e067" />
