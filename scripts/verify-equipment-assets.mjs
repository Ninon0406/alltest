import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
import {PNG} from 'pngjs';
import {equipmentItems,equipmentById,equipmentShops,equipmentSlots} from '../src/data/equipment.js';
import {locations} from '../src/world/locations.js';
const hash=data=>createHash('sha256').update(data).digest('hex');
export async function verifyEquipmentAssets(root='public'){
 const m=JSON.parse(await readFile(`${root}/assets/sprites/garments/manifest.json`,'utf8')),seen=new Set(),ids=new Set();
 assert.equal(m.version,1);assert.equal(m.files.length,equipmentItems.length);
 for(const file of m.files){
  const item=equipmentById[file.id];assert(item&&!ids.has(file.id));ids.add(file.id);assert.equal(file.path,item.path);assert.equal(file.slot,item.slot);assert(equipmentSlots[item.slot]);assert.deepEqual(file.anchor,[32,77]);assert.equal(file.width,64);assert.equal(file.height,80);assert.equal(file.source,'src/ui/avatar/equipment-parts.js');assert.equal(file.license,'Original project artwork');
  const data=await readFile(`${root}/${file.path}`),png=PNG.sync.read(data);assert.equal(data.length,file.bytes);assert.equal(hash(data),file.sha256);assert.equal(hash(png.data),file.pixelSha256);assert.equal(png.width,64);assert.equal(png.height,80);
  let opaque=0,transparent=0;for(let i=3;i<png.data.length;i+=4){assert([0,255].includes(png.data[i]));png.data[i]?opaque++:transparent++;}assert(opaque>50&&transparent>3000);assert(!seen.has(file.pixelSha256));seen.add(file.pixelSha256);
 }
 for(const item of equipmentItems){assert(Number.isSafeInteger(item.price)&&item.price>0);assert(item.minAge>=8);assert(Object.values(equipmentShops).some(ids=>ids.includes(item.id)));}
 for(const [node,stock]of Object.entries(equipmentShops)){assert(locations[node]);assert.equal(new Set(stock).size,stock.length);assert(stock.every(id=>ids.has(id)));}
 return {ownedEquipmentDesigns:ids.size,transparentPngs:seen.size,canonicalShops:Object.keys(equipmentShops).length};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href)console.log(JSON.stringify(await verifyEquipmentAssets(process.argv[2]??'public')));
