export default function TopPanel({ page, onNavigate }) {
  const isHome = page === 'home';

  return (
    <div className="mx-auto mt-8 flex w-[min(920px,92vw)] items-center justify-between rounded-full border border-white/15 bg-white/5 px-8 py-4 backdrop-blur-xl">
      <span className="text-xl font-semibold tracking-tight text-white/95">The Aethereum</span>

      <div className="flex gap-8 text-sm text-white/80">
        {isHome ? (
          <>
            <button type="button" className="transition hover:text-white" onClick={() => onNavigate('upd')}>
              UPD
            </button>
            <button type="button" className="transition hover:text-white" onClick={() => onNavigate('wiki')}>
              WIKI
            </button>
          </>
        ) : (
          <button type="button" className="transition hover:text-white" onClick={() => onNavigate('home')}>
            Home
          </button>
        )}
      </div>
    </div>
  );
}
