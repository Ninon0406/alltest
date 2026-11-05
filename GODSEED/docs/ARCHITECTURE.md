# GODSEED architecture — 0.3.0

- `content/story.ts`: stable scene/choice IDs, requirements/locked hints, one-time rewards, authored animation cues
- `content/encounters.ts`: two distinct encounter stat/reward/escape definitions; no hardcoded training-as-forest behavior
- `engine/state.ts`: State2 schema and validated V1 conversion, deterministic RNG counter and immutable transactions
- `systems/game.ts`: choices/craft/equip and re-exports combat API; first successful new craft grants XP10 once
- `systems/combat.ts`: pure turn resolution, accuracy, reactions, status/ward expiry, checkpoint recovery and reward idempotency; no Phaser dependency
- `systems/spells.ts`: canonical 336 candidates ->234 legal definitions, stable IDs, mechanics and composed VFX metadata; party-support forms apply to the one currently available player
- `ui/combat-panel.ts`: accessible HP/MP bars, intent, statuses/help, logs, four slots and legal utility actions; UI cannot grant effects
- `scenes/world.ts`: layered original procedural stage/actors/particles; presentation accepts resolved commands; skip finishes the same transaction, destroys transient particles, and resets actor tweens. Ground shadows follow positions. Training uses its original art-v2 sheet
- `engine/save.ts`: atomic primary/validated-backup, durable run archive, bounded DB open; additionally stores original raw V1 current at `legacy-v1:<runId>` before first V2 write
- `engine/save-file.ts`: file envelope1 canonical SHA-256 checked against original payload BEFORE state conversion; raw V1 and V2 can be imported with confirmation
- `engine/storage-session.ts`, `ui/save-controls.ts`: persistent/memory distinction, export/retry/recovery and accessible archived runs from0.1.1 preserved

## Versions and compatibility

Game state is2, IndexedDB database/store is still1 and checksum file envelope is still1. Raw/checked V1 validates with legacy schema before conversion. Preserve runId/seed/rng/revision/HP/MP/items/choices/trust/flags/rewards and battle checkpoint/next/status/shield. Add XP0, recoveryScene default S09, playerStatus{}, empty log and shield lifespan2 if positive (otherwise0). Existing earned progress is neither rerolled nor given assumed historical XP. Once a new action commits, write V2 and retain the raw V1 snapshot. V2 validation rejects a positive shield with zero lifetime.

## Turn order

Validate -> spend/resolve player command -> eligible old SEAR DoT -> victory check -> current enemy intent or immediate slow/accuracy result -> expire actor effects -> next stable player-selection state. Only stable complete turns are saved. Newly applied/refreshed enemy effects survive until their next relevant player action. New enemy VEIL affects its immediate outgoing accuracy and expires after that enemy phase. Player defensive effects and shields count the current enemy phase; wards last exactly two phases. See BALANCE/DECISIONS for bounded interpretations and numerical constants.

Vite relative base supports /alltest/ and nested previews. Build then stage-site preserves previous GODSEED hashes in root/artifact for cached HTML. CI runs locked install/type/lint/content/unit/balance/build/browser before main deployment. Root package delegates; authoritative dependency lock is GODSEED/package-lock.json.

## Presentation pass0.3.0

`actor-art.ts` owns atlas frame ranges and animation rates; `stage-layout.ts` owns layer IDs/prop frames/ambient anchors. Generators emit16 new deterministic PNGs to `public/assets/art-v2/`, independently of the retained legacy generator. `visual-plan.ts` maps authored cues and already-resolved battle outcomes to poses; it never mutates game data.

World uses rear(-1000), ground(-900), per-prop foot depth, actor foot depth(y+20), shadows(y+19), front(1000); rear/front parallax leaves ground/actor lane anchored. Optional memory props read actual flags only. Scene replacement destroys previous props/ambient. Ambient delta is capped100ms and gated by motion/document visibility; Phaser's visibility pause is retained. No hardware performance promise follows from these bounds.

Every action has a generation token and tracked completion settlers. Skip/reduced/show/shutdown cancels tweens and effects, settles waiting promises once, and invalidates stale asynchronous work. Main still calculates immutable next state first, waits/skips presentation, persists once, then shows next state. A final battle uses before/next state to show victory/defeat before the foe disappears. UI is locked until both storage and renderer are ready. Missing art-v2 textures choose retained legacy textures and display an accessible Thai status message; full network failure/retry is not newly implemented.

Renderer `data-*` attributes are read-only observation of actual scene state for browser QA; no engine/test mutation API. State2, DB1 and file envelope1 remain unchanged. `generate:art` rebuilds original + stage + actor outputs; staging still preserves old compiled asset hashes for cached HTML.

Portrait HUD is in normal flow below the canvas, with variable-height text wrapping. Short landscape fixes `.world` to100% assigned grid width and removes its preferred aspect ratio; the inner canvas retains16:9. Browser bounds assert that scene/canvas do not extend underneath the desk.
