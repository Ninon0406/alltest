import {exportFile,exportedState,loadFile,reloadFromFile} from './file-helpers';
import {test,expect,type Page} from '@playwright/test';
test.use({hasTouch:true});
const stable=async(page:Page)=>expect(page.locator('#content')).toHaveAttribute('aria-busy','false',{timeout:12_000});
const tap=async(page:Page,name:string)=>{await page.getByRole('button',{name,exact:true}).tap();await stable(page);};
const saved=exportedState;
async function enter(page:Page){await page.goto('/');await expect(page.locator('#canvas')).toHaveAttribute('data-render-status',/ready|degraded/);for(const name of ['เริ่มการเดินทาง','ลุกขึ้นสำรวจรอบตัว','เดินตามป้ายไม้ไปที่จัตุรัส','แวะสวนดอกไม้ของยายมาเรน'])await tap(page,name);}
for(const [width,height] of [[390,844],[844,390],[820,1180],[1024,768],[1366,768]])test(`garden watering, bloom and saved memory ${width}`,async({page})=>{
 await page.setViewportSize({width,height});await page.emulateMedia({reducedMotion:'reduce'});const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));await enter(page);
 const canvas=page.locator('#canvas'),before=await saved(page);await expect(canvas).toHaveAttribute('data-garden-growth','buds');await page.screenshot({path:`test-results/garden-before-${width}.png`,fullPage:true});
 await page.getByRole('button',{name:'ลดการเคลื่อนไหว',exact:true}).tap();
 await page.getByRole('button',{name:'ช่วยรดน้ำและเก็บเมล็ด',exact:true}).tap();await expect(canvas).toHaveAttribute('data-garden-beat','watering');
 await expect(canvas).toHaveAttribute('data-player-texture','hero-water-v7');await expect(canvas).toHaveAttribute('data-walk-facing','east');
 await expect.poll(async()=>Number(await canvas.getAttribute('data-hero-frame'))).toBeGreaterThan(0);
 await expect(page.getByRole('button',{name:'บันทึกเกมเป็นไฟล์',exact:true})).toBeDisabled();await page.screenshot({path:`test-results/garden-watering-${width}.png`,fullPage:true});
 await stable(page);const after=await saved(page);expect(after.revision).toBe(before.revision+1);expect(after.inventory.CORE_BLOOM).toBe(1);expect(after.inventory.FORM_RING).toBe(1);expect(after.trust.MAREN).toBe(1);
 await page.getByRole('button',{name:'ลดการเคลื่อนไหว',exact:true}).tap();await tap(page,'แวะสวนดอกไม้ของยายมาเรน');await expect(canvas).toHaveAttribute('data-garden-growth','bloom');await expect(page.getByText(/จำมือที่อ่อนโยน/)).toBeVisible();await page.screenshot({path:`test-results/garden-after-${width}.png`,fullPage:true});
 await reloadFromFile(page);await expect(canvas).toHaveAttribute('data-garden-growth','bloom');expect((await saved(page)).inventory.CORE_BLOOM).toBe(1);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);expect(errors).toEqual([]);
});
test('reload discards RAM and an earlier explicit file restores buds; skipping commits exactly once and clears the action',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await enter(page);const checkpoint=await exportFile(page),before=JSON.parse(checkpoint.toString()).state,canvas=page.locator('#canvas');
 await page.getByRole('button',{name:'ลดการเคลื่อนไหว',exact:true}).tap();await page.getByRole('button',{name:'ช่วยรดน้ำและเก็บเมล็ด',exact:true}).tap();await expect(canvas).toHaveAttribute('data-garden-beat','watering');
 await page.reload();await expect(page.getByRole('button',{name:'เริ่มการเดินทาง',exact:true})).toBeVisible();await loadFile(page,checkpoint);expect((await saved(page)).revision).toBe(before.revision);await expect(canvas).toHaveAttribute('data-garden-growth','buds');
 await page.getByRole('button',{name:'ลดการเคลื่อนไหว',exact:true}).tap();await page.getByRole('button',{name:'ช่วยรดน้ำและเก็บเมล็ด',exact:true}).tap();await expect(canvas).toHaveAttribute('data-garden-beat','watering');await tap(page,'ข้ามแอนิเมชัน');
 const after=await saved(page);expect(after.revision).toBe(before.revision+1);expect(after.inventory.CORE_BLOOM).toBe(1);expect(after.choices.filter(id=>id==='CH0601')).toHaveLength(1);await expect(canvas).toHaveAttribute('data-garden-beat','idle');await expect(canvas).toHaveAttribute('data-active-effects','0');
});
test('missing new garden art keeps rewards and saved bloom state playable',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.route('**/assets/art-v7/*.png',route=>route.abort());await enter(page);await expect(page.locator('#canvas')).toHaveAttribute('data-render-status','degraded');
 await tap(page,'ช่วยรดน้ำและเก็บเมล็ด');expect((await saved(page)).inventory.CORE_BLOOM).toBe(1);await tap(page,'แวะสวนดอกไม้ของยายมาเรน');await expect(page.getByText(/จำมือที่อ่อนโยน/)).toBeVisible();await reloadFromFile(page);await expect(page.locator('#canvas')).toHaveAttribute('data-garden-growth','bloom');
});
