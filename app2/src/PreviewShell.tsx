import type { ReactNode } from 'react';

// Standalone-preview-only chrome that visually mirrors Host's AppShell
// (host/src/layout/), so App2 doesn't look like unstyled HTML when run
// alone on :5003. This is NOT real portal layout — no routing, no shared
// nav state — just enough styling for it to look at home next to Host.
// Used only from main.tsx; never imported by bootstrap.tsx (the surface
// exposed to Host via federation), so Host's real chrome is never
// duplicated at runtime.
export function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header
        style={{
          borderBottom: '1px solid #e5e7eb',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <strong style={{ marginRight: 16 }}>ui-microfrontend</strong>
        <span style={{ padding: '8px 16px', color: '#6b7280', fontSize: 14 }}>
          Watchlist (App2) — standalone preview
        </span>
      </header>
      <div style={{ display: 'flex', flex: 1 }}>
        <main style={{ flex: 1 }}>{children}</main>
      </div>
      <footer
        style={{
          borderTop: '1px solid #e5e7eb',
          padding: '12px 24px',
          fontSize: 13,
          color: '#6b7280',
        }}
      >
        © ui-microfrontend
      </footer>
    </div>
  );
}
