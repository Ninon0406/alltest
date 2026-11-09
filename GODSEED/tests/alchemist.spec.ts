import {test,expect} from '@playwright/test';
import {alchemistPack,graduateAlchemist,studyAlchemist} from './alchemist-helpers';
import {takeLife,clickLife} from './life-helpers';
import {exportFile,exportedState,loadFile,reloadFromFile} from './file-helpers';
import {fight} from '../src/systems/game';
test.use({hasTouch:true});
const canvas=(page:import('@playwright/test').Page)=>page.locator('#canvas');

test('390: three remembered forest routes earn the real alchemist course; delivery and teaching keep their costs and one gift',async({page})=>{
 test.setTimeout(240_000);await page.setViewportSize({width:390,height:844});
 for(const branch of ['care','path','record'] as const){await alchemistPack(page,branch);expect(JSON.parse((await canvas(page).getAttribute('data-player-anchor'))!)).toMatchObject({x:139,y:219,feetY:239});const file=await exportFile(page);expect(JSON.parse(file.toString()).checkpoint.batchId).toBe('CH2_ALCHEMIST_RETURN');
  for(const delivery of ['field','teach'] as const){await loadFile(page,file);const before=await exportedState(page);await takeLife(page,delivery==='field'?'CHALC_PACK_FIELD':'CHALC_PACK_TEACH',delivery==='field'?'CHALC_DELIVER_PAUSE':'CHALC_TEACH_PAUSE');await reloadFromFile(page);await expect(page.locator('.chapter')).toContainText('บทที่สอง');
   await takeLife(page,'CHALC_HUB','CHALC_CALL_RESUME');const ways={care:['CHALC_RETURN_ROOT','CHALC_ROOT_SPACE'],path:['CHALC_RETURN_SIGN','CHALC_SIGN_WALK'],record:['CHALC_RETURN_NOTES','CHALC_NOTES_LIMIT']};await takeLife(page,...ways[branch],'CHALC_PLAN_PACK','CHALC_PACK_RECALL');await expect(page.getByRole('button',{name:/^รับของขอบคุณแล้วกลับไปใช้สิ่งที่เรียน/})).toBeDisabled();
   await takeLife(page,delivery==='field'?'CHALC_EPILOGUE_FIELD':'CHALC_EPILOGUE_TEACH',delivery==='field'?'CHALC_DELIVER_CHECK':'CHALC_TEACH_LIMIT','CHALC_FINISH');const end=await exportedState(page);expect(end.inventory.IT_POTION_DEW).toBe(before.inventory.IT_POTION_DEW-(delivery==='field'?1:0));expect(end.flags.alc_completed).toBe(true);expect(end.flags['a2_resolution_'+branch]).toBe(true);await reloadFromFile(page);expect(await exportedState(page)).toEqual(end);await takeLife(page,'CHALC_REVISIT','CHALC_FINISH');expect((await exportedState(page)).inventory).toEqual(end.inventory);
   if(branch==='care'&&delivery==='field'){await takeLife(page,'CHPIP_HUB');await expect(canvas(page)).toHaveAttribute('data-alchemist-kit','field');await page.screenshot({path:'test-results/alchemist-field-kit-390.png',fullPage:true});}
  }
 }
 await clickLife(page,'ความทรงจำ');await expect(page.locator('#content')).toContainText('สูตรที่เตรียมให้คนถัดไป · สำเร็จ');
});

test('390: the laboratory casts the exact learned Water Ring Heal profile at the cauldron',async({page})=>{
 test.setTimeout(120_000);await page.setViewportSize({width:390,height:844});await studyAlchemist(page);const before=await exportedState(page);expect(before.known).toContain('SPELL_WATER_RING_HEAL');await clickLife(page,'ลดการเคลื่อนไหว');await page.getByRole('button',{name:'สาธิตวงแหวนฟื้นพลังที่ค้นพบแล้ว',exact:true}).tap();await expect(canvas(page)).toHaveAttribute('data-story-beat','CHALC_SAMPLE_CAST');await expect.poll(async()=>Number(await canvas(page).getAttribute('data-active-effects'))).toBeGreaterThan(0);expect(JSON.parse((await canvas(page).getAttribute('data-last-spell-profile'))!)).toEqual({id:'SPELL_WATER_RING_HEAL',core:'WATER',form:'RING',modifier:'HEAL'});expect(JSON.parse((await canvas(page).getAttribute('data-spell-target'))!)).toEqual({kind:'scene',x:240,y:170});await page.screenshot({path:'test-results/alchemist-exact-recipe-390.png'});await expect(page.locator('#content')).toHaveAttribute('aria-busy','false');expect((await exportedState(page)).flags.alc_support_tested).toBe(true);
});

test('390: actual Distill particles target the player, spend one potion and round-trip the used turn without walking to the cauldron',async({page})=>{
 test.setTimeout(120_000);await page.setViewportSize({width:390,height:844});await alchemistPack(page);await takeLife(page,'CHALC_PACK_TEACH','CHALC_TEACH_LIMIT','CHALC_FINISH','CH0202','CH0404');const before=await exportedState(page);await clickLife(page,'ลดการเคลื่อนไหว');
 const skill=page.getByRole('button',{name:'กลั่นน้ำค้าง · น้ำค้าง 1',exact:true});await skill.scrollIntoViewIfNeeded();await skill.tap();await expect(page.locator('#content')).toHaveAttribute('aria-busy','true');await expect.poll(async()=>Number(await canvas(page).getAttribute('data-active-effects'))).toBeGreaterThan(0);expect(JSON.parse((await canvas(page).getAttribute('data-spell-target'))!).kind).toBe('player');await expect(canvas(page)).toHaveAttribute('data-last-path','none');await page.screenshot({path:'test-results/alchemist-distill-390.png'});
 await expect(page.locator('#content')).toHaveAttribute('aria-busy','false');expect(await exportedState(page)).toEqual(fight(before,'DISTILL'));expect(JSON.parse((await canvas(page).getAttribute('data-player-anchor'))!)).toMatchObject({x:130,y:219,feetY:239});await clickLife(page,'ลดการเคลื่อนไหว');await reloadFromFile(page);await expect(skill).toBeDisabled();await expect(page.locator('#content')).toContainText('กลั่นน้ำค้างในการต่อสู้นี้แล้ว');
});

test('1366: a cold forest checkpoint loads Tala across the workshop asset group and an explicit retry preserves the file state',async({page})=>{
 test.setTimeout(120_000);await page.setViewportSize({width:1366,height:768});await graduateAlchemist(page);const file=await exportFile(page),state=JSON.parse(file.toString()).state;let blocked=true;await page.route('**/art-v18/tala.png',r=>blocked?r.abort():r.continue());await page.goto('/');await loadFile(page,file);await expect(page.locator('#render-notice')).toContainText('ภาพบางส่วนโหลดไม่ครบ');expect(await exportedState(page)).toEqual(state);
 blocked=false;await clickLife(page,'ลองโหลดภาพอีกครั้ง');await expect(canvas(page)).toHaveAttribute('data-npc','tala-v18');await expect(canvas(page)).toHaveAttribute('data-npc-animation','tala-v18-idle');expect(await exportedState(page)).toEqual(state);await page.screenshot({path:'test-results/alchemist-cold-tala-1366.png',fullPage:true});
});

test('alchemist course, three life-path cards and manual file checkpoint fit all ten target viewports',async({page})=>{
 test.setTimeout(120_000);const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());});await graduateAlchemist(page);const file=await exportFile(page);
 for(const [width,height] of [[360,800],[390,844],[430,932],[844,390],[768,1024],[820,1180],[1024,768],[1366,768],[1440,900],[1920,1080]]){await page.setViewportSize({width,height});await loadFile(page,file);await expect(canvas(page)).toHaveAttribute('data-npc','tala-v18');await clickLife(page,'เส้นทางชีวิต');await expect(page.locator('.life-path-card')).toHaveCount(3);await expect(page.locator('[data-life-path="ALCHEMIST"]')).toHaveAttribute('data-rank','2');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.screenshot({path:`test-results/alchemist-paths-${width}.png`,fullPage:true});await clickLife(page,'เรื่องราว');}expect(errors).toEqual([]);
});
