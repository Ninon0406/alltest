# Sunlit Memory Fantasy — prototype art bible

Source `scripts/generate-art.mjs`; regenerate with `npm run generate:art`. Palette warm jade/leaf/sun/cream, outlines deep slate, lavender/mint spell accents. Logical canvas 480×270; actors 32×48 with 6 original source frames each. Nearest-neighbor pixel art rendering. Village/garden/workshop/forest have separate transparent world stage over sky, actors, ground shadows and airborne motes.

Animations: actor idle cycles, player walk frames, interact/pick/cast/rest pose + tween. Action library is provisional; not the full 11 states and frame counts in SSOT. World transitions fade in. VFX uses elemental color, form layout, modifier transforms with bounded local particles; not yet verified distinct for all 234 recipes.

Art debt (visual gate NOT PASSED): trees/buildings/props are mostly baked into stage layer; true per-prop occlusion/parallax/lighting/tilemap required. Contact shadows need to follow moving actors; all humanoids currently share silhouette with distinct palette. Sprout/Pip share seed-creature base. Add uniquely authored NPC/enemy silhouettes, proper named cycles and terrain-rooted path anchors. No claim final HD art or finished boss assets.

Browser screenshots in test-results are evidence of the provisional runtime, not design mockups. Reviewed phone 360px capture: Thai text and primary buttons fit; game is visible; visual depth/detail remains below final spec.

## 0.2.0 presentation improvements

Ground shadows follow actors. Support ORB/RAIN/CHAIN/HEAL/GUARD particles target player; offensive particles target foe; split and pierce paths, limited reactions, and skippable cleanup retained. Canvas min-width fix keeps its flex item inside narrow landscape stage. Training uses workshop/Pip as provisional spirit. No new art sheet was authored; final scene depth/parallax/occlusion and distinct humanoid/enemy silhouettes remain debt. Screenshots fire-cast-phone.png and training-{390,820,1366}.png are actual browser evidence, not the six-representative-VFX/final HD gate.

## 0.3.0 — layered original studies

Sources: retained `generate-art.mjs` plus `generate-stage-art.mjs`/`generate-actor-art.mjs`; `npm run generate:art` reproduces all27 public PNGs byte-for-byte. New16 PNGs total about256KiB on disk. Layers are480×270; props eight64×96 cells; ambient sixteen32×32 cells. Alpha cells and animation ranges are validated; textures remain nearest-neighbor with integer rendering.

Village cottages/belltower, flower-garden arch, timber workshop/forge and forest shrine have independent rear/ground/front layers.20 placed props and21 ambient instances add depth; character foot y+20 determines occlusion/shadow. Subtle rear/front parallax moves behind/around the anchored actor lane. World memory adds a banner/planter/rune only after real relevant flags. Props are scenery rather than new touch targets.

Hero256×528 atlas,32×48 cells,8 columns:11 named cycles with56 used frames; unused cells transparent. Foot row44 anchors to world y+20. Original training256×144 atlas has13 used frames: idle/attack/hit; copper/cream lantern ceramic silhouette differs from Pip. Four legacy NPC sheets and Sprout still need individual silhouettes and full action cycles. Run is supplied in the manifest but no new run choice is invented.

Actual runtime screenshots: visual-{village,garden,workshop}-{390,820,1366}.png and visual-training-{390,820,1366}.png, plus forest loops and cast evidence. They document prototype improvement, not final HD acceptance. Reduced motion holds idle poses/ambient and uses brief bounded transitions; skip removes transient particles and cancels stale animation work. Final lighting, NPC cohesion, terrain polish, VFX6 representative/all234 distinctness and physical-device performance remain open.

Portrait HUD now flows below the canvas rather than covering actor feet; bounds are asserted on phone/iPad art routes. Desktop/short landscape layout retains its existing controls.
