# Session18 — candidate0.8.0 / Workshop and real crafting

Base maina8512b7 (published0.7.2/source5c58122). Continue existing systems using reference08 and existing actor/loader primitives. No new project, scene/choice IDs, recipes, combat rules or progress storage.

## Delivered and verified

- `workshop-map.ts`:11foot anchors/10links/7solids. ExistingDijkstra/10×4footprint checks all routes. Lesson→tutor, pickup→toolbox, crafting→cauldron, leaving→exit. Data coordinates are authored on our map, not inferred as collision-ready from the concept.
- Eight original art-v11 PNG: three480×270layers, six-frame96×96cauldron, three-state56×40toolbox,64×48held-box poses,32×48north-brewing poses,21ingredient icons16×16. Existing62PNG unchanged; all70 reproduce byte-identically. New total64170bytes.
- Actual Core/Form/Mod icons rise into slots then fall into the simmering bowl; procedural VFX originate at the cauldron using the real recipe. Damage/reward calculation stays in the unchanged reducer. Other locations retain field crafting. Training uses its clear legacy room; new furniture is hidden.
- CH0402 lifts/lowers the toolbox, changes its state on workshop_help, and retains original reward/trust. S05 file imports derive safe canonical anchors from the existing choice history, without a new save schema. State2/File2 stays; GAME_VERSION0.8.0.
- Pending authored arrivals complete when explicitly skipping/reducing motion; cancellation clears ingredient sprites/tweens before committing once. No motion path is player-controlled.

## Actual gates

Unit134/Content2/Roadmap8/type/lint/build/manual-sourcegate/reference packingPASS. [Focus20/20](focused-browser.txt),3.2min: fiveviewports390×844,844×390,820×1180,1024×768,1366×768; recipe items/MP/loadout, lifting/trust, file state+anchors, skip/motion, stage fallback/retry and battle room. Preview two-recipes/native-picker/privacy PASS in preview-workshop.json. Full113/CI/public results are recorded after running in REPORT_TH.md/verification.json. No hardware/FPS/human-fun/finalHD acceptance.

Before0.7.2: [phone](before-workshop-390.png)/[desktop](before-workshop-1366.png). After: [room](workshop-room-390.png)/[mixing](workshop-mixing-390.png)/[lifting](workshop-lifting-390.png). Opened actual screenshots and reference08 for review. Different animation frames, not a pixel-diff baseline.

## Failures found and fixed

First targeted suite: new reward assertion treated absent trust as undefined+1=NaN; corrected absent to domain-zero without removing checks. Visual inspection caught incorrectly assumed atlas rows; now use directionalIdle manifest, plus head-pixel regression against original north/west cells. [Skip regression](skip-regression-before.txt) reproduced an actual mid-route stop(184,231) instead of tutor(291,212). Store validated pending arrival and complete it on explicit skip/motion cancellation; clean it on normal completion. The corrected20cases pass. Original14passing/5failing preliminary run is not reported as full success.

Roadmap stays21/76=27.6%: broad tasks incomplete, no added task just to raise percentages. Workshop structure/collision/emulated viewport subgates pass; final art/all interactions/fullchapter remain. Save011/012 andQA009 still blocked on actual hardware.
