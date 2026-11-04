# Decisions — 2026-11-04

1. Latest owner override explicitly removes REBORN. Remove old tracked game and publication content; preserve GODSEED bundle, ten Skills, installation evidence and normal Git history. GODSEED now owns Pages root; earlier plan for a separate URL is superseded.
2. Phaser 4.2.1 verified available through npm and pinned. Vite/TS use current resolved lockfile; Phaser typings compile and actual production browser boots, validating the APIs used. No claim all vendor documentation APIs were exhaustively checked.
3. Deliver a complete first forest loop before entire chapter. Keep canonical Scene/Choice IDs; omit unimplemented routes rather than show empty menus or claim chapter completion. Four procedural stage variants are provisional, not final HD art.
4. All 234 recipes have definitions, canonical costs/power/support category and composed descriptor. Current single-enemy slice executes damage, split/seek, heal, shield, pierce, basic SEAR/WET/RESONANCE. Other elemental reactions, full duration/target semantics and visual differences across every modifier remain backlog. Do not equate definition coverage with full behavioral acceptance.
5. Starter is learned by actual on-screen craft rather than gifted as a usable spell before discovery, following §7.6 tutorial transaction and avoiding dummy success.
6. Reward choices with repeatable gathering are limited per in-game day; no real-time timer. One-shot gifts/trust keyed by Choice ID. Repeat gathering cooldown text remains UI debt.
7. IndexedDB failures preserve current state but currently prevent new action commits. Future memory-only fallback must clearly label lack of persistence. No read/write of legacy game save keys.
8. Relative base is chosen to support existing project Pages root and nested previews. Must be verified under /alltest/ before release.
