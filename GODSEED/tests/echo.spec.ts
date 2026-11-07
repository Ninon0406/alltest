import {test,expect} from '@playwright/test';
import {enterEcho,reachEchoTrial,winEcho} from './echo-helpers';
import {takeLife,clickLife,learnBothPaths,completeOpening,choiceLabel} from './life-helpers';
import {exportFile,exportedState,loadFile,reloadFromFile} from './file-helpers';
test.use({hasTouch:true});test.setTimeout(180_000);
const canvas=(page:import('@playwright/test').Page)=>page.locator('#canvas');

test('390: earned Light, announced Echo core, native mid-battle file, conditional flee and real victory',async({page})=>{
 await page.setViewportSize({width:390,height:844});const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));await enterEcho(page);await reachEchoTrial(page);
 const start=await exportedState(page);await takeLife(page,'CH2101');await expect(canvas(page)).toHaveAttribute('data-stage-layers','3');await expect(canvas(page)).toHaveAttribute('data-npc','echo-knot-v15');
 await expect(page.locator('.battle-intent')).toContainText('ฟังหนึ่งจังหวะแรก');await expect(page.getByRole('button',{name:'ถอยออกมาเตรียมตัว',exact:true})).toHaveCount(0);
 await clickLife(page,'วายุดารานำวิถี · MP 10');await expect(page.locator('.battle-intent')).toContainText('ทวนธาตุวายุ');await expect(canvas(page)).toHaveAttribute('data-echo-exit','true');
 const active=await exportedState(page);expect(active.flags.echo_trial_resolved).not.toBe(true);await reloadFromFile(page);expect(await exportedState(page)).toEqual(active);
 await clickLife(page,'ถอยออกมาเตรียมตัว');expect((await exportedState(page)).flags.echo_trial_resolved).not.toBe(true);await takeLife(page,'CH2101');await winEcho(page);
 const won=await exportedState(page);expect(won.flags.battle_B04_done).toBe(true);expect(won.flags.echo_trial_resolved).toBe(true);expect(won.xp).toBe(start.xp+20);expect(won.inventory.CORE_ECHO).toBe((start.inventory.CORE_ECHO||0)+1);
 await page.screenshot({path:'test-results/echo-victory-390.png',fullPage:true});await takeLife(page,'CHE_RESULT_SAMPLE','CHE_SAMPLE_TAKE','CHE_RECORD_CARE','CHE_MAREN_STAY','CHE_LUMI_PAUSE','CHE_CLOSE_PIERCE');
 const done=await exportedState(page);expect(done.flags.echo_expedition_complete).toBe(true);await reloadFromFile(page);expect(await exportedState(page)).toEqual(done);await clickLife(page,'ความทรงจำ');await expect(page.locator('#content')).toContainText('เสียงที่ยอมฟังเสียงอื่น · สำเร็จ');expect(errors).toEqual([]);
});

test('844 landscape: cooperating with Eira reaches a complete knowledge conclusion without a fake win',async({page})=>{
 await page.setViewportSize({width:844,height:390});await enterEcho(page,'/',false);await takeLife(page,'CHE_ROAD_TRACK','CHE_TRACK_WAIT','CHE_ARCH_GAP','CHE_LISTEN_NOTE','CHE_SIGNAL_TEAM','CH2102');
 const before=await exportedState(page);expect(before.flags.echo_trial_resolved).not.toBe(true);await takeLife(page,'CHE_BYPASS_WAIT','CHE_RESULT_RECORD','CHE_RECORD_KNOWLEDGE','CHE_REPORT_COPY','CHE_LUMI_TRY','CHE_CLOSE_LINGER');
 const s=await exportedState(page);expect(s.flags.echo_expedition_complete).toBe(true);expect(s.flags.echo_resolved_by_listening).toBe(true);expect(s.flags.battle_B04_done).not.toBe(true);expect(s.rewarded).not.toContain('win:B04_ECHO_KNOT');expect(s.inventory.CORE_ECHO).toBe(before.inventory.CORE_ECHO);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);await page.screenshot({path:'test-results/echo-knowledge-844.png',fullPage:true});
});

test('1366: both earned life paths open field choices and abilities in the new actual encounter',async({page})=>{
 await page.setViewportSize({width:1366,height:768});await completeOpening(page);await learnBothPaths(page);await takeLife(page,'CHE_HUB','CHE_CALL_PREP','CHE_PACK_TAKE','CHE_RECIPE_CRAFT');await page.getByLabel('แก่นธาตุ').selectOption('LIGHT');await clickLife(page,'ผสมและค้นพบเวท');await takeLife(page,'CHE_RECIPE_LIGHT','CHE_ROAD_MAP','CHE_TRACK_WATER','CHE_WATER_ROOT','CHE_ARCH_READ','CHE_LISTEN_PAUSE','CHE_SIGNAL_TEAM','CH2101');
 await clickLife(page,'ตั้งรับ · ฟื้น MP 6');await clickLife(page,'สำรวจจังหวะ · MP 4');const s=await exportedState(page);expect(s.flags.echo_explorer_route).toBe(true);expect(s.flags.echo_nature_shelter).toBe(true);expect(s.battle?.pathActions).toEqual({rootGuardUsed:true,scouted:true});await reloadFromFile(page);expect(await exportedState(page)).toEqual(s);await winEcho(page);await page.screenshot({path:'test-results/echo-paths-1366.png',fullPage:true});
});

test('normal walk, Skip and Reduced Motion arrive at the same real anchor and commit the same state',async({page})=>{
 await page.setViewportSize({width:390,height:844});await enterEcho(page,'/',false);const file=await exportFile(page);
 await clickLife(page,'ลดการเคลื่อนไหว');await page.getByRole('button',{name:choiceLabel('CHE_ROAD_TRACK'),exact:true}).tap();await expect(canvas(page)).toHaveAttribute('data-player-action','walk');await expect(page.getByRole('button',{name:'บันทึกเกมเป็นไฟล์',exact:true})).toBeDisabled();
 await page.screenshot({path:'test-results/echo-walk-390.png',fullPage:true});await page.getByRole('button',{name:'ข้ามแอนิเมชัน',exact:true}).tap();await expect(page.locator('#content')).toHaveAttribute('aria-busy','false');const skipped=await exportedState(page);expect(JSON.parse((await canvas(page).getAttribute('data-player-anchor'))!)).toMatchObject({x:175,y:185,feetY:205,depth:205});
 await loadFile(page,file);await clickLife(page,'ลดการเคลื่อนไหว');await takeLife(page,'CHE_ROAD_TRACK');expect(await exportedState(page)).toEqual(skipped);expect(JSON.parse((await canvas(page).getAttribute('data-player-anchor'))!)).toMatchObject({x:175,y:185,feetY:205,depth:205});await expect(canvas(page)).toHaveAttribute('data-active-effects','0');
});

test('normal enemy VFX echoes the previously announced core and Skip preserves canonical battle feet',async({page})=>{
 await page.setViewportSize({width:390,height:844});await enterEcho(page);await reachEchoTrial(page);await takeLife(page,'CH2101');await clickLife(page,'วายุดารานำวิถี · MP 10');const before=await exportedState(page);
 await clickLife(page,'ลดการเคลื่อนไหว');await page.getByRole('button',{name:'อรุณดารานำวิถี · MP 11',exact:true}).tap();await expect(canvas(page)).toHaveAttribute('data-echo-cast','WIND');
 expect(Number(await canvas(page).getAttribute('data-active-effects'))).toBeGreaterThan(0);await page.screenshot({path:'test-results/echo-counter-wind-390.png',fullPage:true});await page.getByRole('button',{name:'ข้ามแอนิเมชัน',exact:true}).tap();await expect(page.locator('#content')).toHaveAttribute('aria-busy','false');
 const after=await exportedState(page);expect(after.hp).toBe(before.hp-11);expect(after.revision).toBe(before.revision+1);expect(after.battle?.echo?.core).toBe('LIGHT');await expect(canvas(page)).toHaveAttribute('data-active-effects','0');expect(JSON.parse((await canvas(page).getAttribute('data-player-anchor'))!)).toMatchObject({x:130,y:219,feetY:239,depth:239});await expect(page.locator('.battle-intent')).toContainText('ทวนธาตุอรุณ');
});

test('missing dedicated glade art degrades visibly, permits export and retries without progress changes',async({page})=>{
 await page.setViewportSize({width:390,height:844});let block=true;await page.route('**/art-v15/resonator.png',route=>block?route.abort():route.continue());await enterEcho(page,'/',false);
 await expect(canvas(page)).toHaveAttribute('data-asset-errors','1');const before=await exportedState(page);block=false;await clickLife(page,'ลองโหลดภาพอีกครั้ง');await expect(canvas(page)).toHaveAttribute('data-asset-errors','0');expect(await exportedState(page)).toEqual(before);
});

test('repository subpath serves the glade, choice conclusion and manual file without asset errors',async({page})=>{
 await page.setViewportSize({width:360,height:800});const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());});await enterEcho(page,'http://127.0.0.1:4191/alltest/',false);await reachEchoTrial(page);await takeLife(page,'CH2102','CHE_BYPASS_WAIT','CHE_RESULT_RECORD','CHE_RECORD_KNOWLEDGE','CHE_REPORT_LIMIT','CHE_LUMI_PAUSE','CHE_CLOSE_PIERCE');await reloadFromFile(page);expect((await exportedState(page)).flags.echo_expedition_complete).toBe(true);expect(errors).toEqual([]);
});
