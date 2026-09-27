import SettingsPanel from './SettingsPanel';

// Module exposed to remote consumers via Module Federation as
// "app1/Settings". See federation.manifest.ts for the full expose list.
export default SettingsPanel;
export type { SettingsPanelProps } from './SettingsPanel';
export type { RiskProfile, RiskTier } from './riskProfile';
