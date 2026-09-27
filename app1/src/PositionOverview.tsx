import { useOutletContext } from 'react-router-dom';
import { formatCurrency, formatPercent } from 'core';
import type { Position } from './domain/positions';

// EXAMPLE DOMAIN CONTENT — the "overview" tab content for /app1/:symbol,
// rendered into PositionDetail's <Outlet>.
export default function PositionOverview() {
  const position = useOutletContext<Position>();
  return (
    <div>
      <p>Price: {formatCurrency(position.price)}</p>
      <p style={{ color: position.changePercent >= 0 ? '#16a34a' : '#dc2626' }}>
        Change: {formatPercent(position.changePercent)}
      </p>
    </div>
  );
}
