// Supplement: inspect active normal-motion glyphs and distinct spell shapes.
// Uses only earned UI progress and a previously exported local file.
import {chromium,expect} from '../../../node_modules/@playwright/test/index.mjs';
import {readFile,writeFile} from 'node:fs/promises';
import {clickLife,takeLife,learnBothPaths} from '../../../tests/life-helpers.ts';
import {loadFile} from '../../../tests/file-helpers.ts';
import {byId} from '../../../src/systems/spells.ts';
const version=JSON.parse(await readFile(new URL('../../../package.json',import.meta.url),'utf8')).version;
const url=process.argv[2];if(!url)throw Error('URL required');const dir=new URL('./',import.meta.url);
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']}),page=await browser.newPage({viewport:{width:390,height:844},hasTouch:true}),errors=[],shots=[];
page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('response',r=>{if(r.status()>=400)errors.push(r.url());});
const canvas=page.locator('#canvas');
async function active(name,file,{beat,target}={}){
 await page.getByRole('button',{name,exact:true}).tap();await expect(canvas).toHaveAttribute('data-motion','full');
 if(beat)await expect(canvas).toHaveAttribute('data-path-ability-beat',beat);
 if(target)await expect.poll(async()=>JSON.parse(await canvas.getAttribute('data-spell-target')).kind).toBe(target);
 await expect.poll(async()=>Number(await canvas.getAttribute('data-active-effects'))).toBeGreaterThan(0);
 const count=Number(await canvas.getAttribute('data-active-effects')),focus=target?JSON.parse(await canvas.getAttribute('data-spell-target')):null;
 await page.screenshot({path:new URL(file,dir).pathname,fullPage:true});shots.push({button:name,file,beat:beat||null,target:focus,activeParticles:count});
 if(await page.getByRole('button',{name:'ข้ามแอนิเมชัน',exact:true}).isVisible())await clickLife(page,'ข้ามแอนิเมชัน');
 await expect(page.locator('#content')).toHaveAttribute('aria-busy','false');await expect(canvas).toHaveAttribute('data-active-effects','0');await expect.poll(async()=>JSON.parse(await canvas.getAttribute('data-player-anchor'))).toMatchObject({x:130,y:219,feetY:239,depth:239});shots.at(-1).settledAnchor=JSON.parse(await canvas.getAttribute('data-player-anchor'));
}
try{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto(url);await expect(page.locator('.edition')).toContainText(version);await loadFile(page,await readFile('/tmp/gs21-published-0.10.godseed'));await learnBothPaths(page);
 for(const id of ['SPELL_WIND_RAIN_SEEK','SPELL_BLOOM_RING_HEAL','SPELL_EARTH_WARD_GUARD']){const s=byId[id];await clickLife(page,'ผสมเวท');for(const [label,value] of [['แก่นธาตุ',s.core],['รูปแบบ',s.form],['ตัวปรับ',s.mod]])await page.getByLabel(label,{exact:true}).selectOption(value);await clickLife(page,'ผสมและค้นพบเวท');await clickLife(page,'เรื่องราว');}
 await takeLife(page,'CH0210','CH0210','CH0207','CH1502');await clickLife(page,'ลดการเคลื่อนไหว');
 await active('ตั้งรับ · ฟื้น MP 6','vfx-root-refuge-390.png',{beat:'ROOT_REFUGE'});await clickLife(page,'ตั้งรับ · ฟื้น MP 6');await active('สำรวจจังหวะ · MP 4','vfx-scout-390.png',{beat:'SCOUT'});await clickLife(page,'วายุดารานำวิถี · MP 10');
 for(const id of ['SPELL_BLOOM_RING_HEAL','SPELL_EARTH_WARD_GUARD','SPELL_WIND_RAIN_SEEK']){const s=byId[id],label=`${s.name} · MP ${s.mp}`;for(let i=0;i<6&&!await page.getByRole('button',{name:label,exact:true}).isEnabled();i++)await clickLife(page,'ตั้งรับ · ฟื้น MP 6');await active(label,`vfx-${s.form.toLowerCase()}-390.png`,{target:s.heal||s.shield?'player':'npc'});}
 await clickLife(page,'ถอยออกมาเตรียมตัว');expect(errors).toEqual([]);const result={result:'PASS',url,version,at:new Date().toISOString(),mode:'normal motion plus explicit skip; public UI and earned recipes',shots,cleanupAfterEach:true,consoleErrors:errors,hardware:'Chromium emulation; physical devices NOT TESTED'};await writeFile(new URL('public-vfx.json',dir),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
}finally{await browser.close();}
