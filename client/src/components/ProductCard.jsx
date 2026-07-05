import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Rating from './Rating';
import useCart from '../hooks/useCart';
import { formatCurrency } from '../utils/formatters';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const inStock = product.countInStock > 0;
  const hasDiscount = product.originalPrice > product.price;

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!inStock) {
      toast.error('This product is out of stock');
      return;
    }
    addToCart(product, 1);
  };

  return (
    <Link
      to={`/products/${product.slug || product._id}`}
      className="group glass-card overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-glow transition-all duration-300"
    >
      <div className="relative aspect-square overflow-hidden bg-surface">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {hasDiscount && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-gradient-primary text-background text-xs font-bold">
            SALE
          </span>
        )}
        {!inStock && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 text-textMuted text-xs font-semibold">
            Out of Stock
          </span>
        )}
        <button
          onClick={handleAddToCart}
          aria-label="Add to cart"
          className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-background/80 backdrop-blur border border-primary/40 flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-background"
        >
          <FiShoppingCart size={16} />
        </button>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <span className="text-xs text-textMuted">{product.category}</span>
        <h3 className="font-medium text-textMain line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <Rating value={product.rating} numReviews={product.numReviews} />
        <div className="flex items-center gap-2 mt-auto pt-2">
          <span className="font-display font-bold text-lg text-textMain">
            {formatCurrency(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-textMuted line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
