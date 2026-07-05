import { Link } from 'react-router-dom';

const CategoryCard = ({ category, image, icon: Icon }) => {
  return (
    <Link
      to={`/products?category=${encodeURIComponent(category)}`}
      className="group relative overflow-hidden rounded-2xl aspect-[4/5] glass-card flex items-end p-5 hover:shadow-glow transition-all duration-300 hover:-translate-y-1"
    >
      <img
        src={image}
        alt={category}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      <div className="relative z-10 flex items-center gap-2">
        {Icon && (
          <span className="w-9 h-9 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
            <Icon size={16} />
          </span>
        )}
        <h3 className="font-display font-semibold text-textMain">{category}</h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
