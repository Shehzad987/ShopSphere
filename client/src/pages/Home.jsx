import { useEffect, useState } from 'react';
import { FiCpu, FiWatch, FiHome as FiHomeIcon, FiHeart, FiActivity, FiPackage } from 'react-icons/fi';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import WhyChooseUs from '../components/WhyChooseUs';
import Newsletter from '../components/Newsletter';
import { ProductGridSkeleton } from '../components/Skeletons';
import productService from '../services/productService';

const categoryMeta = [
  { category: 'Electronics', icon: FiCpu, image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600' },
  { category: 'Fashion', icon: FiHeart, image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600' },
  { category: 'Home & Living', icon: FiHomeIcon, image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600' },
  { category: 'Gaming', icon: FiWatch, image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600' },
  { category: 'Sports', icon: FiActivity, image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600' },
  { category: 'Accessories', icon: FiPackage, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600' },
];

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await productService.getFeatured();
        if (mounted) setFeatured(data.products);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div>
      <Hero />

      {/* Categories */}
      <section className="container-app py-20">
        <div className="text-center mb-12">
          <h2 className="section-heading">Shop by Category</h2>
          <p className="text-textMuted mt-3">Explore our curated collections across every lifestyle.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categoryMeta.map((c) => (
            <CategoryCard key={c.category} {...c} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container-app py-4">
        <div className="text-center mb-12">
          <h2 className="section-heading">Featured Products</h2>
          <p className="text-textMuted mt-3">Hand-picked favorites our customers love most.</p>
        </div>
        {loading ? (
          <ProductGridSkeleton count={8} />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {featured.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </section>

      <WhyChooseUs />
      <Newsletter />
    </div>
  );
};

export default Home;
