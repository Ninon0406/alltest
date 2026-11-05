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


## Session 3 — 0.2.0

16. Work on single-enemy combat effects/training now that save reliability is established. Data-drive B01 vs BT_TRAINING before adding bosses. Keep first chapter incomplete until its real paths exist.
17. State2 is required for per-player status, finite shield lifetime, stable combat log, XP and generic recoveryScene. Validate original V1/checksum before conversion, preserve identity/resources/RNG and save an original raw snapshot. No historical XP backfill; future levels/mastery remain gated work, not implied by displaying XP.
18. Resolve status ambiguities explicitly: offensive GROUNDED protects the target; enemy RESONANCE is a consumed vulnerability mark. VEIL lowers the affected actor's outgoing accuracy, not an evasion buff. New VEIL counts the immediate enemy phase; SEAR/SWIRL/ROOTED survive until their next relevant player action. Reapplication refreshes bounded duration. See BALANCE for timing.
19. WET+WIND's speed reduction is represented by skipping the current enemy phase in this single-actor model, with explicit Thai outcome log. This is a bounded implementation interpretation, not a hidden general speed system. Boss disables/immunity must be designed before B05 is enabled.
20. Add CH0404 training and CH0405 forest-clue handoff as authored workshop options, because canonical training/first fire recipe existed in the spec without implementation. The gift is one-time and must be consumed by real crafting; never give a fake learned spell or repeat resources. Existing scene and choice IDs unchanged.
21. Training uses the workshop and an explicitly provisional Pip sheet. Fix support VFX recipient, moving shadows and skip/tween cleanup now; do not count this as final art, a new unique enemy sprite, or all234 VFX acceptance.

## Session4 — 0.3.0 (2026-11-05 UTC)

22. Prioritize GS-007/008/009/010/033 because final art/depth/action identity is the current presentation gap. Add no new gameplay or save fields. Keep remaining chapter scenes/endings explicitly incomplete.
23. Generate independently layered original assets with local pixel drawing code, editable layouts/manifests and a distinct training creature. Preserve legacy originals as fallback. This supersedes decision21's temporary Pip reuse; it does not certify final HD art.
24. The renderer observes resolved states and commands; it never grants resources, changes RNG or invents outcomes. Animate the final battle on its old stage before committing/showing the new state. Token cancellation plus settle-once promises make skip/reduced/show cleanup deterministic.
25. Respect OS motion initially and when changed; reduced idle/ambient holds still. Disable actions until rendering is ready. Missing new-art files fall back to old originals with a Thai notice. Broader loading retry/offline support remains open.
26. Read-only renderer diagnostics support assertions of real poses/texture/layers, alongside actual UI actions and durable IndexedDB reads. No golden route gameplay writes or fake exposed game state. Visual assets stay provisional until full manual/device art gates pass.

27. Manual844×390 review caught an inherited grid/aspect-ratio preferred-width bug despite the old overflow test passing. Constrain short-landscape world to its grid width and remove its preferred ratio; preserve the canvas16:9 ratio inside. Add geometry assertions for canvas/scene/desk boundaries so hidden clipping cannot masquerade as responsive acceptance.


## Session5 —0.4.0(2026-11-05 UTC)

28. ChooseGS-009/011/022/026/029 after a clean0.3baseline. Deliver the bounded archive/stream loop; preserve first forest milestone and all older actions rather than claiming a complete chapter. Ruins/festival/boss remain a documented next slice.
29. Share declarative condition evaluation between UI/reducer; known-WIND story use must be actually discovered, while Lumi OR crafting opens the stream. Scene-target animation uses the known spell descriptor. Canon story use has no listedMPcost, so it is not billed as a battle cast.
30. S14's every exit unlocks archive_read/ruins_open; rare Echo/Ray/Linger grants and trust stay one-time. Q_STREAM_CLEAN bell choice grants canonical Water reward once; listening never resets a prior cleanup. New story facts fit existing bool flags/choices and need no new mandatory save fields.
31. Keep State2/DB1/envelope1; widen only current battle catalog/HP for B02. Preserve strict historicalV1battle rules. An explicit0.3V2 fixture stays byte-equivalent by field and stable B02 checked files round-trip. Forward releases load old saves; downgrade to an old game that lacks new scenes is not promised.
32. B02 HP52/power8/WIND+20% asSSOT. At<=26HP on even turns it announces a no-damage mist that applies playerVEIL for the next action. Lock this plan before the player moves; crossing the threshold cannot retroactively change a displayed intent. SEEK/BASIC stay reliable counters. Simulations and timing tests cover these rules.
33. Add original archive/stream3layers+fallbacks and distinct Eira/water-spirit silhouettes. Retain all old art; water6frames and fog/planter show actual cleanup. Prototype quality remains explicit; no finalHD orhardwareFPS certification.
34. Clue journal/hints and Eira/Maren lines depend only on witnessed flags/choices. OptionalAI still absent. Collapse only the two new hub locations under semantic“สถานที่อื่น”; preserve access to all existing primary choices. Record coordinates for the next ruins slice without advertising a nonfunctional travel button. Festival readiness/event staging is deferred until its real route exists.

35. Final review corrected story spell endpoints to authored scenery anchors rather than a companion's coordinates. WIND dispels bridge mist at330/150; archive study glows at manuscript240/142. Keep battle recipient rules unchanged and assert the observed WIND endpoint during the genuine skip path.

36. A genuine WATER-first route demonstrated that CH0205 must accept forest_open OR crafted_first, as SSOT specifies. Fix the former single-flag gate and preserve the shared UI/reducer check; add a failing-then-passing real-choice regression. Keep clearing stream mist and rescuing the bell as separate journal facts, tied to stream_clean versus CH1201.

## Session6 — 0.4.1

37. Complete pending GS-015/017 preview/filter/unequip before another large location slice. New materials in0.4 make recipe compatibility feedback useful. Reuse canonical legality/stats; do not change234 definitions or invent unknown names.
38. Unequip compacts remaining slots to preserve the published State2 array contract; permit zero spells because BASIC_PULSE/GUARD remain available. Recipes are never removed. Reject changes in battle and invalid slots. Filters remain ephemeral and do not mutate saves.

## Session7 —0.4.2

39. Latest owner adds an eight-phase Master Roadmap alongside continued art/Cinematic development. Single human-reviewed status dataset generates both full checklist and the old Task Board view. Preserve GS IDs as cross-references and historical status in Git/TEST_REPORT rather than competing boards or double-counting. Count DONE/tasks without partial credit; distinguish checklist progress from labor/game quality. Version1.0 scope remains chapter1 perSSOT; optionalAI/CH2/CH3 do not silently become launch requirements.
40. Select GS-041 and GS-010 as a bounded batch. Routes are authored presentation-only points, not open-world navigation, saved positions or new story rewards. Actual animation precedes the existing once-only transaction persistence. All state/DB/file versions and existing scene/choice/spell counts stay unchanged.
41. Real screenshots exposed a seating occlusion bug after automated assertions initially passed. Fix seat anchor/support-depth and hide ground shadow during seated rest; retain true foot-Y sorting elsewhere. Reviewed phone/desktop runtime after correction. Mark only bounded path director complete; whole art, four-direction sprite, NPC, camera and HD gates remain incomplete.
