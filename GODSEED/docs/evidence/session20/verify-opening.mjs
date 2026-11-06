// UI-only release verification. Save buffers remain local and are never committed/uploaded.
// Run capture-legacy against the published 0.9.0 BEFORE deploying 0.10.0.
import {chromium,expect} from '../../../node_modules/@playwright/test/index.mjs';
import {exportFile,exportedState} from '../../../tests/file-helpers.ts';
import {scenes} from '../../../src/content/story.ts';
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';

const [url,mode='public']=process.argv.slice(2);
if(!url||!['public','capture-legacy'].includes(mode))throw Error('Usage: node verify-opening.mjs URL [capture-legacy]');
const folder=new URL('./',import.meta.url),old080='/tmp/gs19-published-0.8.godseed',old090='/tmp/gs20-published-0.9.godseed';
const labels=Object.fromEntries(Object.values(scenes).flatMap(scene=>scene.choices.map(choice=>[choice.id,choice.label])));
const digest=buffer=>createHash('sha256').update(buffer).digest('hex');
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
const audits=[];

async function observedPage(width,height){
 const touch=width<1280,context=await browser.newContext({viewport:{width,height},hasTouch:touch}),page=await context.newPage();
 page.setDefaultTimeout(20_000);page.setDefaultNavigationTimeout(30_000);
 const errors=[],writes=[],references=[],storyActions=[];
 page.on('pageerror',e=>errors.push(e.message));
 page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});
 page.on('response',response=>{if(response.status()>=400)errors.push(`${response.status()} ${response.url()}`);});
 page.on('request',request=>{if(!['GET','HEAD'].includes(request.method()))writes.push({method:request.method(),url:request.url()});if(request.url().includes('/reference/'))references.push(request.url());});
 await page.addInitScript(()=>{
  window.__openingStorageAudit=[];
  for(const [prototype,methods] of [[Storage.prototype,['getItem','setItem','removeItem','clear']],[IDBFactory.prototype,['open','deleteDatabase']]]){
   for(const method of methods){const original=prototype[method];prototype[method]=function(...args){window.__openingStorageAudit.push(method);return original.apply(this,args);};}
  }
  const cookie=Object.getOwnPropertyDescriptor(Document.prototype,'cookie');
  if(cookie)Object.defineProperty(Document.prototype,'cookie',{...cookie,get(){window.__openingStorageAudit.push('cookie-read');return cookie.get.call(this);},set(value){window.__openingStorageAudit.push('cookie-write');cookie.set.call(this,value);}});
 });
 const stable=()=>expect(page.locator('#content')).toHaveAttribute('aria-busy','false',{timeout:20_000});
 const activate=async locator=>{if(touch)await locator.tap();else{await locator.focus();await page.keyboard.press('Enter');}};
 const click=async name=>{
  const button=page.getByRole('button',{name,exact:true});
  if(!await button.isVisible()&&await page.locator('.other-routes summary').isVisible())await activate(page.locator('.other-routes summary'));
  await activate(button);await stable();
 };
 const take=async(...ids)=>{for(const id of ids){if(!labels[id])throw Error('Unknown local choice '+id);await click(labels[id]);storyActions.push(id);}};
 const audit=async()=>{
  const storageCalls=await page.evaluate(()=>window.__openingStorageAudit);audits.push(storageCalls);
  expect(storageCalls).toEqual([]);expect(writes).toEqual([]);expect(references).toEqual([]);expect(errors).toEqual([]);
  return {persistentStorageCalls:storageCalls.length,outboundWrites:writes.length,developmentReferenceRequests:references.length,consoleErrors:[...errors]};
 };
 const nativeImport=async(buffer,name='GODSEED_Public.godseed')=>{
  const picker=page.waitForEvent('filechooser',{timeout:20_000});
  await activate(page.getByRole('button',{name:'โหลดเกมจากไฟล์',exact:true}));
  await(await picker).setFiles({name,mimeType:'application/json',buffer});
  await expect(page.getByRole('heading',{name:'ตรวจสอบไฟล์เซฟก่อนโหลด',exact:true})).toBeVisible();
  await click('ยืนยันโหลดไฟล์นี้');
 };
 const open=async version=>{await page.emulateMedia({reducedMotion:'reduce'});await page.goto(url);await expect(page.locator('.edition')).toContainText(version);await expect(page.locator('#canvas')).toHaveAttribute('data-render-status','ready',{timeout:20_000});};
 const emptyReload=async()=>{await audit();await page.reload();await expect(page.getByRole('button',{name:'เริ่มการเดินทาง',exact:true})).toBeVisible();await expect(page.getByRole('button',{name:'เล่นต่อจากความทรงจำ',exact:true})).toHaveCount(0);};
 const screenshot=async name=>page.screenshot({path:new URL(name,folder).pathname,fullPage:true});
 return {context,page,touch,click,take,audit,nativeImport,open,emptyReload,screenshot,storyActions,canvas:page.locator('#canvas')};
}

try{
 if(mode==='capture-legacy'){
  const flow=await observedPage(390,844);try{
   await flow.open('0.9.0');const legacy=await readFile(old080),body=JSON.parse(legacy);expect(body.gameVersion).toBe('0.8.0');
   await flow.nativeImport(legacy,'GODSEED_Explicit_0.8.godseed');expect(await exportedState(flow.page)).toEqual(body.state);
   await flow.take('CH0207','CH1502');for(let i=0;i<3;i++)await flow.click('ตั้งรับ · ฟื้น MP 6');
   const state=await exportedState(flow.page);expect(state.battle.id).toBe('B03_RUIN_SENTINEL');expect(state.battle.turn).toBe(4);expect(state.battle.status.RUNE_WARD).toBe(2);
   const file=await exportFile(flow.page),snapshot=JSON.parse(file);expect(snapshot.gameVersion).toBe('0.9.0');expect(snapshot.state).toEqual(state);
   await writeFile(old090,file,{mode:0o600});await flow.screenshot('before-ward-390.png');
   const result={result:'PASS',url,version:'0.9.0',capturedAt:new Date().toISOString(),nativeFilePicker:true,legacy080ExactState:true,activeWard:true,turn:state.battle.turn,fileSha256:digest(file),stateSha256:digest(JSON.stringify(state)),saveLocation:'Only /tmp/gs20-published-0.9.godseed; not committed or uploaded',...await flow.audit(),hardware:'NOT_TESTED'};
   await writeFile(new URL('legacy-capture.json',folder),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
  }finally{await flow.context.close();}
 }else{
  const flow=await observedPage(390,844);let readyFile;
  try{
   await flow.open('0.10.0');const legacy=await readFile(old090),old=JSON.parse(legacy);expect(old.gameVersion).toBe('0.9.0');expect(old.state.battle.status.RUNE_WARD).toBe(2);
   await flow.nativeImport(legacy,'GODSEED_Explicit_0.9.godseed');expect(await exportedState(flow.page)).toEqual(old.state);await expect(flow.canvas).toHaveAttribute('data-rune-ward','true');
   await flow.click('ถอยออกมาเตรียมตัว');await flow.take('CH1501','CH1703','CH0201','CH0301','CH03B1','CH0208');
   await expect(flow.canvas).toHaveAttribute('data-festival-state','preparing');
   if(await flow.page.locator('#motion').getAttribute('aria-pressed')!=='false')await flow.click('ลดการเคลื่อนไหว');
   await flow.take('CH1809');const walkingDirections=(await flow.canvas.getAttribute('data-walk-trace')).split(',');expect(walkingDirections).toEqual(expect.arrayContaining(['south','east','north']));
   await flow.screenshot('public-invitation-arrival-390.png');await flow.take('CHV6_INVITE_MAREN');
   if(await flow.page.locator('#motion').getAttribute('aria-pressed')!=='true')await flow.click('ลดการเคลื่อนไหว');
   await flow.take('CH1805','CHV6_GARDEN_HELP','CHV6_GARDEN_HAND','CH1806','CHV6_STREAM_RHYTHM','CHV6_BELL_KEEP');
   const beforeForest=await exportedState(flow.page);await flow.take('CH1807','CHV6_FOREST_WAIT','CHV6_FOREST_FALLEN');const forestLoot=await exportedState(flow.page);expect(forestLoot.inventory.CORE_WIND).toBe((beforeForest.inventory.CORE_WIND||0)+1);expect(forestLoot.flags.a1_forest_recorded).toBe(true);
   await flow.take('CH1808','CHV6_RUIN_TRACE','CHV6_RUNE_COPY');const runeLoot=await exportedState(flow.page);expect(runeLoot.inventory.MOD_LINGER).toBe((forestLoot.inventory.MOD_LINGER||0)+1);expect(runeLoot.flags.a1_rune_copy).toBe(true);
   const ingredients=await exportedState(flow.page);expect(ingredients.inventory.CORE_WATER).toBeGreaterThan(0);expect(ingredients.inventory.FORM_RING).toBeGreaterThan(0);expect(ingredients.inventory.MOD_HEAL).toBeGreaterThan(0);expect(ingredients.known).not.toContain('SPELL_WATER_RING_HEAL');
   await flow.take('CH1801','CHV6_BOX_LOOK','CHV6_BOX_HAND','CH1802','CHV6_NOTES_MARK','CHV6_NOTES_COPY','CH1803','CHV6_LIGHT_HAND','CHV6_LIGHT_RECORD');
   await expect(flow.canvas).toHaveAttribute('data-festival-state','lit');const ready=await exportedState(flow.page);expect(ready.scene).toBe('S18_FESTIVAL_PREP');
   readyFile=await exportFile(flow.page);await flow.emptyReload();await flow.nativeImport(readyFile);expect(await exportedState(flow.page)).toEqual(ready);await flow.screenshot('public-ready-390.png');
   await flow.take('CH1810','CHV6_VOW_SHARE','CHV6_REHEARSE_SLOW');const evening=await exportedState(flow.page);expect(evening.scene).toBe('S19_FESTIVAL');expect(evening.ticks%3).toBe(2);await expect(flow.canvas).toHaveAttribute('data-time-light','evening');await flow.screenshot('public-evening-390.png');
   await flow.take('CH1901','CH2002','CHV6_CLOSE_SHARE','CHV6_SHARED_REMEMBER','CHV6_MORNING_FINISH');const completed=await exportedState(flow.page);expect(completed.ticks%3).toBe(0);expect(completed.flags.arc1_opening_complete).toBe(true);expect(completed.flags.a1_festival_quest_complete).toBe(true);expect(completed.flags.a1_resolution_shared).toBe(true);expect(completed.inventory.CORE_SHADOW).toBe(1);expect(completed.inventory.MOD_AMPLIFY).toBe(1);
   await expect(flow.canvas).toHaveAttribute('data-time-light','day');await expect(flow.canvas).toHaveAttribute('data-festival-state','remembered');await flow.screenshot('public-morning-390.png');
   await flow.click('ความทรงจำ');await expect(flow.page.locator('#content')).toContainText('ภารกิจงานเพลงแรก · สำเร็จ');await expect(flow.page.locator('#content')).toContainText('4/4');await flow.screenshot('public-memory-390.png');await flow.click('เรื่องราว');
   await flow.click('ผสมเวท');await flow.page.getByLabel('แก่นธาตุ',{exact:true}).selectOption('WATER');await flow.page.getByLabel('รูปแบบ',{exact:true}).selectOption('RING');await flow.page.getByLabel('ตัวปรับ',{exact:true}).selectOption('HEAL');await flow.click('ผสมและค้นพบเวท');
   const crafted=await exportedState(flow.page);expect(crafted.known).toContain('SPELL_WATER_RING_HEAL');for(const id of ['CORE_WATER','FORM_RING','MOD_HEAL'])expect(crafted.inventory[id]).toBe(completed.inventory[id]-1);await flow.click('เรื่องราว');
   await flow.take('CH0207','CH1502');
   // Receive one real hit first, so HEAL proves positive restoration rather than a full-HP cast.
   await flow.click('ประกายพื้นฐาน · MP 0');const beforeHeal=await exportedState(flow.page);expect(beforeHeal.hp).toBeLessThan(100);
   await flow.click('ธาราวงแหวนชีวา · MP 14');const healed=await exportedState(flow.page);expect(healed.mp).toBe(beforeHeal.mp-14);const healLine=healed.battle.log.find(line=>line.startsWith('ธาราวงแหวนชีวา ฟื้น HP '));expect(healLine).toMatch(/ฟื้น HP [1-9][0-9]*$/);const restoredHp=Number(healLine.match(/([0-9]+)$/)[1]);await flow.screenshot('public-b03-healing-390.png');
   let battleActions=2;for(;battleActions<20&&await flow.page.getByRole('heading',{name:'หุ่นรูนแสงริบหรี่',exact:true}).count();battleActions++){
    const text=await flow.page.locator('#content').innerText(),wind=flow.page.getByRole('button',{name:'วายุดารานำวิถี · MP 10',exact:true});
    await flow.click(text.includes('เตรียมกางเกราะรูน')||!await wind.isEnabled()?'ตั้งรับ · ฟื้น MP 6':'วายุดารานำวิถี · MP 10');
   }
   await expect(flow.page.getByRole('heading',{name:'ผู้เฝ้าประตู',exact:true})).toBeVisible();const won=await exportedState(flow.page);expect(won.battle).toBeUndefined();expect(won.scene).toBe('S16_RUINS_RESULT');expect(won.flags.battle_B03_done).toBe(true);expect(won.inventory.FORM_WARD).toBe(1);await flow.screenshot('public-b03-victory-390.png');
   await flow.take('CH1601','CH1701','CH0210','CH0210');const beforeWardCraft=await exportedState(flow.page);expect(beforeWardCraft.known).not.toContain('SPELL_WIND_WARD_LINGER');for(const id of ['CORE_WIND','FORM_WARD','MOD_LINGER'])expect(beforeWardCraft.inventory[id]).toBeGreaterThan(0);
   await flow.click('ผสมเวท');await flow.page.getByLabel('แก่นธาตุ',{exact:true}).selectOption('WIND');await flow.page.getByLabel('รูปแบบ',{exact:true}).selectOption('WARD');await flow.page.getByLabel('ตัวปรับ',{exact:true}).selectOption('LINGER');await flow.click('ผสมและค้นพบเวท');
   const wardCrafted=await exportedState(flow.page);expect(wardCrafted.known).toContain('SPELL_WIND_WARD_LINGER');expect(wardCrafted.equipped).toContain('SPELL_WIND_WARD_LINGER');for(const id of ['CORE_WIND','FORM_WARD','MOD_LINGER'])expect(wardCrafted.inventory[id]).toBe(beforeWardCraft.inventory[id]-1);await flow.click('เรื่องราว');
   await flow.take('CH0207','CH1502');const beforeWard=await exportedState(flow.page);await flow.click('วายุปราการเนิ่นนาน · MP 14');const protectedState=await exportedState(flow.page);expect(protectedState.mp).toBe(beforeWard.mp-14);expect(protectedState.hp).toBe(beforeWard.hp);expect(protectedState.battle.shield).toBeGreaterThan(0);await flow.screenshot('public-ward-rematch-390.png');await flow.click('ถอยออกมาเตรียมตัว');await flow.take('CH1504');
   await flow.take('CH0208','CH1810','CHV6_VOW_SHARE','CHV6_REHEARSE_SLOW','CH1903','CHV6_CLOSE_SHARE','CHV6_SHARED_REST','CHV6_MORNING_LEARN');const replay=await exportedState(flow.page);expect(replay.inventory.MOD_AMPLIFY).toBe(completed.inventory.MOD_AMPLIFY);expect(replay.inventory.IT_POTION_DEW).toBe(completed.inventory.IT_POTION_DEW);expect(replay.flags.a1_festival_quest_complete).toBe(true);
   const finalFile=await exportFile(flow.page);await flow.emptyReload();await flow.nativeImport(finalFile);expect(await exportedState(flow.page)).toEqual(replay);
   const result={result:'PASS',url,version:'0.10.0',verifiedAt:new Date().toISOString(),legacy090File:true,legacyFileSha256:digest(legacy),nativeFilePicker:true,activeWardExactState:true,retreatAndShrine:true,metadataWalkingNormalMotion:true,walkingDirections,preparationThreeTasks:true,newIngredientActivities:true,newForestIngredient:true,newRuneIngredient:true,checkpointExactRoundTrip:true,emptyRefresh:true,authoredEveningAndNextMorning:true,optionalSealShadowSample:true,sharedOpeningConclusion:true,questCompleted4of4:true,sharedRewardOnce:true,actualWaterRingHealCraft:true,actualWaterRingHealUse:true,healMpCost:beforeHeal.mp-healed.mp,restoredHp,b03Victory:true,b03Actions:battleActions,b03FirstWardReward:true,actualWindWardLingerCraft:true,wardAutoEquipped:true,rematchShieldPreventsDamage:true,retreatAfterRematch:true,finalStateExactRoundTrip:true,storyChoiceActions:flow.storyActions.length,distinctStoryChoices:new Set(flow.storyActions).size,...await flow.audit(),hardware:'NOT_TESTED',scope:'Live Chromium touch emulation. Partial opening conclusion; not full-game endings, physical device or FPS acceptance.'};
   await writeFile(new URL('public-opening.json',folder),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
  }finally{await flow.context.close();}

  const rows=[];for(const [width,height] of [[360,800],[390,844],[430,932],[844,390],[768,1024],[820,1180],[1024,768],[1366,768],[1440,900],[1920,1080]]){
   const flow=await observedPage(width,height);try{
    await flow.open('0.10.0');await flow.nativeImport(readyFile);const ready=await exportedState(flow.page);expect(ready.scene).toBe('S18_FESTIVAL_PREP');expect(ready.flags.a1_musicbox_ready&&ready.flags.a1_notes_ready&&ready.flags.a1_lights_ready).toBe(true);
    await flow.take('CH1810','CHV6_VOW_SHARE','CHV6_REHEARSE_SLOW');await expect(flow.canvas).toHaveAttribute('data-festival-state','lit');await expect(flow.canvas).toHaveAttribute('data-time-light','evening');expect((await exportedState(flow.page)).ticks%3).toBe(2);
    const layout=await flow.page.evaluate(()=>{const r=document.querySelector('#canvas canvas').getBoundingClientRect();return {viewportWidth:innerWidth,documentWidth:document.documentElement.scrollWidth,canvasLeft:r.left,canvasRight:r.right,canvasWidth:r.width,canvasHeight:r.height};});
    expect(layout.documentWidth).toBeLessThanOrEqual(width+1);expect(layout.canvasLeft).toBeGreaterThanOrEqual(-1);expect(layout.canvasRight).toBeLessThanOrEqual(width+1);expect(layout.canvasWidth).toBeGreaterThan(150);expect(layout.canvasHeight).toBeGreaterThan(80);
    await flow.screenshot(`public-layout-${width}.png`);rows.push({width,height,controls:flow.touch?'touch':'keyboard-enter',manualCheckpointImport:true,preparationAndEvening:true,layout,...await flow.audit()});
   }finally{await flow.context.close();}
  }
  const result={result:'PASS',url,version:'0.10.0',verifiedAt:new Date().toISOString(),viewports:rows,persistentStorageCalls:audits.flat().length,hardware:'NOT_TESTED',scope:'Chromium viewport/input emulation: 7 touch sizes and 3 keyboard-Enter sizes. No physical Safari/iOS/Android/iPadOS/FPS acceptance.'};
  await writeFile(new URL('public-layout.json',folder),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
 }
}finally{await browser.close();}
