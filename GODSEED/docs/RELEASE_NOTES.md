# 0.3.0 — ฉากที่มีชีวิต

Original village/garden/workshop/forest each use three layers plus depth-sorted props, ambient and restrained parallax. Player has56 frames across11 named cycles; practice has a new original lantern-spirit silhouette/13 frames. Real flags add visible world memories. Walking/pickup/craft/guard/cast/hit/victory cues are driven by the existing resolved game state.

Skip/reduced-motion cancel and settle animation safely; final battle reactions appear before returning to story. OS reduced motion is honored from launch. Loading locks game actions until renderer ready; missing new PNGs use retained original art and a Thai status message. Portrait HUD now sits below the stage; short-landscape canvas fits its own column so the desk cannot hide the foe. All legacy art and existing gameplay are preserved.

Still a first-slice prototype: no new chapter scenes/endings/recipes, final HD certification, NPC silhouette completion or audio. State2/database1/checksum envelope1 unchanged; existing saves remain compatible. Published and public-gameplay/art/save verified at https://ninon0406.github.io/alltest/ · PR#4 /255e79f. PR CI41950932784 and main:/ Pages41951619769 SUCCESS. Full proof in TEST_REPORT.

## Earlier releases

# 0.2.0 — ฝึกเวทกับคุโร

Playable workshop training with actual35HP/power5/rules/rewards, optional surrender and checkpoint recovery. Forest clue handoff supplies a real one-time fire recipe. Elemental status/reaction timing, finite wards, semantic HP/MP,2×2 loadout, status help, intent/log and outcome feedback. Support VFX lands on the player; ground shadows follow movement.

Game state2 migrates actual V1 files/active battles without rerolling; database/file envelope remain1. Original raw V1 stored before first V2 write. New XP has no automatic level/mastery grant or retroactive backfill. Existing0.1.1 save recovery/memory/export/import remains.

Still first slice: no complete chapter/festival/boss/three endings, final HD art, audio, multiple enemies/party roster or mastery progression.

Published and public-smoke verified at https://ninon0406.github.io/alltest/ · PR #3 /2eec3a1.

## Earlier releases

# 0.1.1 — ความทรงจำที่กลับมาได้

Fix corrupt-primary propagation into a good backup; atomic backup writes and safe duplicate writes. Recover/import/export directly from title. Restore archived runs preserved before a new game. Checksum exports with backward-compatible raw-v1 imports. Storage denial/quota failures explicitly fall back to a playable memory session with export and retry, including flushing memory-created archives. Shared async lock prevents overlapping save replacements; stable battle snapshots continue after reload.

Game-state schema stays version 1. The first-slice story, combat, recipes and art are preserved; no new chapter content or final visual quality claimed.

Published and public-smoke verified: https://ninon0406.github.io/alltest/ · PR #2 / 2c4ba8d.

## Earlier release

# 0.1 — เมล็ดแรก

First GODSEED vertical slice with 13 canonical scenes, on-screen crafting, first forest battle and a recoverable return to the village. Original provisional pixel art. IndexedDB stable-boundary autosaves, backup, import/export and continue. Optional external AI is absent.

Not a complete first chapter: no festival, guardian or three ending routes yet. REBORN removed at owner's explicit request; old game data is neither migrated nor silently removed from player devices. GODSEED uses its own save database.

Published and smoke-verified at https://ninon0406.github.io/alltest/ (PR #1 / ba3d3ea).
