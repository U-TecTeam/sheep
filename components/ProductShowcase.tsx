import type { Product } from '@/lib/products';

type ProductShowcaseProps = {
  products: Product[];
};

export function ProductShowcase({ products }: ProductShowcaseProps) {
  return (
    <section className="rounded-2xl border border-slate-700/70 bg-slate-900/60 p-6 shadow-2xl backdrop-blur-sm">
      <h2 className="text-xl font-semibold text-white">展示部分</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {products.map((product) => (
          <article key={product.id} className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
            <h3 className="text-lg font-semibold text-slate-100">{product.name}</h3>
            <p className="mt-2 text-sm text-slate-400">{product.desc}</p>
            <p className="mt-3 text-emerald-300">¥ {product.price}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
