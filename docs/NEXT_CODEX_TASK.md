# Continue REBORN — V6 / 0.6.0 Phase A

Read AGENTS.md, docs/REBORN_CODEX_UI_PIXEL_ONE_LIFE_DIRECTIVE.md and current HEAD. The latest user deliberately replaced active-save compatibility with One Life One Run. Do not restore auto-save, load, backup or active-run exports.

## Completed Phase A

- `src/engine/run.js`: run ID/date/status and interaction-window clock. New birth is explicit, memory-only; separate tabs independent.
- `src/engine/actions.js`, `legacy.js`, `data/scenes.js`: all normal and original chapter effects clone/validate/commit via run-scoped revision tokens. Terminal transitions close the run; no mutations/render-triggered saves.
- `src/ui/game.js`, `src/main.js`: no active-save runtime import or restoration; no storage writes before an ending. In-app panels preserve run; refresh/pagehide abandons it and persisted pageshow returns to rebirth. Native warning is best effort, not guaranteed preservation.
- `src/save/archive.js`: only `reborn_finished_lives_v1`, genuine terminal compact summary, dedup by runId, ≤100 lives, no resumable state/RNG. Web Locks serialize writes where available. Failure leaves terminal summary downloadable/retryable. Old `reborn_ending_gallery` is read-only; all old save/backups remain untouched. Historical migration validators are offline tests only.
- Actual visible engagement counts only 15-second windows after trusted interaction; hidden/idle waiting is excluded. There is no power/deity unlock tied to this clock yet.

## Next incomplete phase — B compact UI

1. Replace oversized top/card stacks with a compact responsive dashboard: always-visible age and power (initial 1; Phase E growth is not implemented), vitals summary, small scene, 3–6 main controls, expandable details. Keep existing annual focuses and rare crossroads.
2. Accessible native dialog/sheet controller for existing real map/training/career/bread shop/inventory/chronicle/record. Focus trap/ESC/close/return focus/scroll lock. No reload or state reset; pause autoplay for all overlays.
3. Keep authored narrative short/collapsible, stop duplicate headers/menus, remove the 100-cell grid from default screen. Bottom five-item mobile toolbar, overflow for other actual functions. Test 320/360/390/768/1024/1366/1920 with screenshots. No decorative dead controls, invented levels/equipment or fake NPCs.
4. Validate/update docs/build/stage/commit/publish and actually test public site. Then C is inherited pixel appearance and distinct tile backdrops; D is owned equipment, E real power progression, F long-life pacing. Do not skip prerequisites or claim them done.

## Retained mechanics and invariants

Frozen birth generators 1/2 (20 equal new archetypes), 360-day calendar, seven actual archived-once awakening stages, 20 base/20 earned advanced careers, all 60 career episodes, persistent in-run switching, real training/fatigue/focus/wages, 20 connected map locations in five regions/20 edges, age gates/walking/rest/bread/ledger, annual 1/2/5-year focus plans and rare 4–5-option decisions. `Game.snapshot` is a detached read-only observation for diagnostics; no public test-age/state injector. Existing saves are intentionally not playable in runtime under V6.

Source `app.html`/`src/`; build then `node scripts/stage-site.mjs` for legacy main:/ Pages. Never hand-edit root generated index/assets/art; retain old published hashes. No force pushes or guessed Pages settings changes.

## Validation / truthful scope

Run npm test, npm run content, npm run build, stage-site, npm run test:e2e and both verify scripts against preview and authorized public URL. Old resume browser tests were replaced, not silently left skipped. Unit suite includes 100,000-origin audit, all 40 detailed career routes and 20 annual promotions. Phase A passes 56 unit and 22 browser cases, content audit, build/staging and all three preview verification scripts. Public evidence is recorded separately after deployment.

Actual authored/reachable union remains 126 event/scene records, 269 authored choices, 6 endings, 20 base/20 advanced careers, 20 locations/5 regions/20 routes, 120 names, 0 authored important NPCs, 0 functional dungeons. New archive entries/controls do not inflate authored counts. No appearance inheritance v2, owned equipment, power growth, natural mortality/extension, combat/NPC relationship or deity systems yet.
