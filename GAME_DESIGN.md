# CODEX MASTER DIRECTIVE — REBORN GAME

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
