import PortfolioApp from './PortfolioApp';

// This is the module exposed to remote consumers (Host) via Module
// Federation as "app1/App1". Kept separate from main.tsx so the exposed
// surface is just the component, not the standalone mounting logic.
export default PortfolioApp;
