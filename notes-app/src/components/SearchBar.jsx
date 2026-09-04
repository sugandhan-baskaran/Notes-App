export default function SearchBar({ query, onQueryChange }) {
  return (
    <div className="search-tab">
      <label htmlFor="note-search" className="search-tab__label">
        Search
      </label>
      <input
        id="note-search"
        type="text"
        className="search-tab__input"
        placeholder="Find a card by title or content…"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
      />
      {query && (
        <button
          type="button"
          className="search-tab__clear"
          onClick={() => onQueryChange('')}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
}
