import { calcTotal } from '@/lib/cart';
import type { Product } from '@/lib/products';

type ShoppingCartProps = {
  products: Product[];
};

export function ShoppingCart({ products }: ShoppingCartProps) {
  const { subtotal, shipping, total } = calcTotal(products.slice(0, 2));

  return (
    <aside className="rounded-2xl border border-slate-700/70 bg-slate-900/60 p-6 shadow-2xl backdrop-blur-sm">
      <h2 className="text-xl font-semibold text-white">购物车</h2>
      <ul className="mt-4 space-y-3 text-sm text-slate-300">
        {products.slice(0, 2).map((product) => (
          <li key={product.id} className="flex items-center justify-between">
            <span>{product.name}</span>
            <span>¥ {product.price}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 space-y-2 border-t border-slate-700 pt-4 text-sm text-slate-300">
        <p className="flex justify-between">
          <span>小计</span>
          <span>¥ {subtotal}</span>
        </p>
        <p className="flex justify-between">
          <span>运费</span>
          <span>{shipping === 0 ? '免运费' : `¥ ${shipping}`}</span>
        </p>
        <p className="flex justify-between text-base font-semibold text-emerald-300">
          <span>总计</span>
          <span>¥ {total}</span>
        </p>
      </div>
    </aside>
  );
}
