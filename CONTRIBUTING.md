# Contributing to ui-microfrontend

This repo is a **starter kit**: a working, opinionated Module Federation setup meant to be cloned, renamed, and built on top of — not a single application with one canonical direction. Contributions here should keep that in mind: changes should make the *scaffolding* more solid, more general, or better documented, not push it further toward any one example domain.

## What kind of contributions fit here

Good fits:
- Fixing a bug in the federation setup, the build config, or a documented pattern (e.g. `RemoteBoundary`, `federation.manifest.ts`, the event bus).
- Improving documentation, especially anything that makes the "replace the example, keep the scaffolding" split clearer.
- Adding a genuinely reusable pattern that any microfrontend project would want (a new sharing pattern, a CI template, a testing setup).
- Upgrading dependencies, with a note on anything that changes behavior (see the README's migration notes for examples of how past upgrades were documented).

Probably not a fit:
- Deepening the trading-domain example (App1/App2's specific business logic) — that content exists only to demonstrate the patterns, and is expected to be deleted by anyone using this as a starting point. PRs that make the example more "real" (more trading features, more finance-specific logic) work against the goal.
- Anything that couples the scaffolding to one specific backend, hosting provider, or design system beyond what's needed to demonstrate the pattern.

If you're unsure whether something fits, open an issue describing the idea before sending a PR.

## Development setup

```bash
pnpm install
cd shared && pnpm build
cd ../core && pnpm build
```

Then see the main [README](./README.md)'s "Getting started" section for running everything.

## Project structure

- `shared/` — cross-app TypeScript contracts (types + constants only, no runtime UI code)
- `core/` — example component library + utilities (Button, Card, formatters, the event bus)
- `app1/`, `app2/` — example federated feature apps (Portfolio, Watchlist) — **this is the part meant to be replaced**
- `host/` — the portal shell that composes app1/app2

See the README's "Sharing patterns" and "How the pieces fit together" sections for the reasoning behind this split before changing it.

## Code conventions

- No comments explaining *what* code does — only *why*, when it's non-obvious (a workaround, a constraint from a specific library bug, a decision that isn't self-evident from the code).
- Match the existing pattern for adding a new exposed federation module or a new cross-app share — see the README's "Adding a new..." sections rather than inventing a new approach.
- Keep `shared` scoped to types/constants only. If something has runtime behavior, it belongs in `core` or in the owning app, not `shared` — see the README's "Core vs. `shared`" section.

## Reporting issues

Open a GitHub issue with: what you were trying to do, what happened, and (for bugs) the exact commands you ran. If it's a Module Federation quirk, include which apps were running in what mode (`dev` vs `preview`) — that distinction has mattered before in this codebase's history.
