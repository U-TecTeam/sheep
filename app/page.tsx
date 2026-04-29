export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8">
      <section className="mx-auto flex max-w-3xl flex-col gap-6 rounded-2xl border border-slate-700/70 bg-slate-900/60 p-10 shadow-2xl backdrop-blur-sm">
        <span className="w-fit rounded-full border border-emerald-400/50 bg-emerald-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-300">
          Next.js + Tailwind CSS
        </span>
        <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">已经为你启用 Next 和 Tailwind</h1>
        <p className="text-lg leading-relaxed text-slate-200">
          你现在可以在 <code className="rounded bg-slate-800 px-2 py-1 text-emerald-300">app/page.tsx</code>{' '}
          里直接使用 Tailwind 类名快速构建页面。
        </p>
        <div className="flex flex-wrap gap-3">
          <span className="rounded-md bg-slate-800 px-3 py-1 text-sm text-slate-300">App Router</span>
          <span className="rounded-md bg-slate-800 px-3 py-1 text-sm text-slate-300">TypeScript</span>
          <span className="rounded-md bg-slate-800 px-3 py-1 text-sm text-slate-300">Tailwind v3</span>
        </div>
      </section>
    </main>
  );
}
