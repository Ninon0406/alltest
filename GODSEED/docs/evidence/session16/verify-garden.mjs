// Node24; run from GODSEED: node docs/evidence/session16/verify-garden.mjs URL
// Genuine browser actions against the supplied deployment; no game-state injection.
import {chromium,expect} from '../../../node_modules/@playwright/test/index.mjs';
import {exportFile,exportedState} from '../../../tests/file-helpers.ts';
import {mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const target=process.argv[2];if(!target)throw Error('Deployment URL required');
const folder=fileURLToPath(new URL('./',import.meta.url));await mkdir(folder,{recursive:true});
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
const page=await browser.newPage({viewport:{width:390,height:844},hasTouch:true});
const errors=[],references=[],outboundWrites=[];
page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
page.on('request',r=>{if(r.url().includes('/reference/'))references.push(r.url());if(!['GET','HEAD'].includes(r.method()))outboundWrites.push(r.method());});
await page.addInitScript(()=>{
 window.__gardenStorageCalls=[];
 for(const [prototype,methods] of [[Storage.prototype,['getItem','setItem','removeItem','clear']],[IDBFactory.prototype,['open','deleteDatabase']]])for(const method of methods){const original=prototype[method];prototype[method]=function(...args){window.__gardenStorageCalls.push(method);return original.apply(this,args);};}
 const cookie=Object.getOwnPropertyDescriptor(Document.prototype,'cookie');if(cookie)Object.defineProperty(Document.prototype,'cookie',{...cookie,get(){window.__gardenStorageCalls.push('cookie-read');return cookie.get.call(this);},set(value){window.__gardenStorageCalls.push('cookie-write');cookie.set.call(this,value);}});
});
const stable=async()=>expect(page.locator('#content')).toHaveAttribute('aria-busy','false',{timeout:15_000});
const tap=async name=>{await page.getByRole('button',{name,exact:true}).tap();await stable();};
const motion=async reduce=>{if((await page.locator('#motion').getAttribute('aria-pressed'))!==String(reduce))await tap('ลดการเคลื่อนไหว');};
try{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto(target);await expect(page.locator('.edition')).toContainText('0.7.1');
 for(const name of ['เริ่มการเดินทาง','ลุกขึ้นสำรวจรอบตัว','เดินตามป้ายไม้ไปที่จัตุรัส','แวะสวนดอกไม้ของยายมาเรน'])await tap(name);
 const canvas=page.locator('#canvas');await expect(canvas).toHaveAttribute('data-render-status','ready');await expect(canvas).toHaveAttribute('data-garden-art','herbalist-v9');
 await page.screenshot({path:folder+'public-garden-390.png',fullPage:true});
 await motion(false);const pot=await canvas.getAttribute('data-garden-cauldron-frame'),herbs=await canvas.getAttribute('data-garden-herbs-frame');
 await expect.poll(()=>canvas.getAttribute('data-garden-cauldron-frame')).not.toBe(pot);await expect.poll(()=>canvas.getAttribute('data-garden-herbs-frame')).not.toBe(herbs);
 await page.getByRole('button',{name:'ค้นหาน้ำค้างเยียวยา',exact:true}).tap();await expect(canvas).toHaveAttribute('data-path-phase','interaction');
 expect(JSON.parse(await canvas.getAttribute('data-action-anchor'))).toMatchObject({x:98,y:218,feetY:238});expect(Number(await canvas.getAttribute('data-garden-arch-depth'))).toBe(242);await stable();expect((await exportedState(page)).inventory.MOD_HEAL).toBe(1);
 await motion(true);await tap('แวะสวนดอกไม้ของยายมาเรน');await motion(false);await page.getByRole('button',{name:'ช่วยรดน้ำและเก็บเมล็ด',exact:true}).tap();await expect(canvas).toHaveAttribute('data-garden-beat','watering');
 await page.screenshot({path:folder+'public-watering-390.png',fullPage:true});await stable();await motion(true);await tap('แวะสวนดอกไม้ของยายมาเรน');await expect(canvas).toHaveAttribute('data-garden-growth','bloom');
 await tap('ผสมเวท');await page.getByLabel('แก่นธาตุ',{exact:true}).selectOption('BLOOM');await page.getByLabel('รูปแบบ',{exact:true}).selectOption('RING');await page.getByLabel('ตัวปรับ',{exact:true}).selectOption('HEAL');await tap('ผสมและค้นพบเวท');
 const crafted=await exportedState(page);expect(crafted.known).toContain('SPELL_BLOOM_RING_HEAL');expect(crafted.equipped).toContain('SPELL_BLOOM_RING_HEAL');expect(crafted.inventory.CORE_BLOOM).toBe(0);await tap('เรื่องราว');
 await motion(false);await page.getByRole('button',{name:'นั่งฟังเพลงเก่าที่คุณยายจำได้บางส่วน',exact:true}).tap();await expect(canvas).toHaveAttribute('data-garden-beat','listening');await expect(canvas).toHaveAttribute('data-player-action','rest');
 expect(JSON.parse(await canvas.getAttribute('data-action-anchor'))).toMatchObject({x:312,y:197,depth:243});await page.screenshot({path:folder+'public-listening-390.png',fullPage:true});await stable();
 await motion(true);await tap('แวะสวนดอกไม้ของยายมาเรน');await expect(page.getByText(/เคยนั่งฟัง/)).toBeVisible();const before=await exportedState(page),buffer=await exportFile(page);
 expect(JSON.parse(buffer.toString()).gameVersion).toBe('0.7.1');expect((await page.evaluate(()=>window.__gardenStorageCalls))).toEqual([]);
 await page.reload();await expect(page.getByRole('button',{name:'เริ่มการเดินทาง',exact:true})).toBeVisible();expect(await page.getByRole('button',{name:'เล่นต่อ',exact:true}).count()).toBe(0);
 await expect(page.locator('input[type="file"]')).toBeEnabled();const chooser=page.waitForEvent('filechooser');await page.getByRole('button',{name:'โหลดเกมจากไฟล์',exact:true}).tap();await(await chooser).setFiles({name:'GODSEED_Public_Test.godseed',mimeType:'application/json',buffer});
 await expect(page.getByRole('button',{name:'ยืนยันโหลดไฟล์นี้',exact:true})).toBeVisible();await tap('ยืนยันโหลดไฟล์นี้');
 await expect(canvas).toHaveAttribute('data-garden-art','herbalist-v9');await expect(canvas).toHaveAttribute('data-garden-growth','bloom');expect(await exportedState(page)).toEqual(before);await page.screenshot({path:folder+'public-loaded-390.png',fullPage:true});
 expect(await page.evaluate(()=>window.__gardenStorageCalls)).toEqual([]);expect(outboundWrites).toEqual([]);expect(references).toEqual([]);expect(errors).toEqual([]);
 console.log(JSON.stringify({result:'PASS',url:target,version:'0.7.1',gardenArt:'herbalist-v9',ambientMotion:true,collisionTarget:true,archDepth:true,wateringAndBloom:true,bloomCraftAndEquip:true,seatedListening:true,nativeFilePicker:true,exactStateRoundTrip:true,emptyRefresh:true,persistentStorageCalls:0,outboundWrites:0,developmentReferenceRequests:0,consoleErrors:errors,hardware:'NOT_TESTED'}));
}finally{await browser.close();}
