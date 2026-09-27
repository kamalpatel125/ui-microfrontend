import { lazy } from 'react';
import { RemoteBoundary } from '../components/RemoteBoundary';

const RemoteWatchlistApp = lazy(() => import('app2/App2'));

export default function App2Page() {
  return (
    <RemoteBoundary name="App2 (Watchlist)">
      <RemoteWatchlistApp />
    </RemoteBoundary>
  );
}
