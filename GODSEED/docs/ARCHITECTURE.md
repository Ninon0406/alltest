# Architecture

- `src/content/story.ts`: canonical scene subset, stable Choice IDs, prerequisites, reward/trust/flags and presentation cues
- `src/engine/state.ts`: Zod schema, seeded RNG counter, immutable transaction boundary; serialized state has no Phaser objects
- `src/engine/save.ts`: isolated `godseed-saves` IndexedDB; current, last-good backup and archived old runs. Write transaction completion required before UI replaces current state
- `src/systems/spells.ts`: pure legality, naming, mechanics and VFX descriptors generated from 8×6×7; immutable ID identity
- `src/systems/game.ts`: choice/craft/equip/combat commands; resource validation before mutation; first-win and first-discovery idempotency
- `src/scenes/world.ts`: Phaser 4 Canvas/WebGL auto renderer; separate sky/stage/actor/particles; presentation accepts committed result; no rules in render loop
- `src/main.ts`: accessible DOM controls and command queue. Snapshot result → animate/skip → persist → reveal. Input lock synchronously rejects second click. Failure retains old state
- `scripts/generate-art.mjs`: reproducible PNG stages and 32×48 actor frames; source of every first-party image
- `scripts/stage-site.mjs`: production output at repository root for existing main:/ Pages; retain old GODSEED hashes for cached HTML

Vite `base: './'` intentionally supports both project `/alltest/` and preview/subpath hosting without absolute asset references. No client router/history fallback required. CI installs in GODSEED with Node 24, validates/builds/browser-tests, then uploads artifact; deploy only main after successful checks. The root package only delegates commands; authoritative dependency lock is GODSEED/package-lock.json.

Schema version 1 is the first GODSEED schema, unrelated to old REBORN saves. Reject malformed imports rather than guessing migration. Next schema change must include explicit migration and fixtures. Save export is currently schema validated, not checksum protected.
