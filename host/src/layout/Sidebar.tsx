// A left-hand sidebar owned by Host.
export function Sidebar() {
  return (
    <aside
      style={{
        width: 180,
        borderRight: '1px solid #e5e7eb',
        padding: 16,
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 700, color: '#6b7280', marginBottom: 8 }}>MARKETS</div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 14, color: '#374151' }}>
        <li style={{ marginBottom: 6 }}>Equities</li>
        <li style={{ marginBottom: 6 }}>Options</li>
        <li style={{ marginBottom: 6 }}>Futures</li>
      </ul>
    </aside>
  );
}
