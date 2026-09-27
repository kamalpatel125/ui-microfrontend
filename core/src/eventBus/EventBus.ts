/**
 * Cross-app pub/sub for client-side events between independently-bundled
 * microfrontends (App1, App2, ...) — e.g. App1 publishes "portfolio:updated"
 * after a refresh, App2 subscribes and reacts, with neither app importing
 * the other or going through Host.
 *
 * Built on BroadcastChannel rather than a plain in-memory emitter, because
 * an emitter living in a JS module has exactly the same problem the slot
 * registry hit: Core is deliberately not shared via Module Federation (see
 * README's "Cross-boundary layout injection" section), so each app bundles
 * its own separate copy of Core's compiled JS, and a `new EventTarget()` or
 * `Map` created in one copy is invisible to the other. BroadcastChannel is
 * a real browser-level channel that exists outside any single JS module
 * instance — every bundle that opens a channel with the same name reaches
 * the same channel, so this works regardless of how many separate copies
 * of Core are loaded. It also works across browser tabs/windows for free,
 * which a `window` global would not.
 *
 * Not wired to any server/WebSocket transport — this is purely for
 * same-device, client-side coordination between apps sharing one page (or
 * tabs). A future server-push layer can publish into the same bus
 * alongside this, without changing any subscriber's code.
 */

const CHANNEL_NAME = 'trading-portal-bus';

interface BusMessage<T> {
  topic: string;
  payload: T;
}

let channel: BroadcastChannel | null = null;

function getChannel(): BroadcastChannel | null {
  if (typeof BroadcastChannel === 'undefined') return null;
  if (!channel) channel = new BroadcastChannel(CHANNEL_NAME);
  return channel;
}

/**
 * Publishes `payload` under `topic` to every other subscriber currently
 * listening (in this page or another tab). No-op if BroadcastChannel isn't
 * available (e.g. an old browser, or a non-browser test environment) —
 * publishing is fire-and-forget, so there's nothing to fall back to.
 */
export function publish<T>(topic: string, payload: T): void {
  getChannel()?.postMessage({ topic, payload } satisfies BusMessage<T>);
}

/**
 * Subscribes `handler` to messages published under `topic`. Returns an
 * unsubscribe function — call it on cleanup (e.g. a useEffect return) so a
 * torn-down component stops receiving events. Safe to call even when
 * BroadcastChannel isn't available: subscribe becomes a no-op and the
 * returned cleanup function is a no-op too.
 */
export function subscribe<T>(topic: string, handler: (payload: T) => void): () => void {
  const ch = getChannel();
  if (!ch) return () => {};

  function listener(event: MessageEvent<BusMessage<T>>) {
    if (event.data?.topic === topic) handler(event.data.payload);
  }

  ch.addEventListener('message', listener);
  return () => ch.removeEventListener('message', listener);
}
