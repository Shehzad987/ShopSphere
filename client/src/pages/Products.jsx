import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiFilter, FiX } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import FilterSidebar from '../components/FilterSidebar';
import { ProductGridSkeleton } from '../components/Skeletons';
import productService from '../services/productService';
import useDebounce from '../hooks/useDebounce';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const debouncedKeyword = useDebounce(keyword, 400);
  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || 'newest';
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');

  // Fetch categories once
  useEffect(() => {
    productService.getCategories().then((data) => setCategories(data.categories)).catch(() => {});
  }, []);

  // Sync debounced keyword to URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debouncedKeyword) params.set('keyword', debouncedKeyword);
    else params.delete('keyword');
    setSearchParams(params, { replace: true });
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedKeyword]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await productService.getProducts({
        keyword: debouncedKeyword || undefined,
        category: category || undefined,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
        sort,
        page,
        pageSize: 12,
      });
      setProducts(data.products);
      setPages(data.pages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [debouncedKeyword, category, minPrice, maxPrice, sort, page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    setSearchParams(params);
    setPage(1);
  };

  const handlePriceChange = (key, value) => {
    if (key === 'minPrice') setMinPrice(value);
    else setMaxPrice(value);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (minPrice) params.set('minPrice', minPrice);
    else params.delete('minPrice');
    if (maxPrice) params.set('maxPrice', maxPrice);
    else params.delete('maxPrice');
    setSearchParams(params, { replace: true });
    setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minPrice, maxPrice]);

  const clearFilters = () => {
    setKeyword('');
    setMinPrice('');
    setMaxPrice('');
    setSearchParams({});
    setPage(1);
  };

  return (
    <div className="container-app py-10">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl mb-2">All Products</h1>
        <p className="text-textMuted">Discover our full range of premium products.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <SearchBar value={keyword} onChange={setKeyword} />
        <div className="flex gap-3">
          <select
            value={sort}
            onChange={(e) => updateParam('sort', e.target.value)}
            className="input-field sm:w-48"
          >
            <option value="newest">Newest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden btn-outline px-4"
            aria-label="Open filters"
          >
            <FiFilter size={18} />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-8">
        {/* Desktop sidebar */}
        <div className="hidden lg:block">
          <FilterSidebar
            categories={categories}
            selectedCategory={category}
            onCategoryChange={(c) => updateParam('category', c)}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onPriceChange={handlePriceChange}
            onClear={clearFilters}
          />
        </div>

        {/* Mobile filter drawer */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-[90] lg:hidden">
            <div className="absolute inset-0 bg-black/70" onClick={() => setMobileFiltersOpen(false)} />
            <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-background p-4 overflow-y-auto animate-slide-up">
              <FilterSidebar
                categories={categories}
                selectedCategory={category}
                onCategoryChange={(c) => {
                  updateParam('category', c);
                  setMobileFiltersOpen(false);
                }}
                minPrice={minPrice}
                maxPrice={maxPrice}
                onPriceChange={handlePriceChange}
                onClear={clearFilters}
                onClose={() => setMobileFiltersOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Product grid */}
        <div>
          {loading ? (
            <ProductGridSkeleton count={9} />
          ) : products.length === 0 ? (
            <div className="glass-card p-16 text-center">
              <p className="text-textMuted mb-4">No products match your filters.</p>
              <button onClick={clearFilters} className="btn-outline">
                <FiX /> Clear filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                {products.map((p) => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>

              {pages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-10">
                  {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                        p === page
                          ? 'bg-gradient-primary text-background'
                          : 'bg-white/5 text-textMuted hover:text-primary'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
