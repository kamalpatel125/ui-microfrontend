import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import PortfolioApp from './PortfolioApp';

// Standalone entry point so App1's team can develop and QA this app in
// complete isolation, without Host or App2 running.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PortfolioApp />
  </StrictMode>,
);
