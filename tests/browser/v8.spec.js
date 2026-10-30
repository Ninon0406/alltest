import {test,expect} from '@playwright/test';
import {startV8,pauseV8,v8Snapshot,playV8Until,finishV8,v8Focus} from '../../scripts/v8-playthrough.mjs';
import {v8Decision} from '../../src/engine/v8-model.js';

test('V8 x8 time stops at a real decision and outcome, and duplicate taps do not replay costs',async({page})=>{
 await page.clock.install();await startV8(page,{seed:0});await page.getByRole('button',{name:'ความเร็ว 8 เท่า',exact:true}).click();await page.getByRole('button',{name:'เดินเวลา',exact:true}).click();await page.clock.runFor(3000);
 const s=await v8Snapshot(page);expect(s.time.absoluteDay).toBe(540);expect(v8Decision(s).id).toBe('v8.small-friend');await page.clock.runFor(5000);expect(await v8Snapshot(page)).toEqual(s);
 const b=page.locator('[data-choice-id="join"]');await b.evaluate(button=>{button.click();button.click();});const chosen=await v8Snapshot(page);expect(chosen.v8.bonds).toBe(s.v8.bonds+6);expect(chosen.v8.completed.filter(id=>id==='v8.small-friend')).toHaveLength(1);await page.clock.runFor(5000);expect(await v8Snapshot(page)).toEqual(chosen);await expect(page.getByRole('button',{name:'ดำเนินชีวิตต่อ',exact:true})).toBeVisible();
});

test('age-appropriate focus applies on a real tick; hidden tab and panels stop time without persisting a run',async({page})=>{
 await page.clock.install();await startV8(page,{seed:1});await playV8Until(page,{eventId:'v8.small-friend'});await page.locator('[data-choice-id="watch"]').click();await page.getByRole('button',{name:'ดำเนินชีวิตต่อ',exact:true}).click();
 const before=await v8Snapshot(page);await v8Focus(page,'observe');const queued=await v8Snapshot(page);expect(queued.time).toEqual(before.time);expect(queued.v8.knowledge).toBe(before.v8.knowledge);expect(queued.power).toEqual(before.power);
 await page.getByRole('button',{name:'เดินเวลา',exact:true}).click();await page.clock.runFor(650);const advanced=await v8Snapshot(page);expect(advanced.time.absoluteDay).toBe(before.time.absoluteDay+30);expect(advanced.v8.knowledge).toBeGreaterThan(before.v8.knowledge);
 await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>true});document.dispatchEvent(new Event('visibilitychange'));});await page.clock.runFor(5000);expect(await v8Snapshot(page)).toEqual(advanced);
 await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,get:()=>false});document.dispatchEvent(new Event('visibilitychange'));});
 await page.getByRole('button',{name:'แผนที่',exact:true}).click();await expect(page.getByRole('dialog')).toBeVisible();expect(await v8Snapshot(page)).toEqual(advanced);await page.getByRole('combobox',{name:'เลือกสถานที่ที่รู้จัก'}).selectOption({index:1});expect(await v8Snapshot(page)).toEqual(advanced);await expect(page.getByRole('button',{name:'เดินทางตามเส้นทางนี้',exact:true})).toHaveCount(0);
 await page.keyboard.press('Shift+Tab');expect(await page.evaluate(()=>document.querySelector('dialog').contains(document.activeElement))).toBe(true);await page.keyboard.press('Escape');await expect(page.getByRole('button',{name:'แผนที่',exact:true})).toBeFocused();expect(await page.evaluate(()=>localStorage.length)).toBe(0);
 await page.reload();await expect(page.getByRole('button',{name:'เกิด',exact:true})).toBeVisible();expect(await v8Snapshot(page)).toBeNull();
});

test('five real seeded birth-to-ending runs cover four epilogues and terminal-only archive',async({page})=>{
 test.setTimeout(180000);const endings=new Set(),origins=new Set();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const [i,seed]of [0,1,2,5,17].entries()){
  const birth=await startV8(page,{seed});origins.add(birth.birth.archetypeId);const s=await finishV8(page,{policy:i%4});endings.add(s.run.endingId);await expect(page.locator('.v8-final')).toBeVisible();expect(await page.evaluate(()=>localStorage.getItem('reborn_save'))).toBeNull();
  await page.getByRole('button',{name:'ประวัติชีวิต',exact:true}).click();await expect(page.getByRole('dialog')).toContainText(s.name);await page.keyboard.press('Escape');await page.reload();expect(await v8Snapshot(page)).toBeNull();
 }
 expect(endings.size).toBe(4);expect(origins.size).toBeGreaterThanOrEqual(3);expect(errors).toEqual([]);expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('reborn_finished_lives_v1')).lives.length)).toBe(5);
});

test('V8 tabs start separate lives, preserve old save keys and never archive abandonment or resume on back',async({page,context})=>{
 await page.goto('/');await page.getByRole('button',{name:'เกิด',exact:true}).waitFor();await page.evaluate(()=>{localStorage.setItem('reborn_save','old-save-sentinel');localStorage.setItem('reborn_save_backup_before_v4','old-backup-sentinel');});
 const first=await startV8(page,{seed:0}),other=await context.newPage();await startV8(other,{seed:1});expect((await v8Snapshot(other)).run.id).not.toBe(first.run.id);
 await page.getByRole('button',{name:'ข้ามไปเหตุการณ์ถัดไป',exact:true}).click();expect((await v8Snapshot(other)).time.absoluteDay).toBe(0);await page.goto('about:blank');await page.goBack();await page.getByRole('button',{name:'เกิด',exact:true}).waitFor();expect(await v8Snapshot(page)).toBeNull();
 expect(await page.evaluate(()=>({save:localStorage.getItem('reborn_save'),backup:localStorage.getItem('reborn_save_backup_before_v4'),archive:localStorage.getItem('reborn_finished_lives_v1')}))).toEqual({save:'old-save-sentinel',backup:'old-backup-sentinel',archive:null});await other.close();
});

test('the V8 ritual and passive cultivation retain real power and manual first-realm certification',async({page})=>{
 test.setTimeout(90000);await startV8(page,{seed:0});const ready=await playV8Until(page,{eventId:'power.first-realm',awaken:true,focus:'cultivate'});expect(ready.power.level).toBe(9);expect(ready.power.practiceDays).toBe(266);const day=ready.time.absoluteDay;
 await page.locator('[data-choice-id="steady"]').click();const earned=await v8Snapshot(page);expect(earned.power.level).toBe(10);expect(earned.time.absoluteDay).toBe(day);expect(earned.stamina).toBe(ready.stamina-15);await expect(page.locator('#v8Power')).toContainText('10 / 10');expect((await page.locator('#v8Age').boundingBox()).y).toBeLessThan(140);await expect(page.locator('[data-power-milestone="10"]')).toBeVisible();expect(await page.evaluate(()=>localStorage.length)).toBe(0);
});
