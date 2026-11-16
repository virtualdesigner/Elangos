import { useState } from 'react';
import { ChevronDown, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onCart: () => void;
}

export function Header({ cartCount, onCart }: HeaderProps) {
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState('');

  return (
    <>
      <div className="announcement">
        <span>✦ Get 10% OFF on orders above ₹3000 | Use Code - TBIF10</span>
        <span className="announce-right">🚚 Enjoy Free Shipping on orders above ₹1499</span>
      </div>
      <header className="header">
        <button className="icon-btn mobile-menu" onClick={() => setMenu(!menu)} aria-label="Menu">
          {menu ? <X /> : <Menu />}
        </button>
        <a className="brand" href="#">
          <span className="brand-mark">tb</span>
          <span className="brand-copy"><b>TWO BROTHERS</b><small>INDIA FARMS</small></span>
        </a>
        <nav className={menu ? 'nav open' : 'nav'}>
          <a href="#">Shop <ChevronDown size={13} /></a>
          <a href="#">Our Philosophy</a>
          <a href="#">Farmer's Movement</a>
          <a href="#">Engage</a>
          <a href="#">Connect</a>
        </nav>
        <div className="header-actions">
          <div className="search-wrap">
            <Search size={17} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="What are you looking for?" />
          </div>
          <button className="icon-btn" aria-label="Account"><UserRound /></button>
          <button className="icon-btn cart-trigger" onClick={onCart} aria-label="Open cart">
            <ShoppingBag /><span>{cartCount}</span>
          </button>
        </div>
      </header>
      <div className="category-nav">
        <a>Ghee</a><a>Oil</a><a>Atta</a><a>Natural Sweetener</a><a>Immunity Support</a><a>Rice</a>
        <a>Breakfast & Snacks</a><a className="active">Grains & Pulses</a><a>Spices</a>
      </div>
      {menu && (
        <div className="mobile-menu-panel">
          <a>Shop all</a><a>Our Philosophy</a><a>Farmer's Movement</a><a>Engage</a><a>Connect</a>
        </div>
      )}
    </>
  );
}
