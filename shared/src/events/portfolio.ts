/**
 * EXAMPLE DOMAIN CONTENT — replace with your own cross-app event(s). The
 * pattern worth keeping: a topic constant + payload interface living in
 * `shared` (not Core, not either app), since it's a type-level contract
 * between apps rather than runtime UI code — see the README's "Core vs.
 * shared" section. The bus mechanism itself (publish/subscribe) lives in
 * Core's eventBus/EventBus.ts and stays as-is.
 */
import type { Position } from '../domain/position';

export const PORTFOLIO_UPDATED_TOPIC = 'portfolio:updated';

export interface PortfolioUpdatedPayload {
  positions: Position[];
  updatedAt: string;
}
