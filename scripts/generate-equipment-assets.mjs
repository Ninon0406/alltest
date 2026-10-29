import {chromium} from '@playwright/test';
import {existsSync} from 'node:fs';
import {mkdir,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {PNG} from 'pngjs';
import {equipmentItems} from '../src/data/equipment.js';
import {equipmentPartSvg} from '../src/ui/avatar/equipment-parts.js';
const hash=data=>createHash('sha256').update(data).digest('hex');
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||(existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined),args:['--no-sandbox']});
try{
 const page=await browser.newPage(),images=await page.evaluate(async definitions=>{
  const canvas=document.createElement('canvas');canvas.width=64;canvas.height=80;const ctx=canvas.getContext('2d');ctx.imageSmoothingEnabled=false;const result=[];
  for(const svg of definitions){const img=new Image();img.src='data:image/svg+xml;base64,'+btoa(svg);await img.decode();ctx.clearRect(0,0,64,80);ctx.drawImage(img,0,0);result.push(canvas.toDataURL('image/png').split(',')[1]);}return result;
 },equipmentItems.map(item=>equipmentPartSvg(item.id)));
 await mkdir('public/assets/sprites/garments',{recursive:true});const files=[];
 for(let i=0;i<equipmentItems.length;i++){
  const item=equipmentItems[i],data=Buffer.from(images[i],'base64'),pixels=PNG.sync.read(data);await writeFile('public/'+item.path,data);
  files.push({id:item.id,path:item.path,slot:item.slot,width:64,height:80,anchor:[32,77],bytes:data.length,sha256:hash(data),pixelSha256:hash(pixels.data),source:'src/ui/avatar/equipment-parts.js',license:'Original project artwork'});
 }
 await writeFile('public/assets/sprites/garments/manifest.json',JSON.stringify({version:1,kind:'original procedural equipment',files},null,2)+'\n');console.log(`Generated ${files.length} original transparent equipment PNGs`);
}finally{await browser.close();}
