import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiFacebook, FiGithub } from 'react-icons/fi';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-surface/40 mt-24">
      <div className="container-app py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <span className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center font-display font-bold text-background">
              S
            </span>
            <span className="font-display font-bold text-xl">
              Shop<span className="gradient-text">Sphere</span>
            </span>
          </Link>
          <p className="text-sm text-textMuted leading-relaxed">
            A premium shopping destination for tech, fashion, and lifestyle essentials —
            curated for people who want the future, today.
          </p>
          <div className="flex gap-3 mt-5">
            {[FiInstagram, FiTwitter, FiFacebook, FiGithub].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                aria-label="social link"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-textMuted hover:text-primary hover:border-primary/50 transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4 text-textMain">Shop</h4>
          <ul className="space-y-2.5 text-sm text-textMuted">
            <li><Link to="/products" className="hover:text-primary transition-colors">All Products</Link></li>
            <li><Link to="/products?category=Electronics" className="hover:text-primary transition-colors">Electronics</Link></li>
            <li><Link to="/products?category=Fashion" className="hover:text-primary transition-colors">Fashion</Link></li>
            <li><Link to="/products?category=Gaming" className="hover:text-primary transition-colors">Gaming</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4 text-textMain">Company</h4>
          <ul className="space-y-2.5 text-sm text-textMuted">
            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            <li><Link to="/orders" className="hover:text-primary transition-colors">My Orders</Link></li>
            <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold mb-4 text-textMain">Stay in the loop</h4>
          <p className="text-sm text-textMuted mb-4">Get early access to drops and exclusive offers.</p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="you@email.com"
              className="input-field py-2 text-sm"
              required
            />
            <button type="submit" className="btn-primary py-2 px-4 text-sm shrink-0">
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <p className="text-center text-xs text-textMuted">
          © {year} ShopSphere. All rights reserved. Built with the MERN stack.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
