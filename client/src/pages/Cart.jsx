import { Link, useNavigate } from 'react-router-dom';
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import useCart from '../hooks/useCart';
import useAuth from '../hooks/useAuth';
import { formatCurrency } from '../utils/formatters';

const Cart = () => {
  const { items, subtotal, increaseQty, decreaseQty, removeFromCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 9.99;
  const tax = Number((subtotal * 0.08).toFixed(2));
  const total = Number((subtotal + shipping + tax).toFixed(2));

  const handleCheckout = () => {
    navigate(isAuthenticated ? '/checkout' : '/login', {
      state: { from: { pathname: '/checkout' } },
    });
  };

  if (items.length === 0) {
    return (
      <div className="container-app py-24 text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-textMuted mb-6">
          <FiShoppingBag size={32} />
        </div>
        <h1 className="font-display font-bold text-2xl mb-3">Your cart is empty</h1>
        <p className="text-textMuted mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/products" className="btn-primary">
          Start Shopping <FiArrowRight />
        </Link>
      </div>
    );
  }

  return (
    <div className="container-app py-10">
      <h1 className="font-display font-bold text-3xl mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
        {/* Cart items */}
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item._id} className="glass-card p-4 flex gap-4 items-center">
              <Link to={`/products/${item._id}`} className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-surface">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </Link>

              <div className="flex-1 min-w-0">
                <Link to={`/products/${item._id}`} className="font-medium hover:text-primary transition-colors line-clamp-1">
                  {item.name}
                </Link>
                <p className="text-primary font-display font-semibold mt-1">
                  {formatCurrency(item.price)}
                </p>
              </div>

              <div className="flex items-center gap-2 glass-card px-2 py-1.5 shrink-0">
                <button
                  onClick={() => decreaseQty(item._id)}
                  aria-label="Decrease quantity"
                  className="text-textMuted hover:text-primary p-1"
                >
                  <FiMinus size={14} />
                </button>
                <span className="w-6 text-center text-sm font-medium">{item.qty}</span>
                <button
                  onClick={() => increaseQty(item._id)}
                  disabled={item.qty >= item.countInStock}
                  aria-label="Increase quantity"
                  className="text-textMuted hover:text-primary p-1 disabled:opacity-30"
                >
                  <FiPlus size={14} />
                </button>
              </div>

              <p className="w-20 text-right font-display font-semibold shrink-0 hidden sm:block">
                {formatCurrency(item.price * item.qty)}
              </p>

              <button
                onClick={() => removeFromCart(item._id)}
                aria-label="Remove item"
                className="text-textMuted hover:text-red-400 transition-colors shrink-0"
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="glass-card p-6 sticky top-24">
          <h2 className="font-display font-semibold text-lg mb-5">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-textMuted">
              <span>Subtotal</span>
              <span className="text-textMain">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-textMuted">
              <span>Shipping</span>
              <span className="text-textMain">{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
            </div>
            <div className="flex justify-between text-textMuted">
              <span>Estimated Tax</span>
              <span className="text-textMain">{formatCurrency(tax)}</span>
            </div>
            <div className="border-t border-white/10 pt-3 flex justify-between font-display font-bold text-lg">
              <span>Total</span>
              <span className="text-primary">{formatCurrency(total)}</span>
            </div>
          </div>
          <button onClick={handleCheckout} className="btn-primary w-full mt-6">
            Proceed to Checkout <FiArrowRight />
          </button>
          <Link to="/products" className="block text-center text-sm text-textMuted hover:text-primary mt-4">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
