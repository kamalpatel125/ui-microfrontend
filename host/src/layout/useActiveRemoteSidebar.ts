import { lazy, useMemo, type ComponentType } from 'react';
import { useLocation } from 'react-router-dom';
import { remoteSources } from '../../federation.remotes';

/**
 * One lazy-loaded component per remote that exposes `./Sidebar`. A remote's
 * federation name (from remoteSources) has to be a static string literal
 * here for @module-federation/vite to statically discover and register the
 * remote — see README "Cross-boundary layout injection" and
 * app1/federation.manifest.ts's './Sidebar' entry for the full rationale.
 *
 * A remote with no sidebar content (or not yet wired for it) simply has no
 * entry here — Sidebar.tsx skips rendering anything for it.
 */
const sidebarComponents: Record<string, ComponentType> = {
  app1: lazy(() => import('app1/Sidebar')),
  app2: lazy(() => import('app2/Sidebar')),
};

/**
 * Resolves which remote's Sidebar component (if any) to mount, purely from
 * host/federation.remotes.ts's routePrefix matched against the current URL.
 * Host never sees App1/App2-shaped data — it only ever mounts a component
 * the active remote itself owns and rendered. Sidebar.tsx never mentions an
 * app by name — adding a new remote's sidebar is a remoteSources entry + a
 * sidebarComponents entry, not a Sidebar.tsx edit.
 */
export function useActiveRemoteSidebar(): { name: string; Component: ComponentType } | null {
  const { pathname } = useLocation();

  return useMemo(() => {
    const active = remoteSources.find(
      (r) => r.routePrefix && pathname.startsWith(r.routePrefix),
    );
    const Component = active && sidebarComponents[active.name];
    return Component ? { name: active.name, Component } : null;
  }, [pathname]);
}
