// EXAMPLE DOMAIN CONTENT — see PortfolioApp.tsx for what's framework vs. example.
export interface Position {
  symbol: string;
  price: number;
  changePercent: number;
}

export const INITIAL_POSITIONS: Position[] = [
  { symbol: 'AAPL', price: 192.53, changePercent: 1.24 },
  { symbol: 'TSLA', price: 246.11, changePercent: -2.87 },
  { symbol: 'MSFT', price: 421.9, changePercent: 0.65 },
];
