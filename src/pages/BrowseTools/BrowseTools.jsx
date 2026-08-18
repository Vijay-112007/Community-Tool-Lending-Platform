import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CATEGORIES } from '../../data/mockData';
import SearchBar from '../../components/SearchBar/SearchBar';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter';
import ToolGrid from '../../components/ToolGrid/ToolGrid';
import LoadingState from '../../components/LoadingState/LoadingState';
import EmptyState from '../../components/EmptyState/EmptyState';
import ErrorState from '../../components/ErrorState/ErrorState';
import { getTools } from '../../services/tools';
import './BrowseTools.css';

const AVAILABILITY_OPTIONS = ['All', 'Available'];
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'name', label: 'Name A–Z' },
];

function BrowseTools() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState('All');
  const [availability, setAvailability] = useState('All');
  const [sort, setSort] = useState('newest');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTools = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTools({ search, category, availability });
      setTools(data);
    } catch (err) {
      setError(err.message || 'Failed to load tools.');
    } finally {
      setLoading(false);
    }
  }, [search, category, availability]);

  useEffect(() => {
    fetchTools();
  }, [fetchTools]);

  useEffect(() => {
    const urlSearch = searchParams.get('search') || '';
    if (urlSearch !== search) {
      setSearch(urlSearch);
    }
  }, [searchParams]);

  const handleSearchSubmit = (query) => {
    setSearch(query);
    if (query) {
      setSearchParams({ search: query });
    } else {
      setSearchParams({});
    }
  };

  const sortedTools = [...tools].sort((a, b) => {
    if (sort === 'name') {
      return a.name.localeCompare(b.name);
    }
    return new Date(b.addedAt) - new Date(a.addedAt);
  });

  return (
    <div className="browse-tools">
      <header className="page-header">
        <h1>Browse Tools</h1>
        <p>Discover tools shared by your community members.</p>
      </header>

      <div className="browse-tools__controls">
        <SearchBar
          value={search}
          onChange={setSearch}
          onSubmit={handleSearchSubmit}
          placeholder="Search by tool name..."
        />

        <button
          type="button"
          className="browse-tools__filter-toggle"
          onClick={() => setFiltersOpen(!filtersOpen)}
          aria-expanded={filtersOpen}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 6h16M7 12h10M10 18h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Filters
        </button>

        <div className={`browse-tools__filters ${filtersOpen ? 'browse-tools__filters--open' : ''}`}>
          <div className="browse-tools__filter-group">
            <label className="browse-tools__filter-label">Category</label>
            <CategoryFilter
              categories={CATEGORIES}
              selected={category}
              onChange={setCategory}
            />
          </div>

          <div className="browse-tools__filter-row">
            <div className="browse-tools__filter-group browse-tools__filter-group--inline">
              <label htmlFor="availability-filter" className="browse-tools__filter-label">
                Availability
              </label>
              <select
                id="availability-filter"
                className="form-input browse-tools__select"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
              >
                {AVAILABILITY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="browse-tools__filter-group browse-tools__filter-group--inline">
              <label htmlFor="sort-filter" className="browse-tools__filter-label">
                Sort by
              </label>
              <select
                id="sort-filter"
                className="form-input browse-tools__select"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="browse-tools__results">
        {loading && <LoadingState message="Finding tools..." />}

        {!loading && error && (
          <ErrorState message={error} onRetry={fetchTools} />
        )}

        {!loading && !error && sortedTools.length === 0 && (
          <EmptyState
            title="No tools found"
            message="Try adjusting your search or filters to find what you need."
          />
        )}

        {!loading && !error && sortedTools.length > 0 && (
          <>
            <p className="browse-tools__count">
              {sortedTools.length} tool{sortedTools.length !== 1 ? 's' : ''} found
            </p>
            <ToolGrid tools={sortedTools} />
          </>
        )}
      </div>
    </div>
  );
}

export default BrowseTools;
