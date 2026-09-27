import { Link, NavLink, Outlet, useParams } from 'react-router-dom';
import { INITIAL_POSITIONS } from './domain/positions';

// EXAMPLE DOMAIN CONTENT. Layout route for /app1/:symbol — renders the
// symbol header + tab nav once, and delegates the active tab's content to
// PositionOverview/PositionHistory via <Outlet>. See PortfolioApp.tsx for
// how the child routes ("overview"/"history") are declared; using a layout
// route (rather than a second <Routes> nested inside this component) is
// what keeps "overview"/"history" resolving as plain siblings regardless of
// which tab is active — a second <Routes> here would instead make each
// relative link resolve against whichever tab segment is currently matched.
export default function PositionDetail() {
  const { symbol } = useParams<{ symbol: string }>();
  const position = INITIAL_POSITIONS.find((p) => p.symbol === symbol);

  if (!position) {
    return (
      <div style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
        <p>Unknown symbol "{symbol}".</p>
        <Link to="..">Back to Portfolio</Link>
      </div>
    );
  }

  const tabStyle = ({ isActive }: { isActive: boolean }) => ({
    padding: '6px 12px',
    textDecoration: 'none',
    color: isActive ? '#2563eb' : '#374151',
    fontWeight: isActive ? 700 : 500,
    borderBottom: isActive ? '2px solid #2563eb' : '2px solid transparent',
  });

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
      <p>
        <Link to="..">&larr; Back to Portfolio</Link>
      </p>
      <h2>{position.symbol}</h2>

      <nav style={{ display: 'flex', gap: 4, borderBottom: '1px solid #e5e7eb', marginBottom: 16 }}>
        <NavLink to="overview" style={tabStyle}>
          Overview
        </NavLink>
        <NavLink to="history" style={tabStyle}>
          History
        </NavLink>
      </nav>

      <Outlet context={position} />
    </div>
  );
}
