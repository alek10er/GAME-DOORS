export default function ComingSoon({ page }) {
  const label = page === 'wiki' ? 'WIKI' : 'UPD';

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#040514]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(108,154,234,0.18),transparent_60%)]" />

      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
        <div>
          <p className="mb-3 text-xs tracking-[0.35em] text-white/50">{label}</p>
          <h2 className="text-5xl font-semibold uppercase tracking-wide text-slate-200 md:text-7xl">
            Coming Soon
          </h2>
        </div>
      </div>
    </section>
  );
}
