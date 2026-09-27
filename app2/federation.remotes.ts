/**
 * Single source of truth for the Module Federation remotes App2 consumes.
 *
 * Add an entry here (not directly in vite.config.ts) whenever App2 needs to
 * pull in another app's exposed module. Each entry's `envVar` is read from
 * `.env` (see .env.example) so local dev, staging and prod can each point at
 * a different deployment of that remote without touching code.
 */
export interface RemoteSource {
  /** The name consumers use in import paths, e.g. `app1/Settings` -> name "app1". */
  name: string;
  /** Env var that supplies this remote's remoteEntry.js URL. */
  envVar: string;
  /** Fallback for local dev when the env var isn't set. */
  localDefault: string;
  /** What App2 actually imports from this remote, for documentation. */
  consumes: string[];
}

export const remoteSources: RemoteSource[] = [
  {
    name: 'app1',
    envVar: 'VITE_APP1_REMOTE_URL',
    localDefault: 'http://localhost:5002/remoteEntry.js',
    consumes: ['./Settings — risk-preference settings panel, owned by App1\'s domain'],
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
