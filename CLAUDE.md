# CLAUDE.md

## Stack
Plain HTML, CSS, and vanilla JavaScript — no framework, no build step.

## Sites in this repo
- `/` (root) — the original multi-page site: Home, Water Meters, Electricity
  Meters, Become an Installer, Book an Assessment. Kept live as-is.
- `/v2/` — a from-scratch narrative one-page redesign ("The Hidden Meter"),
  its own design system (ink/paper duotone, water-cyan + power-copper accents,
  Outfit/Manrope/IBM Plex Mono), with an inline lead-capture form so visitors
  never have to leave the page to convert. Cross-links back to the root site's
  water/electricity/installer pages from its footer. Do not merge the two
  design systems — v2's palette and components are intentionally separate
  from root's.

## Conventions
- Use semantic HTML5 tags (header, nav, main, section, footer)
- Keep CSS in stylesheets, JS in script files — no inline styles or onclick
- Use CSS variables for colors, spacing, and fonts

## Design
- Use the `frontend-design` and `ui-ux-pro-max` skills for any UI/UX work
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
- `ui-ux-pro-max` — from `nextlevelbuilder/ui-ux-pro-max-skill`, installed via
  `npx skills add nextlevelbuilder/ui-ux-pro-max-skill --skill ui-ux-pro-max --agent claude-code`.
  Verified before installing: real, actively maintained repo (186 commits, 60+
  contributors, 8 months of history, versioned releases), MIT licensed, no
  network/exec calls in the scripts, content is legitimate UI/UX guidance
  (color systems, accessibility, typography, layout patterns across 10 stacks).
  This replaced the earlier `ui-ux-pro-max-cli` npm package request, which was
  skipped for having no linked repo/homepage/author at the time.
- `code-review` — already built into Claude Code, no install needed.

## Skills intentionally NOT installed
- `multica-ai/andrej-karpathy-skills` — not from Andrej Karpathy's actual GitHub
  account (`karpathy`); an unverified org borrowing a well-known name. Skill
  content is loaded directly into the agent's context as instructions, so an
  unverified source here is a prompt-injection/supply-chain risk, not just a
  quality one. If a legitimate source for this is found, verify provenance
  (real repo, real author, recent legitimate activity) before installing.
