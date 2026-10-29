# REBORN V7 — precedence and implementation checkpoint

The current user explicitly adopts `docs/v7/REBORN_CODEX_V7_ALL_IN_ONE.md` and the related V7 pack. V7 overrides conflicting V6/annual/save instructions. Work continues from repository HEAD `e8af5f8`, not a new project. The pack was absent from that HEAD; the supplied canonical attachments are now preserved unchanged in `docs/v7/` (the duplicate all-in-one attachments were byte-identical).

## Current rules

- One Life, One Run remains memory-only. Refresh/new tab requires a fresh birth; no active storage, resume, import or save-schema upgrade. Only actual terminal summaries persist. Old keys and deterministic birth generator 1/2 records remain untouched.
- New `createRun` lives have `story.version=7`. Historical `generateBirth` simulations and offline save validators keep the previous pacing so their reproducibility remains testable. This is not a second persistence mode.
- Under 36 months: care-only routine, age in months, reactions and supervised play. No autonomous career/study/travel focus, adult stat or income rewards. School reading starts at six for V7; formal training stays at eight.
- Important choices are manual. New V7 rituals expose all seven existing stages with two distinct responses and postponement at each stage; measurement is still recorded once. Historical condensed rituals remain only for legacy/offline simulations.
- Fixed 30-day autoplay ticks; 1/2/4/8/16× changes wall-clock interval only. Progress shows actual days in the current life year. The shared scheduler stops plans and rejects any external action that would pass a pending/future decision. No offline/modal/hidden-tab time.
- Map is an information viewer. Main-page journey choices pay actual graph route costs, days and stamina, including free walking and cancellation. Routine exploration/work never silently relocates V7 lives. Combat/route risk by power is not implemented by this slice.
- Show up to eight actually eligible career recommendations. Other eligible careers stay selectable in the codex; no duplicate/fake recommendation cards.

## Implemented subset and data audit

Thirty executable V7 forks / 90 authored choices cover infancy through age 19. The original nine cover months 0, 3, 6, 12, 24, 36, 72, 96, 120; nine school forks cover months 48/60/84/90/108/114/126/132/138, and twelve cover the teen education/support chain. Twenty-seven adapt traceable source briefs, three are original follow-ups. Early voice/comfort/sharing/map/library choices alter later memory/relationships, and returning the purse unlocks a distinct community role. Eligibility is shared with the scheduler; unmet/expired enrollment cannot deadlock life. Scholarships reduce real fees, and capped guidance/network support only changes actual future training/job rewards. These are not 100 completed fork nodes. Existing optional detailed chapters and all six ending routes are retained; long legacy jumps now require resolving intervening decisions first.

The JSON pack contains 150 draft world locations, 100 NPC drafts, 120 career fork briefs, 123 life briefs, 200 tier titles (10 per career), 150 scene prompts, 20 interior prompts and 180 character-design entries. It contains no executable branch effects, full route/service requirements, pixel geometry or rendered image files. Its 150 location IDs do not match the canonical 20-node graph. Twenty final career hooks reference deity discoveries that do not exist yet. Keep drafts separate from playable counts and port coherent slices with actual effects and tests.

Twenty original 320×160 location PNGs are now baked from the existing location-specific pixel compositions, keyed to all canonical location IDs. The manifest verifies file signatures, dimensions and distinct SHA-256 pixel files. Production uses local files and has a procedural fallback. This completes the current 20-location file subset; the 150-location target remains. All 180 character catalogue entries now have actual local PNG counterparts, with separate byte/pixel/composition proof rather than draft-label counts. No paid image service is used.

## Still required

V7-3: first coherent 30-fork cluster across ages 0–19 complete; full expansion to at least 100 verified forks remains. V7-4 now implements new-run inherited appearance-v2, nine groups × 20 actual PNG variants plus three age/body layers, immutable parental trait provenance and five owned basic garments. Historical appearance/birth generation is unchanged. Final release evidence is in NEXT_CODEX_TASK. V7-5: richer landmarks/interiors and power-aware journeys. V7-6+: career affinity/training balance and earned titles, combat gear/shops/modifiers, power growth, economy/NPC/combat, lifespan and ≥1000-year deity gates, ≥100 reachable endings. Level remains honestly 1; do not claim those systems are done.
