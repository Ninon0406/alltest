# Architecture

- `src/content/story.ts`: canonical scene subset, stable Choice IDs, prerequisites, reward/trust/flags and presentation cues
- `src/engine/state.ts`: Zod schema, seeded RNG counter, immutable transaction boundary; serialized state has no Phaser objects
- `src/engine/save.ts`: isolated `godseed-saves` IndexedDB; current, last-good backup and archived old runs. Write transaction completion required before UI replaces current state
- `src/systems/spells.ts`: pure legality, naming, mechanics and VFX descriptors generated from 8×6×7; immutable ID identity
- `src/systems/game.ts`: choice/craft/equip/combat commands; resource validation before mutation; first-win and first-discovery idempotency
- `src/scenes/world.ts`: Phaser 4 Canvas/WebGL auto renderer; separate sky/stage/actor/particles; presentation accepts committed result; no rules in render loop
- `src/main.ts`: accessible DOM controls and command queue. Snapshot result → animate/skip → persist → reveal. Input lock synchronously rejects second click. Invalid commands retain old state. Persistence failure commits the computed valid action only into an explicitly marked memory session
- `scripts/generate-art.mjs`: reproducible PNG stages and 32×48 actor frames; source of every first-party image
- `scripts/stage-site.mjs`: production output at repository root for existing main:/ Pages; retain old GODSEED hashes for cached HTML

Vite `base: './'` intentionally supports both project `/alltest/` and preview/subpath hosting without absolute asset references. No client router/history fallback required. CI installs in GODSEED with Node 24, validates/builds/browser-tests, then uploads artifact; deploy only main after successful checks. The root package only delegates commands; authoritative dependency lock is GODSEED/package-lock.json.

Schema version 1 is the first GODSEED schema, unrelated to old REBORN saves. Reject malformed imports rather than guessing migration. Next schema change must include explicit migration and fixtures. Save export now uses a versioned SHA-256 envelope; importing earlier raw state-v1 remains supported without rerolling. The game-state/database schema is still version 1.

## Save reliability (0.1.1)

`engine/save.ts` validates raw state-v1 records and rotates primary/backup in one readwrite transaction. Invalid primary never becomes backup. Duplicate writes keep the earlier backup. Transaction completion is the durability boundary. `inspect` returns valid current, valid backup, corruption indicator and validated archive entries without changing slots. Database opening is bounded, blocked/late connections are closed and version changes close active connections.

`engine/save-file.ts` is a pure-format layer plus WebCrypto SHA-256. Stable sorted-key serialization ignores undefined object fields just like JSON; optional completed-combat fields survive round trip. Format envelope v1 differs from game state schema v1. Checksum detects file corruption, not authenticity. Reject unknown format/state versions; legacy raw-v1 files get a visible confirmation notice. No old save migration/reroll is guessed.

`engine/storage-session.ts` coordinates durable vs memory state, warning, recovery and archived runs. When disk fails, keep the actual disk state unchanged if the transaction aborted and show memory mode. Retry writes archived memory runs before current, then confirms durable storage and clears the warning. Memory mode provides no survival guarantee after reload. Multiple-tab last-writer conflicts are not solved in this change.

`ui/save-controls.ts` builds accessible shared title/in-game restore/import/export/archive controls. UI commands share one async lock, and aria-busy remains true until state acceptance completes. No screen can start another replacement during file verification. Import/restore/new game ask for confirmation before replacement; existing current is archived first. Invalid imports never reach storage.

Tests use fake-indexeddb in Node for real transaction semantics and Playwright's actual browser IndexedDB for failures/recovery. Those packages and Node types are development dependencies only.

If a save replaces a different runId, the same transaction also archives the valid old run. This protects an unseen durable run when startup inspection failed and memory play later retries. The additional boundary has a failing-before/passing-after fixture.
