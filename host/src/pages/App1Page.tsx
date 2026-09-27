import { lazy } from 'react';
import { RemoteBoundary } from '../components/RemoteBoundary';

const RemotePortfolioApp = lazy(() => import('app1/App1'));

export default function App1Page() {
  return (
    <RemoteBoundary name="App1 (Portfolio)">
      <RemotePortfolioApp />
    </RemoteBoundary>
  );
}
