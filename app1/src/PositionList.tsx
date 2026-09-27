import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, formatCurrency, formatPercent, publish } from 'core';
import { PORTFOLIO_UPDATED_TOPIC } from 'shared';
import { INITIAL_POSITIONS } from './domain/positions';
import SettingsPanel from './domain/Settings/SettingsPanel';

// EXAMPLE DOMAIN CONTENT — replace with your own feature. Everything below
// (state, refreshPrices, exportPositions, the JSX) exists only to
// demonstrate: consuming Core (Button/Card/formatters), publishing a
// cross-app event (see PORTFOLIO_UPDATED_TOPIC), an app-owned domain
// component (SettingsPanel), and — new here — nested navigation (each Card
// links to a relative detail route; see PositionDetail.tsx and
// PortfolioApp.tsx for how the <Routes> nest). The patterns worth keeping
// are the ones just named — not the portfolio/price/export logic itself.
export default function PositionList() {
  const [positions, setPositions] = useState(INITIAL_POSITIONS);

  function refreshPrices() {
    setPositions((prev) => {
      const next = prev.map((p) => ({
        ...p,
        price: +(p.price * (1 + (Math.random() - 0.5) * 0.02)).toFixed(2),
        changePercent: +((Math.random() - 0.5) * 5).toFixed(2),
      }));
      // Cross-app notification: any app subscribed to PORTFOLIO_UPDATED_TOPIC
      // (e.g. App2's Watchlist) hears about this without App1 knowing or
      // caring who's listening — see core/src/eventBus/EventBus.ts (the bus)
      // and shared/src/events/portfolio.ts (the topic/payload contract).
      publish(PORTFOLIO_UPDATED_TOPIC, { positions: next, updatedAt: new Date().toISOString() });
      return next;
    });
  }

  function exportPositions() {
    const csv = ['symbol,price,changePercent', ...positions.map((p) => `${p.symbol},${p.price},${p.changePercent}`)].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
      <h2>App1: Portfolio</h2>
      <div style={{ marginBottom: 16, display: 'flex', gap: 8 }}>
        <Button variant="primary" onClick={refreshPrices}>
          Refresh Prices
        </Button>
        <Button variant="secondary" onClick={exportPositions}>
          Export
        </Button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12, marginBottom: 24 }}>
        {positions.map((p) => (
          <Link key={p.symbol} to={p.symbol} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card title={p.symbol}>
              <p>{formatCurrency(p.price)}</p>
              <p style={{ color: p.changePercent >= 0 ? '#16a34a' : '#dc2626' }}>{formatPercent(p.changePercent)}</p>
            </Card>
          </Link>
        ))}
      </div>
      <div style={{ maxWidth: 320 }}>
        <SettingsPanel />
      </div>
    </div>
  );
}
