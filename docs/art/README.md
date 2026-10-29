# Original REBORN environment artwork

`family-room-source.png` was generated with the built-in image tool on 2026-10-29 for this project: an original pixel-style empty family room, amber lantern/wood/plants, dark central wall, no people/text or reference franchise. The original generated upload remains untouched in the execution workspace; this copy is the versioned source.

`public/art/family-room.webp` is an offline format-compressed derivative of the entire source, with its original dimensions preserved. Both formats represent one artwork, not two distinct art assets. `public/assets/sprites/manifest.json` records source/runtime hashes and provenance. Normal gameplay/builds do not call an image API.

Character geometry is original code in `src/ui/avatar/pixel-parts.js`. The 180 catalog parts and three age/body layers are procedural pixel artwork, not AI-generated sprites. V7 provided Thai catalogue labels are retained. Rebuild deliberately using `node scripts/generate-character-assets.mjs`; normal builds consume the committed files. Validate with `node scripts/verify-character-assets.mjs` and `node scripts/verify-character-composition.mjs`.

## Starfall hall and regional interiors — 0.12.0

`starfall-hall-source.png` is an original image generated with the built-in image tool on 2026-10-29: an empty calm 16-bit navy/gold ceremony hall with star banners, crystal dais and open foreground, no characters, text or franchise references. The original tool output remains untouched in the workspace; this copy preserves its bytes. `public/assets/scenes/interiors/starfall-ceremony.png` is a deliberate offline nearest-neighbor resampling to the common 320×160 scene size. Source/runtime are one AI artwork, not two. The scene manifest records source/runtime hashes and provenance. No build/gameplay image service is involved.

Fifteen other interior PNGs are original procedural geometry from `src/ui/interior-art.js`: house, classroom and ceremony room in each of five regional palettes/motifs. They are not AI artworks. Regenerate intentionally using `node scripts/generate-interior-assets.mjs`; inspect the result and validate with `node scripts/verify-interior-assets.mjs`. The generator uses local SVG/Canvas and the preserved AI source. The existing twenty outside scenes remain unchanged. A manifest binding is a reference to one of sixteen images, not a new location or distinct artwork.

## Equipment artwork (0.13.0)

Six new original procedural 64×80 transparent PNGs in `public/assets/sprites/garments/` are drawn by `src/ui/avatar/equipment-parts.js` and baked deliberately with `scripts/generate-equipment-assets.mjs`. They are authored pixel geometry, not AI output. Their manifest records byte and decoded-RGBA hashes, dimensions, ownership IDs, slots, source, license and the shared [32,77] body anchor. Source/staged copies do not add artwork counts. Runtime draws these layers only for actually owned/equipped items, over the unchanged inherited identity/family garments. `scripts/verify-equipment-assets.mjs` rejects missing/corrupt/duplicate/nontransparent files.
