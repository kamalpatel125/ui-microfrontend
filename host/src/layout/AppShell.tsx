import type { ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

// The portal's page shell. Host owns this structure — layout (header,
// sidebar, footer) is portal-level concern, not something any individual
// feature app should own, since no single app can see the whole picture of
// what's on the page. Feature pages (App1, App2) render only inside the
// content area.
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <main style={{ flex: 1 }}>{children}</main>
      </div>
      <Footer />
    </div>
  );
}
