# 0.1.1 — ความทรงจำที่กลับมาได้

Fix corrupt-primary propagation into a good backup; atomic backup writes and safe duplicate writes. Recover/import/export directly from title. Restore archived runs preserved before a new game. Checksum exports with backward-compatible raw-v1 imports. Storage denial/quota failures explicitly fall back to a playable memory session with export and retry, including flushing memory-created archives. Shared async lock prevents overlapping save replacements; stable battle snapshots continue after reload.

Game-state schema stays version 1. The first-slice story, combat, recipes and art are preserved; no new chapter content or final visual quality claimed.

## Earlier release

# 0.1 — เมล็ดแรก

First GODSEED vertical slice with 13 canonical scenes, on-screen crafting, first forest battle and a recoverable return to the village. Original provisional pixel art. IndexedDB stable-boundary autosaves, backup, import/export and continue. Optional external AI is absent.

Not a complete first chapter: no festival, guardian or three ending routes yet. REBORN removed at owner's explicit request; old game data is neither migrated nor silently removed from player devices. GODSEED uses its own save database.

Published and smoke-verified at https://ninon0406.github.io/alltest/ (PR #1 / ba3d3ea).
