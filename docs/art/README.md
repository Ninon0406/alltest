# Original REBORN family artwork

`family-room-source.png` was generated with the built-in image tool on 2026-10-29 for this project: an original pixel-style empty family room, amber lantern/wood/plants, dark central wall, no people/text or reference franchise. The original generated upload remains untouched in the execution workspace; this copy is the versioned source.

`public/art/family-room.webp` is an offline format-compressed derivative of the entire source, with its original dimensions preserved. Both formats represent one artwork, not two distinct art assets. `public/assets/sprites/manifest.json` records source/runtime hashes and provenance. Normal gameplay/builds do not call an image API.

Character geometry is original code in `src/ui/avatar/pixel-parts.js`. The 180 catalog parts and three age/body layers are procedural pixel artwork, not AI-generated sprites. V7 provided Thai catalogue labels are retained. Rebuild deliberately using `node scripts/generate-character-assets.mjs`; normal builds consume the committed files. Validate with `node scripts/verify-character-assets.mjs` and `node scripts/verify-character-composition.mjs`.
