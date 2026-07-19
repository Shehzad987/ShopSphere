import { Link } from 'react-router-dom';
import { FiArrowRight, FiZap } from 'react-icons/fi';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-radial">
      <div className="container-app grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-28">
        
        <div className="animate-slide-up">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-primary/30 text-primary text-xs font-medium mb-6">
            <FiZap size={14} /> New season drop is live
          </span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-6">
            Shop the future,
            <br />
            <span className="gradient-text">delivered today.</span>
          </h1>
          <p className="text-textMuted text-lg max-w-md mb-8 leading-relaxed">
            ShopSphere curates premium tech, fashion, and lifestyle products with a
            checkout experience as fast as your Wi-Fi.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/products" className="btn-primary">
              Shop Now <FiArrowRight />
            </Link>
            <Link to="/products?category=Electronics" className="btn-outline">
              Explore Electronics
            </Link>
          </div>

          <div className="flex gap-10 mt-12">
            {[
              ['12K+', 'Happy customers'],
              ['4.8★', 'Average rating'],
              ['24/7', 'Support'],
            ].map(([stat, label]) => (
              <div key={label}>
                <p className="font-display font-bold text-2xl text-textMain">{stat}</p>
                <p className="text-xs text-textMuted mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>


        <div className="relative hidden lg:flex items-center justify-center animate-fade-in">
          <div className="absolute w-80 h-80 rounded-full bg-primary/20 blur-[100px]" />
          <svg viewBox="0 0 400 400" className="relative w-full max-w-md animate-float">
            <defs>
              <linearGradient id="heroGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00F5FF" />
                <stop offset="100%" stopColor="#008CFF" />
              </linearGradient>
            </defs>
            <rect x="90" y="60" width="220" height="280" rx="24" fill="#111827" stroke="url(#heroGrad)" strokeWidth="2" />
            <circle cx="200" cy="140" r="50" fill="url(#heroGrad)" opacity="0.9" />
            <rect x="130" y="220" width="140" height="14" rx="7" fill="#1A2333" />
            <rect x="130" y="248" width="100" height="14" rx="7" fill="#1A2333" />
            <rect x="130" y="286" width="140" height="36" rx="10" fill="url(#heroGrad)" />
            <circle cx="330" cy="90" r="14" fill="url(#heroGrad)" opacity="0.7" />
            <circle cx="60" cy="320" r="20" fill="url(#heroGrad)" opacity="0.5" />
            <rect x="40" y="130" width="46" height="46" rx="12" fill="#111827" stroke="url(#heroGrad)" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
