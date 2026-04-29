type HeaderProps = {
  title: string;
  subtitle: string;
};

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="rounded-2xl border border-slate-700/70 bg-slate-900/60 p-6 shadow-2xl backdrop-blur-sm">
      <span className="inline-flex rounded-full border border-emerald-400/50 bg-emerald-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-300">
        Next.js + Tailwind CSS
      </span>
      <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">{title}</h1>
      <p className="mt-2 text-slate-300">{subtitle}</p>
    </header>
  );
}
