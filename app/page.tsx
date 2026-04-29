import { Header } from '@/components/Header';
import { ProductShowcase } from '@/components/ProductShowcase';
import { ShoppingCart } from '@/components/ShoppingCart';
import { products } from '@/lib/products';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <Header title="羊毛商店" subtitle="逻辑抽象 + 组件拆分示例" />

        <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <ProductShowcase products={products} />
          <ShoppingCart products={products} />
        </section>
      </div>
    </main>
  );
}
