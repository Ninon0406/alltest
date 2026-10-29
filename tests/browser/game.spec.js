import {test,expect} from '@playwright/test';
import {start,snapshot,finishPeacefully,openOverlay,closeOverlay,oneMonth} from './helpers.js';
const key='reborn_finished_lives_v1';
test('active life never writes storage and in-page panels preserve its exact identity and resources',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>{window.runWrites=[];Storage.prototype.setItem=function(k){window.runWrites.push(k);throw new DOMException('blocked','SecurityError');};});
 await start(page);const initial=await snapshot(page);
 for(const name of ['บันทึกตัวละคร','บันทึกชีวิตรายปี','อาชีพและการฝึก','แผนที่และบริการ','คู่มือโลก']){await openOverlay(page,name);expect(await snapshot(page)).toEqual(initial);}
 await closeOverlay(page);await oneMonth(page);expect((await snapshot(page)).time.absoluteDay).toBe(30);
 expect(await page.evaluate(()=>window.runWrites)).toEqual([]);expect(errors).toEqual([]);
});
test('ignores legacy active saves without reading, changing or removing them; refresh starts unstarted rebirth',async({page})=>{
 await page.addInitScript(()=>{localStorage.setItem('reborn_save','legacy-life');localStorage.setItem('reborn_save_backup_before_v5','legacy-backup');localStorage.setItem('reborn_ending_gallery','["end_hero"]');const original=Storage.prototype.getItem;Storage.prototype.getItem=function(k){if(k.startsWith('reborn_save'))throw Error('Active save must not be read');return original.call(this,k);};});
 await start(page);const old=await snapshot(page);await oneMonth(page);await page.reload();await expect(page.locator('#birthScreen')).toBeVisible();expect(await snapshot(page)).toBeNull();
 await expect(page.getByRole('button',{name:/บันทึกเกม|โหลดเกม|ดาวน์โหลดเซฟ/})).toHaveCount(0);await page.getByRole('button',{name:'ก้าวสู่ชีวิตใหม่',exact:true}).click();expect((await snapshot(page)).run.id).not.toBe(old.run.id);
 await openOverlay(page,'ประวัติชีวิต');await expect(page.getByRole('dialog')).toContainText('ฉากจบจากรุ่นก่อน');
 expect(await page.evaluate(()=>Object.fromEntries(Object.entries(localStorage)))).toEqual({reborn_save:'legacy-life',reborn_save_backup_before_v5:'legacy-backup',reborn_ending_gallery:'["end_hero"]'});
});
test('a second tab has an independent run while unfinished exit creates no archive',async({page,context})=>{
 await start(page);const first=await snapshot(page),other=await context.newPage();await start(other);expect((await snapshot(other)).run.id).not.toBe(first.run.id);
 await oneMonth(other);expect((await snapshot(page)).age).toBe(0);
 await openOverlay(page,'ตัวเลือก');await page.getByRole('button',{name:'เริ่มใหม่',exact:true}).click();await expect(page.locator('#birthScreen')).toBeVisible();expect(await page.evaluate(k=>localStorage.getItem(k),key)).toBeNull();await other.close();
});
test('an actual terminal life archives once, reload preserves summary without a resume path',async({page})=>{
 test.setTimeout(90000); // Full clicked life to age 60, including every manual childhood/teen decision.
 await page.addInitScript(()=>{const original=Storage.prototype.setItem;window.writes=[];Storage.prototype.setItem=function(k,v){window.writes.push(k);return original.call(this,k,v);};});
 await start(page);await finishPeacefully(page);await expect(page.locator('.terminal-summary')).toContainText('เก็บสรุปชีวิตที่จบแล้วในประวัติเรียบร้อย');
 const state=await snapshot(page),archive=await page.evaluate(k=>JSON.parse(localStorage.getItem(k)),key);expect(archive.lives).toHaveLength(1);expect(archive.lives[0].runId).toBe(state.run.id);expect(archive.lives[0].age).toBe(60);expect(archive.lives[0]).not.toHaveProperty('state');
 await page.evaluate(()=>Game.render());expect(await page.evaluate(()=>window.writes)).toEqual([key]);await page.reload();await expect(page.locator('#birthScreen')).toBeVisible();await page.getByRole('button',{name:'ประวัติชีวิต',exact:true}).click();await expect(page.getByRole('dialog')).toContainText(state.name);await expect(page.getByRole('dialog').getByRole('button',{name:/^(เล่นต่อ|โหลดเกม|กู้คืนชีวิต)$/})).toHaveCount(0);
});
test('archive failure leaves terminal life readable and offers a real summary download',async({page})=>{
 test.setTimeout(90000); // Preserve the genuine full-life route even on constrained CI runners.
 await page.addInitScript(()=>{Storage.prototype.setItem=()=>{throw new DOMException('full','QuotaExceededError');};});await start(page);await finishPeacefully(page);await expect(page.locator('.terminal-summary')).toContainText('เก็บประวัติไม่ได้');
 const downloaded=page.waitForEvent('download');await page.getByRole('button',{name:'ดาวน์โหลดสรุปชีวิตที่จบแล้ว',exact:true}).click();expect((await downloaded).suggestedFilename()).toBe('reborn-finished-life.json');expect((await snapshot(page)).run.status).toBe('ended');
});
test('back navigation and BFCache pageshow do not revive an abandoned life',async({page})=>{
 await start(page);const before=await snapshot(page);await page.goto('about:blank');await page.goBack();await expect(page.locator('#birthScreen')).toBeVisible();expect(await snapshot(page)).toBeNull();
 await page.getByRole('button',{name:'ก้าวสู่ชีวิตใหม่',exact:true}).click();expect((await snapshot(page)).run.id).not.toBe(before.run.id);
 await page.evaluate(()=>window.dispatchEvent(new PageTransitionEvent('pageshow',{persisted:true})));await expect(page.locator('#birthScreen')).toBeVisible();expect(await snapshot(page)).toBeNull();expect(await page.evaluate(()=>localStorage.length)).toBe(0);
});
