import { lazy, useCallback, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Button, Card, formatCurrency, formatCompactNumber, useEventBusSubscription } from 'core';
import { PORTFOLIO_UPDATED_TOPIC, type PortfolioUpdatedPayload } from 'shared';
import { RemoteBoundary } from './components/RemoteBoundary';
import AlertsPage from './pages/AlertsPage';

// Pulled from App1 at runtime via Module Federation, not from Core — it's
// App1's own domain component (risk-tier rules), shared sideways rather
// than duplicated or genericized into the shared library.
const RemoteSettingsPanel = lazy(() => import('app1/Settings'));

interface WatchedSymbol {
  symbol: string;
  price: number;
  volume: number;
}

const INITIAL_WATCHLIST: WatchedSymbol[] = [
  { symbol: 'NVDA', price: 128.4, volume: 245_000_000 },
  { symbol: 'AMZN', price: 186.2, volume: 38_500_000 },
  { symbol: 'GOOGL', price: 175.6, volume: 21_100_000 },
];

// EXAMPLE DOMAIN CONTENT — replace with your own feature. WatchedSymbol,
// INITIAL_WATCHLIST, addSymbol, and the JSX exist only to demonstrate:
// consuming Core, subscribing to a cross-app event, and lazy-loading
// another app's exposed component (RemoteSettingsPanel, from App1) via
// Module Federation with a RemoteBoundary for graceful degradation. Those
// three patterns are worth keeping — the watchlist/symbol logic isn't.
//
// App2 runs standalone on port 5003, or embedded inside Host via Module
// Federation ("App2" expose — see bootstrap.tsx and federation.manifest.ts,
// both of which ARE framework and should stay).
//
// App2's own top-level <Routes> — mirrors App1's PortfolioApp.tsx: every
// path here is relative, so this composes correctly whether the router
// ancestor is App2's own BrowserRouter (standalone, see main.tsx) or Host's
// router reached through the "/app2/*" route (embedded, see
// host/src/App.tsx) — App2 never needs to know or care which.
export default function WatchlistApp() {
  return (
    <Routes>
      <Route index element={<Navigate to="watchlist" replace />} />
      <Route path="watchlist" element={<WatchlistOverview />} />
      <Route path="alerts" element={<AlertsPage />} />
    </Routes>
  );
}

function WatchlistOverview() {
  const [watchlist, setWatchlist] = useState(INITIAL_WATCHLIST);
  const [portfolioNotice, setPortfolioNotice] = useState<string | null>(null);

  function addSymbol() {
    const symbols = ['META', 'NFLX', 'AMD', 'INTC'];
    const next = symbols[Math.floor(Math.random() * symbols.length)];
    setWatchlist((prev) => [...prev, { symbol: next, price: +(Math.random() * 400).toFixed(2), volume: Math.floor(Math.random() * 5e7) }]);
  }

  // Cross-app: hears about App1's portfolio refreshes without importing
  // App1 or going through Host — see core/src/eventBus/EventBus.ts (the bus)
  // and shared/src/events/portfolio.ts (the topic/payload contract). Works
  // whether App1 is mounted alongside App2 inside Host, or not at all (this
  // just never fires if no one publishes).
  const onPortfolioUpdated = useCallback((payload: PortfolioUpdatedPayload) => {
    setPortfolioNotice(`Portfolio updated at ${new Date(payload.updatedAt).toLocaleTimeString()} (${payload.positions.length} positions)`);
  }, []);
  useEventBusSubscription(PORTFOLIO_UPDATED_TOPIC, onPortfolioUpdated);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
      <h2>App2: Watchlist</h2>
      {portfolioNotice && (
        <div style={{ marginBottom: 16, padding: '8px 12px', background: '#eff6ff', color: '#1e40af', borderRadius: 6, fontSize: 13 }}>
          {portfolioNotice}
        </div>
      )}
      <div style={{ marginBottom: 16 }}>
        <Button variant="secondary" onClick={addSymbol}>
          Add Random Symbol
        </Button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12, marginBottom: 24 }}>
        {watchlist.map((w, i) => (
          <Card key={`${w.symbol}-${i}`} title={w.symbol}>
            <p>{formatCurrency(w.price)}</p>
            <p>Vol: {formatCompactNumber(w.volume)}</p>
          </Card>
        ))}
      </div>
      <div style={{ maxWidth: 320 }}>
        <RemoteBoundary name="Settings (from App1)">
          <RemoteSettingsPanel />
        </RemoteBoundary>
      </div>
    </div>
  );
}
