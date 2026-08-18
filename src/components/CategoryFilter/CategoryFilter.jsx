import './CategoryFilter.css';

function CategoryFilter({ categories, selected, onChange }) {
  return (
    <div className="category-filter" role="group" aria-label="Filter by category">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={`category-filter__btn ${selected === category ? 'category-filter__btn--active' : ''}`}
          onClick={() => onChange(category)}
          aria-pressed={selected === category}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
