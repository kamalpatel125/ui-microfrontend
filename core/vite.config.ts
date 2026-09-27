import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

// Core is a real npm package: App1 and App2 install it via the pnpm
// workspace (workspace:*) rather than consuming a shared runtime instance
// via Module Federation. `pnpm dev` still boots a standalone showcase app
// for the Core team to preview components against, using src/App.tsx as an
// unbundled dev entry — it is not part of the published package.
export default defineConfig({
  plugins: [
    react(),
    dts({ include: ['src'], exclude: ['src/App.tsx', 'src/main.tsx'], rollupTypes: true }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
    target: 'esnext',
    minify: false,
  },
  server: {
    port: 5001,
    strictPort: true,
  },
});
