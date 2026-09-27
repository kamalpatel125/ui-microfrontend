import { useEffect } from 'react';
import { subscribe } from './EventBus';

/**
 * React convenience wrapper around subscribe(): subscribes on mount,
 * unsubscribes on unmount or when `topic`/`handler` changes. Pass a stable
 * `handler` (e.g. via useCallback) if you don't want to resubscribe on
 * every render.
 */
export function useEventBusSubscription<T>(topic: string, handler: (payload: T) => void): void {
  useEffect(() => subscribe<T>(topic, handler), [topic, handler]);
}
