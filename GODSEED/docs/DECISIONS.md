# Decisions — 2026-11-04

1. Latest owner override explicitly removes REBORN. Remove old tracked game and publication content; preserve GODSEED bundle, ten Skills, installation evidence and normal Git history. GODSEED now owns Pages root; earlier plan for a separate URL is superseded.
2. Phaser 4.2.1 verified available through npm and pinned. Vite/TS use current resolved lockfile; Phaser typings compile and actual production browser boots, validating the APIs used. No claim all vendor documentation APIs were exhaustively checked.
3. Deliver a complete first forest loop before entire chapter. Keep canonical Scene/Choice IDs; omit unimplemented routes rather than show empty menus or claim chapter completion. Four procedural stage variants are provisional, not final HD art.
4. All 234 recipes have definitions, canonical costs/power/support category and composed descriptor. Current single-enemy slice executes damage, split/seek, heal, shield, pierce, basic SEAR/WET/RESONANCE. Other elemental reactions, full duration/target semantics and visual differences across every modifier remain backlog. Do not equate definition coverage with full behavioral acceptance.
5. Starter is learned by actual on-screen craft rather than gifted as a usable spell before discovery, following §7.6 tutorial transaction and avoiding dummy success.
6. Reward choices with repeatable gathering are limited per in-game day; no real-time timer. One-shot gifts/trust keyed by Choice ID. Repeat gathering cooldown text remains UI debt.
7. IndexedDB failures preserve current state but currently prevent new action commits. Future memory-only fallback must clearly label lack of persistence. No read/write of legacy game save keys.
8. Relative base is chosen to support existing project Pages root and nested previews. Must be verified under /alltest/ before release.


## Session 2 — 0.1.1

9. Prioritize concrete P0/P1 save loss/unplayable storage failures before adding more narrative or art. Existing first-slice rules and all 234 recipe definitions are preserved.
10. Proved corruption propagation with a failing regression on the original implementation; one validated atomic transaction replaces the earlier read-then-write pair. Preserve last-good backup when primary is invalid, rather than saving corrupt input as recovery.
11. Memory fallback is automatic with a persistent Thai warning and export/retry controls. This intentionally supersedes decision 7's earlier behavior that blocked gameplay on storage failures. Do not call a memory-only action durably saved.
12. Keep state/database schema 1. Add file envelope format 1 with canonical SHA-256 and explicitly support raw state-v1 imports. This is backward-compatible file handling; no new game state migration is needed or claimed.
13. Existing archive slots were written but inaccessible. Expose validated archived runs on title/save screens, including export. Memory-created archives remain session-only until successful retry flushes them. New runs never silently erase the current valid run.
14. Copy the owner's canonical root master spec to docs/GODSEED_MASTER_SPEC.md byte-for-byte, SHA-256 451ce8aa3e95ee291aa3782a74c7037cd1b0196b92837bf03ad7e33ebc44879d. Preserve original Markdown hard line breaks via a narrowly scoped gitattributes rule. Do not maintain divergent design editions.

15. Final review found a retry edge case: startup inspection failure can hide a valid old run from the session. Archive any different-run primary inside the save transaction itself, so later retry and subsequent autosaves cannot lose that older run. A new failing regression proved this boundary before the fix.
