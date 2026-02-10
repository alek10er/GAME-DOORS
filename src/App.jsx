import { useState } from 'react';
import HomePage from './components/HomePage';
import TopPanel from './components/TopPanel';
import ComingSoon from './components/ComingSoon';

export default function App() {
  const [page, setPage] = useState('home');

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <div className="fixed inset-x-0 top-0 z-50">
        <TopPanel page={page} onNavigate={setPage} />
      </div>

      {page === 'home' ? <HomePage /> : <ComingSoon page={page} />}
    </main>
  );
}
