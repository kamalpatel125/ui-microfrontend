import { Route, Routes } from 'react-router-dom';
import { AppShell } from './layout/AppShell';
import HomePage from './pages/HomePage';
import App1Page from './pages/App1Page';
import App2Page from './pages/App2Page';

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/app1/*" element={<App1Page />} />
        <Route path="/app2" element={<App2Page />} />
      </Routes>
    </AppShell>
  );
}
