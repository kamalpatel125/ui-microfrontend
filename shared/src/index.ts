/**
 * `shared` holds cross-app TypeScript contracts — types, constants, and
 * other zero-runtime-cost shapes that more than one app needs to agree on,
 * but that don't belong in Core.
 *
 * Core vs. shared, the actual line: Core ships runtime code every consumer
 * bundles (Button's render logic, the event bus's publish/subscribe
 * functions, formatters) — putting something there has a real bundle-size
 * and coupling cost. `shared` ships only type-level information: an
 * `import type` from here is erased entirely at compile time, so there's
 * no bundle cost and no reason to couple it to Core's release cadence just
 * because most apps already depend on Core anyway. If it's a UI primitive
 * or has actual behavior, it goes in Core. If it's a shape two or more
 * apps need to agree on — an event payload, a domain type shared across
 * app boundaries, anything in that vein — it goes here instead.
 *
 * This does not replace app-owned domain types (e.g. App1's RiskProfile,
 * which App2 gets automatically via Module Federation's generated
 * @mf-types — see README's "Sharing patterns" section). `shared` is for
 * things with no single obvious owning app, or that predate any one app
 * needing them.
 *
 * Organize by concern as this grows (see src/events/ for the current
 * example) — a flat pile of unrelated types is exactly what this package
 * should avoid becoming.
 */

export { PORTFOLIO_UPDATED_TOPIC } from './events/portfolio';
export type { PortfolioUpdatedPayload } from './events/portfolio';
