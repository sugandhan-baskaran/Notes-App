export default function Header({ noteCount }) {
  return (
    <header className="masthead">
      <div className="masthead__title-row">
        <h1 className="masthead__title">Card Catalog</h1>
        <span className="masthead__count">
          {noteCount} {noteCount === 1 ? 'card' : 'cards'} on file
        </span>
      </div>
      <p className="masthead__subtitle">A small, searchable box of notes.</p>
    </header>
  );
}
