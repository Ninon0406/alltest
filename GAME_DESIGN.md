# CODEX MASTER DIRECTIVE — REBORN GAME

**Current override (V7 / 0.12.0):** `docs/v7/REBORN_CODEX_V7_ALL_IN_ONE.md` and `docs/USER_DIRECTIVE_V7.md` supersede conflicting historical text. One Life remains memory-only. Infancy is care-based, choices are manual at precise calendar boundaries, and travel is chosen from the main scene. New V7 runs complete the actual seven ceremony stages manually; old condensed pacing remains for offline historical tests only. Thirty V7 forks (the first early-life cluster), including supervised school preparation and teenage callbacks, with real delayed consequences, shared eligibility, paid/free learning routes and support for later timed training/jobs are implemented. New runs additionally have inherited appearance-v2 (five traits, two parental profiles), 180 actual catalog PNGs, three age/body layers and five owned basic garments. ≥100 forks/endings, combat equipment/modifiers/shops, power growth and longevity remain future targets.

The live scene now derives a pure room context from actual GameState. During care before 36 months it shows a regional home; explicit pending indoor stories show a house/classroom; an active seven-stage ceremony shows its actual venue. Resolved/paused rituals and ambiguous conversations remain outdoors. Sixteen 320×160 interior files (15 original procedural regional rooms and one original AI Starfall hall) have dimensions, byte/pixel hashes and canonical node bindings. Sixty bindings share those sixteen images, adding no map nodes. Art selection cannot alter time, position, money, stamina, identity or decisions. Read-only map previews retain outside landmarks. A missing room image renders a matching local procedural fallback. Richer places and power-aware encounter mechanics remain future work.

You are the autonomous lead developer of REBORN: Chronicles of a Thousand Destinies.

Your job is to build a complete, playable, polished Thai-language fantasy isekai survival life-simulation RPG website in this GitHub repository.

Do not merely explain how to implement features. Create and modify the actual project files, run tests, fix errors, and maintain a working application.

## Core product vision

REBORN is a branching narrative RPG where the player is randomly reborn into an original fantasy world.

The player cannot select their birth circumstances. Their name, race, family, parents, wealth, background, initial attributes, talents, hidden potential, lifespan and rare abilities are determined by weighted random generation.

The player's decisions from childhood onward shape their personality, abilities, relationships, career, wealth, political influence, survival chances, and eventual ending.

The game must support ordinary peaceful lives as well as heroic, magical, royal, legendary and immortal paths.

All game text and user-facing interface labels must be in Thai.

## Technical architecture

Use:
- Vite
- Vanilla JavaScript with ES modules
- HTML5
- CSS3
- JSON or JavaScript data modules
- LocalStorage with versioned save schemas
- Vitest for unit tests
- Playwright for browser end-to-end tests when available

Do not require paid APIs or a backend.

Use deterministic seeded random generation for reproducible testing.

Use a modular architecture with separate engine, UI, story data, world simulation, character, combat, inventory, relationship and save modules.

Ensure compatibility with GitHub Pages, including correct base-path configuration.

## Game features

### Rebirth
- Dedicated rebirth screen
- Weighted birth rarity
- At least 100 possible names
- Extensive family and background combinations
- Random parents and household histories
- Independent talent and attribute rolls
- Hidden abilities
- Detailed Birth Record screen
- No manual character-stat selection

### Life simulation

Current pacing override: see the 0.5.0 section below. Opening-year choice counts in historical directives describe preserved optional content, not mandatory clicks.
- Start from birth
- Annual progression
- Age-appropriate childhood events
- 20 meaningful opening-year choices
- Multiple event chains each year
- Training, rest, work and travel
- Fatigue, morale, fear and stamina
- Persistent consequences
- Detailed yearly chronicles
- Lifespans determined by race and development
- Possible longevity, ascension and immortality
- Continued gameplay after major story arcs

### RPG progression
- At least 90 distinct power paths
- At least 60 career paths
- Skill trees
- Class recommendations at age 12
- Hybrid classes
- Training and mastery
- Equipment modifiers
- Rare hidden paths

### World systems
- Survival resources
- Economy
- Trading
- Crafting
- Exploration
- Turn-based combat
- Dungeons
- Boss encounters
- Equipment rarity
- Loot generation
- World factions
- Political influence
- Settlement development
- Changing historical eras

### Narrative
- Branching scene graph
- Conditional choices
- Persistent story flags
- Delayed consequences
- NPC memory
- 100 distinct important NPC profiles
- Friendship, rivalry, party recruitment and optional age-appropriate romantic relationships
- Multiple story resolutions
- At least 50 distinct endings
- Long-term target of at least 500 meaningful choice records

The world, characters, artwork and stories must be original.

## Visual direction

Use a detailed dark-fantasy pixel-art aesthetic.

Reference the attached UI screenshots when available.

Required visual elements:
- Pixel-art environments
- Character portraits and sprites
- RPG status bars
- Dark interface panels
- Gold selection borders
- Illustrated choice cards
- Inventory icons
- Combat interface
- Dungeon scenes
- Birth Record illustrations
- Life Chronicle
- Responsive mobile and desktop layouts

Prefer reusable pixel-art rendering components and locally stored assets.

Do not depend on external image services at runtime.

## Development strategy

This is a large game. Do not attempt to implement all content in one unverified change.

Build the complete product incrementally while keeping the repository runnable after every milestone.

Milestone 1: Project setup, game shell, navigation, responsive UI, tests.

Milestone 2: Rebirth generator, Birth Record, weighted random data.

Milestone 3: Life simulation, aging, childhood events, annual chronicle.

Milestone 4: Branching narrative engine and persistent consequences.

Milestone 5: RPG attributes, classes, professions, training.

Milestone 6: Survival, economy, inventory and crafting.

Milestone 7: Combat, exploration, dungeons and loot.

Milestone 8: NPCs, relationships and party management.

Milestone 9: World simulation, factions, long lifespans and endings.

Milestone 10: Expand story content, illustrations, balancing and polish.

Milestone 11: Automated playthrough testing and content validation.

Milestone 12: Production build and GitHub Pages deployment configuration.

## Quality rules

- Never delete working features to simplify a task.
- Never replace implemented mechanics with fake buttons.
- Never claim content exists if it is only planned.
- Never count duplicate choices as meaningful content.
- Every selectable action must have a real effect.
- Every scene transition must reference a valid scene.
- Save files must preserve character and world state.
- Keep existing saves compatible when practical.
- Add tests for important new mechanics.
- Test production builds after meaningful changes.
- Fix failures before marking milestones complete.
- Do not silently replace established game rules.
- Do not invent test results.

## Project documentation

Create and maintain these files:

- README.md — setup, testing and deployment
- AGENTS.md — development rules for future Codex tasks
- GAME_DESIGN.md — full game specification
- ROADMAP.md — milestones and progress
- CONTENT_MANIFEST.md — actual implemented content counts
- CHANGELOG.md — development history

Update the relevant documents after every completed milestone.

## Token and context efficiency

Read only the files necessary for each task.

Do not rewrite entire files unnecessarily.

Prefer targeted changes and reusable data structures.

Use tests and scripts to validate content counts instead of manually recounting everything.

Preserve important decisions in AGENTS.md and GAME_DESIGN.md so future Codex tasks can continue without requiring the full conversation history.

Avoid unnecessarily long explanations. Prioritize implementation, verification and concise progress reports.

## Autonomy

You are authorized to inspect files, create code, edit code, run local development commands, install ordinary project dependencies and execute tests within the configured environment.

Work through the current milestone and its required fixes without asking for confirmation at every small step.

Do not perform destructive repository operations, publish publicly, spend money, or modify unrelated resources without approval.

When a milestone is complete, summarize the implementation, tests and remaining work.

## Start now

Inspect the repository.

If it is empty, initialize the project.

Create the architecture and documentation.

Implement Milestone 1 completely.

Run the relevant checks and fix failures.

Prepare the result for review.

Do not stop after writing a plan. Deliver actual working files.
## Implementation status and retained rules

Milestones 1–2 are implemented. See CONTENT_MANIFEST.md for actual counts. Existing narrative choices, stat effects, gold requirements, age jumps, six endings and browser save/reset semantics remain in place. Legacy saves retain their original fixed character; fresh lives use weighted generation. Annual progression must be designed as a deliberate later migration, not inferred from the current day counter. Art direction is introduced with one original pixel landscape and a dark/gold responsive shell; full sprites, portraits and illustrated card art remain future work.

Architecture decision: extract working subsystems first; introduce world, inventory, combat and relationship modules together with tested real mechanics. Saved character strings must be rendered as text. Future save migrations must preserve character and world state and explicitly handle schema versions. Do not treat target counts above as implemented content.

## Milestone 2 decisions

Fresh lives start at age 0/day 1. The one-shot birth screen has no character, stat or seed selection. Generator version 1 uses an unsigned 32-bit seed with independent sequential rolls for rarity (70/23/6/1), race (60/20/15/5), attributes (9–15 each), talent, household, parents, history, location, potential (1–100), lifespan and rare ability. Rarity changes starting wealth, not stat floors. Each of four talents increases health, stamina or mana capacity immediately. Parents have distinct names and rolled occupations; they are not authored relationship NPC profiles.

Save schema 2 stores the original Birth Record plus hidden natural lifespan, potential and ability. The record is immutable even after training or spending gold; it is validated against the saved generator version/seed. Future generator versions must retain version-1 reproduction. Awakening and mortality mechanics are not implemented; hidden data is omitted from UI rather than cryptographically concealed. Existing unversioned/version-1 saves load without fabricating a random past. Their record explicitly states that original birth details are unavailable. Unreadable saves are preserved until replacement confirmation, and storage failures block starting an unsaved birth.

To avoid low-stat characters becoming stuck at the world crisis, a new unconditional retreat choice sacrifices up to 20 gold and 5 reputation and leads to the existing peaceful ending route. All 28 previous choice records remain unchanged. Annual time rules remain unchanged until Milestone 3.

## Revised directive and visual/publication stage

See docs/DEVELOPMENT_DIRECTIVE.md for the latest full priority order. Current work completes the live build repair and introduces the illustrated visual/portrait foundation; the full directive is not complete. Root index.html is now generated publication output; app.html preserves the original editable shell. Vite builds app.html and renames the output to dist/index.html. Stage-site copies compiled outputs for the existing main:/ Pages configuration because changing that setting is denied to the GitHub integration. Actions still publishes dist and now verifies CSS and actual gameplay after deployment.

Appearance version 1 is an additive schema-2 field outside the immutable birth record, so generator-version-1 births stay reproducible. Five bounded indices determine face, hair, hair color, eye color and skin. New births store identity immediately; old saves derive it deterministically without rerolling the character and persist it at the next save. Current renderer uses age, race, career and intelligence for visible layers; equipment, curses, scars and transformations await actual state/mechanics. No unsupported controls are exposed. New assets are original local artwork: one AI-generated moonlit village environment and a procedural SVG portrait system.

## Ultimate Directive v3 — authoritative override (0.3.0)

The complete new specification is docs/REBORN_CODEX_ULTIMATE_DIRECTIVE.md. It supersedes old weighted-archetype, forced-main-quest and age-jump directions. Default play is relaxed life/exploration; legacy world-crisis arcs remain optional.

Calendar: 360 days/year, four 90-day seasons, world year 1001 at absolute day zero. `time.absoluteDay - time.birthAbsoluteDay` determines age. Stored age/day/season exist for compatibility and are always recomputed. Action durations are visible; core infant events cover 36 days each, with the last interval bounded at birthday; one seeded safe household interruption is guaranteed per childhood year. Annual core events use 150-day intervals; a noncombat daily activity covers the remaining year. External travel cannot silently pass a required childhood birthday interruption. Chronicles close at birthdays, not per number of clicks.

Fresh birth generator 2 chooses one of 20 archetypes uniformly (5% each), then chooses uniformly among that archetype's frozen eligible birthplace pool. This does not imply globally equal region frequencies. Race, talent and hidden attributes retain their separate distributions. Generator 1 and its old rarity distribution remain for validation of old saves only. Both generator versions must stay reproducible; new map locations cannot alter `birth-origin-v2.json`.

Save schema 3 migrates old age/day into calendar time, retains the original character/appearance/birth/scene, clamps overflow and backs up raw input before migration. No past chronicles are invented. Writes are transactional at UI boundary: state is cloned/reduced, saved, then replaces live state. Replay tokens prevent stale duplicate purchases. Old chapters can pause/resume. Ending gallery survives explicit new-life reset; other life data is reset only after confirmation.

Map foundation: 20 authored nodes in five regions; age 4 local supervised journeys, age 12 inter-region journeys; route-based quotes and discovery, slower free walking fallback, local services and ledger. Bread buy price 2G/sell price 1G, supervised work 4G/day with stamina cost, free shared rest, once/location/year public study. Full market simulation, important NPCs, combat and actual awakening are not implemented. See NEXT_CODEX_TASK.md for precise boundaries and P2 continuation.

## Current authoritative progression slice — 0.4.0 (2026-10-29)

This section supersedes historical statements above saying awakening/careers are future work. The full Ultimate Directive remains the target, not a completion claim.

A free seven-stage ceremony begins from age 12: preparation, local journey, gathering, measurement, results, advice, goal. Venue is anchored to actual location and stored on the first action. Active ceremony travel is blocked; pausing allows ordinary activities/travel, resuming requires returning to the venue. Legacy arcs pause unfinished ceremonies rather than trapping travel. At measurement, each of 20 career families receives an archived score: weighted current attributes + capped childhood-memory contribution + capped training contribution + contextual archetype affinity + deterministic variation <1. Hidden powers, potential and natural lifespan stay hidden. Old characters may participate later without changing past history.

Readiness is current score ×85% + archived measurement ×15%; thresholds and attribute prerequisites filter actual career choices. Low results can be overcome by free practice. Farmer/nature care has no attribute floor after ceremony; generic community work remains available even if a ceremony is postponed. Career names do not determine eligibility or earnings: stable IDs/config do. The UI lists only currently eligible choices, while the searchable codex explains all 20 bases and 20 higher paths.

Practice uses 7 days, 15 stamina, +20 fatigue and -12 focus, with base XP 8 declining by repeated sessions in each 30-day calendar window to minimum 3; story perks, high measured affinity and an active promotion can improve XP. Every 20 practice XP raises its attribute by 1. Relevant active-family practice also earns family XP/mastery. Rest uses 2 days for stamina/mana/health/morale and fatigue/focus recovery; map shelter and ordinary rest also recover fatigue/focus. No mandatory fees. Work uses 7 days/15 stamina/+12 fatigue and earns profile salary plus story/promotion bonuses, with a real ledger entry and family XP. All actions preserve calendar and replay/save transaction guards.

Each family has three unique authored dilemmas (age minima 12/13/16). Precision choices improve training, community choices improve salary; both grow different attributes and family XP. Per-family progression survives switching. One promotion/family requires 18 years, 120 XP, 60 mastery, higher primary attribute and the three completed episodes. It permanently raises one resource capacity once; active promoted work/training gets profile bonuses. This is a first linear skill ladder, not the target 80 advanced/hybrid branches, combat ability tree, authored mentor network or God paths.

Schema 4 validates all progression references and preserves immutable birth generation, appearance, existing chapter, calendar, history, inventory and endings. Exact pre-v4 raw backup is retained without overwriting pre-v3 backup. Do not change generation-v1/v2 tables when expanding other game systems.

## Current authoritative pacing — 0.5.0 (2026-10-29)

The latest user request overrides the mandatory frequent two-choice format. Default play uses a persistent annual focus: balanced growth, play, family, rest, age-4 study/exploration and age-8 practice/work. Choose once and continue 1/2/5 years, or seek the next decision within ten years. Plans stop before a due major decision; birth-to-12 now has crossroads at ages 6, 10 and 12. Six original life crossroads (6/10/20/28/40/60) offer five actual outcomes each. Career dilemmas are spaced at ages 13/15/17 or later with at least two years between them; four strategies include two original outcomes, a real mentoring-style consultation effect (no authored NPC system claimed), or postponement for two years. At most one non-ceremony decision occurs per age. An age-12 ceremony approach resolves the remaining real seven stages once, preserves any archived score/venue and can be postponed.

The planner selects ordinary existing childhood responses using the chosen focus and labels them automatic in the journal. No pretend player decisions are recorded. It spends only remaining calendar days on real practice, wages, travel or recovery; fatigued workers/practitioners rest, community workers walk toward a usable job, exploration follows actual discovered routes. A partial year simulates only its remaining days. Repeated new routine logs and ledger transactions are compacted into honest annual summaries; previous manual history and story entries are retained. History cells show actual chronicles and explicitly do not predict lifespan. Reports retain the most recent 200 summaries; full journal/chronicle retention still needs long-life hardening.

The annual dashboard uses the existing navy/gold identity and local landscape/portraits, with age/time controls, focus cards, latest journal, real saved family details, location and a rolling 100-year grid. Optional autoplay runs one simulated year every 8/4/2/1 seconds at 1/2/4/8×; it stops for decisions, hidden page, another menu, reload and failed save. It is off by default and never advances time offline. Ordinary travel/services retain their calendar costs; detailed-reader birthday guards remain unchanged.

Schema 5 adds the validated annual plan/checkpoints/reports without resetting birth, time, chapters, progression or inventories. Exact pre-v5 raw input and existing pre-v4/pre-v3 backups remain downloadable. Old detailed narratives and all six endings remain available through optional reading. No natural mortality/extension/ascension is implemented by this pacing change. Reference scope and access limits are recorded in docs/PACING_REFERENCE.md.

## 0.6.0 — Phase A One Life One Run

The live character, birth RNG, world and story are memory-only. Birth waits for an explicit click; reload/new tab never restores a life. In-page navigation preserves the live run. Old save/backups remain untouched and are never read by runtime. Legacy ending gallery remains readable without writing it. Existing offline historical validators remain for reproducibility tests, not runtime restoration.

All ordinary and original chapter choices use the pure dispatcher and run-scoped revision token. Failed validation leaves state unchanged; success commits in memory. Ending closes the run against further gameplay actions. Only an actual authored terminal transition creates a compact summary (no RNG, active state, calendar, inventory, flags or resumable history). Archive writes use a browser lock where supported and deduplicate by runId. Retain at most 100 summaries and allow JSON export; archive errors retain the terminal screen and offer summary download/retry. Unfinished refresh/exit never creates an ending.

Real engagement timing counts visible intervals within 15 seconds of a trusted interaction; idle/autoplay-only waiting is excluded. Native unload warning is best effort; pagehide abandons memory and persisted pageshow returns to rebirth, not a revived run. Mobile tab eviction cannot preserve a life. Natural mortality, power-level progression, deity conditions and appearance-v2 inheritance are later phases, not implemented by this policy migration. Power in this checkpoint starts at 1; an old career promotion is not a power rank.

## 0.7.0 — Phase B compact single-surface UI

The active dashboard occupies the viewport. Age and initial power rank sit above small time controls; character vitals/details are compact on desktop and open as a sheet on narrow screens. Main scene contains the actual appearance-v1-based pixel actor and a seeded original tile composition for the current one of 20 map locations. The main focus card has three time buttons and one focus-picker button; the old 100-cell grid and tall routine log are absent from default view. Desktop dock shows the latest real summary/journal/family; mobile uses five bottom navigation controls and overflow.

`panels.js` owns one native dialog with explicit Tab wrapping, ESC, close, opener-focus return, background inert/scroll locking and retained modal scroll during real actions. Map, training/career, bag/bread shop, work, record, journal, options and rare major decisions stay in this document. Manual dismissal of a decision permits inspection elsewhere but cannot advance time; action validation still gates the crossroad. All panels pause automatic time, never resume it implicitly and never reset runId/resources. Options are memory-only and offer 100/112/125% text and reduced motion. Errors are also announced inside the modal.

The location renderer supplies 20 distinct procedural compositions/5 region palettes and map previews; the small full-body sprite uses existing v1 identity and age/race variation without invented owned weapons. This is partial visual preparation for C, not inherited appearance-v2 or its ≥20/group catalogs. `power.level=1` is a real initial run field; there is no XP curve, breakthrough or deity mechanic yet. A profession skill level is explicitly labelled separate from power. Natural lifespan, long projects and mortal conclusions remain Phase F.

The journal modal selects an actual recorded year and renders a bounded set of entries instead of thousands of history nodes. The underlying full long-life in-memory retention is still unfinished. All old narrative/awakening/career/map/economy data is retained. Content buttons and procedural scene views do not increase authored narrative counts.
