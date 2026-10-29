# REBORN — Asset Production Implementation Notes

Asset JSON file `06_ASSET_SEED_MANIFEST.json` includes **150 location-specific image prompts**, **20 interior categories**, and **180 distinct layered-character design entries** across 9 groups of 20. These are targets/data, not generated pictures.

## Generation steps for Codex
1. Audit available image-generation tools. Do not assume one exists.
2. Generate actual small PNG/WebP files into `public/assets` using available original art generator or script producing pixel tiles programmatically. The game should never call a paid hosted model during gameplay.
3. For visual repeatability build tile composition from place-specific `landmark`, `kind`, palette and seed; each location has a fixed asset ID. Distinct image assets do not require all images to be hand-painted, but must be visually different, not just overlaid text.
4. Create 180 actual transparent PNG sprite parts (or a compatible optimized sprite atlas with 180 distinct rendered appearances) and validate each can be composed into full-body avatar with correct anchors.
5. Render parents from independent but related feature arrays and derive child appearance by seeded crossing; not all traits must match both parents; no race/skin-tone superiority.
6. Introduce ownership-aware gear overlays; item IDs must come from inventory/equipment, not scene appearance guesses.
7. Implement aura variants at least every 5 levels; visual effects can be procedural layers generated locally; provide reduced motion fallback.
8. Generate fallback and check no broken assets at GitHub Pages `/alltest/`.
9. Check actual screenshots for 320px/mobile and desktop, no pixel art occupying the whole screen.
10. Use original assets only; do not reproduce any protected scenes/characters/objects from named inspiration franchises.

## Grade acceptance
- Location scenes = 150 unique logical mapping, 150 files **if all 150 locations implemented**; otherwise report currently implemented portion and complete missing slices.
- At least 20 distinct **visible** designs per 9 group categories; mere labels/IDs without rendered pixels do not pass.
- Each interior category has at least one original local art, with appropriate location ID reference.
- Avatar placement anchored to same perspective between background scene and character.
- Display actual currently owned sword/shield/tool/clothing and correct level aura; do not display cosmetic gear as owned equipment.
