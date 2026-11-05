import {test,expect,type Page} from '@playwright/test';
import {exportedState,reloadFromFile} from './file-helpers';
test.use({hasTouch:true});
const tap=async(page:Page,name:string)=>{await page.getByRole('button',{name,exact:true}).tap();await expect(page.locator('#content')).toHaveAttribute('aria-busy','false',{timeout:15_000});};
for(const [width,height] of [[390,844],[844,390],[820,1180],[1024,768],[1366,768]])test(`Maren humming and bench listening saved in an owned file ${width}`,async({page})=>{
 test.setTimeout(60_000);await page.setViewportSize({width,height});await page.emulateMedia({reducedMotion:'reduce'});const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/');
 for(const name of ['เริ่มการเดินทาง','ลุกขึ้นสำรวจรอบตัว','เดินตามป้ายไม้ไปที่จัตุรัส','แวะสวนดอกไม้ของยายมาเรน'])await tap(page,name);
 const before=await exportedState(page),canvas=page.locator('#canvas');await expect(canvas).toHaveAttribute('data-npc','maren-v8');await tap(page,'ลดการเคลื่อนไหว');await page.getByRole('button',{name:'นั่งฟังเพลงเก่าที่คุณยายจำได้บางส่วน',exact:true}).tap();await expect(canvas).toHaveAttribute('data-garden-beat','listening');
 await expect(canvas).toHaveAttribute('data-player-action','rest');await expect(canvas).toHaveAttribute('data-target-anchor','maren_listen_seat');expect(JSON.parse((await canvas.getAttribute('data-action-anchor'))!)).toMatchObject({x:312,y:197,pose:'rest'});await expect(page.getByRole('button',{name:'บันทึกเกมเป็นไฟล์',exact:true})).toBeDisabled();await page.screenshot({path:`test-results/maren-listening-${width}.png`,fullPage:true});
 if(width===844)await tap(page,'ข้ามแอนิเมชัน');else await expect(page.locator('#content')).toHaveAttribute('aria-busy','false',{timeout:15_000});const after=await exportedState(page);expect(after.revision).toBe(before.revision+1);expect(after.flags.maren_listened).toBe(true);expect(after.flags.song_memory_hint).toBe(true);expect(after.inventory).toEqual(before.inventory);
 await tap(page,'ลดการเคลื่อนไหว');await tap(page,'แวะสวนดอกไม้ของยายมาเรน');await expect(page.getByText(/เคยนั่งฟัง/)).toBeVisible();await reloadFromFile(page);await expect(page.getByText(/เคยนั่งฟัง/)).toBeVisible();expect(errors).toEqual([]);
});
