// Graphics fixtures only: no claim of advancing a gameplay life by changing age.
import {chromium} from '@playwright/test';
import {existsSync} from 'node:fs';
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {PNG} from 'pngjs';
import {createRun} from '../src/engine/run.js';
import {groups,traitGroups} from '../src/data/appearance-v2.js';
import {pixelAvatar} from '../src/ui/avatar/pixel-avatar.js';
const manifest=JSON.parse(await readFile('public/assets/sprites/manifest.json','utf8')),embedded=new Map();
for(const file of manifest.files)embedded.set('/'+file.path,'data:image/png;base64,'+(await readFile('public/'+file.path)).toString('base64'));
const fixtures=[];
for(const group of Object.keys(groups))for(let i=0;i<20;i++){
 const s=createRun(8,{id:'graphics-fixture',startedAt:'2026-10-29T00:00:00Z'});s.age=18;
 for(const key of Object.keys(traitGroups)){s.appearance[key]=0;s.appearance.parents.mother[key]=0;s.appearance.parents.father[key]=0;s.appearance.inheritance[key]={from:'mother',variation:false};}
 const key=Object.keys(traitGroups).find(k=>traitGroups[k]===group);
 if(key){s.appearance[key]=i;s.appearance.parents.mother[key]=i;}
 const pick=g=>groups[g][g===group?i:0].id;
 s.wardrobe={version:1,origin:'family',owned:[pick('upper'),groups.upper[(group==='upper'?i+1:1)%20].id,pick('pants'),pick('shoes'),pick('hats')],equipped:{upper:pick('upper'),pants:pick('pants'),shoes:pick('shoes'),hats:group==='hats'?pick('hats'):null}};
 let svg=pixelAvatar(s,{context:'fixture'});for(const [path,data]of embedded)svg=svg.replaceAll(`href="${path}"`,`href="${data}"`);fixtures.push({group,index:i,svg});
}
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||(existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined),args:['--no-sandbox']});
try{
 const page=await browser.newPage();
 const result=await page.evaluate(async fixtures=>{
  const tile=document.createElement('canvas');tile.width=64;tile.height=80;const ctx=tile.getContext('2d');ctx.imageSmoothingEnabled=false;
  const atlas=document.createElement('canvas');atlas.width=1280;atlas.height=720;const actx=atlas.getContext('2d');actx.fillStyle='#152a38';actx.fillRect(0,0,1280,720);const tiles=[];
  for(let n=0;n<fixtures.length;n++){const f=fixtures[n],img=new Image();img.src='data:image/svg+xml;base64,'+btoa(unescape(encodeURIComponent(f.svg)));await img.decode();ctx.clearRect(0,0,64,80);ctx.drawImage(img,0,0);actx.drawImage(tile,n%20*64,Math.floor(n/20)*80);tiles.push({group:f.group,index:f.index,png:tile.toDataURL('image/png').split(',')[1]});}
  return {tiles,atlas:atlas.toDataURL('image/png').split(',')[1]};
 },fixtures);
 const hashes={};for(const tile of result.tiles){const image=PNG.sync.read(Buffer.from(tile.png,'base64'));(hashes[tile.group]??=new Set()).add(createHash('sha256').update(image.data).digest('hex'));}
 for(const [group,values]of Object.entries(hashes))if(values.size!==20)throw Error(`Composited variants are hidden/duplicated: ${group} ${values.size}/20`);
 await writeFile('/tmp/reborn-character-atlas.png',Buffer.from(result.atlas,'base64'));console.log('PASS: all 180 fully composed pixel fixtures remain visibly distinct; atlas /tmp/reborn-character-atlas.png');
}finally{await browser.close();}
