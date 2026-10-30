import {test,expect} from '@playwright/test';
import {startV8,v8Snapshot,playV8Until,finishV8} from '../../scripts/v8-playthrough.mjs';
import {v8Decision} from '../../src/engine/v8-model.js';

test('career episodes pause at the real date, defer/resume freely and reject duplicate work',async({page})=>{
 test.setTimeout(90000);await page.setViewportSize({width:320,height:844});await startV8(page,{seed:0});
 const s=await playV8Until(page,{eventId:'career.smith.1',awaken:true,careerId:'smith',focus:'rest'});expect(s.time.absoluteDay-s.time.birthAbsoluteDay).toBe(150*30);expect(s.progression.records.smith.arcStep).toBe(0);
 const first=page.locator('[data-choice-id="career.smith.1.1"]'),box=await first.boundingBox();expect(box.height).toBeGreaterThanOrEqual(44);expect(box.y+box.height).toBeLessThanOrEqual(844);await page.screenshot({path:`work/v8-career-arc-${test.info().project.name}.png`});
 await page.locator('[data-choice-id="career:pause"]').click();const paused=await v8Snapshot(page);expect(paused.time).toEqual(s.time);expect(paused.progression).toEqual(s.progression);
 await page.getByRole('button',{name:'ดำเนินชีวิตต่อ',exact:true}).click();await page.getByRole('button',{name:'กลับไปทบทวนงานอาชีพ',exact:true}).click();expect((await v8Snapshot(page)).time).toEqual(s.time);
 await page.locator('[data-choice-id="career.smith.1.1"]').evaluate(b=>{b.click();b.click();});const done=await v8Snapshot(page);expect(done.time.absoluteDay-s.time.absoluteDay).toBe(7);expect(done.progression.records.smith).toMatchObject({xp:10,mastery:5,arcStep:1,trainingBonus:1,payBonus:0});expect(done.power).toEqual(s.power);await expect(page.locator('.v8-outcome')).toContainText('ประสบการณ์อาชีพ +10');expect(await page.evaluate(()=>localStorage.length)).toBe(0);
});

test('earned promotion and vocation work use actual time, capacity, wage and one ledger transaction',async({page})=>{
 test.setTimeout(120000);await startV8(page,{seed:0});const ready=await playV8Until(page,{eventId:'v8.promotion:smith',awaken:true,careerId:'smith',focus:'study'});
 expect(ready.progression.records.smith).toMatchObject({advanced:false,arcStep:3});expect(ready.power.practiceDays).toBe(0);expect(ready.time.absoluteDay-ready.time.birthAbsoluteDay).toBe(222*30);
 await page.locator('[data-choice-id="career:promote"]').evaluate(b=>{b.click();b.click();});const promoted=await v8Snapshot(page);expect(promoted.maxHp).toBe(ready.maxHp+15);expect(promoted.hp).toBe(ready.hp+15);expect(promoted.time.absoluteDay).toBe(ready.time.absoluteDay+7);expect(promoted.progression.records.smith.advanced).toBe(true);expect(promoted.power).toEqual(ready.power);
 const job=await playV8Until(page,{eventId:'v8.broken-tools',awaken:true,careerId:'smith',focus:'study',storyPath:'vocation'}),q=v8Decision(job).choices.find(c=>c.id==='repair');
 await expect(page.locator('[data-choice-id="repair"]')).toContainText(`ค่าจ้างจริง +${q.earnedGold}`);await page.locator('[data-choice-id="repair"]').evaluate(b=>{b.click();b.click();});const after=await v8Snapshot(page);expect(after.gold).toBe(job.gold+q.earnedGold);expect(after.time.absoluteDay).toBe(job.time.absoluteDay+7);expect(after.stamina).toBe(job.stamina-q.stamina);expect(after.world.ledger.length).toBe(job.world.ledger.length+1);expect(after.progression.records.smith.xp).toBe(job.progression.records.smith.xp+q.skillXp);expect(after.power.practiceDays).toBe(0);expect(await page.evaluate(()=>localStorage.length)).toBe(0);
});

test('four genuine professional lives reach distinct epilogues without cultivating power',async({page})=>{
 test.setTimeout(180000);const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const [careerId,seed,endingId]of [['farmer',0,'v8.seedbank'],['healer',2,'v8.consent'],['smith',0,'v8.repairs'],['scholar',1,'v8.margins']]){
  await startV8(page,{seed});const s=await finishV8(page,{awaken:true,careerId,focus:'study',storyPath:'vocation',policy:0});expect(s.run.endingId).toBe(endingId);expect(s.progression.records[careerId].advanced).toBe(true);expect(s.progression.records[careerId].arcStep).toBe(3);expect(s.power.practiceDays).toBe(0);expect(s.age).toBe(s.birth.lifespan);await expect(page.locator(`.v8-final[data-ending-id="${endingId}"]`)).toBeVisible();
 }
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('reborn_finished_lives_v1')).lives.length)).toBe(4);expect(await page.evaluate(()=>localStorage.getItem('reborn_save'))).toBeNull();expect(errors).toEqual([]);
});
