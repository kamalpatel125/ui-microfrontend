import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';
import { toFederationRemotesRecord } from './federation.remotes.ts';

// Host is the shell/portal app. It owns navigation and layout (header,
// sidebar, footer — see src/layout/), and mounts App1 and App2 at runtime
// via Module Federation. Remote URLs are env-driven so Host can point at
// whichever deployed versions of App1/App2 are appropriate per environment
// (local dev, staging, production) without a rebuild. Core is not a remote
// here — it's a workspace/npm dependency that App1 and App2 each bundle
// directly, so Host has no reason to load it itself. Host exposes nothing
// here — it's a pure consumer of App1/App2. Uses @module-federation/vite
// (the actively-maintained, official plugin) — not @originjs/vite-plugin-
// federation, which is unmaintained and confirmed broken on Vite 7+.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      federation({
        name: 'host',
        remotes: toFederationRemotesRecord(env),
        shared: {
          react: { singleton: true },
          'react-dom': { singleton: true },
          'react-router-dom': { singleton: true },
        },
      }),
    ],
    build: {
      target: 'esnext',
      minify: false,
      cssCodeSplit: false,
    },
    server: {
      port: 5000,
      strictPort: true,
      cors: true,
    },
    preview: {
      port: 5000,
      strictPort: true,
      cors: true,
    },
  };
});
