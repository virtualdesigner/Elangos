import type { FormEvent } from 'react';
import { ArrowRight, Facebook, Instagram, Youtube } from 'lucide-react';

export function Footer() {
  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
  };

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <a className="brand">
            <span className="brand-mark">tb</span>
            <span className="brand-copy"><b>TWO BROTHERS</b><small>INDIA FARMS</small></span>
          </a>
          <h2>Thoughtfully<br /><em>crafted food.</em></h2>
          <p>Subscribe for special offers, newsletters and become a part of our movement.</p>
          <form onSubmit={handleSubscribe}>
            <input type="email" placeholder="Your e-mail address" required />
            <button>Subscribe <ArrowRight size={15} /></button>
          </form>
        </div>
        <div>
          <h4>Categories</h4>
          <a>Cultured Cow Ghee</a><a>Breakfast & Snacks</a><a>Kitchen Essentials</a>
          <a>Natural Sweeteners</a><a>Healthy Snacking</a><a>Grains & Pulses</a>
        </div>
        <div>
          <h4>General</h4>
          <a>Track Order</a><a>Sitemap</a><a>Terms Of Service</a>
          <a>Refund & Cancellation Policy</a><a>Shipping & Delivery Policy</a><a>Privacy Policy</a>
        </div>
        <div>
          <h4>Connect</h4>
          <a>Contact Us</a><a>WhatsApp Us</a><a>Our Team</a><a>Farmer's Markets</a>
          <div className="socials"><Instagram /><Facebook /><Youtube /></div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Two Brothers India Farms. All rights reserved.</span>
        <span>Made with care for people & planet.</span>
      </div>
    </footer>
  );
}
