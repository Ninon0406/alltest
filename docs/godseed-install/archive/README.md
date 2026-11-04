# GODSEED Codex Skill Pack — 10 skills (2026-11-05)

These are **custom instruction skills** based on OpenAI's SKILL.md format. They do not fine-tune the model or install a new game engine.

## Installation
Put `.agents/skills/<skill-name>/SKILL.md` into the **GODSEED repository root** (not just a chat message). Codex discovers repository skills according to official skill documentation. If a skill does not appear in an active session, start a fresh Codex task/restart the client.

Owner is mobile-only: simplest path is to attach or paste `GODSEED_INSTALL_ONE_PROMPT.md` into a Codex task connected to that repository. It contains all skill file bodies and asks Codex to write the files in place. If the tool cannot edit the repo, it should report the limitation, not claim installed.

## Files

- `.agents/skills/godseed-project-director/SKILL.md` — Use for GODSEED project planning, architecture, implementation sequencing, cross-system design decisions, and reconciling instructions with the master game specification; do not start unrelated projects.
- `.agents/skills/godseed-pixel-art-director/SKILL.md` — Use when designing, creating, integrating, reviewing, or polishing GODSEED HD pixel art, animated sprites, tilemaps, parallax backgrounds, palette, effects, readability, and visual consistency.
- `.agents/skills/godseed-choice-cinematics/SKILL.md` — Use when implementing GODSEED branching narrative choices, automatic character action animation, staging, scene transitions, flags, consequences, and reachable scene graph validation; not for free-roaming controls.
- `.agents/skills/godseed-spell-alchemy/SKILL.md` — Use for GODSEED ingredient collection, rune recipes, legal spell combinations, deterministic crafting, spellbook discovery, equipment slots, progression, and recipe validation; enforce the canonical formula rules.
- `.agents/skills/godseed-combat-vfx/SKILL.md` — Use for GODSEED turn-based combat rules, battle state machines, enemy intents, target selection, status effects, spell particles, composition-based visual effects, and battle acceptance tests.
- `.agents/skills/godseed-narrative-memory-ai/SKILL.md` — Use for GODSEED Thai story content, choice consequences, NPC memories, world continuity, optional local AI storyteller, dialogue validation, and non-AI fallback text generation.
- `.agents/skills/godseed-responsive-accessibility/SKILL.md` — Use for GODSEED responsive web-game UI, touch accessibility, iPhone/Android phone, iPad portrait/landscape, desktop mouse/keyboard, Thai text layout, reduced motion, and performance tuning.
- `.agents/skills/godseed-qa-automation/SKILL.md` — Use for GODSEED unit tests, content graph validation, deterministic simulation tests, Playwright phone-iPad-desktop E2E, quality gates, regression triage, and truthful build reports.
- `.agents/skills/godseed-github-pages-delivery/SKILL.md` — Use to configure or repair GODSEED GitHub Pages deployment, Vite repository base path, GitHub Actions CI and Pages workflow, asset URLs, mobile-only owner setup, and release verification.
- `.agents/skills/godseed-continuous-development/SKILL.md` — Use when GODSEED Codex work was interrupted, a sprint finished, the user says continue, a bug needs repair, or a mature build needs a new useful improvement without overwriting previous work.

## Priority and safety
Latest owner's instructions > authorized permissions and policies > `02_GODSEED_MASTER_SPEC.md` > skill workflow. Never overwrite existing repo files or replace other skills without inspection.

## References (official docs consulted)
- https://learn.chatgpt.com/docs/build-skills
- https://github.com/openai/codex/blob/main/codex-rs/skills/src/assets/samples/skill-creator/SKILL.md
- https://docs.phaser.io/api-documentation/constant/core
- https://vite.dev/guide/static-deploy
- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- https://playwright.dev/docs/emulation
- https://huggingface.co/docs/transformers.js/index
