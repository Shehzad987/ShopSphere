import { Link } from 'react-router-dom';
import { FiHome, FiArrowLeft } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="container-app min-h-[70vh] flex flex-col items-center justify-center text-center py-16">
      <h1 className="font-display font-bold text-[8rem] sm:text-[10rem] leading-none gradient-text">
        404
      </h1>
      <h2 className="font-display font-bold text-2xl mt-4 mb-3">Lost in the Sphere</h2>
      <p className="text-textMuted max-w-sm mb-8">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <div className="flex gap-4">
        <Link to="/" className="btn-primary">
          <FiHome /> Back to Home
        </Link>
        <Link to="/products" className="btn-outline">
          <FiArrowLeft /> Browse Products
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
