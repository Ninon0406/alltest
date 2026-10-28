import {test,expect} from '@playwright/test';
import {start,snapshot,reachAge} from './helpers.js';
test('annual focuses stop at five-way crossroads and preserve the optional detailed reader',async({page})=>{
 await start(page);await expect(page.locator('.year-focus')).toHaveCount(4);await page.getByRole('button',{name:'ถึงจุดตัดสินใจถัดไป (สูงสุด 10 ปี)',exact:true}).click();expect((await snapshot(page)).age).toBe(6);await expect(page.locator('.major-option')).toHaveCount(5);
 await page.locator('.major-option').first().click();await page.getByRole('button',{name:'อ่านเรื่องแบบละเอียด (ทางเลือก)',exact:true}).click();await page.getByRole('button',{name:'อ่านต่อ',exact:true}).click();await expect(page.locator('.choice-card')).toHaveCount(2);await page.getByRole('button',{name:'กลับหน้าชีวิตรายปี',exact:true}).click();expect((await snapshot(page)).age).toBe(6);
});
test('autoplay stops at decisions, overlays, hidden tabs and reload without any active persistence',async({page})=>{
 await page.clock.install();await start(page);await page.getByRole('button',{name:'8×',exact:true}).click();await page.getByRole('button',{name:'เล่นอัตโนมัติ',exact:true}).click();await page.clock.runFor(1500);expect((await snapshot(page)).age).toBe(1);
 await page.getByRole('button',{name:'แผนที่และบริการ',exact:true}).click();await page.clock.runFor(10000);expect((await snapshot(page)).age).toBe(1);await page.getByRole('button',{name:'เส้นทางชีวิต',exact:true}).click();
 await page.getByRole('button',{name:'เล่นอัตโนมัติ',exact:true}).click();await page.clock.runFor(10000);expect((await snapshot(page)).age).toBe(6);await expect(page.locator('.major-option')).toHaveCount(5);await page.reload();await page.clock.runFor(10000);expect(await snapshot(page)).toBeNull();expect(await page.evaluate(()=>localStorage.length)).toBe(0);
});
test('stale action and rejected childhood work preserve the in-memory state atomically',async({page})=>{
 await start(page);const before=await snapshot(page);expect(await page.evaluate(()=>Game.perform({type:'careerJob',token:`${Game.snapshot.run.id}:${Game.snapshot.life.revision}:${Game.snapshot.time.absoluteDay}`}))).toBe(false);expect(await snapshot(page)).toEqual(before);
 await page.getByRole('button',{name:'ใช้ชีวิตต่อ 1 ปี',exact:true}).evaluate(b=>{b.click();b.click();});expect((await snapshot(page)).age).toBe(1);await reachAge(page,8);expect((await snapshot(page)).age).toBe(8);expect(await page.evaluate(()=>localStorage.length)).toBe(0);
});
