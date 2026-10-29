import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {PNG} from 'pngjs';
import {locations} from '../src/world/locations.js';
import {roomKinds,interiorThemes,interiorId,storyRooms} from '../src/data/interiors.js';
import {storyEvents} from '../src/engine/development.js';
const hash=b=>createHash('sha256').update(b).digest('hex');
export async function verifyInteriorAssets(root='public'){
 const m=JSON.parse(await readFile(`${root}/assets/scenes/interiors/manifest.json`,'utf8')),ids=new Set(),pixels=new Set();
 if(m.version!==1||m.images.length!==16)throw Error('Missing interior definitions');
 for(const e of m.images){
  if(ids.has(e.id)||e.file!==`${e.id}.png`||!roomKinds[e.kind]||!interiorThemes[e.region])throw Error('Invalid interior mapping');
  const bytes=await readFile(`${root}/assets/scenes/interiors/${e.file}`),png=PNG.sync.read(bytes);
  if(png.width!==320||png.height!==160||e.width!==320||e.height!==160||hash(bytes)!==e.sha256||hash(png.data)!==e.pixelSha256||png.data.some((a,i)=>i%4===3&&a!==255))throw Error('Invalid interior PNG '+e.id);
  if(root==='public'&&e.sourcePath){if(e.sourcePath!=='docs/art/starfall-hall-source.png'||hash(await readFile(e.sourcePath))!==e.sourceSha256)throw Error('Invalid original hall artwork');}
  ids.add(e.id);pixels.add(e.pixelSha256);
 }
 if(pixels.size!==16||Object.keys(m.bindings).length!==Object.keys(locations).length)throw Error('Missing/duplicate interiors');
 const used=new Set();for(const l of Object.values(locations))for(const kind of Object.keys(roomKinds)){const id=m.bindings[l.id]?.[kind];if(id!==interiorId(l,kind)||!ids.has(id))throw Error('Invalid node binding');used.add(id);}
 if(used.size!==16||Object.keys(storyRooms).length!==storyEvents.length||storyEvents.some(e=>!['outdoor',...Object.keys(roomKinds)].includes(storyRooms[e.id])))throw Error('Incomplete story context mapping');
 return {interiorPngFiles:16,proceduralArtworks:15,aiHallArtworks:1,canonicalNodes:20,nodeRoomBindings:60,width:320,height:160};
}
if(process.argv[1]?.endsWith('verify-interior-assets.mjs'))console.log(JSON.stringify(await verifyInteriorAssets(process.argv[2]),null,2));
