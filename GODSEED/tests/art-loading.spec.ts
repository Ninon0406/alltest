import {test,expect,type Page} from '@playwright/test';
import {exportFile,exportedState,loadFile} from './file-helpers';
test.use({hasTouch:true});
const stable=async(page:Page)=>expect(page.locator('#content')).toHaveAttribute('aria-busy','false',{timeout:18_000});
async function tap(page:Page,name:string){await page.getByRole('button',{name,exact:true}).tap();await stable(page);}
async function hub(page:Page){for(const name of ['เริ่มการเดินทาง','ลุกขึ้นสำรวจรอบตัว','เดินตามป้ายไม้ไปที่จัตุรัส'])await tap(page,name);}
const pngMetrics=(page:Page)=>page.evaluate(()=>{
 const files=(performance.getEntriesByType('resource') as PerformanceResourceTiming[]).filter(e=>e.name.endsWith('.png'));
 return {files:files.length,encodedBytes:files.reduce((n,e)=>n+e.encodedBodySize,0),transferBytes:files.reduce((n,e)=>n+e.transferSize,0)};
});
for(const [width,height] of [[390,844],[1366,768]])test(`bounded title assets, cached revisit and explicit file to an unvisited stage ${width}`,async({page},info)=>{
 await page.setViewportSize({width,height});await page.emulateMedia({reducedMotion:'reduce'});
 const urls:string[]=[],errors:string[]=[];page.on('request',r=>{if(r.url().endsWith('.png'))urls.push(r.url());});page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');const canvas=page.locator('#canvas');await expect(canvas).toHaveAttribute('data-render-status','ready');
 const cold=await pngMetrics(page);expect(cold.files).toBe(23);expect(cold.encodedBytes).toBeLessThan(629017*.65);
 expect(urls.some(u=>/art-v9|art-v10|archive|stream/.test(u))).toBe(false);
 await hub(page);await tap(page,'แวะสวนดอกไม้ของยายมาเรน');await expect(canvas).toHaveAttribute('data-garden-art','herbalist-v9');
 const buffer=await exportFile(page),state=JSON.parse(buffer.toString()).state,loaded=await canvas.getAttribute('data-asset-requests'),count=urls.length;
 for(const name of ['ช่วยรดน้ำและเก็บเมล็ด','แวะสวนดอกไม้ของยายมาเรน'])await tap(page,name);
 expect(urls).toHaveLength(count);await expect(canvas).toHaveAttribute('data-asset-requests',loaded!);
 // A reload has no progress. A selected file then prepares the destination art
 // before replacing RAM, including animation registration absent at the title.
 await page.reload();await expect(page.getByRole('button',{name:'เริ่มการเดินทาง',exact:true})).toBeVisible();await expect(canvas).toHaveAttribute('data-asset-requests','23');
 await expect(canvas).toHaveAttribute('data-render-status','ready');const warm=await pngMetrics(page);await loadFile(page,buffer);expect(await exportedState(page)).toEqual(state);
 await expect(canvas).toHaveAttribute('data-npc','maren-v8');await expect(canvas).toHaveAttribute('data-garden-art','herbalist-v9');
 await info.attach('asset-budget',{body:JSON.stringify({cold,warm,titleBaseline:{files:57,encodedBytes:629017},revisitExtraRequests:urls.length-count-warm.files-(Number(loaded)-23)},null,2),contentType:'application/json'});
 expect(errors).toEqual([]);
});
test('explicit retry restores a failed shared atlas while preserving the seated checkpoint and dirty status',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});let attempts=0;const failed='**/assets/art-v4/hero-walk.png';
 await page.route(failed,r=>{attempts++;return r.abort();});await page.goto('/');const canvas=page.locator('#canvas');await expect(canvas).toHaveAttribute('data-render-status','degraded');
 for(const name of ['เริ่มการเดินทาง','นั่งพักใต้ต้นเมล็ด'])await tap(page,name);
 const anchor=await canvas.getAttribute('data-player-anchor'),before=await exportedState(page);expect(attempts).toBe(1);await expect(page.locator('#storage')).toHaveAttribute('data-dirty','false');
 await page.screenshot({path:'test-results/art-retry-before-390.png',fullPage:true});
 await page.unroute(failed);await tap(page,'ลองโหลดภาพอีกครั้ง');await expect(canvas).toHaveAttribute('data-render-status','ready');await expect(canvas).toHaveAttribute('data-player-action','rest');await expect(canvas).toHaveAttribute('data-player-anchor',anchor!);
 await expect(page.locator('#storage')).toHaveAttribute('data-dirty','false');expect(await exportedState(page)).toEqual(before);
 await expect(page.locator('#render-notice')).toBeHidden();await page.screenshot({path:'test-results/art-retry-after-390.png',fullPage:true});
});
test('repeated failure stays playable without automatic retry; later recovery retains its anchor and NPC memory',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});let attempts=0;const failed='**/assets/art-v9/garden-ground.png';
 await page.route(failed,r=>{attempts++;return r.abort();});await page.goto('/');await expect(page.locator('#canvas')).toHaveAttribute('data-render-status','ready');await hub(page);
 for(const name of ['แวะสวนดอกไม้ของยายมาเรน','นั่งฟังเพลงเก่าที่คุณยายจำได้บางส่วน','แวะสวนดอกไม้ของยายมาเรน'])await tap(page,name);
 expect(attempts).toBe(1);await tap(page,'ลองโหลดภาพอีกครั้ง');expect(attempts).toBe(2);await expect(page.locator('#canvas')).toHaveAttribute('data-garden-art','legacy');
 // Export without confirming storage: a renderer retry must not clear the warning.
 const download=page.waitForEvent('download');await tap(page,'บันทึกเกมเป็นไฟล์');const stream=await (await download).createReadStream(),chunks:Buffer[]=[];for await(const c of stream!)chunks.push(Buffer.from(c));const before=JSON.parse(Buffer.concat(chunks).toString()).state;
 const anchor=await page.locator('#canvas').getAttribute('data-player-anchor');await expect(page.locator('#storage')).toHaveAttribute('data-dirty','true');
 await page.unroute(failed);await tap(page,'ลองโหลดภาพอีกครั้ง');await expect(page.locator('#canvas')).toHaveAttribute('data-garden-art','herbalist-v9');await expect(page.locator('#canvas')).toHaveAttribute('data-player-anchor',anchor!);await expect(page.locator('#storage')).toHaveAttribute('data-dirty','true');expect(await exportedState(page)).toEqual(before);
});
test('a stalled stage asset times out, unlocks controls and can be retried without a second choice commit',async({page})=>{
 test.setTimeout(45_000);await page.emulateMedia({reducedMotion:'reduce'});let release=()=>{};
 const failed='**/assets/art-v10/koro.png';await page.route(failed,async r=>{await new Promise<void>(resolve=>release=resolve);await r.abort().catch(()=>{});});
 await page.goto('/');await hub(page);const before=await exportedState(page),canvas=page.locator('#canvas');
 await page.getByRole('button',{name:'ไปโรงช่างของคุโร',exact:true}).tap();await expect(canvas).toHaveAttribute('data-assets-loading','true');
 await expect(page.getByRole('button',{name:'บันทึกเกมเป็นไฟล์',exact:true})).toBeDisabled();await expect(page.getByRole('button',{name:'เมนูหลัก',exact:true})).toBeDisabled();
 await stable(page);await expect(canvas).toHaveAttribute('data-render-status','degraded');await expect(canvas).toHaveAttribute('data-npc','koro');
 const next=await exportedState(page);expect(next.revision).toBe(before.revision+1);expect(next.choices.filter((id:string)=>id==='CH0202')).toHaveLength(1);
 release();await page.unroute(failed);await tap(page,'ลองโหลดภาพอีกครั้ง');await expect(canvas).toHaveAttribute('data-npc','koro-v10');await expect(canvas).toHaveAttribute('data-npc-animation','koro-v10-hammer');expect(await exportedState(page)).toEqual(next);
});
test('HTTP200 with undecodable PNG offers recovery and preserves the exact current file checkpoint',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});const failed='**/assets/art-v9/garden-ground.png',errors:string[]=[];
 page.on('pageerror',e=>errors.push(e.message));const corrupt=(r:import('@playwright/test').Route)=>r.fulfill({status:200,contentType:'image/png',body:'damaged PNG'});
 const shared='**/assets/art-v4/hero-walk.png';await page.route(shared,corrupt);await page.route(failed,corrupt);
 await page.goto('/');await expect(page.locator('#canvas')).toHaveAttribute('data-render-status','degraded');await expect(page.getByRole('button',{name:'ลองโหลดภาพอีกครั้ง',exact:true})).toBeEnabled();await page.unroute(shared);await tap(page,'ลองโหลดภาพอีกครั้ง');await expect(page.locator('#canvas')).toHaveAttribute('data-render-status','ready');await hub(page);await tap(page,'แวะสวนดอกไม้ของยายมาเรน');const canvas=page.locator('#canvas');
 await expect(canvas).toHaveAttribute('data-render-status','degraded');await expect(canvas).toHaveAttribute('data-garden-art','legacy');
 const before=await exportedState(page);await page.unroute(failed);await tap(page,'ลองโหลดภาพอีกครั้ง');await expect(canvas).toHaveAttribute('data-render-status','ready');await expect(canvas).toHaveAttribute('data-garden-art','herbalist-v9');expect(await exportedState(page)).toEqual(before);expect(errors).toEqual([]);
});
