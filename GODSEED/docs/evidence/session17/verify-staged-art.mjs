// Node24. Supply a deployment URL and optional "preview" output prefix.
// All progress comes from real UI actions and explicit .godseed files.
import {chromium,expect} from '../../../node_modules/@playwright/test/index.mjs';
import {exportFile,exportedState,loadFile} from '../../../tests/file-helpers.ts';
import {fileURLToPath} from 'node:url';
import {writeFile} from 'node:fs/promises';
const target=process.argv[2];if(!target)throw Error('URL required');
const prefix=process.argv[3]||'public',folder=fileURLToPath(new URL('./',import.meta.url));
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:390,height:844},hasTouch:true});
const errors=[],references=[],writes=[],pngRequests=[],injectedErrors=[];
let inject=false;
page.on('pageerror',e=>errors.push(e.message));
page.on('console',m=>{if(m.type()==='error'){const controlled=inject&&m.text().includes('ERR_FAILED')&&m.location().url.endsWith('/assets/art-v4/hero-walk.png');if(controlled)injectedErrors.push(m.text());else errors.push(m.text());}});
page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
page.on('request',r=>{if(r.url().includes('/reference/'))references.push(r.url());if(!['GET','HEAD'].includes(r.method()))writes.push(r.method());if(r.url().endsWith('.png'))pngRequests.push(r.url());});
await page.addInitScript(()=>{
 window.__artStorageCalls=[];
 for(const [proto,methods] of [[Storage.prototype,['getItem','setItem','removeItem','clear']],[IDBFactory.prototype,['open','deleteDatabase']]])for(const method of methods){const original=proto[method];proto[method]=function(...args){window.__artStorageCalls.push(method);return original.apply(this,args);};}
 const cookie=Object.getOwnPropertyDescriptor(Document.prototype,'cookie');if(cookie)Object.defineProperty(Document.prototype,'cookie',{...cookie,get(){window.__artStorageCalls.push('cookie-read');return cookie.get.call(this);},set(v){window.__artStorageCalls.push('cookie-write');cookie.set.call(this,v);}});
});
const stable=async()=>expect(page.locator('#content')).toHaveAttribute('aria-busy','false',{timeout:18_000});
const tap=async name=>{await page.getByRole('button',{name,exact:true}).tap();await stable();};
const metrics=()=>page.evaluate(()=>{
 const entries=performance.getEntriesByType('resource').filter(e=>e.name.endsWith('.png'));
 return {pngRequests:entries.length,encodedBytes:entries.reduce((n,e)=>n+e.encodedBodySize,0),transferBytes:entries.reduce((n,e)=>n+e.transferSize,0)};
});
try{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto(target);await expect(page.locator('.edition')).toContainText('0.7.2');
 const canvas=page.locator('#canvas');await expect(canvas).toHaveAttribute('data-render-status','ready');const cold=await metrics();expect(cold.pngRequests).toBe(23);expect(pngRequests.some(u=>u.includes('art-v10'))).toBe(false);
 for(const name of ['เริ่มการเดินทาง','ลุกขึ้นสำรวจรอบตัว','เดินตามป้ายไม้ไปที่จัตุรัส','ไปโรงช่างของคุโร'])await tap(name);
 await expect(canvas).toHaveAttribute('data-npc-animation','koro-v10-hammer');await expect(canvas).toHaveAttribute('data-workshop-anvil','true');
 await tap('ลดการเคลื่อนไหว');const frame=await canvas.getAttribute('data-npc-frame');await expect.poll(()=>canvas.getAttribute('data-npc-frame')).not.toBe(frame);
 await page.screenshot({path:folder+`${prefix}-koro-hammer-390.png`,fullPage:true});await tap('ขอเรียนการผสมเวท');await expect(canvas).toHaveAttribute('data-npc-animation','koro-v10-show_recipe');await tap('ลดการเคลื่อนไหว');
 const checkpoint=await exportedState(page),file=await exportFile(page);expect(JSON.parse(file.toString()).gameVersion).toBe('0.7.2');
 await page.screenshot({path:folder+`${prefix}-koro-recipe-390.png`,fullPage:true});
 await page.reload();await expect(canvas).toHaveAttribute('data-render-status','ready');await expect(page.getByRole('button',{name:'เริ่มการเดินทาง',exact:true})).toBeVisible();const warm=await metrics();
 const picker=page.waitForEvent('filechooser');await page.getByRole('button',{name:'โหลดเกมจากไฟล์',exact:true}).tap();await(await picker).setFiles({name:'GODSEED_StagedArt.godseed',mimeType:'application/json',buffer:file});await expect(page.getByRole('button',{name:'ยืนยันโหลดไฟล์นี้',exact:true})).toBeVisible();await tap('ยืนยันโหลดไฟล์นี้');
 expect(await exportedState(page)).toEqual(checkpoint);await expect(canvas).toHaveAttribute('data-npc-animation','koro-v10-show_recipe');
 const loaded=Number(await canvas.getAttribute('data-asset-requests'));
 for(const name of ['ออกไปหาของเพิ่มเติมก่อน','ไปโรงช่างของคุโร'])await tap(name);expect(Number(await canvas.getAttribute('data-asset-requests'))).toBe(loaded);
 for(const name of ['ขอเรียนการผสมเวท','ออกไปหาของเพิ่มเติมก่อน','แวะสวนดอกไม้ของยายมาเรน','ค้นหาน้ำค้างเยียวยา','แวะสวนดอกไม้ของยายมาเรน','ช่วยรดน้ำและเก็บเมล็ด','แวะสวนดอกไม้ของยายมาเรน','ผสมเวท'])await tap(name);
 await page.getByLabel('แก่นธาตุ',{exact:true}).selectOption('BLOOM');await page.getByLabel('รูปแบบ',{exact:true}).selectOption('RING');await page.getByLabel('ตัวปรับ',{exact:true}).selectOption('HEAL');await tap('ผสมและค้นพบเวท');const crafted=await exportedState(page);expect(crafted.known).toContain('SPELL_BLOOM_RING_HEAL');expect(crafted.equipped).toContain('SPELL_BLOOM_RING_HEAL');
 // Controlled browser network fault, not a reported production outage.
 const restore=await exportFile(page);inject=true;await page.route('**/assets/art-v4/hero-walk.png',r=>r.abort());await page.reload();await expect(canvas).toHaveAttribute('data-render-status','degraded');await loadFile(page,restore);const before=await exportedState(page);await page.unroute('**/assets/art-v4/hero-walk.png');await tap('ลองโหลดภาพอีกครั้ง');await expect(canvas).toHaveAttribute('data-render-status','ready');expect(await exportedState(page)).toEqual(before);await expect(page.locator('#render-notice')).toBeHidden();
 await page.screenshot({path:folder+`${prefix}-recovered-garden-390.png`,fullPage:true});
 expect(await page.evaluate(()=>window.__artStorageCalls)).toEqual([]);expect(writes).toEqual([]);expect(references).toEqual([]);expect(errors).toEqual([]);
 const result={result:'PASS',url:target,version:'0.7.2',cold,warm,baseline:{pngRequests:57,encodedBytes:629017},koroMotion:true,recipePose:true,nativeFilePicker:true,unvisitedStageImport:true,exactStateRoundTrip:true,revisitExtraRequests:0,bloomCraftAndEquip:true,controlledFaultRetryPreservesRAM:true,injectedNetworkErrors:injectedErrors.length,emptyRefresh:true,persistentStorageCalls:0,outboundWrites:0,developmentReferenceRequests:0,consoleErrors:errors,hardware:'NOT_TESTED'};
 await writeFile(folder+`${prefix}-staged-art.json`,JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
}finally{await browser.close();}
