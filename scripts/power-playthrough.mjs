import assert from 'node:assert/strict';
import {expect} from '@playwright/test';
import {reachAge,selectCareer,openOverlay,closeOverlay,snapshot,decide} from '../tests/browser/helpers.js';
import {pendingDecision} from '../src/engine/decisions.js';
import {powerReady,powerCost,powerTitle} from '../src/progression/power-model.js';
export async function powerPlaythrough(page,{choice='steady',screenshot}={}){
 await reachAge(page,12);await openOverlay(page,'อาชีพและการฝึก');await selectCareer(page,'ผู้ดูแลธรรมชาติ');const before=await snapshot(page);assert.equal(before.power.level,1);
 await page.getByRole('button',{name:'ฝึกประสานพลัง 7 วัน',exact:true}).click();let s=await snapshot(page);assert.equal(s.time.absoluteDay,before.time.absoluteDay+7);assert.equal(s.power.practiceDays,7);assert.equal(s.power.xp,12);assert.equal(s.gold,before.gold);assert.deepEqual(s.progression.awakening.result,before.progression.awakening.result);
 await openOverlay(page,'เปลี่ยนแผน');await page.getByRole('button',{name:/^ฝึกประสานพลัง /}).click();
 for(let i=0;i<50&&!powerReady(await snapshot(page));i++){
  s=await snapshot(page);if(pendingDecision(s))await decide(page);else{await closeOverlay(page);await page.getByRole('button',{name:'ใช้ชีวิตต่อ 1 ปี',exact:true}).click();}
 }
 s=await snapshot(page);assert(powerReady(s));assert.equal(s.power.level,9);assert.equal(s.power.xp,powerCost(9));assert.equal(s.yearly.reports.at(-1).endDay,s.time.absoluteDay);await expect(page.locator('.scene-character [data-power-milestone="5"]')).toHaveCount(1);await expect(page.getByRole('button',{name:'เล่นอัตโนมัติ',exact:true})).toBeDisabled();
 if(screenshot){await closeOverlay(page);await page.screenshot({path:screenshot+'-ready.png'});await openOverlay(page,'ตัดสินใจตอนนี้');}
 const pending=await snapshot(page);await page.getByRole('button',{name:/^พักเรื่องนี้แล้วใช้ชีวิตด้านอื่นก่อน/}).click();s=await snapshot(page);assert.equal(s.time.absoluteDay,pending.time.absoluteDay);assert.equal(s.power.level,9);assert.equal(s.yearly.focus,'balanced');assert.equal(s.power.deferred,true);
 await openOverlay(page,'อาชีพและการฝึก');for(let i=0;i<3;i++){const old=await snapshot(page);await page.getByRole('button',{name:/^พักฟื้น 2 วัน/}).click();assert.equal((await snapshot(page)).time.absoluteDay,old.time.absoluteDay+2);}
 const recovered=await snapshot(page);await page.getByRole('button',{name:'กลับสู่บททดสอบพลัง',exact:true}).click();await page.getByRole('button',{name:'พิจารณาบททดสอบพลัง',exact:true}).click();await page.getByRole('button',{name:choice==='steady'?/^ยืนยันด้วยจังหวะร่างกายที่ฝึกมา/:/^ประสานลมหายใจกับบันทึกการฝึก/}).click();
 s=await snapshot(page);assert.equal(s.power.level,10);assert.equal(s.power.certification,choice);assert.equal(s.time.absoluteDay,recovered.time.absoluteDay);assert.equal(s.maxStamina,recovered.maxStamina+(choice==='steady'?5:0));assert.equal(s.maxMana,recovered.maxMana+(choice==='reflect'?5:0));assert.equal(s.stamina,recovered.stamina-(choice==='steady'?15:0));assert.equal(s.mana,recovered.mana-(choice==='reflect'?10:0));
 await expect(page.locator('#displayPower')).toHaveText('Lv. 10 / 100');await expect(page.locator('#displayPower')).toHaveAttribute('title',powerTitle(s));await expect(page.locator('.scene-character [data-power-milestone="10"]')).toHaveCount(1);await expect(page.locator('.scene-character [data-equipment-id]')).toHaveCount(0);
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Power header overflow');
 await openOverlay(page,'อาชีพและการฝึก');await expect(page.locator('.power-panel')).toContainText('ขอบเขตเริ่มต้นสมบูรณ์');await expect(page.getByRole('button',{name:'ฝึกประสานพลัง 7 วัน',exact:true})).toHaveCount(0);assert(await page.getByRole('dialog').evaluate(d=>d.scrollWidth<=d.clientWidth));
 if(screenshot){await page.screenshot({path:screenshot+'-power.png'});await closeOverlay(page);await page.screenshot({path:screenshot+'-complete.png'});await openOverlay(page,'อาชีพและการฝึก');}
 await expect(page.getByRole('button',{name:/^ดูแลสวนและแบ่งผลผลิต/})).toContainText('ความอึด 14');const work=await snapshot(page);await page.getByRole('button',{name:/^ดูแลสวนและแบ่งผลผลิต/}).click();assert.equal((await snapshot(page)).stamina,work.stamina-14);assert.equal((await snapshot(page)).time.absoluteDay,work.time.absoluteDay+7);assert.equal(await page.evaluate(()=>localStorage.length),0);
 await closeOverlay(page);await page.reload();await expect(page.locator('#birthScreen')).toBeVisible();assert.equal(await snapshot(page),null);assert.equal(await page.evaluate(()=>localStorage.length),0);
}
