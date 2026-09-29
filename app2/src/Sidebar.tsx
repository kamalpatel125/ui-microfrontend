import { Link } from 'react-router-dom';

/**
 * Content App2 contributes to Host's sidebar when the active route falls
 * under App2 — see app2/federation.manifest.ts's './Sidebar' entry and
 * app1/src/Sidebar.tsx for the full rationale.
 */
export default function Sidebar() {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 14 }}>
      <li style={{ marginBottom: 6 }}>
        <Link to="/app2/watchlist" style={{ color: '#374151', textDecoration: 'none' }}>
          My Watchlist
        </Link>
      </li>
      <li style={{ marginBottom: 6 }}>
        <Link to="/app2/alerts" style={{ color: '#374151', textDecoration: 'none' }}>
          Price Alerts
        </Link>
      </li>
    </ul>
  );
}
