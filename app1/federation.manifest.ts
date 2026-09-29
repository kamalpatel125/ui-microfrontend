/**
 * Single source of truth for everything App1 exposes via Module Federation.
 *
 * Add a new entry here (not directly in vite.config.ts) whenever App1 needs
 * to share something across a federation boundary — to Host, or sideways to
 * another app like App2. Keeping this in one file makes "what does App1
 * expose, and who consumes it" answerable by reading one file instead of
 * grepping vite.config.ts + every consumer's remotes.d.ts + import strings.
 *
 * `consumedBy` is documentation only (not read by the build) — it exists so
 * the next person touching an exposed module knows who else breaks if they
 * change its props/API, since federation gives no compile-time contract
 * across repos the way a real npm dependency would.
 */
export interface FederationExpose {
  /** The path consumers import, e.g. `app1/Settings`. */
  path: string;
  /** Source module the path resolves to. */
  entry: string;
  /** Who consumes this today — update when you add/remove a consumer. */
  consumedBy: string[];
  /** Why this is exposed rather than moved into Core. */
  note: string;
}

export const exposes: FederationExpose[] = [
  {
    path: './App1',
    entry: './src/bootstrap.tsx',
    consumedBy: ['host'],
    note: 'The whole Portfolio feature, mounted as a page inside the Host portal.',
  },
  {
    path: './Settings',
    entry: './src/domain/Settings/bootstrap.tsx',
    consumedBy: ['app2'],
    note: 'Portfolio risk-preference settings. Kept in App1 (not Core) because it ' +
      "encodes App1's own domain rules (risk tiers, rebalancing thresholds) rather " +
      'than being a generic, reusable UI primitive.',
  },
  {
    path: './Sidebar',
    entry: './src/Sidebar.tsx',
    consumedBy: ['host'],
    note: 'Component App1 renders into Host\'s sidebar region when the ' +
      'active route falls under App1 — App1 owns its own <Link>s and markup ' +
      'outright, the same way it owns "./App1" and "./Settings". Host just ' +
      'mounts whatever this exposes (wrapped in its own RemoteBoundary); it ' +
      'never interprets App1-shaped data or reaches into App1\'s DOM. This ' +
      'is not the "slot registry" the README\'s "Cross-boundary layout ' +
      'injection" section rejected — that pattern had App1 (leaf) *consume* ' +
      'a Host-owned remote, inverting the stability direction. Here App1 ' +
      'stays the one being consumed, on the same Host→App1 federation edge ' +
      'that already exists for "./App1" — just one more exposed path on it.',
  },
];

/** Reduces the manifest above to the shape vite-plugin-federation expects. */
export function toFederationExposesRecord(): Record<string, string> {
  return Object.fromEntries(exposes.map((e) => [e.path, e.entry]));
}
