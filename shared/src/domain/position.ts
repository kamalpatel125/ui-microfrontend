/**
 * EXAMPLE DOMAIN CONTENT — replace with your own cross-app domain shape.
 * The pattern worth keeping: when an app-owned type is also referenced by
 * a cross-app event payload (see events/portfolio.ts's PortfolioUpdatedPayload),
 * the type itself belongs here, not duplicated by hand in the payload — the
 * duplication is exactly the drift risk `shared`'s type-only contract is
 * meant to prevent. App1 still owns the mock data (INITIAL_POSITIONS) and
 * any position-specific UI; only the shape moves here.
 */
export interface Position {
  symbol: string;
  price: number;
  changePercent: number;
}
