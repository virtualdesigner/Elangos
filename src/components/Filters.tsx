import { Search } from 'lucide-react';
import type { Availability } from '../types';

interface FiltersProps {
  open: boolean;
  search: string;
  onSearch: (value: string) => void;
  availability: Availability;
  onAvailability: (value: Availability) => void;
  counts: { all: number; stock: number; out: number };
  maxPrice: number;
  priceCeiling: number;
  onMaxPrice: (value: number) => void;
  categoryOptions: { name: string; count: number }[];
  categories: string[];
  onToggleCategory: (value: string) => void;
  weightOptions: string[];
  weights: string[];
  onToggleWeight: (value: string) => void;
  onClearAll: () => void;
  onApply: () => void;
}

export function Filters(props: FiltersProps) {
  const {
    open, search, onSearch, availability, onAvailability, counts, maxPrice, priceCeiling, onMaxPrice,
    categoryOptions, categories, onToggleCategory, weightOptions, weights, onToggleWeight, onClearAll, onApply,
  } = props;

  return (
    <aside className={`filters ${open ? 'show' : ''}`}>
      <div className="filter-title">
        <b>FILTERS</b>
        <button onClick={onClearAll}>Clear all</button>
      </div>
      <label className="filter-search">
        <Search size={15} />
        <input placeholder="Search products" value={search} onChange={(e) => onSearch(e.target.value)} />
      </label>
      <div className="filter-group">
        <h4>Availability</h4>
        <label><input type="radio" checked={availability === 'all'} onChange={() => onAvailability('all')} /> All products <small>({counts.all})</small></label>
        <label><input type="radio" checked={availability === 'stock'} onChange={() => onAvailability('stock')} /> In stock <small>({counts.stock})</small></label>
        <label><input type="radio" checked={availability === 'out'} onChange={() => onAvailability('out')} /> Out of stock <small>({counts.out})</small></label>
      </div>
      <div className="filter-group">
        <h4>Price</h4>
        <div className="price-inputs"><span>₹0</span><span>₹{maxPrice.toLocaleString('en-IN')}</span></div>
        <input
          className="range"
          type="range"
          min={0}
          max={priceCeiling}
          step={25}
          value={maxPrice}
          onChange={(e) => onMaxPrice(Number(e.target.value))}
        />
      </div>
      <div className="filter-group">
        <h4>Category</h4>
        {categoryOptions.map((c) => (
          <label key={c.name}>
            <input type="checkbox" checked={categories.includes(c.name)} onChange={() => onToggleCategory(c.name)} />
            {c.name}<small>({c.count})</small>
          </label>
        ))}
      </div>
      <div className="filter-group">
        <h4>Variants</h4>
        {weightOptions.map((w) => (
          <label key={w}>
            <input type="checkbox" checked={weights.includes(w)} onChange={() => onToggleWeight(w)} />
            {w}
          </label>
        ))}
      </div>
      <button className="apply-btn" onClick={onApply}>Apply filters</button>
    </aside>
  );
}
