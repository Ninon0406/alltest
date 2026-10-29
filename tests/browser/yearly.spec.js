import {test,expect} from '@playwright/test';
import {start,snapshot,reachAge,openOverlay,closeOverlay,openReading,decide} from './helpers.js';
test('infant choices are month-appropriate and school still offers its five-way focus and optional reader',async({page})=>{
 await start(page);await expect(page.locator('.major-option')).toHaveCount(3);await expect(page.getByRole('dialog')).toContainText('ทารกแรกเกิด');await closeOverlay(page);await expect(page.getByRole('button',{name:'เปลี่ยนแผน',exact:true})).toHaveCount(0);
 await decide(page);await page.getByRole('button',{name:'ถึงจุดสำคัญ',exact:true}).click();expect((await snapshot(page)).time.absoluteDay).toBe(90);await expect(page.getByRole('dialog')).toContainText('โมบายไม้');
 await reachAge(page,6,{settleAtTarget:false});await decide(page);await expect(page.locator('.major-option')).toHaveCount(5);await decide(page);
 await openOverlay(page,'เปลี่ยนแผน');await expect(page.locator('.year-focus')).toHaveCount(6);await closeOverlay(page);await openReading(page);await page.getByRole('button',{name:'อ่านเรื่องแบบละเอียด (ทางเลือก)',exact:true}).click();await page.getByRole('button',{name:'อ่านต่อ',exact:true}).click();await expect(page.locator('.choice-card')).toHaveCount(2);await page.getByRole('button',{name:'กลับหน้าชีวิตรายปี',exact:true}).click();expect((await snapshot(page)).age).toBe(6);
});
test('autoplay uses fixed 30-day ticks, real progress and stops at choices, panels and reload',async({page})=>{
 await page.clock.install({time:new Date('2026-10-29T12:00:00Z')});await page.clock.pauseAt(new Date('2026-10-29T12:00:01Z'));await start(page);await decide(page);await page.getByRole('combobox',{name:'ความเร็วเวลา'}).selectOption('16');await page.getByRole('button',{name:'เล่นอัตโนมัติ',exact:true}).click();await page.clock.runFor(55);expect((await snapshot(page)).time.absoluteDay).toBe(30);await expect(page.locator('#calendarProgress')).toHaveAttribute('aria-valuenow','30');
 await page.getByRole('button',{name:'แผนที่และบริการ',exact:true}).click();await page.clock.runFor(10000);expect((await snapshot(page)).time.absoluteDay).toBe(30);await closeOverlay(page);
 await page.getByRole('button',{name:'เล่นอัตโนมัติ',exact:true}).click();await page.clock.runFor(1000);expect((await snapshot(page)).time.absoluteDay).toBe(90);await expect(page.locator('.major-option')).toHaveCount(3);await page.clock.runFor(10000);expect((await snapshot(page)).time.absoluteDay).toBe(90);
 await page.reload();await page.clock.runFor(10000);expect(await snapshot(page)).toBeNull();expect(await page.evaluate(()=>localStorage.length)).toBe(0);
});
test('stale action and rejected childhood work preserve the in-memory state atomically',async({page})=>{
 await start(page);const before=await snapshot(page);expect(await page.evaluate(()=>Game.perform({type:'careerJob',token:`${Game.snapshot.run.id}:${Game.snapshot.life.revision}:${Game.snapshot.time.absoluteDay}`}))).toBe(false);expect(await snapshot(page)).toEqual(before);
 await decide(page);await page.getByRole('button',{name:'เติบโตต่อ 1 เดือน',exact:true}).evaluate(b=>{b.click();b.click();});expect((await snapshot(page)).time.absoluteDay).toBe(30);await reachAge(page,8);expect((await snapshot(page)).age).toBe(8);expect(await page.evaluate(()=>localStorage.length)).toBe(0);
});
test('local scene PNG loads and a ritual click completes one actual stage',async({page})=>{
 await start(page);await expect(page.locator('.play-scene .location-image')).toBeVisible();await expect.poll(()=>page.locator('.play-scene .location-image').evaluate(img=>({width:img.naturalWidth,height:img.naturalHeight}))).toEqual({width:320,height:160});
 await reachAge(page,12,{settleAtTarget:false});expect((await snapshot(page)).progression.awakening.step).toBe(0);await decide(page);expect((await snapshot(page)).progression.awakening.step).toBe(1);await expect(page.getByRole('dialog')).toContainText('2/7');
});
