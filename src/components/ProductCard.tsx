import { useState } from 'react';
import { Heart } from 'lucide-react';
import type { Product } from '../types';
import { ProductArt } from './ProductArt';

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product, weight: string) => void;
}

export function ProductCard({ product, addToCart }: ProductCardProps) {
  const [weight, setWeight] = useState<string>(product.weights[0]);
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const discount = Math.round((1 - product.price / product.mrp) * 100);

  const handleAdd = () => {
    addToCart(product, weight);
    setAdded(true);
    setTimeout(() => setAdded(false), 1300);
  };

  return (
    <article className="product-card">
      <div className="product-image">
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button className={`wish ${liked ? 'liked' : ''}`} onClick={() => setLiked(!liked)} aria-label="Add to wishlist">
          <Heart size={17} fill={liked ? 'currentColor' : 'none'} />
        </button>
        <ProductArt kind={product.kind} color={product.color} />
      </div>
      <div className="product-info">
        <div className="product-rating">
          <span className="stars">★★★★★</span>
          <span>{product.rating} ({product.reviews} Reviews)</span>
        </div>
        <h3>{product.name}</h3>
        <p>{product.desc}</p>
        <div className="price-row">
          <b>₹{product.price.toLocaleString('en-IN')}</b>
          <del>₹{product.mrp.toLocaleString('en-IN')}</del>
          <span>{discount}% OFF</span>
        </div>
        <div className="card-actions">
          <select value={weight} onChange={(e) => setWeight(e.target.value)} aria-label="Choose pack size">
            {product.weights.map((w) => <option key={w}>{w}</option>)}
          </select>
          <button className="add-btn" disabled={product.soldOut} onClick={handleAdd}>
            {product.soldOut ? 'Sold out' : added ? 'Added ✓' : 'Add to cart'}
          </button>
        </div>
      </div>
    </article>
  );
}
