import assert from 'node:assert/strict';
import {expect} from '@playwright/test';
import {reachAge,snapshot,settle,openOverlay,closeOverlay} from '../tests/browser/helpers.js';
import {findRoute} from '../src/world/travel.js';
import {nextDecisionDay,pendingDecision} from '../src/engine/decisions.js';
import {waitForCharacterImages} from './published-character-check.mjs';

async function roomFor(page,days){
 await closeOverlay(page);await settle(page);
 while(nextDecisionDay(await snapshot(page))-(await snapshot(page)).time.absoluteDay<days){await page.getByRole('button',{name:'ถึงจุดสำคัญ',exact:true}).click();await settle(page);}
}
export async function walkToEquipmentShop(page){
 for(let i=0;i<30;i++){
  let s=await snapshot(page);if(s.world.currentLocationId==='capital')return;
  const next=findRoute(s,'capital','walk').path[1],route=findRoute(s,next,'walk');await roomFor(page,route.days);
  s=await snapshot(page);if(s.stamina<route.days*2){await roomFor(page,2);await openOverlay(page,'อาชีพและการฝึก');await page.getByRole('button',{name:/^พักฟื้น 2 วัน/}).click();continue;}
  await openOverlay(page,'วางแผนเดินทาง');await page.getByRole('combobox',{name:'จุดหมายการเดินทาง'}).selectOption(next);await page.getByRole('button',{name:/^เดินเท้ากับผู้ร่วมทาง/}).click();
  assert.equal((await snapshot(page)).world.currentLocationId,next);
 }throw Error('Could not reach actual equipment shop');
}
export async function equipmentPlaythrough(page,{screenshot}={}){
 await reachAge(page,12);await walkToEquipmentShop(page);
 // Every coin comes from birth or actual community work; no injected wallet, ages or gear.
 while((await snapshot(page)).gold<30){await roomFor(page,1);const s=await snapshot(page);if(s.stamina<10){await roomFor(page,2);await openOverlay(page,'อาชีพและการฝึก');await page.getByRole('button',{name:/^พักฟื้น 2 วัน/}).click();}else{await openOverlay(page,'งานและรายได้');await page.getByRole('button',{name:/^ช่วยงานชุมชน/}).click();}}
 await roomFor(page,1);await openOverlay(page,'ร้านค้าและเสบียง');const before=await snapshot(page);
 await page.getByRole('button',{name:'ซื้อไม้ฝึกปลายมน',exact:true}).evaluate(button=>{button.click();button.click();});
 let s=await snapshot(page);assert.equal(s.gold,before.gold-12);assert.equal(s.time.absoluteDay,before.time.absoluteDay+1);assert.deepEqual(s.equipment.owned,['practice_staff']);assert.equal(s.equipment.equipped.mainHand,null);await expect(page.locator('#panelNotice')).toContainText('เปลี่ยนไป');
 await roomFor(page,1);await openOverlay(page,'ร้านค้าและเสบียง');await page.getByRole('button',{name:'ซื้อเสื้อคลุมเดินทาง',exact:true}).click();
 const owned=await snapshot(page);await openOverlay(page,'กระเป๋า');await page.locator('.equipment>summary').click();
 await page.getByRole('button',{name:'สวมไม้ฝึกปลายมน',exact:true}).click();await page.getByRole('button',{name:'สวมเสื้อคลุมเดินทาง',exact:true}).click();
 s=await snapshot(page);assert.equal(s.equipment.equipped.mainHand,'practice_staff');assert.equal(s.equipment.equipped.body,'travel_coat');assert.deepEqual(s.stats,owned.stats);assert.deepEqual(s.appearance,before.appearance);assert.deepEqual(s.wardrobe,before.wardrobe);assert.deepEqual(s.time,owned.time);assert.equal(s.gold,owned.gold);assert.equal(s.stamina,owned.stamina);assert.equal(s.maxStamina,owned.maxStamina);
 await expect(page.locator('.scene-character [data-equipment-id="practice_staff"]')).toHaveCount(1);await expect(page.locator('.scene-character [data-equipment-id="travel_coat"]')).toHaveCount(1);await expect(page.locator('#txtStamina')).toContainText(`/${s.maxStamina+10}`);await waitForCharacterImages(page);
 await expect(page.locator('.equipment')).toHaveAttribute('open','');assert(await page.getByRole('dialog').evaluate(d=>d.scrollWidth<=d.clientWidth));
 for(const img of await page.locator('.equipment-item img').all()){await img.scrollIntoViewIfNeeded();await expect.poll(()=>img.evaluate(i=>i.complete&&i.naturalWidth===64&&i.naturalHeight===80)).toBe(true);}
 if(screenshot){await page.screenshot({path:screenshot+'-bag.png'});await closeOverlay(page);await page.screenshot({path:screenshot+'-scene.png'});}
 await roomFor(page,7);await openOverlay(page,'อาชีพและการฝึก');await page.getByRole('combobox',{name:'หัวข้อฝึกพื้นฐาน'}).selectOption('str');await expect(page.locator('.training-quote')).toContainText('อุปกรณ์ +1');
 const text=await page.locator('.training-quote').textContent(),xp=Number(text.match(/ได้ (\d+) ประสบการณ์/)[1]),prePractice=await snapshot(page);
 // Restore resources using the existing rest action if the actual journey left too little stamina.
 if(prePractice.stamina<15||prePractice.progression.fatigue>=80||prePractice.progression.focus<20){await page.getByRole('button',{name:/^พักฟื้น 2 วัน/}).click();await roomFor(page,7);await openOverlay(page,'อาชีพและการฝึก');await page.getByRole('combobox',{name:'หัวข้อฝึกพื้นฐาน'}).selectOption('str');}
 const practice=await snapshot(page),actualXp=Number((await page.locator('.training-quote').textContent()).match(/ได้ (\d+) ประสบการณ์/)[1]);assert(xp>0);await page.getByRole('button',{name:'เริ่มฝึกฟรี',exact:true}).click();
 s=await snapshot(page);assert.equal(s.progression.practice.str,(practice.progression.practice.str??0)+actualXp);assert.equal(s.time.absoluteDay,practice.time.absoluteDay+7);assert.deepEqual(s.progression.awakening.result,before.progression.awakening.result);
 await roomFor(page,1);if((await snapshot(page)).stamina<8){await roomFor(page,2);await openOverlay(page,'อาชีพและการฝึก');await page.getByRole('button',{name:/^พักฟื้น 2 วัน/}).click();}
 await roomFor(page,1);await openOverlay(page,'งานและรายได้');const preWork=await snapshot(page);await expect(page.getByRole('button',{name:/^ช่วยงานชุมชน/})).toContainText('ความอึด 8');await page.getByRole('button',{name:/^ช่วยงานชุมชน/}).click();s=await snapshot(page);assert.equal(s.gold,preWork.gold+4);assert.equal(s.stamina,preWork.stamina-8);assert.equal(s.time.absoluteDay,preWork.time.absoluteDay+1);
 await roomFor(page,1);await openOverlay(page,'กระเป๋า');await page.locator('.equipment>summary').click();await page.getByRole('button',{name:'ถอดไม้ฝึกปลายมน',exact:true}).click();await page.getByRole('button',{name:'ถอดเสื้อคลุมเดินทาง',exact:true}).click();
 await expect(page.locator('.scene-character [data-equipment-id]')).toHaveCount(0);s=await snapshot(page);assert(s.stamina<=s.maxStamina);await openOverlay(page,'ร้านค้าและเสบียง');const sale=await snapshot(page);await page.getByRole('button',{name:'ขายคืนไม้ฝึกปลายมน',exact:true}).click();
 s=await snapshot(page);assert.equal(s.gold,sale.gold+6);assert.equal(s.time.absoluteDay,sale.time.absoluteDay+1);assert(!s.equipment.owned.includes('practice_staff'));assert.equal(s.power.level,1);assert.equal(await page.evaluate(()=>localStorage.length),0);assert(!pendingDecision(before));
 await closeOverlay(page);await page.reload();await expect(page.locator('#birthScreen')).toBeVisible();assert.equal(await snapshot(page),null);assert.equal(await page.evaluate(()=>localStorage.length),0);
}
