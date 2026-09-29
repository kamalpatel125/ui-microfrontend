import { Link } from 'react-router-dom';

/**
 * Content App1 contributes to Host's sidebar when the active route falls
 * under App1 — see app1/federation.manifest.ts's './Sidebar' entry and
 * host/src/layout/Sidebar.tsx.
 *
 * App1 owns this component outright, same as it owns './App1' and
 * './Settings' — its own <Link>s, its own markup, its own future logic
 * (e.g. highlighting the active item, showing a badge). Host just mounts
 * whatever this renders; it never interprets App1-shaped data. See
 * app1/federation.manifest.ts for why this is a component expose, not a
 * data expose Host would render on App1's behalf.
 */
export default function Sidebar() {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 14 }}>
      <li style={{ marginBottom: 6 }}>
        <Link to="/app1/holdings" style={{ color: '#374151', textDecoration: 'none' }}>
          Holdings
        </Link>
      </li>
      <li style={{ marginBottom: 6 }}>
        <Link to="/app1/performance" style={{ color: '#374151', textDecoration: 'none' }}>
          Performance
        </Link>
      </li>
      <li style={{ marginBottom: 6 }}>
        <Link to="/app1/rebalancing" style={{ color: '#374151', textDecoration: 'none' }}>
          Rebalancing
        </Link>
      </li>
    </ul>
  );
}
