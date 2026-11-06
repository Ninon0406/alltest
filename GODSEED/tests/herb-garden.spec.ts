import {test,expect,type Page} from '@playwright/test';
import {exportedState,reloadFromFile} from './file-helpers';
test.use({hasTouch:true});
const stable=async(page:Page)=>expect(page.locator('#content')).toHaveAttribute('aria-busy','false',{timeout:15_000});
const tap=async(page:Page,name:string)=>{await page.getByRole('button',{name,exact:true}).tap();await stable(page);};
async function enter(page:Page){await page.goto('/');for(const name of ['เริ่มการเดินทาง','ลุกขึ้นสำรวจรอบตัว','เดินตามป้ายไม้ไปที่จัตุรัส','แวะสวนดอกไม้ของยายมาเรน'])await tap(page,name);}
for(const [width,height] of [[390,844],[844,390],[820,1180],[1024,768],[1366,768]])test(`herbalist map, real ambient motion, arch depth and file-owned gathering ${width}`,async({page})=>{
 test.setTimeout(60_000);await page.setViewportSize({width,height});await page.emulateMedia({reducedMotion:'reduce'});
 const errors:string[]=[],references:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('request',r=>{if(r.url().includes('/reference/'))references.push(r.url());});
 await enter(page);const canvas=page.locator('#canvas');await expect(canvas).toHaveAttribute('data-garden-art','herbalist-v9');await expect(canvas).toHaveAttribute('data-stage-layers','3');
 await tap(page,'ลดการเคลื่อนไหว');const pot=await canvas.getAttribute('data-garden-cauldron-frame'),herbs=await canvas.getAttribute('data-garden-herbs-frame');
 await expect.poll(()=>canvas.getAttribute('data-garden-cauldron-frame')).not.toBe(pot);await expect.poll(()=>canvas.getAttribute('data-garden-herbs-frame')).not.toBe(herbs);
 await page.getByRole('button',{name:'ค้นหาน้ำค้างเยียวยา',exact:true}).tap();await expect(canvas).toHaveAttribute('data-path-phase','interaction');
 const anchor=JSON.parse((await canvas.getAttribute('data-action-anchor'))!);expect(anchor).toMatchObject({x:98,y:218,feetY:238});expect(anchor.depth).toBeLessThan(Number(await canvas.getAttribute('data-garden-arch-depth')));
 await page.screenshot({path:`test-results/herb-garden-dew-${width}.png`,fullPage:true});await stable(page);expect((await exportedState(page)).inventory.MOD_HEAL).toBe(1);
 await tap(page,'ลดการเคลื่อนไหว');await tap(page,'แวะสวนดอกไม้ของยายมาเรน');
 // Observe actual sprite frames over several animation intervals after reducing motion.
 await page.waitForTimeout(100);const frozen=await canvas.getAttribute('data-garden-cauldron-frame');await page.waitForTimeout(450);expect(await canvas.getAttribute('data-garden-cauldron-frame')).toBe(frozen);
 const before=await exportedState(page);await reloadFromFile(page);expect(await exportedState(page)).toEqual(before);await expect(canvas).toHaveAttribute('data-garden-art','herbalist-v9');
 await page.screenshot({path:`test-results/herb-garden-after-${width}.png`,fullPage:true});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);expect(errors).toEqual([]);expect(references).toEqual([]);
});
test('a failed new garden layer restores the coherent legacy layers and keeps watering and file loading playable',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.route('**/assets/art-v9/garden-ground.png',r=>r.abort());await enter(page);
 const canvas=page.locator('#canvas');await expect(canvas).toHaveAttribute('data-render-status','degraded');await expect(canvas).toHaveAttribute('data-garden-art','legacy');await expect(canvas).toHaveAttribute('data-stage-layers','3');
 await tap(page,'ช่วยรดน้ำและเก็บเมล็ด');expect((await exportedState(page)).inventory.CORE_BLOOM).toBe(1);await tap(page,'แวะสวนดอกไม้ของยายมาเรน');await reloadFromFile(page);await expect(canvas).toHaveAttribute('data-garden-growth','bloom');
});
test('missing new scenery atlases cannot block a choice, its reward, or manual-file export',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.route('**/assets/art-v9/garden-cauldron.png',r=>r.abort());await page.route('**/assets/art-v9/garden-herbs.png',r=>r.abort());await enter(page);
 await expect(page.locator('#canvas')).toHaveAttribute('data-render-status','degraded');await tap(page,'ค้นหาน้ำค้างเยียวยา');expect((await exportedState(page)).inventory.MOD_HEAL).toBe(1);
});
test('the earlier musicbox story also walks to the bench before listening and grants its original reward once',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');
 for(const name of ['เริ่มการเดินทาง','ลุกขึ้นสำรวจรอบตัว','เดินตามป้ายไม้ไปที่จัตุรัส','ไปหาลูมิที่บ่อน้ำ','ช่วยดูว่ากล่องดนตรีเสียตรงไหน'])await tap(page,name);
 await tap(page,'ลดการเคลื่อนไหว');await page.getByRole('button',{name:'ฟังคุณยายเล่าเรื่องในอดีต',exact:true}).tap();const canvas=page.locator('#canvas');await expect(canvas).toHaveAttribute('data-garden-beat','listening');await expect(canvas).toHaveAttribute('data-player-action','rest');await expect(canvas).toHaveAttribute('data-target-anchor','maren_listen_seat');
 expect(JSON.parse((await canvas.getAttribute('data-action-anchor'))!)).toMatchObject({x:312,y:197,depth:243});await tap(page,'ข้ามแอนิเมชัน');const s=await exportedState(page);expect(s.flags.maren_listened).toBe(true);expect(s.inventory.CORE_BLOOM).toBe(1);expect(s.choices.filter(id=>id==='CH03B1')).toHaveLength(1);
});
