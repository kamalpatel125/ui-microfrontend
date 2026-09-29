import { Navigate, Route, Routes } from 'react-router-dom';
import PositionList from './PositionList';
import PositionDetail from './PositionDetail';
import PositionOverview from './PositionOverview';
import PositionHistory from './PositionHistory';
import HoldingsPage from './pages/HoldingsPage';
import PerformancePage from './pages/PerformancePage';
import RebalancingPage from './pages/RebalancingPage';

// App1 runs standalone on port 5002, or embedded inside Host via Module
// Federation ("App1" expose — see bootstrap.tsx and federation.manifest.ts,
// both of which ARE framework and should stay).
//
// This is App1's own top-level <Routes> — App1 owns navigation *within*
// itself (list -> detail -> tab), the same way Host owns navigation
// *between* apps. Every path here is relative, so this composes correctly
// whether the router ancestor is App1's own BrowserRouter (standalone, see
// main.tsx) or Host's router reached through the "/app1/*" route (embedded,
// see host/src/App.tsx) — App1 never needs to know or care which.
//
// :symbol is a layout route (PositionDetail renders the header/tabs once
// and an <Outlet> for whichever tab is active) — see PositionDetail.tsx for
// why that shape, rather than a second <Routes>, is what keeps the tab
// links resolving correctly regardless of which tab is currently active.
export default function PortfolioApp() {
  return (
    <Routes>
      <Route index element={<PositionList />} />
      <Route path="holdings" element={<HoldingsPage />} />
      <Route path="performance" element={<PerformancePage />} />
      <Route path="rebalancing" element={<RebalancingPage />} />
      <Route path=":symbol" element={<PositionDetail />}>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<PositionOverview />} />
        <Route path="history" element={<PositionHistory />} />
      </Route>
    </Routes>
  );
}
