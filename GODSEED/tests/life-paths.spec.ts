import {test,expect} from '@playwright/test';
import {completeOpening,learnBothPaths,clickLife,takeLife,choiceLabel,winTraining} from './life-helpers';
import {exportFile,exportedState,loadFile} from './file-helpers';
test.setTimeout(180_000);test.use({hasTouch:true});

for(const [width,height] of [[390,844],[844,390],[820,1180],[1024,768],[1366,768]])test(`two introductory paths, earned abilities and manual file ${width}`,async({page})=>{
 await page.setViewportSize({width,height});const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await completeOpening(page);const state=await learnBothPaths(page);
 await clickLife(page,'เส้นทางชีวิต');for(const id of ['EXPLORER','NATURE_KEEPER'])await expect(page.locator(`[data-life-path="${id}"]`)).toHaveAttribute('data-rank','2');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 await page.screenshot({path:`test-results/life-paths-${width}.png`,fullPage:true});
 const file=await exportFile(page);await page.reload();await expect(page.getByRole('button',{name:'เริ่มการเดินทาง',exact:true})).toBeVisible();await loadFile(page,file);expect(await exportedState(page)).toEqual(state);
 await clickLife(page,'ความทรงจำ');await expect(page.locator('#content')).toContainText('แผนที่สำหรับคนที่เดินตาม · สำเร็จ');await expect(page.locator('#content')).toContainText('น้ำหนึ่งบัวที่ถึงราก · สำเร็จ');expect(errors).toEqual([]);
});
test('source anchors, watering beat, trial exit and cross learning are consistent with the lesson',async({page})=>{
 await completeOpening(page);await takeLife(page,'CHLP_HUB','CHLP_START_NATURE','CHLP_N_BEGIN','CHLP_N_SOURCE_CLEAR');
 // Before a first foundation is certified the other path remains locked.
 await clickLife(page,'เส้นทางชีวิต');await expect(page.locator('[data-life-path="EXPLORER"] .life-path-lock')).toContainText('จบพื้นฐานขั้น 1');await clickLife(page,'กลับสู่เรื่องราว');
 await clickLife(page,'ลดการเคลื่อนไหว');await page.getByRole('button',{name:choiceLabel('CHLP_N_WATER_BUCKET'),exact:true}).click();
 const canvas=page.locator('#canvas');await expect(canvas).toHaveAttribute('data-garden-beat','watering',{timeout:15_000});await expect(canvas).toHaveAttribute('data-player-action','water');await expect(canvas).toHaveAttribute('data-target-anchor','herb_bed_front');
 await page.screenshot({path:'test-results/life-watering-390.png',fullPage:true});await clickLife(page,'ข้ามแอนิเมชัน');await expect(canvas).toHaveAttribute('data-garden-growth','bloom');await clickLife(page,'ลดการเคลื่อนไหว');
 await takeLife(page,'CHLP_N_ACK_PATIENCE','CHLP_N_TRIAL_START');expect((await exportedState(page)).flags.lp_nature_trial_passed).not.toBe(true);
 await clickLife(page,'ยุติการฝึก');expect((await exportedState(page)).flags.lp_nature_trial_passed).not.toBe(true);await takeLife(page,'CHLP_N_TRIAL_BACK');
 await expect(page.getByRole('button',{name:choiceLabel('CHLP_START_EXPLORER'),exact:true})).toBeEnabled();
 await takeLife(page,'CHLP_RESUME_NATURE','CHLP_N_TRIAL_START');await winTraining(page);expect((await exportedState(page)).flags.lp_nature_trial_passed).toBe(true);
});
test('scouting, first-guard roots, active-status file and ward penetration work through the battle UI',async({page})=>{
 await completeOpening(page);await learnBothPaths(page);await takeLife(page,'CH0210','CH0210','CH0207','CH1502');
 await clickLife(page,'ตั้งรับ · ฟื้น MP 6');let s=await exportedState(page);expect(s.battle!.pathActions?.rootGuardUsed).toBe(true);expect(s.battle!.shield).toBeGreaterThan(0);
 await clickLife(page,'ตั้งรับ · ฟื้น MP 6');await clickLife(page,'สำรวจจังหวะ · MP 4');s=await exportedState(page);expect(s.battle!.playerStatus.TRAIL_FOCUS).toBe(2);expect(s.battle!.status.RUNE_WARD).toBeGreaterThan(0);
 const file=await exportFile(page);await page.reload();await loadFile(page,file);expect(await exportedState(page)).toEqual(s);await expect(page.getByRole('button',{name:'สำรวจจังหวะ · MP 4',exact:true})).toBeDisabled();
 await page.screenshot({path:'test-results/life-battle-390.png',fullPage:true});await clickLife(page,'วายุดารานำวิถี · MP 10');const hit=await exportedState(page);expect(hit.battle!.enemyHp).toBeLessThan(s.battle!.enemyHp-10);expect(hit.battle!.playerStatus.TRAIL_FOCUS).toBeUndefined();
 await clickLife(page,'ถอยออกมาเตรียมตัว');expect((await exportedState(page)).scene).toBe('S15_RUINS');
});
test('missing path atlas remains playable and explicit retry preserves the RAM snapshot',async({page})=>{
 await page.route('**/assets/art-v14/life-icons.png',r=>r.abort());await completeOpening(page);await expect(page.locator('#canvas')).toHaveAttribute('data-render-status','degraded');const before=await exportedState(page);
 await page.unroute('**/assets/art-v14/life-icons.png');await clickLife(page,'ลองโหลดภาพอีกครั้ง');await expect(page.locator('#canvas')).toHaveAttribute('data-render-status','ready');expect(await exportedState(page)).toEqual(before);
});
test('skipping or reducing a stationary scouting gesture preserves the battle feet and commits one turn',async({page})=>{
 await completeOpening(page);await learnBothPaths(page);await takeLife(page,'CH0210','CH0210','CH0207','CH1502');
 const canvas=page.locator('#canvas');
 for(const method of ['skip','reduce']){
  if(await page.locator('#motion').getAttribute('aria-pressed')==='true')await clickLife(page,'ลดการเคลื่อนไหว');
  const before=await exportedState(page);await expect.poll(async()=>JSON.parse((await canvas.getAttribute('data-player-anchor'))!)).toMatchObject({x:130,y:219,feetY:239,depth:239});
  await page.getByRole('button',{name:'สำรวจจังหวะ · MP 4',exact:true}).tap();await expect(canvas).toHaveAttribute('data-path-ability-beat','SCOUT');
  // Interrupt a live gesture after real rendered frames, rather than before it starts.
  await page.evaluate(()=>new Promise<void>(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve()))));
  await clickLife(page,method==='skip'?'ข้ามแอนิเมชัน':'ลดการเคลื่อนไหว');
  await expect.poll(async()=>JSON.parse((await canvas.getAttribute('data-player-anchor'))!)).toMatchObject({x:130,y:219,feetY:239,depth:239});
  await expect(canvas).toHaveAttribute('data-active-effects','0');const after=await exportedState(page);expect(after.revision).toBe(before.revision+1);expect(after.battle!.turn).toBe(before.battle!.turn+1);expect(after.battle!.playerStatus.TRAIL_FOCUS).toBe(2);
  await clickLife(page,'ถอยออกมาเตรียมตัว');if(method==='skip')await takeLife(page,'CH1502');
 }
});
