import {test,expect} from '@playwright/test';
import {takeLife,clickLife} from './life-helpers';
import {exportFile,exportedState,loadFile,reloadFromFile} from './file-helpers';
import {enterForest,chapterStart,tapChoice} from './forest-helpers';
import {choose,fight} from '../src/systems/game';
import {byId} from '../src/systems/spells';
test.use({hasTouch:true});test.setTimeout(180_000);
const canvas=(p:import('@playwright/test').Page)=>p.locator('#canvas');

test('390: Pip side quest shows the new road, catches the real fruit, spends one and cannot duplicate the reward',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');await clickLife(page,'เริ่มการเดินทาง');await takeLife(page,'CH0001','CH0101','CH0201','CH0301','CH03B1','CHPIP_HUB');
 await expect(canvas(page)).toHaveAttribute('data-stage','forest_road');await expect(canvas(page)).toHaveAttribute('data-render-status','ready');await page.screenshot({path:'test-results/forest-pip-before-390.png',fullPage:true});
 const before=await exportedState(page);await reloadFromFile(page);expect(await exportedState(page)).toEqual(before);await clickLife(page,'ลดการเคลื่อนไหว');await tapChoice(page,'CH2901');await expect(page.locator('#content')).toHaveAttribute('aria-busy','true');await expect(canvas(page)).toHaveAttribute('data-target-anchor','fruit_front');await expect(page.locator('#content')).toHaveAttribute('aria-busy','false');expect(await exportedState(page)).toEqual(choose(before,'CH2901'));
 await clickLife(page,'ลดการเคลื่อนไหว');const picked=await exportedState(page);await takeLife(page,'CHPIP_SHARE','CHPIP_FINISH');expect((await exportedState(page)).inventory.IT_FOREST_FRUIT).toBe(picked.inventory.IT_FOREST_FRUIT-1);
 await clickLife(page,'ความทรงจำ');await expect(page.locator('#content')).toContainText('พิพกับผลไม้ประหลาด · สำเร็จ');await clickLife(page,'เรื่องราว');await takeLife(page,'CHPIP_HUB');await expect(page.getByRole('button',{name:/เดินไปดักแล้วช่วยประคองผลไม้/})).toBeDisabled();
});

test('390: the earned first chapter opens ARC2, actual ward crafting and all three forest resolutions round-trip with one gift',async({page})=>{
 await page.setViewportSize({width:390,height:844});await enterForest(page);await expect(page.locator('.chapter')).toContainText('บทที่สอง');const trial=await exportFile(page);expect(JSON.parse(trial.toString()).chapterId).toBe('CHAPTER_2');expect(JSON.parse(trial.toString()).checkpoint.batchId).toBe('CH2_FOREST_REMEMBERS');expect(JSON.parse(trial.toString()).state.known).toContain('SPELL_BLOOM_WARD_GUARD');
 for(const [pick,back,kind] of [['CHA2_DECIDE_CARE','CHA2_CARE_RETURN','care'],['CHA2_DECIDE_PATH','CHA2_PATH_RETURN','path'],['CHA2_DECIDE_RECORD','CHA2_RECORD_RETURN','record']]){
  await loadFile(page,trial);await takeLife(page,'CHA2_TRIAL_PATIENCE','CHA2_PATIENCE_PASS','CHA2_RESULT_COMPARE','CHA2_TRACE_FAMILY','CHA2_LEGACY_LIMIT',pick);await expect(canvas(page)).toHaveAttribute('data-forest-resolution',kind);await page.screenshot({path:`test-results/forest-${kind}-390.png`,fullPage:true});await reloadFromFile(page);await expect(canvas(page)).toHaveAttribute('data-forest-resolution',kind);
  await takeLife(page,back,'CHA2_RETURN_PAUSE');await expect(page.locator('.chapter')).toContainText('บทที่สอง');await reloadFromFile(page);await expect(page.locator('.chapter')).toContainText('บทที่สอง');await takeLife(page,'CHA2_HUB','CHA2_CALL_RESUME','CHA2_RETURN_MAREN','CHA2_MAREN_LISTEN','CHA2_EIRA_SHARE','CHA2_EPILOGUE_FINISH');const end=await exportedState(page);expect(end.flags.a2_returned).toBe(true);expect(end.flags.battle_B06_done).not.toBe(true);await reloadFromFile(page);expect(await exportedState(page)).toEqual(end);await takeLife(page,'CHA2_REVISIT','CHA2_EPILOGUE_TREE');expect((await exportedState(page)).inventory).toEqual(end.inventory);await takeLife(page,'CH02T2');
 }
 await clickLife(page,'ความทรงจำ');await expect(page.locator('#content')).toContainText('ถนนที่กลับมาเล่าได้ · สำเร็จ');
});

test('390: Weaver turn files, announced sweep, real water counter and victory return to the correct chapter2 scene',async({page})=>{
 await page.setViewportSize({width:390,height:844});await chapterStart(page);await takeLife(page,'CHA2_HUB','CHA2_CALL_PACK','CHA2_PACK_TAKE','CHA2_RECIPE_OPEN');await page.getByLabel('แก่นธาตุ').selectOption('WATER');await page.getByLabel('รูปแบบ').selectOption('ORB');await page.getByLabel('ตัวปรับ').selectOption('SEEK');await clickLife(page,'ผสมและค้นพบเวท');
 await takeLife(page,'CHA2_RECIPE_LEAVE','CHA2_GOODBYE_SKETCH','CHA2_EDGE_PIP','CHA2_PIP_WAIT','CHA2_HOLLOW_TRACE','CHA2_RING_HAND','CHA2_TRIAL_FIGHT');await expect(canvas(page)).toHaveAttribute('data-npc','root-weaver-v17');await expect(page.locator('.battle-intent')).toContainText('ไม่โจมตี');let s=await exportedState(page);await reloadFromFile(page);expect(await exportedState(page)).toEqual(s);
 for(const a of ['BASIC_PULSE','BASIC_PULSE','SPELL_WATER_ORB_SEEK']){if(a.startsWith('SPELL'))await clickLife(page,byId[a].name+' · MP '+byId[a].mp);else await clickLife(page,'ประกายพื้นฐาน · MP 0');s=fight(s,a);expect(await exportedState(page)).toEqual(s);}
 expect(s.battle?.log.join(' ')).toContain('คลายแนวเถา');await reloadFromFile(page);expect(await exportedState(page)).toEqual(s);await page.screenshot({path:'test-results/forest-weaver-390.png',fullPage:true});
 for(let n=0;s.battle&&n<60;n++){const a=s.hp<=25&&s.inventory.IT_POTION_DEW?'IT_POTION_DEW':s.mp>=10?'SPELL_WIND_ORB_SEEK':'GUARD';await clickLife(page,a==='GUARD'?'ตั้งรับ · ฟื้น MP 6':a==='IT_POTION_DEW'?`น้ำค้างฟื้นพลัง · ${s.inventory.IT_POTION_DEW}`:byId[a].name+' · MP '+byId[a].mp);s=fight(s,a);}
 expect(s.scene).toBe('A2_TRIAL_RESULT');expect(s.flags.battle_B06_done).toBe(true);expect(await exportedState(page)).toEqual(s);await expect(page.locator('.chapter')).toContainText('บทที่สอง');await expect(canvas(page)).toHaveAttribute('data-npc','pip');
});

test('1366: a missing forest prop retries without changing the RAM state or chapter checkpoint',async({page})=>{
 await page.setViewportSize({width:1366,height:768});await page.route('**/art-v17/road-oak.png',route=>route.abort());await enterForest(page);await expect(canvas(page)).toHaveAttribute('data-render-status','degraded');const before=await exportedState(page);await page.unroute('**/art-v17/road-oak.png');await clickLife(page,'ลองโหลดภาพอีกครั้ง');await expect(canvas(page)).toHaveAttribute('data-render-status','ready');expect(await exportedState(page)).toEqual(before);
});

test('forest scene and chapter2 file input fit all ten target viewports with no console/asset errors',async({page,browser})=>{
 await page.setViewportSize({width:390,height:844});await enterForest(page);const file=await exportFile(page);
 for(const [width,height] of [[360,800],[390,844],[430,932],[844,390],[768,1024],[820,1180],[1024,768],[1366,768],[1440,900],[1920,1080]]){
  const context=await browser.newContext({baseURL:new URL(page.url()).origin,viewport:{width,height},hasTouch:width<1280,reducedMotion:'reduce'}),p=await context.newPage(),errors:string[]=[];p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error')errors.push(m.text());});p.on('response',r=>{if(r.status()>=400)errors.push(String(r.status())+' '+r.url());});
  try{await p.goto('/');await loadFile(p,file);await expect(canvas(p)).toHaveAttribute('data-stage-layers','3');await expect(canvas(p)).toHaveAttribute('data-render-status','ready');await expect(p.locator('.chapter')).toContainText('บทที่สอง');expect(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await takeLife(p,'CHA2_TRIAL_PATIENCE');await expect(canvas(p)).toHaveAttribute('data-resting','true');await p.screenshot({path:`test-results/forest-layout-${width}.png`,fullPage:true});expect(errors).toEqual([]);}finally{await context.close();}
 }
});

test('390: skipping a normal forest action reaches the same feet, pose and next state',async({page})=>{
 await page.setViewportSize({width:390,height:844});await enterForest(page);const before=await exportedState(page);await clickLife(page,'ลดการเคลื่อนไหว');await tapChoice(page,'CHA2_TRIAL_PATIENCE');const skip=page.getByRole('button',{name:'ข้ามแอนิเมชัน',exact:true});await expect(skip).toBeVisible();await skip.tap();await expect(page.locator('#content')).toHaveAttribute('aria-busy','false');expect(await exportedState(page)).toEqual(choose(before,'CHA2_TRIAL_PATIENCE'));await expect(canvas(page)).toHaveAttribute('data-resting','true');expect(JSON.parse((await canvas(page).getAttribute('data-player-anchor'))!)).toMatchObject({x:110,y:182,feetY:202,depth:205});
});

test('390: a real northbound route passes behind the low oak branch using foot depth',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');await clickLife(page,'เริ่มการเดินทาง');await takeLife(page,'CH0001','CH0101','CH0201','CH0301','CH03B1','CHPIP_HUB');const before=await exportedState(page);await clickLife(page,'ลดการเคลื่อนไหว');await tapChoice(page,'CH2902');await expect(canvas(page)).toHaveAttribute('data-target-anchor','oak_back');await expect(page.locator('#content')).toHaveAttribute('aria-busy','true');const sample=JSON.parse((await canvas(page).getAttribute('data-walk-sample'))!);expect(sample.depth).toBeLessThan(201);expect(sample.animation).toBe('hero-walk-north');await page.screenshot({path:'test-results/forest-oak-occlusion-390.png'});await expect(page.locator('#content')).toHaveAttribute('aria-busy','false');expect(await exportedState(page)).toEqual(choose(before,'CH2902'));
});
