import { FiX } from 'react-icons/fi';

const FilterSidebar = ({
  categories = [],
  selectedCategory,
  onCategoryChange,
  minPrice,
  maxPrice,
  onPriceChange,
  onClear,
  onClose,
}) => {
  return (
    <aside className="glass-card p-5 h-fit sticky top-24">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display font-semibold text-lg">Filters</h3>
        <div className="flex items-center gap-3">
          <button onClick={onClear} className="text-xs text-primary hover:underline">
            Clear all
          </button>
          {onClose && (
            <button onClick={onClose} className="lg:hidden text-textMuted hover:text-primary" aria-label="Close filters">
              <FiX size={18} />
            </button>
          )}
        </div>
      </div>


      <div className="mb-6">
        <h4 className="text-sm font-medium text-textMuted mb-3">Category</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <input
              type="radio"
              name="category"
              checked={!selectedCategory}
              onChange={() => onCategoryChange('')}
              className="accent-primary"
            />
            <span className={!selectedCategory ? 'text-primary' : 'text-textMain'}>All Categories</span>
          </label>
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === cat}
                onChange={() => onCategoryChange(cat)}
                className="accent-primary"
              />
              <span className={selectedCategory === cat ? 'text-primary' : 'text-textMain'}>{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price filter */}
      <div>
        <h4 className="text-sm font-medium text-textMuted mb-3">Price Range</h4>
        <div className="flex items-center gap-3">
          <input
            type="number"
            min="0"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => onPriceChange('minPrice', e.target.value)}
            className="input-field py-2 text-sm"
          />
          <span className="text-textMuted">-</span>
          <input
            type="number"
            min="0"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => onPriceChange('maxPrice', e.target.value)}
            className="input-field py-2 text-sm"
          />
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
