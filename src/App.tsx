import { useMemo, useState } from 'react';
import { Leaf, ShieldCheck, SlidersHorizontal, Sprout, Truck } from 'lucide-react';
import { CartDrawer } from './components/CartDrawer';
import { Filters } from './components/Filters';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { useProducts } from './hooks/useProducts';
import { SORT_OPTIONS, type Availability, type CartItem, type Product, type SortOption } from './types';

/** "500g" -> 500, "2kg" -> 2000. Used to order pack sizes. */
function toGrams(weight: string): number {
  const match = /^([\d.]+)\s*(kg|g)$/i.exec(weight.trim());
  if (!match) return Number.MAX_SAFE_INTEGER;
  const value = parseFloat(match[1]);
  return match[2].toLowerCase() === 'kg' ? value * 1000 : value;
}

export function App() {
  const { products, loading, error, reload } = useProducts();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sort, setSort] = useState<SortOption>('Featured');
  const [availability, setAvailability] = useState<Availability>('all');
  const [categories, setCategories] = useState<string[]>([]);
  const [maxPriceFilter, setMaxPriceFilter] = useState<number | null>(null); // null = no price limit
  const [weightFilter, setWeightFilter] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  // Filter options and counts now come from the database data instead of being hardcoded.
  const priceCeiling = useMemo(() => Math.max(0, ...products.map((p) => p.mrp)), [products]);
  const maxPrice = maxPriceFilter ?? priceCeiling;

  const availabilityCounts = useMemo(() => {
    const out = products.filter((p) => p.soldOut).length;
    return { all: products.length, stock: products.length - out, out };
  }, [products]);

  const categoryOptions = useMemo(() => {
    const counts = new Map<string, number>();
    products.forEach((p) => counts.set(p.category, (counts.get(p.category) ?? 0) + 1));
    return [...counts.entries()].map(([name, count]) => ({ name, count }));
  }, [products]);

  const weightOptions = useMemo(
    () => [...new Set(products.flatMap((p) => p.weights))].sort((a, b) => toGrams(a) - toGrams(b)),
    [products],
  );

  const visible = useMemo(() => {
    const term = search.toLowerCase();
    const list = products.filter(
      (p) =>
        (availability === 'all' || (availability === 'stock' && !p.soldOut) || (availability === 'out' && p.soldOut)) &&
        (!categories.length || categories.includes(p.category)) &&
        p.price <= maxPrice &&
        (!weightFilter.length || weightFilter.some((w) => p.weights.includes(w))) &&
        (p.name.toLowerCase().includes(term) || p.desc.toLowerCase().includes(term)),
    );
    if (sort === 'Price, low to high') list.sort((a, b) => a.price - b.price);
    if (sort === 'Price, high to low') list.sort((a, b) => b.price - a.price);
    if (sort === 'Alphabetically, A-Z') list.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'Best selling') list.sort((a, b) => b.reviews - a.reviews);
    return list;
  }, [products, sort, availability, categories, maxPrice, weightFilter, search]);

  const cartCount = cart.reduce((n, item) => n + item.qty, 0);
  const total = cart.reduce((n, item) => n + item.product.price * item.qty, 0);

  function addToCart(product: Product, weight: string) {
    setCart((old) => {
      const key = `${product.id}-${weight}`;
      const found = old.find((x) => x.key === key);
      return found
        ? old.map((x) => (x.key === key ? { ...x, qty: x.qty + 1 } : x))
        : [...old, { key, product, weight, qty: 1 }];
    });
  }

  function changeQty(key: string, delta: number) {
    setCart((old) => old.map((x) => (x.key === key ? { ...x, qty: x.qty + delta } : x)).filter((x) => x.qty > 0));
  }

  const toggle = (arr: string[], set: (v: string[]) => void, value: string) =>
    set(arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value]);

  function clearFilters() {
    setAvailability('all');
    setCategories([]);
    setWeightFilter([]);
    setMaxPriceFilter(null);
  }

  function renderProducts() {
    if (loading) {
      return (
        <div className="empty-results">
          <Leaf size={32} />
          <h3>Loading products…</h3>
          <p>Fetching the latest collection from our farms.</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="empty-results">
          <Leaf size={32} />
          <h3>Couldn't load products</h3>
          <p>{error}. Please make sure the backend server is running.</p>
          <button onClick={reload}>Try again</button>
        </div>
      );
    }
    if (!visible.length) {
      return (
        <div className="empty-results">
          <Leaf size={32} />
          <h3>No products found</h3>
          <p>Try changing or clearing your filters.</p>
          <button onClick={() => { clearFilters(); setSearch(''); }}>Clear filters</button>
        </div>
      );
    }
    return visible.map((p) => <ProductCard key={p.id} product={p} addToCart={addToCart} />);
  }

  return (
    <>
      <Header cartCount={cartCount} onCart={() => setCartOpen(true)} />
      <main>
        <div className="breadcrumb"><a>Home</a><span>/</span><a>Shop</a><span>/</span><b>Grains, Pulses & Millets</b></div>
        <section className="collection-hero">
          <div>
            <span className="eyebrow">FROM OUR FARMS TO YOUR TABLE</span>
            <h1>Grains, Pulses<br /><em>& Millets</em></h1>
            <p>Wholesome, native grains and unpolished pulses. Grown with care, crafted by nature.</p>
          </div>
          <div className="hero-stamp"><Sprout size={32} /><span>GOOD FOOD<br />GOOD FARMS</span></div>
        </section>
        <div className="collection-heading">
          <div><span className="eyebrow">THE PANTRY COLLECTION</span><h2>Everyday goodness, <em>naturally.</em></h2></div>
          <p>Discover ingredients rooted in tradition<br />and grown for a healthier tomorrow.</p>
        </div>
        <div className="toolbar">
          <button className="filter-toggle" onClick={() => setFiltersOpen(!filtersOpen)}>
            <SlidersHorizontal size={17} /> Filters{' '}
            <span className="filter-count">{categories.length + weightFilter.length + (availability !== 'all' ? 1 : 0)}</span>
          </button>
          <span className="result-count">{loading ? '…' : visible.length} products</span>
          <div className="sort-control">
            <span>Sort by</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as SortOption)}>
              {SORT_OPTIONS.map((x) => <option key={x}>{x}</option>)}
            </select>
          </div>
        </div>
        <div className="catalog-layout">
          <Filters
            open={filtersOpen}
            search={search}
            onSearch={setSearch}
            availability={availability}
            onAvailability={setAvailability}
            counts={availabilityCounts}
            maxPrice={maxPrice}
            priceCeiling={priceCeiling}
            onMaxPrice={setMaxPriceFilter}
            categoryOptions={categoryOptions}
            categories={categories}
            onToggleCategory={(c) => toggle(categories, setCategories, c)}
            weightOptions={weightOptions}
            weights={weightFilter}
            onToggleWeight={(w) => toggle(weightFilter, setWeightFilter, w)}
            onClearAll={clearFilters}
            onApply={() => setFiltersOpen(false)}
          />
          <section className="products-grid">{renderProducts()}</section>
        </div>
        <section className="promise-strip">
          <div><Sprout /><b>Rooted in tradition</b><span>Native varieties, thoughtfully sourced</span></div>
          <div><ShieldCheck /><b>Clean & conscious</b><span>No unnecessary processing</span></div>
          <div><Truck /><b>Delivered with care</b><span>From our farms to your home</span></div>
        </section>
      </main>
      <Footer />
      {cartOpen && (
        <CartDrawer cart={cart} cartCount={cartCount} total={total} onClose={() => setCartOpen(false)} changeQty={changeQty} />
      )}
    </>
  );
}
