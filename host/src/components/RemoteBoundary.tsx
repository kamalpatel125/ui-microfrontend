import { Component, Suspense, type ReactNode } from 'react';

interface RemoteErrorBoundaryProps {
  name: string;
  children: ReactNode;
}

interface RemoteErrorBoundaryState {
  hasError: boolean;
}

// Remote microfrontends are deployed independently and can be
// unavailable (not yet deployed, network error, breaking change).
// The Host must degrade gracefully rather than crash the whole portal.
class RemoteErrorBoundary extends Component<RemoteErrorBoundaryProps, RemoteErrorBoundaryState> {
  state: RemoteErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error(`[Host] Failed to load remote "${this.props.name}":`, error);
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
