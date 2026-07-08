# CLAUDE.md

## Stack
Plain HTML, CSS, and vanilla JavaScript — no framework, no build step.

## Conventions
- Use semantic HTML5 tags (header, nav, main, section, footer)
- Keep CSS in stylesheets, JS in script files — no inline styles or onclick
- Use CSS variables for colors, spacing, and fonts

## Design
- Use the `frontend-design` skill for any UI/UX work
- Style: clean, modern, minimal — no generic purple gradients

## Workflow
- After UI changes, use the `webapp-testing` skill to check the page works
- Before finishing a task, run the `code-review` skill on changed files

## Skills installed
- `frontend-design` and `webapp-testing` — from `anthropics/skills`, installed via
  `npx skills add anthropics/skills --skill <name> --agent claude-code`, vendored at
  `.claude/skills/`. Verified content before trusting it (Apache-2.0 licensed,
  matches Anthropic's known design-philosophy guidance; the testing script only
  starts a local server and drives Playwright against it — no remote calls).
- `code-review` — already built into Claude Code, no install needed.

## Skills intentionally NOT installed
Two requested skills were skipped as unverifiable/high-risk and were not added:
- `ui-ux-pro-max-cli` (npm) — 12-day-old package, no linked repo, no homepage, no
  named author, requires a global install plus running an `init` command of
  unknown behavior against this agent's config.
- `multica-ai/andrej-karpathy-skills` — not from Andrej Karpathy's actual GitHub
  account (`karpathy`); an unverified org borrowing a well-known name. Skill
  content is loaded directly into the agent's context as instructions, so an
  unverified source here is a prompt-injection/supply-chain risk, not just a
  quality one.

If either is still wanted, verify provenance first (real repo, real author,
recent legitimate activity) before installing.
