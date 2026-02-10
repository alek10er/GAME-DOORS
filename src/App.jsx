import { useState } from 'react';
import Hero from './components/Hero';
import TopPanel from './components/TopPanel';
import ComingSoon from './components/ComingSoon';

export default function App() {
  const [page, setPage] = useState('home');

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <div className="absolute inset-x-0 top-0 z-50">
        <TopPanel page={page} onNavigate={setPage} />
      </div>

      {page === 'home' ? <Hero /> : <ComingSoon page={page} />}
    </main>
  );
}
