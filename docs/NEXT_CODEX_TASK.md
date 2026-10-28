# Continue REBORN after 0.4.0 — Ultimate Directive v3

Read AGENTS.md, ROADMAP.md, docs/REBORN_CODEX_ULTIMATE_DIRECTIVE.md and current HEAD first. Continue the existing game; do not recreate the completed calendar, ceremony or career screens.

## Current playable checkpoint

- Existing P0/P1: equal 20-archetype births with frozen generator-v1/v2 compatibility, 360-day calendar, age-appropriate infancy/childhood, annual journal/chronicles, working optional legacy arcs and six endings, persistent layered portrait identity.
- P2 core: actual seven-stage local awakening at age 12+; deterministic archived 20-family result breakdown; pause/resume at saved venue; legacy chapters pause an unfinished ceremony; no auto-awakening imported adults.
- 20 actual base families: eligibility/weighted readiness, only eligible choice buttons, searchable codex, free practice, fatigue/focus/recovery and diminishing repetition rewards, wages and ledger, per-family XP/mastery and persistent switching.
- 60 original career episodes: three/family, age minima 12/13/16. Precision choices improve training, community choices improve wages; both change distinct attributes and XP. One real earned advanced path/family requires age 18+, XP 120, mastery 60, higher attribute and all three episodes. Permanent capacity bonus is once/family; salary and training bonuses require the active promoted family.
- Schema 4 adds progression and validates it. Exact raw pre-upgrade `reborn_save_backup_before_v4` is retained; `...before_v3` remains untouched. Current and both backup versions are downloadable in the character record. Birth, appearance, time, active life, old chapters, inventory and endings are preserved.
- P3 foundation retained: 20 connected functional locations in 5 regions, route quotes/costs/time/stamina/age gates, discovery/zoom/pan/birth/current pins, free slower walking and safe rest at every node; public study/work; bread buy/eat/sell and real ledger.

## Precise next slice — P3 inventory/equipment and contextual travel

1. Add versioned original item data with IDs, tags, capacity, stack/equipment slots, actual stat modifiers and ownership. Start with a small coherent set serving all career groups instead of padding item counts. Preserve existing bread quantities and all progression. Add schema 5 only with a safe migration/backup if required.
2. Add atomic shops (before/after gold, town availability/prices, sell below buy where appropriate), equip/unequip and item effects. Keep base stats separate from derived equipment modifiers; do not mutate/accumulate bonuses on re-equip or reroll portraits. Earned career promotion capacity gains are permanent training, not equipment.
3. Add contextual route encounters tied to edge/location/day/visited/career. Keep opt-out, flee/noncombat and ordinary travel valid. Never teleport, silently skip childhood guarantee events or consume money/time twice. Use revision tokens and clone/reduce/save/commit.
4. Connect actual equipment slots to existing portrait weapon/accessory layers; do not show weapons the character does not own. Current role clothing is cosmetic; there is no implemented equipment ownership yet.
5. Add initial travel/market career events that differ by region; richer family-origin branching (2–4 groups/archetype) remains unfinished. Important NPC mentor profiles/relationships are a subsequent slice, not the generic helpers in current narrative.

## Files and invariants

- `src/progression/engine.js`: readiness = current development ×85% + archived measurement ×15%; current stats may improve, saved outcome cannot reroll. Free ordinary farmer path after ceremony plus community work before ceremony prevent money/low-stat soft locks.
- `src/progression/awakening.js`: result version 1 measured once; venue retained across pause/travel; stage index persisted. `state.progression.awakening.step` 0–7; result exists from step 4 onward. Avoid changing archived result schema or coefficient interpretation without versioning.
- `src/data/careers.js` and `src/data/events/careers.js`: stable 20 IDs and 20 advanced IDs; 3 genuinely different dilemmas each. Records retain XP/mastery/arcStep/perks/advanced status across switches. Do not grant multiple capacity bonuses or reset an earned advanced rank.
- `src/engine/time.js`: absoluteDay/birthAbsoluteDay authoritative; `age/day/season` are projections. All actions use advanceTime. No fabricated historical chronicles for imports. Boundary tests preserve random childhood interruptions even after outside activities.
- Birth generator 1 tables (`birth.js`) and generator 2 archetypes / `birth-origin-v2.json` are frozen. New world nodes must not reroll old birthplace records. Use a new generator version for new birth pools.
- `src/engine/actions.js`: pure cloned dispatch, revision token. `Game.perform` saves successfully before replacing live state and returns success/failure for navigation. New actions must participate in this guard.
- `src/save/storage.js` and `src/progression/validate.js`: validate references and numeric limits. Do not overwrite previous raw backups. Older releases cannot read schema 4; export all current/newer data before rollback.
- `app.html` + `src/` are source. Root index/assets/art are generated main:/ Pages compatibility outputs. Build then `node scripts/stage-site.mjs`; retain old published hashed assets. Do not change Pages source by guessing or bypass a 403.

## Known limits / not a full release

Only 20 of the target ≥80 advanced/hybrid paths exist. Skill progression is a basic-to-master ladder, not a full combat skill tree. No owned equipment, combat, dungeons, important authored NPC profiles, mentorship system, party/romance, crafting/business simulation, lifespan enforcement/extension, active-play timer, ascension or new endings. Natural lifespan/hidden potential/rare hidden ability identities remain stored but undisclosed. Long-life history capping, import UI, regional art and full 3-column polish remain pending. New default life is relaxed; legacy war arcs are optional.

## Validation / evidence

```sh
npm ci
npm test
npm run content
npm run build
node scripts/stage-site.mjs
npm run test:e2e
npm run preview -- --port 4185
node scripts/verify-production.mjs http://127.0.0.1:4185/
node scripts/verify-progression.mjs http://127.0.0.1:4185/
```

Current baseline: 40 Vitest cases, 28 desktop/mobile browser cases. Unit tests retain the 100,000-origin distribution audit and now simulate all 20 families under both story policies from actual infancy through awakening to earned age-18+ promotion, salary and save reload (40 completed paths, zero failed assertions). Content audit independently covers 100 legacy births, 100 annual childhood paths and 40 career paths. `verify-progression.mjs` also drives real browser clicks from fresh birth to 12/ceremony/work/training/reload; it does not inject age or unlock outcomes. Basic verifier checks 1920/1366/768/360 widths; full progression browser verification uses 1366/360. After an authorized push, verify the actual public site, not just workflow success.

Authored/reachable union at checkpoint: 120/120 scene-event records, 239/239 meaningful narrative choices, 6/6 endings; 20 base careers, 20 earned advanced paths, 20 functional locations, 120 names, 0 authored important NPCs and 0 functional dungeons. Do not count service/training/UI buttons as extra narrative choices.

## Published checkpoint evidence

Runtime source commit `333ab7b` (v0.4.0) was pushed to main and its expected hashed CSS/JS were observed in the public HTML. Both public browser verification scripts passed: 1920/1366/768/360 basic layout/assets/save/map/career checks, and 1366/360 genuine birth-to-12 ceremony/career/salary/practice/reload/story checks. No browser runtime errors were observed in these scenarios. GitHub's branch Pages deployment completed successfully; the custom Actions workflow runs additional post-deploy checks independently.
