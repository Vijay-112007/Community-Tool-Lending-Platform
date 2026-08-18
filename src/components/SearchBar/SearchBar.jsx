import './SearchBar.css';

function SearchBar({
  value,
  onChange,
  placeholder = 'What are you looking for?',
  onSubmit,
  showBrowseButton = false,
  onBrowse,
  id = 'search',
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(value);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <div className="search-bar__input-wrap">
        <svg className="search-bar__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="M20 20L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          id={id}
          type="search"
          className="search-bar__input"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={placeholder}
        />
      </div>
      {showBrowseButton && (
        <button type="button" className="btn btn-primary search-bar__browse" onClick={onBrowse}>
          Browse
        </button>
      )}
    </form>
  );
}

export default SearchBar;
