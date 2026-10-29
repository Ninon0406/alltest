// Deterministic authored pixel parts. Normal builds consume committed PNGs.
import {chromium} from '@playwright/test';
import {existsSync} from 'node:fs';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {dirname} from 'node:path';
import {createHash} from 'node:crypto';
import {PNG} from 'pngjs';
import {appearanceCatalog} from '../src/data/appearance-v2.js';
import {partSvg,supportSvg,pixelSize} from '../src/ui/avatar/pixel-parts.js';
const hash=b=>createHash('sha256').update(b).digest('hex');
const definitions=[...appearanceCatalog.map(v=>({...v,svg:partSvg(v.group,Number(v.id.slice(-2))-1)})),...['body','infant-wrap','infant-hair'].map(id=>({id,group:'support',path:`assets/sprites/characters/${id}.png`,svg:supportSvg(id)}))];
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||(existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined),args:['--no-sandbox']});
try{
 const page=await browser.newPage();
 const rendered=await page.evaluate(async defs=>{
  const canvas=document.createElement('canvas');canvas.width=64;canvas.height=80;const ctx=canvas.getContext('2d');ctx.imageSmoothingEnabled=false;const files=[];
  for(const d of defs){const image=new Image();image.src='data:image/svg+xml;base64,'+btoa(d.svg);await image.decode();ctx.clearRect(0,0,64,80);ctx.drawImage(image,0,0);files.push(canvas.toDataURL('image/png').split(',')[1]);}
  return files;
 },definitions);
 const files=[];
 for(let i=0;i<definitions.length;i++){
  const {svg,...d}=definitions[i],bytes=Buffer.from(rendered[i],'base64'),png=PNG.sync.read(bytes),path='public/'+d.path;await mkdir(dirname(path),{recursive:true});await writeFile(path,bytes);
  files.push({...d,...pixelSize,sha256:hash(bytes),pixelSha256:hash(png.data),bytes:bytes.length,license:'Original project artwork',source:'src/ui/avatar/pixel-parts.js'});
 }
 const original=await readFile('docs/art/family-room-source.png'),size=PNG.sync.read(original);
 // Asset format compression only; preserve the original artwork and its dimensions.
 const webp=await page.evaluate(async data=>{const img=new Image();img.src='data:image/png;base64,'+data;await img.decode();const canvas=document.createElement('canvas');canvas.width=img.naturalWidth;canvas.height=img.naturalHeight;canvas.getContext('2d').drawImage(img,0,0);return canvas.toDataURL('image/webp',.8).split(',')[1];},original.toString('base64'));
 const background=Buffer.from(webp,'base64');await writeFile('public/art/family-room.webp',background);
 await writeFile('public/assets/sprites/manifest.json',JSON.stringify({version:2,...pixelSize,kind:'authored procedural parts',files,background:{path:'art/family-room.webp',width:size.width,height:size.height,sha256:hash(background),bytes:background.length,sourcePath:'docs/art/family-room-source.png',sourceSha256:hash(original),source:'Original AI-generated family room, 2026-10-29',license:'Original project artwork'}},null,2)+'\n');
 console.log(`Generated ${files.length} transparent PNGs: 180 catalog variants + 3 age/body layers; one AI family background`);
}finally{await browser.close();}
