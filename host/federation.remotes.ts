/**
 * Single source of truth for the Module Federation remotes Host consumes.
 * See app2/federation.remotes.ts for the full rationale.
 */
export interface RemoteSource {
  name: string;
  envVar: string;
  localDefault: string;
  consumes: string[];
}

export const remoteSources: RemoteSource[] = [
  {
    name: 'app1',
    envVar: 'VITE_APP1_REMOTE_URL',
    localDefault: 'http://localhost:5002/remoteEntry.js',
    consumes: ['./App1 — the Portfolio feature page'],
  },
  {
    name: 'app2',
    envVar: 'VITE_APP2_REMOTE_URL',
    localDefault: 'http://localhost:5003/remoteEntry.js',
    consumes: ['./App2 — the Watchlist feature page'],
  },
];

/** A single remote entry in @module-federation/vite's expected shape. */
export interface ModuleFederationRemote {
  type: 'module';
  name: string;
  entry: string;
}

/** Reduces the registry above to the shape @module-federation/vite expects. */
export function toFederationRemotesRecord(
  env: Record<string, string | undefined>,
): Record<string, ModuleFederationRemote> {
  return Object.fromEntries(
    remoteSources.map((r) => [
      r.name,
      { type: 'module', name: r.name, entry: env[r.envVar] || r.localDefault },
    ]),
  );
}
