import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {locations} from '../src/world/locations.js';
export async function verifySceneAssets(root='public/assets/scenes'){
 const manifest=JSON.parse(await readFile(`${root}/manifest.json`,'utf8')),ids=new Set(),hashes=new Set();
 for(const image of manifest.images){
  if(!locations[image.locationId]||image.file!==`${image.locationId}.png`||ids.has(image.locationId))throw Error('Invalid scene mapping');
  const bytes=await readFile(`${root}/${image.file}`),hash=createHash('sha256').update(bytes).digest('hex');
  if(bytes.toString('hex',0,8)!=='89504e470d0a1a0a'||bytes.readUInt32BE(16)!==320||bytes.readUInt32BE(20)!==160||hash!==image.sha256)throw Error(`Invalid PNG ${image.file}`);
  ids.add(image.locationId);hashes.add(hash);
 }
 if(ids.size!==Object.keys(locations).length||hashes.size!==ids.size)throw Error('Missing or duplicate scene pixels');
 return {locationPngFiles:ids.size,uniquePixelHashes:hashes.size,width:320,height:160};
}
if(process.argv[1]?.endsWith('verify-assets.mjs'))console.log(JSON.stringify(await verifySceneAssets(process.argv[2]),null,2));
