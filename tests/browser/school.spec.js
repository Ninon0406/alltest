import {test,expect} from '@playwright/test';
import {start,snapshot,decide,reachAge,openOverlay,closeOverlay} from './helpers.js';
import {pendingDecision} from '../../src/engine/decisions.js';
async function reachDecision(page,id){
 for(let i=0;i<90;i++){
  const d=pendingDecision(await snapshot(page));if(d?.id===id)return;
  if(d)await decide(page);else await page.getByRole('button',{name:'ถึงจุดสำคัญ',exact:true}).click();
 }
 throw Error('School story not reached: '+id);
}
test('untrained children see honest gates, actual feedback and a free route through preparation to the ritual',async({page})=>{
 await start(page);await reachDecision(page,'child.fair');const before=await snapshot(page);
 expect(before.time.absoluteDay).toBe(126*30);await expect(page.locator('.major-option').first()).toBeDisabled();await expect(page.locator('.major-option').first()).toContainText('ต้องเคยฝึกพื้นฐานจริง');
 await expect(page.getByRole('button',{name:'เล่นอัตโนมัติ',exact:true})).toBeDisabled();await decide(page);
 const after=await snapshot(page);expect(after.gold).toBe(before.gold);expect(after.time).toEqual(before.time);expect(after.progression.practice).toEqual(before.progression.practice);expect(after.story.flags.child_fair_host).toBe(true);
 const receipt=page.locator('.year-center>.story-outcome');await receipt.locator('summary').click();await expect(receipt).toContainText('ช่วยครูแบ่งพื้นที่');
 await reachDecision(page,'child.eve');await expect(page.locator('.major-option').first()).toBeDisabled();await expect(page.locator('.major-option').first()).toContainText('ต้องมีบันทึก');
 await page.locator('.major-option').last().click();await reachAge(page,12);const finished=await snapshot(page);
 expect(finished.story.flags.ready_rest).toBe(true);expect(finished.progression.awakening.step).toBe(7);expect(finished.power.level).toBe(1);expect(finished.world.currentLocationId).toBe(before.world.currentLocationId);expect(await page.evaluate(()=>localStorage.length)).toBe(0);
});
test('real practice opens the school exhibition and its record unlocks guided preparation without instant XP',async({page})=>{
 await start(page);await reachAge(page,8);await openOverlay(page,'อาชีพและการฝึก');
 await page.getByRole('combobox',{name:'หัวข้อฝึกพื้นฐาน'}).selectOption('per');const before=await snapshot(page);await page.getByRole('button',{name:'เริ่มฝึกฟรี',exact:true}).click();expect((await snapshot(page)).time.absoluteDay).toBe(before.time.absoluteDay+7);await closeOverlay(page);
 await reachDecision(page,'child.fair');await expect(page.locator('.major-option').first()).toBeEnabled();const practiced=await snapshot(page);await decide(page);
 expect((await snapshot(page)).story.flags.child_shown_practice).toBe(true);expect((await snapshot(page)).progression.practice).toEqual(practiced.progression.practice);
 await reachDecision(page,'child.eve');await expect(page.locator('.major-option').first()).toBeEnabled();const old=await snapshot(page);await decide(page);const guided=await snapshot(page);
 expect(guided.story.flags.ready_diary).toBe(true);expect(guided.progression.practice).toEqual(old.progression.practice);expect(guided.time).toEqual(old.time);
 await openOverlay(page,'อาชีพและการฝึก');await page.getByRole('combobox',{name:'หัวข้อฝึกพื้นฐาน'}).selectOption('wis');await expect(page.locator('.training-quote')).toContainText('รวมคำแนะนำ +1');
 const quote=await page.locator('.training-quote').textContent(),xp=Number(quote.match(/ได้ (\d+) ประสบการณ์/)[1]);await page.getByRole('button',{name:'เริ่มฝึกฟรี',exact:true}).click();const trained=await snapshot(page);
 expect(trained.time.absoluteDay).toBe(guided.time.absoluteDay+7);expect(trained.progression.practice.wis).toBe((guided.progression.practice.wis??0)+xp);expect(trained.power.level).toBe(1);expect(await page.evaluate(()=>localStorage.length)).toBe(0);
});
