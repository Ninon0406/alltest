// Offline authored pixel rooms and one AI hall, tied to canonical node bindings.
import {chromium} from '@playwright/test';
import {existsSync} from 'node:fs';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {PNG} from 'pngjs';
import {interiorThemes,roomKinds,interiorId} from '../src/data/interiors.js';
import {locations} from '../src/world/locations.js';
import {interiorArt} from '../src/ui/interior-art.js';
const hash=b=>createHash('sha256').update(b).digest('hex');
const directory='public/assets/scenes/interiors';await mkdir(directory,{recursive:true});
const definitions=Object.entries(interiorThemes).flatMap(([region,t])=>Object.keys(roomKinds).map(kind=>({id:`${t.id}-${kind}`,region,kind,url:'data:image/svg+xml;base64,'+Buffer.from(interiorArt(region,kind)).toString('base64'),source:'Original procedural pixel art, src/ui/interior-art.js'})));
const original=await readFile('docs/art/starfall-hall-source.png');
definitions.push({id:'starfall-ceremony',region:'เซเลสเทีย',kind:'ceremony',url:'data:image/png;base64,'+original.toString('base64'),source:'Original AI-generated Starfall hall, 2026-10-29',sourcePath:'docs/art/starfall-hall-source.png',sourceSha256:hash(original)});
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||(existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined),args:['--no-sandbox']});
try{
 const page=await browser.newPage(),encoded=await page.evaluate(async defs=>{
  const canvas=document.createElement('canvas');canvas.width=320;canvas.height=160;const ctx=canvas.getContext('2d');ctx.imageSmoothingEnabled=false;const output=[];
  for(const d of defs){const img=new Image();img.src=d.url;await img.decode();ctx.clearRect(0,0,320,160);ctx.drawImage(img,0,0,320,160);output.push(canvas.toDataURL('image/png').split(',')[1]);}return output;
 },definitions);
 const images=[];
 for(let i=0;i<definitions.length;i++){
  const {url,...d}=definitions[i],bytes=Buffer.from(encoded[i],'base64'),png=PNG.sync.read(bytes);await writeFile(`${directory}/${d.id}.png`,bytes);
  images.push({...d,file:`${d.id}.png`,width:320,height:160,sha256:hash(bytes),pixelSha256:hash(png.data),license:'Original project artwork'});
 }
 const bindings=Object.fromEntries(Object.values(locations).map(l=>[l.id,Object.fromEntries(Object.keys(roomKinds).map(kind=>[kind,interiorId(l,kind)]))]));
 await writeFile(`${directory}/manifest.json`,JSON.stringify({version:1,images,bindings},null,2)+'\n');console.log(`Generated ${images.length} real interior PNGs, bound to ${Object.keys(bindings).length} canonical nodes`);
}finally{await browser.close();}
