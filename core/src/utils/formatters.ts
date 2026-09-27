// Generic formatting utilities — a reasonable example of what belongs in
// Core (small, reusable, no app-specific domain knowledge). Keep, extend,
// or replace with whatever formatting your own domain needs; the point
// being demonstrated is where this kind of code lives, not these specific
// functions.
export function formatCurrency(value: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value);
}

export function formatPercent(value: number, fractionDigits = 2): string {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(fractionDigits)}%`;
}

export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(value);
}
