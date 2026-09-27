import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import WatchlistApp from './WatchlistApp';

// Standalone entry point so App2's team can develop and QA this app in
// complete isolation, without Host or App1 running.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WatchlistApp />
  </StrictMode>,
);
