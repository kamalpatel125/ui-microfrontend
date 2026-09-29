import { NavLink } from 'react-router-dom';

const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
  padding: '8px 16px',
  textDecoration: 'none',
  color: isActive ? '#2563eb' : '#374151',
  fontWeight: isActive ? 700 : 500,
});

// Host owns the header's structure and navigation. The title text and nav
// links below are EXAMPLE DOMAIN CONTENT — rename/replace them for your own
// portal; the pattern worth keeping is Host owning this file at all (see
// README's "Layout ownership" section).
export function Header() {
  return (
    <header
      style={{
        borderBottom: '1px solid #e5e7eb',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <strong style={{ marginRight: 16 }}>Host Portal</strong>
      <nav style={{ display: 'flex' }}>
        <NavLink to="/" style={navLinkStyle} end>
          Home
        </NavLink>
        <NavLink to="/app1" style={navLinkStyle}>
          Portfolio (App1)
        </NavLink>
        <NavLink to="/app2" style={navLinkStyle}>
          Watchlist (App2)
        </NavLink>
      </nav>
    </header>
  );
}
