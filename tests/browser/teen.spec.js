import {test,expect} from '@playwright/test';
import {start,snapshot,reachAge,openOverlay,closeOverlay,decide,selectCareer} from './helpers.js';
import {pendingDecision} from '../../src/engine/decisions.js';
async function reachDecision(page,id){
 for(let i=0;i<40;i++){const d=pendingDecision(await snapshot(page));if(d?.id===id)return;if(d)await decide(page);else await page.getByRole('button',{name:'ถึงจุดสำคัญ',exact:true}).click();}
 throw Error('Story decision was not reached: '+id);
}
test('actual scholarship tuition, feedback and guided practice share one live wallet and calendar',async({page})=>{
 await start(page);await reachAge(page,12);await openOverlay(page,'อาชีพและการฝึก');await selectCareer(page,'ผู้ดูแลธรรมชาติ');await page.getByRole('button',{name:/^ดูแลสวนและแบ่งผลผลิต/}).click();await closeOverlay(page);
 await reachDecision(page,'teen.application');await decide(page);await reachDecision(page,'teen.funding');await expect(page.locator('.major-option').first()).toContainText('จ่าย 4 เหรียญจริง');
 const before=await snapshot(page);await page.locator('.major-option').first().evaluate(button=>{button.click();button.click();});const enrolled=await snapshot(page);
 expect(enrolled.gold).toBe(before.gold-4);expect(enrolled.time.absoluteDay).toBe(before.time.absoluteDay);expect(enrolled.story.flags.school_enrolled).toBe(true);expect(enrolled.progression.practice).toEqual(before.progression.practice);
 const receipt=page.locator('.year-center>.story-outcome');await receipt.locator('summary').click();await expect(receipt).toContainText('เงินเปลี่ยน -4 เหรียญ');
 await openOverlay(page,'อาชีพและการฝึก');await page.getByRole('combobox',{name:'หัวข้อฝึกพื้นฐาน'}).selectOption('int');await expect(page.locator('.training-quote')).toContainText('รวมคำแนะนำ +1');
 const quote=await page.locator('.training-quote').textContent(),xp=Number(quote.match(/ได้ (\d+) ประสบการณ์/)[1]),previous=await snapshot(page);await page.getByRole('button',{name:'เริ่มฝึกฟรี',exact:true}).click();const trained=await snapshot(page);
 expect(trained.time.absoluteDay).toBe(previous.time.absoluteDay+7);expect(trained.progression.practice.int).toBe((previous.progression.practice.int??0)+xp);expect(trained.run.id).toBe(before.run.id);expect(await page.evaluate(()=>localStorage.length)).toBe(0);
});
test('postponed awakening reaches free community learning without a blocked scholarship',async({page})=>{
 await start(page);await reachAge(page,12,{settleAtTarget:false});await page.locator('.major-option').last().click();await page.getByRole('button',{name:'ถึงจุดสำคัญ',exact:true}).click();
 await expect(page.getByRole('dialog')).toContainText('ห้องเรียนที่ไม่ถามฐานะ');const s=await snapshot(page);expect(s.time.absoluteDay).toBe(162*30);expect(s.progression.awakening.step).toBe(0);expect(s.story.completed).not.toContain('teen.application');await decide(page);expect((await snapshot(page)).story.flags.lesson_basics).toBe(true);expect(await page.evaluate(()=>localStorage.length)).toBe(0);
});
