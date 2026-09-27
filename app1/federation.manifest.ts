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
];

/** Reduces the manifest above to the shape vite-plugin-federation expects. */
export function toFederationExposesRecord(): Record<string, string> {
  return Object.fromEntries(exposes.map((e) => [e.path, e.entry]));
}
