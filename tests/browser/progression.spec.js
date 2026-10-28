import {test,expect} from '@playwright/test';
import {start,snapshot,reachAge,awaken,openOverlay,closeOverlay} from './helpers.js';
test('real infancy-to-awakening career work and practice work in memory with blocked storage',async({page})=>{
 await page.addInitScript(()=>{Storage.prototype.setItem=()=>{throw new DOMException('blocked','SecurityError');};});await start(page);const birth=(await snapshot(page)).birth;await awaken(page);const measured=(await snapshot(page)).progression.awakening.result;
 await openOverlay(page,'อาชีพและการฝึก');await page.getByRole('button',{name:'เลือกอาชีพ ผู้ดูแลธรรมชาติ',exact:true}).click();const before=await snapshot(page);
 await page.getByRole('button',{name:/^ดูแลสวนและแบ่งผลผลิต/}).click();expect((await snapshot(page)).gold).toBe(before.gold+8);await page.getByRole('button',{name:'เริ่มฝึกฟรี',exact:true}).click();expect((await snapshot(page)).progression.practice.wis).toBeGreaterThan(0);
 await closeOverlay(page);expect((await snapshot(page)).progression.awakening.result).toEqual(measured);expect((await snapshot(page)).birth).toEqual(birth);expect(await page.evaluate(()=>localStorage.length)).toBe(0);
});
test('actual map routes update the same run exactly once',async({page})=>{
 await start(page);await reachAge(page,12);await page.locator('.major-option').last().click();await page.getByRole('button',{name:'แผนที่และบริการ',exact:true}).click();
 const current=(await snapshot(page)).world.currentLocationId;const destination=await page.getByRole('combobox',{name:'เลือกสถานที่ที่รู้จัก'}).evaluate((select,current)=>[...select.options].find(o=>o.value!==current).value,current);await page.getByRole('combobox',{name:'เลือกสถานที่ที่รู้จัก'}).selectOption(destination);
 // The destination is a real revealed neighbor; use the actual available quote.
 const travel=page.getByRole('button',{name:/^เดินเท้าพร้อมผู้ร่วมทาง/});const direct=page.getByRole('button',{name:'เดินทางตามเส้นทางนี้',exact:true});
 const before=await snapshot(page);if(await travel.count())await travel.click();else if(await direct.count())await direct.click();const after=await snapshot(page);expect(after.run.id).toBe(before.run.id);expect(after.time.absoluteDay).toBeGreaterThan(before.time.absoluteDay);
 expect(after.world.currentLocationId).not.toBe(before.world.currentLocationId);expect(after.gold).toBeLessThanOrEqual(before.gold);expect(await page.evaluate(()=>localStorage.length)).toBe(0);
});
