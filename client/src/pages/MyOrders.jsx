import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPackage, FiChevronRight } from 'react-icons/fi';
import LoadingSpinner from '../components/LoadingSpinner';
import orderService from '../services/orderService';
import { formatCurrency, formatDate } from '../utils/formatters';

const statusColors = {
  Processing: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  Shipped: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  Delivered: 'bg-primary/15 text-primary border-primary/30',
  Cancelled: 'bg-red-500/15 text-red-400 border-red-500/30',
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderService
      .getMyOrders()
      .then((data) => setOrders(data.orders))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner fullScreen label="Loading your orders..." />;

  if (orders.length === 0) {
    return (
      <div className="container-app py-24 text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-textMuted mb-6">
          <FiPackage size={32} />
        </div>
        <h1 className="font-display font-bold text-2xl mb-3">No orders yet</h1>
        <p className="text-textMuted mb-8">When you place an order, it'll show up here.</p>
        <Link to="/products" className="btn-primary">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container-app py-10">
      <h1 className="font-display font-bold text-3xl mb-8">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="glass-card p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-white/10">
              <div>
                <p className="text-xs text-textMuted">Order ID</p>
                <p className="text-sm font-mono">{order._id}</p>
              </div>
              <div>
                <p className="text-xs text-textMuted">Placed on</p>
                <p className="text-sm">{formatDate(order.createdAt)}</p>
              </div>
              <div>
                <p className="text-xs text-textMuted">Total</p>
                <p className="text-sm font-display font-semibold text-primary">
                  {formatCurrency(order.totalPrice)}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[order.status]}`}
              >
                {order.status}
              </span>
            </div>

            <div className="flex items-center gap-4 overflow-x-auto pb-2">
              {order.orderItems.map((item, idx) => (
                <img
                  key={idx}
                  src={item.image}
                  alt={item.name}
                  title={`${item.name} × ${item.qty}`}
                  className="w-14 h-14 rounded-lg object-cover shrink-0"
                />
              ))}
              <Link
                to={`/products`}
                className="ml-auto shrink-0 flex items-center gap-1 text-sm text-primary hover:underline"
              >
                Reorder <FiChevronRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
