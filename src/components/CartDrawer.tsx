import { ArrowRight, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import type { CartItem } from '../types';
import { ProductArt } from './ProductArt';

interface CartDrawerProps {
  cart: CartItem[];
  cartCount: number;
  total: number;
  onClose: () => void;
  changeQty: (key: string, delta: number) => void;
}

export function CartDrawer({ cart, cartCount, total, onClose, changeQty }: CartDrawerProps) {
  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <aside className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-head">
          <h2>Your Cart <small>({cartCount} items)</small></h2>
          <button className="icon-btn" onClick={onClose}><X /></button>
        </div>
        {cart.length ? (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.key}>
                  <div className="cart-thumb"><ProductArt kind={item.product.kind} color={item.product.color} /></div>
                  <div className="cart-item-info">
                    <b>{item.product.name}</b>
                    <small>{item.weight}</small>
                    <strong>₹{(item.product.price * item.qty).toLocaleString('en-IN')}</strong>
                    <div className="qty">
                      <button onClick={() => changeQty(item.key, -1)}><Minus size={13} /></button>
                      <span>{item.qty}</span>
                      <button onClick={() => changeQty(item.key, 1)}><Plus size={13} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <div><span>Subtotal</span><b>₹{total.toLocaleString('en-IN')}</b></div>
              <small>Shipping and taxes calculated at checkout.</small>
              <button onClick={() => alert('Demo storefront: checkout is not connected.')}>
                Continue to checkout <ArrowRight size={16} />
              </button>
            </div>
          </>
        ) : (
          <div className="empty-cart">
            <ShoppingBag size={36} />
            <h3>Your cart is empty</h3>
            <p>Looks like you haven't added anything yet.</p>
            <button onClick={onClose}>Start shopping</button>
          </div>
        )}
      </aside>
    </div>
  );
}
