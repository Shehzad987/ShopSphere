import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiShoppingCart, FiMinus, FiPlus, FiCheck, FiTruck, FiShield } from 'react-icons/fi';
import Rating from '../components/Rating';
import ProductCard from '../components/ProductCard';
import { ProductDetailsSkeleton } from '../components/Skeletons';
import productService from '../services/productService';
import useCart from '../hooks/useCart';
import useAuth from '../hooks/useAuth';
import { formatCurrency, formatDate } from '../utils/formatters';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { isAuthenticated, user } = useAuth();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    (async () => {
      try {
        const data = await productService.getById(id);
        if (!mounted) return;
        setProduct(data.product);
        setQty(1);
        const relatedData = await productService.getRelated(data.product._id);
        if (mounted) setRelated(relatedData.products);
      } catch (err) {
        toast.error('Product not found');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  const handleAddToCart = () => {
    if (product.countInStock === 0) return;
    addToCart(product, qty);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please log in to leave a review');
      return;
    }
    setSubmittingReview(true);
    try {
      await productService.addReview(product._id, reviewForm);
      toast.success('Review submitted!');
      const data = await productService.getById(id);
      setProduct(data.product);
      setReviewForm({ rating: 5, comment: '' });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="container-app py-10">
        <ProductDetailsSkeleton />
      </div>
    );
  }

  if (!product) return null;

  const hasDiscount = product.originalPrice > product.price;
  const inStock = product.countInStock > 0;

  return (
    <div className="container-app py-10">
      {/* Breadcrumb */}
      <div className="text-sm text-textMuted mb-8 flex items-center gap-2">
        <Link to="/" className="hover:text-primary">Home</Link> /
        <Link to="/products" className="hover:text-primary">Products</Link> /
        <Link to={`/products?category=${product.category}`} className="hover:text-primary">{product.category}</Link> /
        <span className="text-textMain">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-10 mb-16">
        {/* Image */}
        <div className="glass-card overflow-hidden aspect-square">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* Details */}
        <div>
          <span className="text-sm text-primary font-medium">{product.category}</span>
          <h1 className="font-display font-bold text-3xl mt-2 mb-3">{product.name}</h1>
          <Rating value={product.rating} numReviews={product.numReviews} size={16} />

          <div className="flex items-center gap-3 mt-5">
            <span className="font-display font-bold text-3xl">{formatCurrency(product.price)}</span>
            {hasDiscount && (
              <span className="text-lg text-textMuted line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          <p className="text-textMuted leading-relaxed mt-5">{product.description}</p>

          <div className="flex items-center gap-2 mt-5">
            {inStock ? (
              <>
                <FiCheck className="text-primary" />
                <span className="text-sm text-textMain">
                  In Stock <span className="text-textMuted">({product.countInStock} available)</span>
                </span>
              </>
            ) : (
              <span className="text-sm text-red-400 font-medium">Out of Stock</span>
            )}
          </div>

          {inStock && (
            <div className="flex items-center gap-4 mt-6">
              <div className="flex items-center gap-3 glass-card px-3 py-2">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="text-textMuted hover:text-primary"
                >
                  <FiMinus size={16} />
                </button>
                <span className="w-8 text-center font-medium">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(product.countInStock, q + 1))}
                  aria-label="Increase quantity"
                  className="text-textMuted hover:text-primary"
                >
                  <FiPlus size={16} />
                </button>
              </div>
              <button onClick={handleAddToCart} className="btn-primary flex-1">
                <FiShoppingCart /> Add to Cart
              </button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/10">
            <div className="flex items-center gap-3 text-sm text-textMuted">
              <FiTruck className="text-primary shrink-0" size={20} />
              Free shipping over $100
            </div>
            <div className="flex items-center gap-3 text-sm text-textMuted">
              <FiShield className="text-primary shrink-0" size={20} />
              Secure checkout
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mb-16">
        <h2 className="font-display font-bold text-2xl mb-6">Customer Reviews</h2>

        {product.reviews.length === 0 ? (
          <p className="text-textMuted mb-8">No reviews yet. Be the first to share your thoughts!</p>
        ) : (
          <div className="space-y-4 mb-8">
            {product.reviews.map((review) => (
              <div key={review._id} className="glass-card p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{review.name}</span>
                  <span className="text-xs text-textMuted">{formatDate(review.createdAt)}</span>
                </div>
                <Rating value={review.rating} />
                <p className="text-textMuted mt-2 text-sm leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        )}

        <div className="glass-card p-6 max-w-lg">
          <h3 className="font-display font-semibold mb-4">Write a Review</h3>
          {isAuthenticated ? (
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-textMuted mb-1.5 block">Rating</label>
                <select
                  value={reviewForm.rating}
                  onChange={(e) => setReviewForm({ ...reviewForm, rating: e.target.value })}
                  className="input-field"
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>{r} Star{r > 1 && 's'}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-textMuted mb-1.5 block">Comment</label>
                <textarea
                  required
                  rows={3}
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  className="input-field resize-none"
                  placeholder="Share your experience with this product..."
                />
              </div>
              <button type="submit" disabled={submittingReview} className="btn-primary">
                {submittingReview ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          ) : (
            <p className="text-textMuted text-sm">
              <Link to="/login" className="text-primary hover:underline">Log in</Link> to leave a review.
            </p>
          )}
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div>
          <h2 className="font-display font-bold text-2xl mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {related.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
