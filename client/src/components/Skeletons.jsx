export const ProductCardSkeleton = () => (
  <div className="glass-card overflow-hidden flex flex-col">
    <div className="aspect-square skeleton" />
    <div className="p-4 space-y-3">
      <div className="h-3 w-1/3 rounded skeleton" />
      <div className="h-4 w-4/5 rounded skeleton" />
      <div className="h-3 w-1/2 rounded skeleton" />
      <div className="h-5 w-1/3 rounded skeleton mt-2" />
    </div>
  </div>
);

export const ProductGridSkeleton = ({ count = 8 }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

export const ProductDetailsSkeleton = () => (
  <div className="grid md:grid-cols-2 gap-10">
    <div className="aspect-square rounded-2xl skeleton" />
    <div className="space-y-4">
      <div className="h-4 w-1/4 rounded skeleton" />
      <div className="h-8 w-3/4 rounded skeleton" />
      <div className="h-4 w-1/3 rounded skeleton" />
      <div className="h-10 w-1/2 rounded skeleton" />
      <div className="h-24 w-full rounded skeleton" />
      <div className="h-12 w-full rounded skeleton" />
    </div>
  </div>
);
