import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiMenu, FiX, FiUser, FiLogOut, FiSearch } from 'react-icons/fi';
import useAuth from '../hooks/useAuth';
import useCart from '../hooks/useCart';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Categories', to: '/products' },
  { label: 'Contact', to: '/contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(query ? `/products?keyword=${encodeURIComponent(query)}` : '/products');
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/10">
      <div className="container-app flex items-center justify-between h-16 gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0 group">
          <span className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center font-display font-bold text-background shadow-glow group-hover:shadow-glowHover transition-shadow">
            S
          </span>
          <span className="font-display font-bold text-xl tracking-tight">
            Shop<span className="gradient-text">Sphere</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-sm font-medium text-textMuted hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search bar - desktop */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-sm relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="input-field py-2 pr-10 text-sm"
          />
          <button
            type="submit"
            aria-label="Search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-textMuted hover:text-primary"
          >
            <FiSearch size={16} />
          </button>
        </form>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative p-2 hover:text-primary transition-colors" aria-label="Cart">
            <FiShoppingCart size={22} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-[10px] font-bold rounded-full bg-gradient-primary text-background">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/orders"
                className="flex items-center gap-1.5 text-sm font-medium text-textMuted hover:text-primary transition-colors"
              >
                <FiUser size={16} />
                {user?.name?.split(' ')[0]}
              </Link>
              <button
                onClick={logout}
                aria-label="Logout"
                className="text-textMuted hover:text-primary transition-colors"
              >
                <FiLogOut size={18} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="hidden lg:inline-flex btn-primary py-2 px-5 text-sm">
              Login / Register
            </Link>
          )}

          <button
            className="lg:hidden p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-white/10 bg-background/95 backdrop-blur-xl px-4 pb-6 pt-4 space-y-4 animate-fade-in">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="input-field py-2 pr-10 text-sm"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-textMuted">
              <FiSearch size={16} />
            </button>
          </form>
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setOpen(false)}
                className="text-textMuted hover:text-primary font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          {isAuthenticated ? (
            <div className="flex flex-col gap-3 pt-2 border-t border-white/10">
              <Link to="/orders" onClick={() => setOpen(false)} className="text-textMuted hover:text-primary font-medium">
                My Orders
              </Link>
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="text-left text-textMuted hover:text-primary font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" onClick={() => setOpen(false)} className="btn-primary w-full py-2.5 text-sm">
              Login / Register
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
