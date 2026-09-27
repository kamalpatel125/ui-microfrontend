import { Component, Suspense, type ReactNode } from 'react';

interface RemoteErrorBoundaryProps {
  name: string;
  children: ReactNode;
}

interface RemoteErrorBoundaryState {
  hasError: boolean;
}

// App2 consumes App1's "Settings" remote directly (a sideways share, not
// routed through Host). Same as Host consuming App1/App2, that remote is
// deployed independently and can be unavailable, so App2 must degrade
// gracefully instead of crashing. Kept as a local copy rather than shared
// via Core since it's App-shell plumbing, not a domain/UI primitive — see
// README's "Sharing patterns" section for where the line is drawn.
class RemoteErrorBoundary extends Component<RemoteErrorBoundaryProps, RemoteErrorBoundaryState> {
  state: RemoteErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error(`[App2] Failed to load remote "${this.props.name}":`, error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, border: '1px dashed #dc2626', borderRadius: 8, color: '#dc2626' }}>
          <strong>{this.props.name}</strong> is currently unavailable. Its team may not have deployed it yet, or it
          may be down.
        </div>
      );
    }
    return this.props.children;
  }
}

export function RemoteBoundary({ name, children }: RemoteErrorBoundaryProps) {
  return (
    <RemoteErrorBoundary name={name}>
      <Suspense fallback={<div style={{ padding: 24 }}>Loading {name}…</div>}>{children}</Suspense>
    </RemoteErrorBoundary>
  );
}
