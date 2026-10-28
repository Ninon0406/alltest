# Continue REBORN after 0.5.0 — annual pacing checkpoint

Read AGENTS.md, ROADMAP.md, docs/REBORN_CODEX_ULTIMATE_DIRECTIVE.md, docs/PACING_REFERENCE.md and current HEAD. Continue this checkout; do not recreate the calendar, birth, map, ceremony, careers or annual dashboard. The latest user request overrides old frequent mandatory two-choice quotas.

## Current playable checkpoint

- Default annual view: persistent age-appropriate focuses (8 total), actual yearly resource/time simulation, manual 1/2/5-year steps and seek-next-decision within ten years. Ordinary childhood scenes are resolved according to focus and explicitly logged automatic. The existing detailed reader and legacy chapters/six endings remain optional.
- Six original five-option life crossroads at ages 6/10/20/28/40/60 (age ranges accommodate later imports). Birth-to-12 stops at 6, 10, 12. Career dilemmas use 13/15/17 minima and at least two years between decisions; four strategies include both original outcomes, real consultation effects and two-year postponement. No new authored NPC profiles are implied.
- One chosen awakening approach executes the actual remaining seven stages, retains saved venue/archived result and allows postponement. Already measured results never reroll.
- Optional 1/2/4/8× autoplay, off by default; stops at decisions, another menu, hidden tab, reload or save failure. No offline aging. Annual UI includes actual family/location, latest journal/results and 100-cell rolling chronicle grid (not a lifespan forecast).
- Retained P0/P1: frozen birth generators 1/2, equal 20-archetype fresh births, authoritative 360-day calendar, immutable birth records, persistent layered portraits, transactional revision-token dispatch and original endings/gallery.
- Retained P2: actual deterministic ceremony, weighted eligible careers, free practice/fatigue/focus/recovery, wages/ledger/XP/mastery, persistent switching, 60 original career episodes and 20 actual earned higher paths. All 20 are reachable through both annual and detailed play. Promotion bonuses are earned training, not equipment.
- Retained P3 foundation: 20 connected functional locations in 5 regions, 20 route edges, age/stamina/time/cost gates, safe slower free walking, discovery/map controls, public services and bread buy/eat/sell with real ledger.
- Schema 5 validates yearly view/focus/checkpoints/reports and retains exact raw pre-v5, existing pre-v4 and pre-v3 backups. Never overwrite earlier backups, reroll old births, fabricate old chronicles or auto-awaken imported adults. Current and backup saves are downloadable in the record.

## Precise next slice — P3 owned inventory/equipment and contextual travel

1. Add original versioned item data: stable IDs, tags, capacity, stack/equipment slots, ownership and actual modifiers. Start with a coherent small set serving career groups. Preserve current bread, gold, yearly plans and all progression. Schema 5 is already used; if another migration is necessary use 6 with a safe raw backup and validator.
2. Atomic shops with real prices/availability/gold/stock, equip/unequip and meaningful effects. Keep base attributes separate from derived equipment modifiers; never accumulate bonuses by re-equipping. Earned promotion capacity gains remain permanent training.
3. Contextual route encounters tied to real edge/location/day/career; opt-out/flee/noncombat and ordinary walking remain valid. Integrate with rare annual decision pacing, not constant forced dialogs. Never charge travel/time twice or auto-resolve an important encounter without the player.
4. Connect real ownership/equipment to portrait weapon/accessory layers. Current career clothing/weapons are cosmetic, not an ownership system; do not count them as real equipment.
5. Add initial regional travel/market narratives; richer family-origin branching remains pending. Important authored NPC/mentor profiles and relationships are a subsequent slice, not the generic helper text.

## Files and invariants

- `src/data/yearly.js`: 8 focuses, 6 authored life crossroads, stable saved IDs. `src/engine/yearly.js`: pendingDecision/resolveMajor/advanceYears; multi-year loops stop at crossroads, simulate only remaining days, rest on fatigue and use actual routes/jobs. Preserve old manually recorded actions; compact only new routine entries. Annual reports retain the most recent 200; full journal/chronicle long-life limits are still pending.
- `src/ui/yearly-view.js`: safe text rendering, actual saved family data, no invented parent ages/siblings/peers/counters. Autoplay is in-memory; stop on hidden page/navigation/save failure. Never persist timers or advance offline.
- `src/engine/time.js`: absoluteDay/birthAbsoluteDay authoritative; age/day/season are projections. All new elapsed time uses advanceTime. Detailed-reader birthday gates remain; default annual mode intentionally replaces forced infant prompts.
- `src/progression/awakening.js`: step 0–7, measured result from step 4 onward, actual saved venue and fixed result version 1. `src/progression/engine.js`: readiness current development ×85% + archived affinity ×15%; free ordinary farmer path prevents low-stat/money soft locks.
- `src/data/careers.js`, `src/data/events/careers.js`: stable 20 base/20 higher IDs, three dilemmas each, persistent per-family records, once-only promotions. Generic consultation/postponement wrappers are not extra authored narratives.
- `src/engine/actions.js`: clone/reduce with revision token. `Game.perform` saves successfully before replacing live state; failed whole-year actions roll back. `src/save/storage.js`, yearly/progression validators reject malformed/future saves without replacing raw data.
- Frozen generator-1 birth tables and generator-2 archetypes/birth-origin-v2.json must remain reproducible. New location pools require a new generator version.
- Source is `app.html` + `src/`; root index/assets/art are generated main:/ Pages compatibility output. Build then `node scripts/stage-site.mjs`; keep previously published hashed assets for cached HTML. Pages settings change was denied (403); do not claim it changed. Verify actual public HTML/gameplay after authorized push.

## Validation and actual scope

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

Current local suite: 50 unit cases and 36 desktop/mobile browser cases. Unit simulations retain all 40 detailed career paths (20 × two policies), add all 20 annual-planner promotions and keep the 100,000-origin audit. Content audit covers 100 legacy births, 100 detailed childhood paths, 40 detailed career paths and 5 annual policies beyond age 60. Public verifiers use actual clicks and calendar progression, not injected age or unlocks: basic at 1920/1366/768/360, birth-to-12/ceremony/career/wages/practice/reload at 1366/360.

Authored/reachable union: 126/126 scene-event records, 269/269 authored choices, 6/6 endings; 20 base careers, 20 earned higher paths, 20 functional locations/5 regions/20 edges, 120 names, 0 important authored NPC profiles and 0 functional dungeons. Eight focus cards and time/service controls are not additional narrative choices. Old detailed content is counted as retained content, not mandatory prompts in a single life.

## Remaining limits

No owned equipment, combat/dungeons, full skill trees, authored NPC/mentorship/relationships/party/romance, crafting/business simulation, lifespan enforcement/extension/ascension/God paths or new endings. Only 20 of the target ≥80 advanced/hybrid paths exist. Adult/family/regional story variety, import UI, long-life full history cap and region art need further work. Passing age 60 does not implement natural mortality or immortality. Hidden potential/lifespan/rare ability identities remain undisclosed. This is a playable development checkpoint, not the full directive.

## Publication evidence

Previous runtime 333ab7b (0.4.0) was publicly verified. Local 0.5.0 verification is complete; record its source commit, expected public bundle and post-deploy browser results here only after actual publication. See CHANGELOG.md for subsequent release evidence.
