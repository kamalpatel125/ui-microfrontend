import sharedCss from './shared.css?inline';

let injected = false;

// Federation can expose JS modules reliably, but exposing a raw .css file
// as an importable remote module is unreliable across bundlers. Instead,
// Core injects its own stylesheet into <head> as a side effect the first
// time any exposed component module is loaded, so consumers never need to
// import CSS directly.
export function injectCoreStyles(): void {
  if (injected || typeof document === 'undefined') return;
  const style = document.createElement('style');
  style.setAttribute('data-source', 'core');
  style.textContent = sharedCss;
  document.head.appendChild(style);
  injected = true;
}
