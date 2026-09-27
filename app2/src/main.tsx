import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import WatchlistApp from './WatchlistApp';
import { PreviewShell } from './PreviewShell';

// Standalone entry point so App2's team can develop and QA this app in
// complete isolation, without Host or App1 running. PreviewShell gives it
// Host-like chrome for standalone dev only — see PreviewShell.tsx.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PreviewShell>
      <WatchlistApp />
    </PreviewShell>
  </StrictMode>,
);
