'use client';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCategory, setSort, setPage, setMinPrice, setMaxPrice } from '@/store/productSlice';

export default function Filters() {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((s) => s.products);

  const categories = [
    "all", "men's clothing", "women's clothing", "jewelery", "electronics"
  ];

  const handleMinChange = (v: string) => {
    const n = v === "" ? null : Number(v);
    dispatch(setMinPrice(n));
  };

  const handleMaxChange = (v: string) => {
    const n = v === "" ? null : Number(v);
    dispatch(setMaxPrice(n));
  };

  return (
    <aside className="w-full sm:w-64 p-4 rounded-xl">
      <h3 className="font-semibold text-[#212121] mb-4">Filters</h3>

      {/* Price Filter */}
      <div className="mb-6">
        <label className="block text-sm font-bold text-[#212121] mb-2">Price</label>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice ?? ''}
            onChange={(e) => handleMinChange(e.target.value)}
            className="w-1/2 border border-gray-200 rounded-md p-2 text-sm focus:outline-none focus:ring focus:ring-green-100"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice ?? ''}
            onChange={(e) => handleMaxChange(e.target.value)}
            className="w-1/2 border border-gray-200 rounded-md p-2 text-sm focus:outline-none focus:ring focus:ring-green-100"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-sm font-bold text-[#212121] mb-2">Category</label>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.category === cat}
                onChange={() => dispatch(setCategory(cat))}
                className="w-4 h-4 accent-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <button
          className="px-3 py-1 bg-gray-100 text-sm rounded disabled:opacity-50 cursor-pointer"
          onClick={() => dispatch(setPage(Math.max(1, filters.page - 1)))}
          disabled={filters.page <= 1}
        >
          Prev
        </button>
        <span className="text-sm text-gray-600">Page {filters.page}</span>
        <button
          className="px-3 py-1 bg-gray-100 text-sm rounded cursor-pointer"
          onClick={() => dispatch(setPage(filters.page + 1))}
        >
          Next
        </button>
      </div>
    </aside>
  );
}
