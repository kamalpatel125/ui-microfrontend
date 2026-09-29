import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import WatchlistApp from './WatchlistApp';
import { PreviewShell } from './PreviewShell';

// Standalone entry point so App2's team can develop and QA this app in
// complete isolation, without Host or App1 running. PreviewShell gives it
// Host-like chrome for standalone dev only — see PreviewShell.tsx. The
// BrowserRouter here is only needed standalone: when embedded in Host,
// WatchlistApp's internal <Routes> composes under Host's own router instead
// (see host/src/App.tsx's "/app2/*" route and bootstrap.tsx, which renders
// WatchlistApp with no router of its own).
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <PreviewShell>
        <WatchlistApp />
      </PreviewShell>
    </BrowserRouter>
  </StrictMode>,
);
