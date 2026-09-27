import { useState } from 'react';
import { Button, Card } from 'core';
import { RISK_TIER_DEFAULTS, type RiskProfile, type RiskTier } from './riskProfile';

export interface SettingsPanelProps {
  initialProfile?: RiskProfile;
  onSave?: (profile: RiskProfile) => void;
}

const TIERS: RiskTier[] = ['conservative', 'balanced', 'aggressive'];

// EXAMPLE DOMAIN CONTENT — replace with your own app-owned component. The
// risk-tier logic itself is disposable; the pattern worth keeping is: a
// domain component exposed via Module Federation as "app1/Settings" so a
// sibling app can render it without App1 publishing it as a package (see
// federation.manifest.ts). Use this shape whenever a component is too
// domain-specific for Core/shared but still needs to be reused by another
// app — see the README's "Sharing a component sideways between two apps"
// section.
export default function SettingsPanel({ initialProfile, onSave }: SettingsPanelProps) {
  const [profile, setProfile] = useState<RiskProfile>(initialProfile ?? RISK_TIER_DEFAULTS.balanced);

  function selectTier(tier: RiskTier) {
    setProfile(RISK_TIER_DEFAULTS[tier]);
  }

  return (
    <Card title="Risk Settings">
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        {TIERS.map((tier) => (
          <Button
            key={tier}
            variant={profile.tier === tier ? 'primary' : 'secondary'}
            onClick={() => selectTier(tier)}
          >
            {tier}
          </Button>
        ))}
      </div>
      <dl style={{ fontSize: 14, color: '#374151' }}>
        <dt>Rebalance threshold</dt>
        <dd>{profile.rebalanceThresholdPercent}%</dd>
        <dt>Max position size</dt>
        <dd>{profile.maxPositionSizePercent}%</dd>
      </dl>
      <Button variant="primary" onClick={() => onSave?.(profile)}>
        Save
      </Button>
    </Card>
  );
}
