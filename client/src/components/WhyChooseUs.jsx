import { FiTruck, FiShield, FiRefreshCw, FiHeadphones } from 'react-icons/fi';

const features = [
  {
    icon: FiTruck,
    title: 'Fast & Free Shipping',
    desc: 'Free delivery on all orders over $100, with express options available.',
  },
  {
    icon: FiShield,
    title: 'Secure Payments',
    desc: 'Bank-level encryption on every transaction, every time.',
  },
  {
    icon: FiRefreshCw,
    title: 'Easy Returns',
    desc: '30-day hassle-free return policy on all eligible products.',
  },
  {
    icon: FiHeadphones,
    title: '24/7 Support',
    desc: 'Our team is here around the clock to help with anything you need.',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="container-app py-20">
      <div className="text-center mb-12">
        <h2 className="section-heading">
          Why Shop With <span className="gradient-text">ShopSphere</span>
        </h2>
        <p className="text-textMuted mt-3 max-w-xl mx-auto">
          We built ShopSphere around what actually matters: speed, trust, and service.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="glass-card p-6 text-center hover:-translate-y-1 hover:shadow-glow transition-all duration-300"
          >
            <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mb-4">
              <Icon size={22} />
            </div>
            <h3 className="font-display font-semibold mb-2">{title}</h3>
            <p className="text-sm text-textMuted leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
