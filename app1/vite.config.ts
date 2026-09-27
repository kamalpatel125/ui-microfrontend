import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';
import { toFederationExposesRecord } from './federation.manifest.ts';

// App1 is a standalone, independently deployable app owned by its own team.
// It installs Core through the pnpm workspace (bundled directly into its
// build, so App1's team controls exactly when it upgrades Core), and
// exposes modules as a Module Federation remote so Host — and, for domain
// components like Settings, App2 — can consume them at runtime. The actual
// expose list lives in federation.manifest.ts, not here. Uses
// @module-federation/vite (the actively-maintained, official plugin) — not
// @originjs/vite-plugin-federation, which is unmaintained and confirmed
// broken on Vite 7+.
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'app1',
      filename: 'remoteEntry.js',
      exposes: toFederationExposesRecord(),
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
        // Singleton so App1's internal <Routes> (list -> detail) composes
        // under Host's existing router when embedded, instead of bundling a
        // second react-router-dom instance. Host already declares this same
        // singleton in its own vite.config.ts.
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
    port: 5002,
    strictPort: true,
    cors: true,
  },
  preview: {
    port: 5002,
    strictPort: true,
    cors: true,
  },
});
