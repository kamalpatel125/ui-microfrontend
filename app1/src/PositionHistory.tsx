import { useOutletContext } from 'react-router-dom';
import type { Position } from './domain/positions';

// EXAMPLE DOMAIN CONTENT — the "history" tab content for /app1/:symbol,
// rendered into PositionDetail's <Outlet>. Exists to demonstrate a third
// level of nested navigation (/app1/:symbol/history) — not real history data.
export default function PositionHistory() {
  const position = useOutletContext<Position>();
  return (
    <p style={{ color: '#6b7280' }}>
      No history available in this starter kit — this route exists to demonstrate a third level of nesting
      (/app1/{position.symbol}/history).
    </p>
  );
}
