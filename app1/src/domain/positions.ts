// EXAMPLE DOMAIN CONTENT — see PortfolioApp.tsx for what's framework vs. example.
// Position's shape moved to `shared` (see shared/src/domain/position.ts)
// since it's also referenced by the cross-app PortfolioUpdatedPayload
// contract; import it from 'shared' directly. App1 still owns this mock
// seed data — that part stays.
import type { Position } from 'shared';

export const INITIAL_POSITIONS: Position[] = [
  { symbol: 'AAPL', price: 192.53, changePercent: 1.24 },
  { symbol: 'TSLA', price: 246.11, changePercent: -2.87 },
  { symbol: 'MSFT', price: 421.9, changePercent: 0.65 },
];
