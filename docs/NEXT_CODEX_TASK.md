# Continue REBORN — V6 / 0.7.0 Phase A/B complete

Read AGENTS.md, docs/REBORN_CODEX_UI_PIXEL_ONE_LIFE_DIRECTIVE.md, ROADMAP.md and actual HEAD. Continue the existing game; do not rebuild the calendar/birth/ceremony/careers/map/UI and never restore active saves.

## Current checkpoint

- A: independent memory-only live run, explicit new birth after refresh, run-scoped revision-token pure dispatcher including legacy choices, terminal action guard, no runtime active-save access. Old save/backups untouched; old gallery read-only.
- Only genuine authored terminal transition archives once by runId in `reborn_finished_lives_v1`, ≤100 compact summaries, no active state/RNG/calendar/flags/inventory snapshot. Web Locks serialize where available; failures keep downloadable/retryable summary. Unfinished exit/refresh never fakes a death.
- `engine/run.js` clock counts visible 15-second windows after trusted interaction; hidden/idle/autoplay waiting excluded. Native unload warning is best effort; pagehide abandons memory and persisted pageshow returns to rebirth. No offline aging.
- B: viewport dashboard with top age/initial power and time controls, compact vitals, focus picker + 1/2/5-year buttons, seek-next-decision, rare 4–5-option modal, small pixel scene/actor, desktop results dock and five-button mobile footer. All real map/career/train/work/bread shop/bag/record/journal/options stay in one document.
- `ui/panels.js`: one native dialog, explicit Tab wrap, ESC/close, robust opener focus return, inert background/scroll lock, retained modal scroll, cleanup preventing stale close events. Any panel stops autoplay. Failed action displays a notice inside the active modal and leaves state unchanged. Session-only 100/112/125% text + reduced effects; no settings storage.
- Initial visual foundation: `ui/avatar/sprite.js` renders a full small pixel body from existing appearance-v1 and age/race. `ui/scene.js` renders 20 distinct procedural compositions/5 regional palettes and map previews. This is NOT completed C: no inherited parent appearances or ≥20 actual variants/group. No owned weapons are invented in the new scene sprite. Existing role portrait clothing remains cosmetic.
- `state.power={version:1,level:1}` is an initial display field only. No power XP, breakthroughs, rank-growth/aura ladder or deity prerequisites are implemented yet. Career skill levels/XP are separate. Do not claim power 1–100 is playable.

## Next incomplete phase — C inherited appearance v2

1. Add a new versioned appearance generator outside frozen birth generator 1/2 tables. Keep v1 reproduction for historical tests and compact old archive appearances. New runs can generate deterministic parent feature records and child crossover/mutation from run birth seed; no reroll during render/navigation/time. Do not add active save schema 6/migration: active lives are not persisted.
2. Implement at least 20 actually different rendered hair shapes/colors/skin swatches/eyes/facial features and starter upper-body/pants/footwear variants. Catalog IDs alone do not count. Respect all four existing races and meaningful parent resemblance; no skin/race value hierarchy or sex stereotypes. Write seeded distribution/stability/parent-inheritance/layer/age tests.
3. Extend `ui/avatar/sprite.js` with explicit back-aura/hair/body/face/pants/shoes/shirt/armor/head/accessories/held/front-aura order, stable identity through infant/child/youth/adult/mature/elder stages. Use real ownership before showing held equipment. If starter outfit ownership is introduced as a prerequisite, create actual small catalog/state; full shops/modifiers/equipment are D, do not pretend cosmetic layers are equipped items.
4. Reuse the existing 20 location tile descriptors/compositions and `renderScene`/map previews; improve contextual landmarks/season/weather and sprite anchor/scale rather than replacing the graph or making a universal backdrop. Keep 320px and reduced-motion performance.
5. Extend `save/archive.js` summary's compact appearance identifiers carefully to represent the final v2 figure without persisting the RNG/full parent/birth/current state. Keep old completed records readable and exact terminal idempotency. Do not delete legacy save keys.
6. Complete tests/build/content/stage/screenshots; update this file with next precise slice; publish only within existing authorization/controls and verify actual public page.

Then D is actual owned inventory/equipment/gold/modifiers/route encounters (preserve bread); E earned 1–99, validated ≥1000-year/trial-gated 100 and graded effects; F lifespan/breakthrough/long projects, then G story/NPC/ending expansion. Do not skip their gates or represent targets as done.

## Retained gameplay invariants

Frozen generators 1/2, 20 equal new archetypes, authoritative 360-day calendar; only `advanceTime` mutates elapsed game time. Seven actual deterministic awakening stages/venue/measurement archived once per run; old optional reader and chapters/six endings. Twenty base/20 earned advanced careers, 60 original episodes, per-family XP/mastery/perks/earned capacity gains persist through in-run switching. Free farmer/practice/rest/work paths prevent low-money locks. Annual focuses use actual training/work/recovery/graph travel and stop at important decisions; routine journal/ledger summaries are truthful. Full long-life retention remains pending. Twenty connected locations/5 regions/20 edges retain costs/stamina/age gates/walking/discovery/bread services and real ledger.

`Game.snapshot` is a detached diagnostic observation, not a public state injector or restore API. Historical `save/storage.js` validators remain offline only. Pure dispatch -> validated clone -> memory commit; archive failure cannot block active gameplay. No persistent active state in any storage/API/URL/cookie.

## Validation/evidence

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
node scripts/verify-one-life.mjs http://127.0.0.1:4185/
```

Current local suites: 60 unit / 37 browser cases, zero skipped. Unit tests retain the 100,000-origin audit, 40 detailed career paths and 20 annual-planner promotions. Browser tests use real clicked progression (no injected age or active-save fixtures): no-write/blocked storage, independent tabs, old keys ignored, refresh/back/BFCache event guard, authentic ending summary once, failure download, actual shop/bag transactions, modal keyboard/focus/errors, pause/hidden/reduced effects and seven 320/360/390/768/1024/1366/1920 layouts. These are Chromium viewport tests, not physical iOS/PWA validation. Native warning/discard behavior cannot be guaranteed.

Three preview scripts passed: seven-width assets/age/level/scene/overlays/no-resume, actual birth-to-12/ceremony/career/job/practice/story at 1366/360, and independent-tab/no-write/real ending/one summary/reload. Phase A a201167 was published and all three earlier public checks plus CI passed. Record the new Phase B source/hash/public checks after actual deployment, not just push.

Authored/reachable union stays 126 scenes/events, 269 choices, six endings; 20 base/20 higher careers; 20 locations/5 regions/20 edges; 120 names; 0 important authored NPC profiles, 0 functional dungeons. Procedural views/UI/archive copies do not inflate authored story/ending counts.

Publication source is app.html + src/ + public/art. Root index/assets/art are generated for existing main:/ Pages; build/stage and keep all previously published hashes. Pages settings change was denied historically; do not guess or claim a source switch. Verify expected compiled JS/CSS and actual gameplay on https://ninon0406.github.io/alltest/ after authorized push.

## Remaining limitations

No inherited v2/20-variant appearance catalogs, owned/equipped gear, power growth, natural mortality/extension, full skill trees, combat/dungeons, authored important NPC/party/relationships, crafting/businesses, ≥1000-year deity route or new endings. Base sprite/tile foundation and clean UI are not the completed full directive. Leave the next run playable and document the exact continuation.
