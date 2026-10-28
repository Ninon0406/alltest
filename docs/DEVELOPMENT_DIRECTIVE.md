# REBORN — FULL AUTONOMOUS GAME DEVELOPMENT DIRECTIVE

Repository: Ninon0406/alltest

Production website: https://ninon0406.github.io/alltest/

You are the Principal Game Engineer, Technical Director, Narrative Designer, UI/UX Director, and Quality Assurance Lead responsible for turning this existing repository into a complete, polished, playable fantasy RPG website.

IMPORTANT: The existing game is already published, but the production screenshot shows an almost completely unstyled HTML page. This is unacceptable and must be fixed first.

You are authorized to perform all ordinary development tasks necessary to complete the project, including creating and modifying files, installing development dependencies, running tests, building production assets, fixing deployment workflows, committing changes and preparing deployment.

Do not delete the existing project or abandon its current architecture.

Do not stop after providing a plan or an incomplete prototype.

Work through the specifications below in priority order, within the execution time and resource limits of your environment.

When a task cannot be completed within a single execution, leave the repository in a working state, update the remaining task list, and provide a precise continuation point.

# PRIORITY 0 — FIX THE LIVE WEBSITE

Before adding new gameplay systems:

1. Inspect the current repository structure and GitHub Pages workflow.
2. Identify why the published site appears to have no CSS.
3. Verify the Vite build configuration.
4. Verify the generated dist/index.html includes correct CSS and JavaScript asset references.
5. Verify the GitHub Pages deployment uploads the dist directory rather than raw source files.
6. Check the base path for /alltest/.
7. Check browser console errors and failed network requests.
8. Confirm that JavaScript loads and initializes properly.
9. Confirm that the rebirth screen works.
10. Check desktop and mobile layouts.
11. Run an actual browser test of the production build.
12. If the public website cannot be reached from the execution environment, say so explicitly and do not claim it was visually verified.

Do not proceed until the locally tested production build renders correctly.

The final website must not look like an unstyled collection of default browser buttons and paragraphs.

# PRIORITY 1 — REBUILD THE VISUAL EXPERIENCE

Create a polished, modern 2D fantasy RPG visual identity.

The visual style should combine:
- Japanese fantasy RPG character illustration
- Detailed anime-inspired fantasy portraits
- Dark fantasy interface
- Elegant gold and dark-blue UI
- Illustrated environments
- High-quality item cards
- Smooth transitions and animations
- Clear typography with Thai font support
- Responsive mobile and desktop layouts

Do not use emoji as the primary character portraits or illustrations.

Create a complete visual component system with reusable UI elements.

Required screens:

1. Main Menu
2. Rebirth Chamber
3. Birth Record
4. Character Dashboard
5. Life Story
6. Annual Chronicle
7. Training Screen
8. Skill Tree
9. Career Screen
10. World Map
11. Exploration
12. Dungeon
13. Combat
14. Inventory
15. Equipment
16. Party Management
17. Relationships
18. Family History
19. Codex
20. Ending Gallery

Use a coherent visual design for every screen.

# PRIORITY 2 — DYNAMIC CHARACTER PORTRAIT SYSTEM

Replace the current emoji character representation with a detailed illustrated character system.

The character's appearance must be determined by the actual GameState.

Generate and store a stable visual identity for every character at birth.

Visual properties include:

- Face shape
- Hairstyle
- Hair color
- Eye color
- Skin tone
- Race-specific features
- Age appearance
- Body silhouette
- Clothing
- Armor
- Weapons
- Accessories
- Scars or story-related visual marks when appropriate
- Magical aura
- Elemental effects
- Bloodline characteristics
- Transformation states
- Profession appearance
- Legendary equipment
- Divine or demonic transformations

The same character must remain recognizable throughout the entire playthrough.

Changing equipment must not randomly replace the character's face.

A character who becomes older must visibly age when appropriate.

A character who becomes a legendary mage should display different clothing, equipment and magical effects than the same character as an ordinary village apprentice.

## Rendering architecture

Implement a deterministic layered avatar renderer.

Recommended layers:

1. Background
2. Body
3. Face
4. Eyes
5. Hair
6. Race features
7. Base clothing
8. Armor
9. Weapon
10. Accessories
11. Aura
12. Special transformation effects

The renderer must work entirely in the browser without paid APIs.

Use original local SVG, Canvas or layered image assets.

If AI-generated artwork tools are available in the development environment, use them to create original portrait bases, environments and equipment illustrations, and commit the resulting assets to the repository.

If an image-generation service is not available, do not pretend AI images were generated. Implement high-quality local SVG/Canvas artwork and provide an asset generation plan for later upgrades.

Do not expose API keys or require a secret paid image-generation API in public frontend code.

## Dynamic visual updates

Re-render character appearance when:
- Character ages
- Equipment changes
- A new class is unlocked
- A major transformation occurs
- A rare bloodline awakens
- A special curse is activated
- A legendary weapon is equipped
- Character status changes
- A story event permanently changes appearance

Optimize rendering to prevent lag.

Save all appearance properties and ensure they remain stable after loading the game.

# PRIORITY 3 — COMPLETE REBIRTH SYSTEM

Preserve the existing seeded birth generation and expand it.

Required systems:

- 500 possible first names or more
- Multiple surname pools
- 50+ family background types
- 50+ lineage and heritage variations
- 50+ origin characteristics
- Parental profiles
- Family wealth
- Social status
- Family history
- Hidden secrets
- Talent rarity
- Magical affinity
- Physical potential
- Intelligence
- Learning capacity
- Lifespan
- Hidden powers
- Bloodline abilities
- Rare mutations
- Curses and blessings

Use weighted probability.

Ordinary births must be significantly more common than legendary births.

Players cannot freely choose their starting stats.

Display the complete Birth Record before beginning life.

# PRIORITY 4 — FULL LIFE SIMULATION

Implement continuous life progression beginning at birth.

The game must support:
- Infancy
- Childhood
- Adolescence
- Adulthood
- Middle age
- Old age
- Long-lived races
- Supernatural longevity
- Immortality

Age 12 is a major class-development milestone, not the end of the game.

The player must be able to live a normal peaceful life without being forced into combat.

Each year must contain meaningful activities, story events and a chronicle.

The first year must offer approximately 20 meaningful age-appropriate choices.

From subsequent childhood years onward, provide 5–7 meaningful major choices at important decision points, plus branching subevents where appropriate.

Characters must be able to train, study, work, explore and develop over time.

Consequences from childhood must affect later life.

Implement a detailed annual event log based on actual gameplay.

# PRIORITY 5 — RPG SYSTEMS

Implement:

- 90+ distinct power paths
- 60+ professions
- Training
- Experience and mastery
- Equipment
- Skills
- Survival
- Fatigue
- Morale
- Fear
- Recovery
- Economy
- Crafting
- Traveling
- Exploration
- Turn-based combat
- Dungeons
- Boss battles
- Loot
- Legendary equipment
- Quests
- Reputation
- Political power
- Factions
- Settlement development

Every mechanic must interact with GameState.

Avoid placeholder systems that only display text.

# PRIORITY 6 — NPCs, PARTY AND RELATIONSHIPS

Create at least 100 distinct important NPC profiles.

Each NPC needs:
- Identity
- Background
- Family
- Personality
- Talents
- Career
- Goals
- Relationships
- Personal story events
- Encounter conditions
- Growth over time

Support:
- Friends
- Rivals
- Mentors
- Companions
- Party recruitment
- Family relationships
- Optional age-appropriate romantic relationships
- Marriage and family storylines for adult characters
- Relationship consequences

NPCs must retain memories of significant player choices.

# PRIORITY 7 — LONG-TERM NARRATIVE

Build a branching narrative engine supporting:
- 500+ meaningful choice records
- Conditional events
- Character flags
- Delayed consequences
- Rare paths
- Ordinary-life endings
- Heroic endings
- Royal endings
- Villainous endings
- Legendary endings
- Divine endings
- Immortal paths

Implement at least 50 genuinely distinct endings.

Do not pad content counts with duplicates or meaningless choices.

The game must remain playable after resolving a major story arc if the character is still alive and has not entered a final ending.

# PRIORITY 8 — GAME QUALITY

Implement automated validation for:

- Broken scene references
- Duplicate IDs
- Invalid choices
- Unreachable events
- Missing assets
- Broken save files
- Save migration
- Invalid character stats
- Inventory updates
- Equipment effects
- Combat outcomes
- Aging and lifespan
- NPC relationship changes
- Birth probability distribution
- Ending conditions

Simulate complete playthroughs for ordinary characters and rare characters.

Test both short and long-lived playthroughs.

Check performance and mobile compatibility.

# PRIORITY 9 — PRODUCTION DEPLOYMENT

Build for GitHub Pages at:

https://ninon0406.github.io/alltest/

Verify:
- Correct Vite base path
- Correct generated assets
- CSS loading
- JavaScript loading
- No runtime exceptions
- Working navigation
- Working Save/Load
- Working game interactions
- Responsive layout
- No broken image references

When deployment permissions permit, deploy successfully.

Then verify the live website using an actual browser or HTTP checks.

Do not claim successful verification if the environment cannot access the live website.

# AUTONOMOUS DEVELOPMENT RULES

Do not ask me for confirmation for ordinary file edits, refactoring, testing, dependency installation, commits or fixes within this repository.

You may organize development into as many implementation stages as needed.

You must work on actual files rather than outputting theoretical implementation instructions.

Maintain these files:
- AGENTS.md
- GAME_DESIGN.md
- ROADMAP.md
- CONTENT_MANIFEST.md
- CHANGELOG.md

Update progress after each completed stage.

Do not overwrite valuable working systems.

Do not delete unrelated files.

Do not use paid APIs, purchase services, expose secrets or change unrelated repositories.

For operations that your environment requires explicit approval for, request it rather than bypassing permission controls.

# COMPLETION STANDARD

The project is considered complete only when:

1. The production site renders with the intended fantasy RPG styling.
2. The game can be played from rebirth through a full lifespan.
3. The dynamic character portrait system works.
4. Major gameplay systems are interconnected.
5. The required content counts are implemented and verified.
6. Automated tests pass.
7. Save and Load work.
8. The production build succeeds.
9. GitHub Pages deploys successfully.
10. The published game can be verified to function correctly.

Never claim 100% completion based only on a successful build.

# BEGIN

Inspect the existing repository.

Fix the currently broken-looking production website first.

Implement the dynamic illustrated character system.

Continue the incomplete milestones according to dependency order.

Preserve every functioning feature.

Deliver actual code, verified tests, and deployment changes.

Do not stop at planning alone.