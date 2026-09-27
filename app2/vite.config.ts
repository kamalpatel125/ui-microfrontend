import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';
import { toFederationExposesRecord } from './federation.manifest.ts';
import { toFederationRemotesRecord } from './federation.remotes.ts';

// App2 is a standalone, independently deployable app owned by its own team.
// It installs Core through the pnpm workspace (bundled directly into its
// build, so App2's team controls exactly when it upgrades Core), exposes
// itself as a Module Federation remote so Host can mount it, and consumes
// App1's "Settings" remote directly (a sideways share, not routed through
// Host) since that component is App1-domain-specific rather than something
// that belongs in Core. See federation.manifest.ts and federation.remotes.ts
// for the actual expose/remote lists. Uses @module-federation/vite (the
// actively-maintained, official plugin) — not @originjs/vite-plugin-
// federation, which is unmaintained and confirmed broken on Vite 7+.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      federation({
        name: 'app2',
        filename: 'remoteEntry.js',
        exposes: toFederationExposesRecord(),
        remotes: toFederationRemotesRecord(env),
        shared: {
          react: { singleton: true },
          'react-dom': { singleton: true },
        },
      }),
    ],
    build: {
      target: 'esnext',
      minify: false,
      cssCodeSplit: false,
    },
    server: {
      port: 5003,
      strictPort: true,
      cors: true,
    },
    preview: {
      port: 5003,
      strictPort: true,
      cors: true,
    },
  };
});
