# Roadmap

- [x] 1. Vite project, modular shell, Thai navigation, responsive layout, local artwork, unit/browser tests.
- [x] 2. Versioned deterministic rebirth and Birth Record (equal archetypes now; weighted generator 1 retained for saves).
- [x] 3. Childhood annual life, aging and chronicle through 12; adult extensions remain in later slices.
- [ ] 4. Narrative conditions, flags and delayed consequences.
- [ ] 5. Attributes, power paths, professions and training.
- [ ] 6. Survival, economy, inventory and crafting.
- [ ] 7. Combat, exploration, dungeons and loot.
- [ ] 8. NPC memory, relationships and parties.
- [ ] 9. Factions, world eras, longevity and endings.
- [ ] 10. Content expansion, illustrations, balance and polish.
- [ ] 11. Automated playthroughs and comprehensive content validation.
- [ ] 12. Release hardening and GitHub Pages deployment configuration.

Current release is 0.6.0 (V6 Phase A). Equal birth archetypes, annual childhood, seven-stage awakening, 20 base families with work/training and 20 advanced paths are playable. Existing saves/legacy chapters remain intact. Pages serves compiled main:/ compatibility files as well as the Actions dist deployment.

## Current priority stages (2026-10-28)

- Implemented: production diagnosis (legacy Pages served raw source), compiled main:/ compatibility publication, browser-based post-deploy checks.
- Implemented foundation: illustrated navy/gold surfaces with original local AI landscape; layered SVG portraits with persistent seeded face/hair/eyes/skin, race features, age appearance, career clothing/weapons and mage aura.
- Still incomplete: all 20 requested screens, detailed portrait anatomy, equipment/scar/curse/transformation layers, 500 names and expanded lineage/origin data, full annual life simulation, RPG systems, NPC content and target endings. No fake screens have been added.
- Current continuation: annual life/calendar and P2 core are implemented; the next system slice is owned inventory/equipment and contextual travel, as specified below.

## Ultimate Directive v3 checkpoint — 0.3.0

- P0 completed for audited age/time/stat/loading defects; regression and public-asset checks added/retained.
- P1 core implemented: authoritative calendar + schema-3 migration/backup, equal 20-archetype births, paginated infancy/childhood to 12, yearly random guarantee, chronicles and readable status. Archetype-specific narrative branches and richer adult story are still incomplete.
- P3 foundation implemented early as requested: 20 functional graph locations, map controls/discovery, route costs/age gates, free walking fallback, local services/inventory/ledger. Travel encounters, price evolution, equipment, businesses and 150-location scope remain undone.
- P2 is next: real awakening and eligible career/training progression. Existing legacy class choices are not a substitute for this system.
- Remaining P4–P8/full-release targets are tracked precisely in docs/NEXT_CODEX_TASK.md. Original historical milestone list above is superseded where time/birth specifications conflict.

## 0.4.0 checkpoint — 2026-10-29

- P2 core completed: seven-stage deterministic awakening with pause/resume/venue, eligible-only careers and searchable codex, 20 actual base families, free training with fatigue/focus/diminishing rewards, jobs/ledger/mastery, 60 career story episodes and one earned advanced path per family.
- Save schema 4 adds per-family progression and archived awakening without resetting existing life, calendar, appearance, gallery or birth. Both pre-v3 and pre-v4 backups remain available.
- Simulated 40 complete career paths (20 families × two story policies) from real infancy through awakening to age 18 and promotion. New mechanics have boundary/regression/E2E checks.
- Still incomplete: richer regional/family stories, at least 60 more advanced/hybrid paths, actual equipment/combat skills, NPC mentors/relationships, travel encounters, crafting/businesses, lifespan/ascension and full-release counts.
- Next slice: P3 inventory/equipment and contextual travel encounters using existing graph, economy and career IDs. See docs/NEXT_CODEX_TASK.md for exact invariants and acceptance criteria.

## 0.5.0 checkpoint — user-requested annual pacing

- [x] Persistent age-appropriate annual focus with actual work/practice/rest/travel and 1/2/5-year plans; seek-next-decision stops within ten years.
- [x] Minor childhood scenes become automatic logged life events; old detailed reading stays optional. Six original five-option life crossroads and spaced four-option career dilemmas replace mandatory two-choice interruptions.
- [x] One selected approach completes the actual remaining awakening stages without rerolling measured outcomes.
- [x] Readable desktop/mobile annual dashboard: time controls, optional pause/speed autoplay, family, journal, location and actual life-history cells. No offline aging or fake peers/statistics.
- [x] Schema 5 / exact pre-v5 backup, guarded atomic writes, preserved old chapters/careers/births. All 20 advanced paths remain earned and reachable through the new planner.
- [x] Local tests/build/content and production-preview browser verification. Public release evidence is recorded separately after deployment.
- Remaining: adult regional/family variation, stronger long-life retention, natural mortality/extension, equipment/combat/NPC/God paths and the full directive content targets.
- Next: P3 owned inventory/equipment and contextual travel. Do not redo the completed pacing/time/ceremony foundation; read docs/NEXT_CODEX_TASK.md.

## V6 delivery phases — highest current order

- [x] A: One Life memory-only run; pure original chapter actions; terminal-only bounded idempotent archive; legacy keys ignored/preserved; independent tabs, refresh/BFCache lifecycle, real engagement timing.
- [ ] B: compact readable responsive UI, age/power hero, in-page accessible map/training/shop/bag/details dialogs. This is the next priority before original P3 equipment.
- [ ] C: inherited version-2 8/16-bit full-body appearance, at least 20 real variants/group and distinct 20-location tile scenes.
- [ ] D: owned equipment, real inventory/shop/encounters; existing bread and graph stay functional.
- [ ] E: earned power 1–99, gated 100, graded aura/breakthrough systems.
- [ ] F: earned lifespan extension, long projects and ≥1000-year routes.
- [ ] G/H: original narrative/NPC/ending expansion and full release hardening.

Phase A retains all 126 authored events/scenes, 269 choices, six endings and existing career/map mechanics. Save compatibility now means historical reproducibility only; runtime resume is intentionally removed by explicit user override.
