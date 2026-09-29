import { RemoteBoundary } from '../components/RemoteBoundary';
import { useActiveRemoteSidebar } from './useActiveRemoteSidebar';

// A left-hand sidebar owned by Host, but its content is entirely the active
// remote's own — Host just mounts whichever remote's exposed Sidebar
// component matches the current route (see useActiveRemoteSidebar) inside a
// RemoteBoundary, same pattern as App1Page/App2Page mounting the remotes'
// main pages. Host never touches app-specific markup here.
export function Sidebar() {
  const active = useActiveRemoteSidebar();

  return (
    <aside
      style={{
        width: 180,
        borderRight: '1px solid #e5e7eb',
        padding: 16,
      }}
    >
      {active && (
        <RemoteBoundary key={active.name} name={`${active.name} sidebar`}>
          <active.Component />
        </RemoteBoundary>
      )}
    </aside>
  );
}
