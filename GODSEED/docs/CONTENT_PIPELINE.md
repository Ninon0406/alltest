# GODSEED content batches — implemented contracts and authoring checks

Current scope: chapter one / ARC01, 99 nodes, 273 choices. This is an authoring guide to the existing engine, not evidence that the remaining V6 chapters are implemented. `PIPE-002` remains in progress.

## Start with a finite experience

Describe the entry, an action the player can take, a consequence, and a return or conclusion before adding node counts. The Echo expedition in [echo-story.ts](../src/content/echo-story.ts) is the current example: prepare materials → inspect → fight or cooperate → share results → receive one reward. The Guardian batch in [guardian-story.ts](../src/content/guardian-story.ts) then demonstrates earned preparation, a three-phase boss, three chapter conclusions and a post-chapter return. No future ARC or full-game ending is declared playable until it exists.

Keep published scene, choice, item, recipe and NPC IDs stable. Add a deliberate compatibility plan before changing them. Preserve the existing 234 recipe IDs; a reference design is not a migration.

## Describe actual scenes and actions

- `StoryScene` needs an ID, Thai title/text, a registered stage, the principal NPC asset key, and choices. Use `staging.location` and a walkable **foot** anchor from the source map.
- Choice cues currently support `walk`, `talk`, `pick`, `cast`, and `rest`. Cinematic poses support the implemented interaction/talk/pick-up/cast/rest/water actions. Do not invent a pose and assume an animation exists.
- `cinematic.anchor` is where the character stands. `cinematic.effectTarget` names a separate visible object in `SceneDefinition.effectTargets`; it is not a walking destination. For example, `CHE_WATER_WIND` walks to `water_front` and targets `stream_branch` at the actual branch.
- Edit the source map, scenery placement and generator together. Coordinates come from our authored 480×270 map, not guessed reference-image pixels. Road links must clear solids using the actor's 10×4 foot box.
- From patch 0.12.1, `World.prepare` requests the scene's principal NPC asset in addition to stage/shared art. Keep that actor key registered in `art-assets.ts`. Do not put every NPC in the title/shared group to hide a missing dependency.

Concept references remain outside runtime assets. Generated layers, sprite sheets, foreground props and effects must have their own production files and provenance.

## Conditions, effects and one-time rewards

Conditions currently support `flag`, `notFlag`, `anyFlag`, `knownCore`, `pathStart`, and `trust`. The validator checks flag sources, NPC IDs and threshold bounds. `notFlag: song_restored` prevents a post-chapter visit from overwriting the chosen conclusion; `CHG_REVISIT` reads the existing conclusion instead. Future chapter contracts still need explicit engine work.

Choices describe effects; only reducers apply them. `flags`, `clearFlags`, `items`, `trust`, `spellCore`, `battle`, and time transitions must use the existing transactional path. AI/rendering must not grant rewards or edit progress.

For alternatives sharing one reward, give them the same `onceFlag`, and include that guard in each choice's `flags`. The engine checks the old guard before applying the new facts. Do not combine daily and one-time policies. Revisit tests must verify that materials, trust rewards and XP do not duplicate.

A battle choice's `next` is its **victory** destination. Starting a battle does not apply that destination's entry facts. Defeat and flee return through their own rules. A cooperative bypass needs its own completed action before receiving a resolution fact; it must not set a combat win or receive the first-win reward.

## Batch and quest ownership

[story.ts](../src/content/story.ts) exports the explicit batch contracts: chapter, ARC, owned node IDs, entries, exits and completion facts. Every compiled node must have exactly one owner. Do not let newly added narrative nodes silently fall into `CH1_FOUNDATIONS`; author their own batch membership.

The current contract accepts only `CHAPTER_1` / `ARC_01`. Opening ARC02 requires deliberate chapter and file-metadata compatibility work, not changing a label. `StoryScene.conclusion` explicitly distinguishes `chapter` from `game`. S24–26 are implemented chapter conclusions and still require an exit; validators and metrics never infer a game ending from an `_END_` ID. Current counts are three chapter conclusions and zero full-game endings.

Quest contracts in [quests.ts](../src/content/quests.ts) declare step scenes, allowed choices, prerequisites, completion facts and a shared reward guard. The journal derives status from those facts. Do not add a second independently saved quest state.

## Verify through real progress

Run the relevant unit tests and `npm run test:all`, then the browser cases appropriate to the change. A meaningful gameplay change also runs the repository's complete E2E suite.

For each batch, verify:

1. Reach entry and conclusion using actual `fresh/choose/craft/fight` reducers and earned materials. Structural reachability alone does not prove conditions are executable.
2. Inspect choices that change flags/resources/trust and the later scene that consumes that consequence. A state-delta count is not a count of distinct endings.
3. Walk to the authored anchor; inspect facing, feet, depth, object target and the displayed NPC. Compare normal, Skip and Reduced Motion without double commits.
4. Export a player-initiated file, **reload**, explicitly import it, and revisit the new scene. A warm texture cache hid the Eira dependency in 0.12.0.
5. Fail a required asset, confirm a visible degraded state, retry explicitly, and compare the exact RAM snapshot before/after. Failure must not prevent manual export.
6. Test native file round trips, malformed files, blank refresh, no persistent progress storage/upload, mobile viewport layouts and the repository URL subpath.
7. For desktop keyboard helpers, wait for an enabled control before `locator.press('Enter')`; focusing a disabled button does not queue a future click. A delayed shared-asset test covers cold startup. Keep normal phone casts visible and verify exact viewport return while Reduced Motion retains its reading position.
8. Record source SHA, actual results and screenshots. Regenerate the master roadmap from `docs/roadmap.json` and append the development log. Keep unverified hardware/quality gates open.

Bounded search witnesses prove only the paths actually replayed. Browser emulation is not physical Safari/Android or an FPS measurement. Keep private `.godseed` bytes in temporary local files; commit only test scripts, hashes and evidence metadata.

## Session25 — named learned recipes and finite mentor courses

A story demonstration can now require an exact existing recipe instead of any spell of the same core:

```ts
when: [{kind:'knownSpell', id:'SPELL_WATER_RING_HEAL'}],
spellId: 'SPELL_WATER_RING_HEAL',
target: 'scene',
cinematic: {anchor:'craft_front', pose:'cast', effectTarget:'cauldron'}
```

This does not teach the recipe; the player must actually discover it at the existing crafting UI first. The graph rejects unknown recipe references or a named action without its exact ownership condition. Node contracts retain the exact ID/profile. Bounded exploration additionally tries only named recipes currently requested by choices, avoiding a blind expansion of all recipe combinations. Keep existing core-only actions unchanged.

Use an authored effect target from the current map: Workshop cauldron derives from the actual mouth coordinate240,170. A `scene` target without a compatible anchor previously fell back to the NPC; the browser regression now checks both the exact profile and scene coordinate with visible particles. A standing packing station uses `kit_front` at forest139,239, while the existing sitting anchor keeps its original meaning.

The Alchemist quest is a worked example of source→filter→material→measure→actual recipe demonstration→certification→real training win→practical use→two costed conclusions. Completion is gated by the promised delivery check or actual teaching; a pause/recall is not completion. Add actual reducer witnesses for condition-dependent branches and native-file browser round trips before marking a larger ARC or Life Path complete.
