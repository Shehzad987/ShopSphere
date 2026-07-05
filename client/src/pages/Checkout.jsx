import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiCreditCard, FiTruck, FiCheckCircle } from 'react-icons/fi';
import useCart from '../hooks/useCart';
import orderService from '../services/orderService';
import { formatCurrency } from '../utils/formatters';

const steps = ['Shipping', 'Payment', 'Review'];

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [placing, setPlacing] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  const [shipping, setShipping] = useState({
    address: '',
    city: '',
    country: '',
    postalCode: '',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');

  const shippingCost = subtotal > 100 || subtotal === 0 ? 0 : 9.99;
  const tax = Number((subtotal * 0.08).toFixed(2));
  const total = Number((subtotal + shippingCost + tax).toFixed(2));

  const handleShippingChange = (e) => setShipping({ ...shipping, [e.target.name]: e.target.value });

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(1);
  };

  const handlePlaceOrder = async () => {
    setPlacing(true);
    try {
      const orderItems = items.map((i) => ({ product: i._id, name: i.name, image: i.image, price: i.price, qty: i.qty }));
      const data = await orderService.createOrder({ orderItems, shippingAddress: shipping, paymentMethod });
      setPlacedOrder(data.order);
      clearCart();
      toast.success('Order placed successfully!');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setPlacing(false);
    }
  };

  if (placedOrder) {
    return (
      <div className="container-app py-24 text-center max-w-lg mx-auto">
        <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mb-6">
          <FiCheckCircle size={36} />
        </div>
        <h1 className="font-display font-bold text-3xl mb-3">Order Confirmed!</h1>
        <p className="text-textMuted mb-2">
          Thank you for shopping with ShopSphere. Your order has been placed successfully.
        </p>
        <p className="text-sm text-textMuted mb-8">
          Order ID: <span className="text-primary font-mono">{placedOrder._id}</span>
        </p>
        <div className="glass-card p-6 text-left mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-textMuted">Total Paid</span>
            <span className="font-display font-bold text-primary">{formatCurrency(placedOrder.totalPrice)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-textMuted">Payment Method</span>
            <span>{placedOrder.paymentMethod}</span>
          </div>
        </div>
        <div className="flex gap-4 justify-center">
          <Link to="/orders" className="btn-primary">View My Orders</Link>
          <Link to="/products" className="btn-outline">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-app py-24 text-center">
        <p className="text-textMuted mb-6">Your cart is empty. Add items before checking out.</p>
        <Link to="/products" className="btn-primary">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="container-app py-10">
      <h1 className="font-display font-bold text-3xl mb-8">Checkout</h1>

      {/* Step indicator */}
      <div className="flex items-center gap-4 mb-10 max-w-md">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                i <= step ? 'bg-gradient-primary text-background' : 'bg-white/10 text-textMuted'
              }`}
            >
              {i + 1}
            </div>
            <span className={`text-sm ${i <= step ? 'text-textMain' : 'text-textMuted'}`}>{s}</span>
            {i < steps.length - 1 && <div className="flex-1 h-px bg-white/10" />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
        <div className="glass-card p-6 sm:p-8">
          {step === 0 && (
            <form onSubmit={handleShippingSubmit} className="space-y-5">
              <h2 className="font-display font-semibold text-lg flex items-center gap-2 mb-2">
                <FiTruck className="text-primary" /> Shipping Address
              </h2>
              <div>
                <label className="text-sm text-textMuted mb-1.5 block">Street Address</label>
                <input
                  required
                  name="address"
                  value={shipping.address}
                  onChange={handleShippingChange}
                  placeholder="123 Main Street"
                  className="input-field"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-textMuted mb-1.5 block">City</label>
                  <input
                    required
                    name="city"
                    value={shipping.city}
                    onChange={handleShippingChange}
                    placeholder="New York"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="text-sm text-textMuted mb-1.5 block">Country</label>
                  <input
                    required
                    name="country"
                    value={shipping.country}
                    onChange={handleShippingChange}
                    placeholder="United States"
                    className="input-field"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-textMuted mb-1.5 block">Postal Code</label>
                  <input
                    name="postalCode"
                    value={shipping.postalCode}
                    onChange={handleShippingChange}
                    placeholder="10001"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="text-sm text-textMuted mb-1.5 block">Phone Number</label>
                  <input
                    required
                    name="phone"
                    value={shipping.phone}
                    onChange={handleShippingChange}
                    placeholder="+1 (555) 000-0000"
                    className="input-field"
                  />
                </div>
              </div>
              <button type="submit" className="btn-primary w-full">Continue to Payment</button>
            </form>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <h2 className="font-display font-semibold text-lg flex items-center gap-2 mb-2">
                <FiCreditCard className="text-primary" /> Payment Method
              </h2>
              <div className="space-y-3">
                {['Cash on Delivery', 'Credit Card', 'PayPal', 'Stripe'].map((method) => (
                  <label
                    key={method}
                    className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                      paymentMethod === method ? 'border-primary bg-primary/5' : 'border-white/10 bg-white/5'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === method}
                      onChange={() => setPaymentMethod(method)}
                      className="accent-primary"
                    />
                    <span>{method}</span>
                  </label>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(0)} className="btn-outline flex-1">Back</button>
                <button onClick={() => setStep(2)} className="btn-primary flex-1">Review Order</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="font-display font-semibold text-lg mb-2">Review Your Order</h2>
              <div>
                <h3 className="text-sm text-textMuted mb-2">Shipping to</h3>
                <p className="text-sm">
                  {shipping.address}, {shipping.city}, {shipping.country} {shipping.postalCode}
                </p>
                <p className="text-sm text-textMuted">{shipping.phone}</p>
              </div>
              <div>
                <h3 className="text-sm text-textMuted mb-2">Payment Method</h3>
                <p className="text-sm">{paymentMethod}</p>
              </div>
              <div>
                <h3 className="text-sm text-textMuted mb-3">Items ({items.length})</h3>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item._id} className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm line-clamp-1">{item.name}</p>
                        <p className="text-xs text-textMuted">Qty: {item.qty}</p>
                      </div>
                      <p className="text-sm font-medium">{formatCurrency(item.price * item.qty)}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="btn-outline flex-1">Back</button>
                <button onClick={handlePlaceOrder} disabled={placing} className="btn-primary flex-1">
                  {placing ? 'Placing Order...' : 'Place Order'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order summary sidebar */}
        <div className="glass-card p-6 sticky top-24">
          <h2 className="font-display font-semibold text-lg mb-5">Order Summary</h2>
          <div className="space-y-3 text-sm max-h-64 overflow-y-auto mb-4">
            {items.map((item) => (
              <div key={item._id} className="flex justify-between text-textMuted">
                <span className="line-clamp-1 pr-2">{item.name} × {item.qty}</span>
                <span className="text-textMain shrink-0">{formatCurrency(item.price * item.qty)}</span>
              </div>
            ))}
          </div>
          <div className="space-y-3 text-sm border-t border-white/10 pt-4">
            <div className="flex justify-between text-textMuted">
              <span>Subtotal</span>
              <span className="text-textMain">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-textMuted">
              <span>Shipping</span>
              <span className="text-textMain">{shippingCost === 0 ? 'Free' : formatCurrency(shippingCost)}</span>
            </div>
            <div className="flex justify-between text-textMuted">
              <span>Tax</span>
              <span className="text-textMain">{formatCurrency(tax)}</span>
            </div>
            <div className="border-t border-white/10 pt-3 flex justify-between font-display font-bold text-lg">
              <span>Total</span>
              <span className="text-primary">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
