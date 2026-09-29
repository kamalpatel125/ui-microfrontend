/**
 * Single source of truth for everything App2 exposes via Module Federation.
 * See app1/federation.manifest.ts for the full rationale.
 */
export interface FederationExpose {
  path: string;
  entry: string;
  consumedBy: string[];
  note: string;
}

export const exposes: FederationExpose[] = [
  {
    path: './App2',
    entry: './src/bootstrap.tsx',
    consumedBy: ['host'],
    note: 'The whole Watchlist feature, mounted as a page inside the Host portal.',
  },
  {
    path: './Sidebar',
    entry: './src/Sidebar.tsx',
    consumedBy: ['host'],
    note: 'Component App2 renders into Host\'s sidebar region when the ' +
      'active route falls under App2 — see app1/federation.manifest.ts for ' +
      'the full rationale.',
  },
];

export function toFederationExposesRecord(): Record<string, string> {
  return Object.fromEntries(exposes.map((e) => [e.path, e.entry]));
}
