# Sunlit Memory Fantasy — prototype art bible

Source `scripts/generate-art.mjs`; regenerate with `npm run generate:art`. Palette warm jade/leaf/sun/cream, outlines deep slate, lavender/mint spell accents. Logical canvas 480×270; actors 32×48 with 6 original source frames each. Nearest-neighbor pixel art rendering. Village/garden/workshop/forest have separate transparent world stage over sky, actors, ground shadows and airborne motes.

Animations: actor idle cycles, player walk frames, interact/pick/cast/rest pose + tween. Action library is provisional; not the full 11 states and frame counts in SSOT. World transitions fade in. VFX uses elemental color, form layout, modifier transforms with bounded local particles; not yet verified distinct for all 234 recipes.

Art debt (visual gate NOT PASSED): trees/buildings/props are mostly baked into stage layer; true per-prop occlusion/parallax/lighting/tilemap required. Contact shadows need to follow moving actors; all humanoids currently share silhouette with distinct palette. Sprout/Pip share seed-creature base. Add uniquely authored NPC/enemy silhouettes, proper named cycles and terrain-rooted path anchors. No claim final HD art or finished boss assets.

Browser screenshots in test-results are evidence of the provisional runtime, not design mockups. Reviewed phone 360px capture: Thai text and primary buttons fit; game is visible; visual depth/detail remains below final spec.

## 0.2.0 presentation improvements

Ground shadows follow actors. Support ORB/RAIN/CHAIN/HEAL/GUARD particles target player; offensive particles target foe; split and pierce paths, limited reactions, and skippable cleanup retained. Canvas min-width fix keeps its flex item inside narrow landscape stage. Training uses workshop/Pip as provisional spirit. No new art sheet was authored; final scene depth/parallax/occlusion and distinct humanoid/enemy silhouettes remain debt. Screenshots fire-cast-phone.png and training-{390,820,1366}.png are actual browser evidence, not the six-representative-VFX/final HD gate.
