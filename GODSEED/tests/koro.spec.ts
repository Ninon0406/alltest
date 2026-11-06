import {test,expect,type Page} from '@playwright/test';
import {exportedState,reloadFromFile} from './file-helpers';
test.use({hasTouch:true});
const stable=async(page:Page)=>expect(page.locator('#content')).toHaveAttribute('aria-busy','false',{timeout:15_000});
const tap=async(page:Page,name:string)=>{await page.getByRole('button',{name,exact:true}).tap();await stable(page);};
async function enter(page:Page){await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');for(const name of ['เริ่มการเดินทาง','ลุกขึ้นสำรวจรอบตัว','เดินตามป้ายไม้ไปที่จัตุรัส','ไปโรงช่างของคุโร'])await tap(page,name);}
for(const [width,height] of [[390,844],[844,390],[820,1180],[1024,768],[1366,768]])test(`Koro forging, recipe gesture and restored tutorial ${width}`,async({page})=>{
 await page.setViewportSize({width,height});const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});await enter(page);const canvas=page.locator('#canvas');
 await expect(canvas).toHaveAttribute('data-npc','koro-v10');await expect(canvas).toHaveAttribute('data-workshop-anvil','true');await expect(canvas).toHaveAttribute('data-npc-animation','koro-v10-hammer');
 await tap(page,'ลดการเคลื่อนไหว');const frame=await canvas.getAttribute('data-npc-frame');await expect.poll(()=>canvas.getAttribute('data-npc-frame')).not.toBe(frame);await page.screenshot({path:`test-results/koro-hammer-${width}.png`,fullPage:true});
 const pose=page.waitForFunction(()=>document.querySelector<HTMLElement>('#canvas')?.dataset.npcAnimation==='koro-v10-show_recipe');await page.getByRole('button',{name:'ขอเรียนการผสมเวท',exact:true}).tap();await pose;await stable(page);
 const next=await exportedState(page);expect(next.flags.koro_trained).toBe(true);expect(next.choices.filter(id=>id==='CH0401')).toHaveLength(1);await expect(canvas).toHaveAttribute('data-npc-animation','koro-v10-show_recipe');
 await tap(page,'ลดการเคลื่อนไหว');await page.waitForTimeout(80);const frozen=await canvas.getAttribute('data-npc-frame');await page.waitForTimeout(450);await expect(canvas).toHaveAttribute('data-npc-frame',frozen!);await page.screenshot({path:`test-results/koro-recipe-${width}.png`,fullPage:true});
 await reloadFromFile(page);expect(await exportedState(page)).toEqual(next);await expect(canvas).toHaveAttribute('data-npc-animation','koro-v10-show_recipe');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);expect(errors).toEqual([]);
});
test('fallback Koro stays grounded without an anvil; explicit retry restores the prop and action',async({page})=>{
 await page.route('**/assets/art-v10/*.png',r=>r.abort());await enter(page);const canvas=page.locator('#canvas');await expect(canvas).toHaveAttribute('data-npc','koro');await expect(canvas).toHaveAttribute('data-workshop-anvil','false');await expect(canvas).toHaveAttribute('data-npc-animation','koro-idle');
 const before=await exportedState(page);await page.unroute('**/assets/art-v10/*.png');await tap(page,'ลองโหลดภาพอีกครั้ง');await expect(canvas).toHaveAttribute('data-workshop-anvil','true');await expect(canvas).toHaveAttribute('data-npc-animation','koro-v10-hammer');expect(await exportedState(page)).toEqual(before);
});
