import { useState } from 'react';
import { Button, Card, formatCurrency, formatPercent, publish } from 'core';
import { PORTFOLIO_UPDATED_TOPIC } from 'shared';
import SettingsPanel from './domain/Settings/SettingsPanel';

interface Position {
  symbol: string;
  price: number;
  changePercent: number;
}

const INITIAL_POSITIONS: Position[] = [
  { symbol: 'AAPL', price: 192.53, changePercent: 1.24 },
  { symbol: 'TSLA', price: 246.11, changePercent: -2.87 },
  { symbol: 'MSFT', price: 421.9, changePercent: 0.65 },
];

// EXAMPLE DOMAIN CONTENT — replace with your own feature. Everything below
// (Position, INITIAL_POSITIONS, refreshPrices, exportPositions, the JSX)
// exists only to demonstrate: consuming Core (Button/Card/formatters),
// publishing a cross-app event (see PORTFOLIO_UPDATED_TOPIC), and rendering
// an app-owned domain component (SettingsPanel). The patterns worth keeping
// are: this file being a standalone-renderable component, calling `publish`
// after a state change, and importing from 'core'/'shared' — not the
// portfolio/price/export logic itself.
//
// App1 runs standalone on port 5002, or embedded inside Host via Module
// Federation ("App1" expose — see bootstrap.tsx and federation.manifest.ts,
// both of which ARE framework and should stay).
export default function PortfolioApp() {
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
          <Card key={p.symbol} title={p.symbol}>
            <p>{formatCurrency(p.price)}</p>
            <p style={{ color: p.changePercent >= 0 ? '#16a34a' : '#dc2626' }}>{formatPercent(p.changePercent)}</p>
          </Card>
        ))}
      </div>
      <div style={{ maxWidth: 320 }}>
        <SettingsPanel />
      </div>
    </div>
  );
}
