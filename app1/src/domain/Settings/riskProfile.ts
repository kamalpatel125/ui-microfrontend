// EXAMPLE DOMAIN CONTENT — replace with your own app-owned domain logic.
// The point being demonstrated: this kind of business rule belongs in the
// owning app (App1), not in Core or shared — Core has no concept of "risk
// tier," and this isn't a cross-app contract, just App1's own domain shape
// that happens to be used by the SettingsPanel it exposes.
export type RiskTier = 'conservative' | 'balanced' | 'aggressive';

export interface RiskProfile {
  tier: RiskTier;
  rebalanceThresholdPercent: number;
  maxPositionSizePercent: number;
}

// App1-specific domain rules: what counts as a valid rebalance threshold and
// max position size depends on the chosen risk tier. This is exactly the
// kind of business logic that belongs in App1, not Core — Core has no
// concept of "risk tier."
export const RISK_TIER_DEFAULTS: Record<RiskTier, RiskProfile> = {
  conservative: { tier: 'conservative', rebalanceThresholdPercent: 2, maxPositionSizePercent: 5 },
  balanced: { tier: 'balanced', rebalanceThresholdPercent: 5, maxPositionSizePercent: 10 },
  aggressive: { tier: 'aggressive', rebalanceThresholdPercent: 10, maxPositionSizePercent: 25 },
};
