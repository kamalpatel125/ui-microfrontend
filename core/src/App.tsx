import { Button } from './components/Button';
import { Card } from './components/Card';
import { formatCurrency, formatPercent } from './utils/formatters';

// Standalone showcase for the Core team to develop/preview components
// in isolation, without needing App1, App2 or Host running.
export default function App() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 32 }}>
      <h1>Core Component Library</h1>
      <p>This is the standalone preview for the Core team. These components are exposed via Module Federation for App1, App2 and Host to consume.</p>

      <section style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
      </section>

      <section style={{ maxWidth: 320 }}>
        <Card title="Sample Position">
          <p>AAPL: {formatCurrency(192.53)}</p>
          <p>Change: {formatPercent(1.24)}</p>
        </Card>
      </section>
    </div>
  );
}
