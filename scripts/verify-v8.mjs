import {chromium} from '@playwright/test';
import {existsSync,mkdirSync} from 'node:fs';
import {startV8,v8Snapshot,finishV8,playV8Until} from './v8-playthrough.mjs';
import {waitForCharacterImages,checkPublishedCharacters} from './published-character-check.mjs';
import {checkPublishedInteriors} from './published-interior-check.mjs';
import {checkPublishedEquipment} from './published-equipment-check.mjs';
import {v8Decision} from '../src/engine/v8-model.js';
const url=process.argv[2]??'http://127.0.0.1:4185/';mkdirSync('work',{recursive:true});
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||(existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined),args:['--no-sandbox']});
const endings=new Set();
try{
 for(const [index,width]of [320,360,390,768,1024,1366,1920].entries()){
  const page=await browser.newPage({viewport:{width,height:900}}),errors=[];page.setDefaultTimeout(30000);page.on('pageerror',e=>errors.push(e.message));page.on('requestfailed',r=>errors.push(r.url()));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(`${r.status()} ${r.url()}`);});
  await startV8(page,{url});await page.getByRole('button',{name:'ข้ามไปเหตุการณ์ถัดไป',exact:true}).click();await waitForCharacterImages(page);await page.locator('.location-image').evaluate(image=>image.decode());
  const s=await v8Snapshot(page),metrics=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,css:document.styleSheets.length,height:document.querySelector('.play-scene').getBoundingClientRect().height,actionBottom:document.querySelector('.v8-choice').getBoundingClientRect().bottom}));
  if(s.time.absoluteDay!==540||metrics.overflow||!metrics.css||metrics.height>200||metrics.actionBottom>900)throw Error('V8 dashboard failed '+JSON.stringify(metrics));
  await page.getByRole('button',{name:'แผนที่',exact:true}).click();await page.getByRole('combobox',{name:'เลือกสถานที่ที่รู้จัก'}).selectOption({index:1});if(JSON.stringify(await v8Snapshot(page))!==JSON.stringify(s))throw Error('Map changed V8 life');await page.keyboard.press('Escape');
  if(width===320){if(await checkPublishedCharacters(page)!==183||await checkPublishedInteriors(page)!==16||await checkPublishedEquipment(page)!==6)throw Error('Missing V8 reused assets');}
  await page.screenshot({path:`work/v8-public-${width}.png`});
  if(index<4){const ended=await finishV8(page,{policy:index});endings.add(ended.run.endingId);}
  await page.reload();await page.getByRole('button',{name:'เกิด',exact:true}).waitFor();if(await v8Snapshot(page)!==null||await page.evaluate(()=>localStorage.getItem('reborn_save'))!==null)throw Error('V8 active persistence/resume');
  if(errors.length)throw Error(errors.join('\n'));console.log(`PASS V8 ${url} ${width}: default UI, decoded scene, visible main action, read-only map, ${index<4?'genuine natural ending/archive, ':''}refresh has no active run`);await page.close();
 }
 if(endings.size!==4)throw Error('V8 public ordinary endings incomplete');
 const page=await browser.newPage({viewport:{width:320,height:900}}),powerErrors=[];page.on('pageerror',e=>powerErrors.push(e.message));page.on('requestfailed',r=>powerErrors.push(r.url()));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))powerErrors.push(`${r.status()} ${r.url()}`);});await startV8(page,{url});const ready=await playV8Until(page,{eventId:'power.first-realm',awaken:true,focus:'cultivate'});if(ready.power.level!==9||ready.power.practiceDays<210)throw Error('V8 earned power missing');await page.locator('[data-choice-id="steady"]').click();const final=await v8Snapshot(page);if(final.power.level!==10||final.stamina!==ready.stamina-15||final.time.absoluteDay!==ready.time.absoluteDay)throw Error('V8 manual certification failed');await waitForCharacterImages(page);if(await page.locator('[data-power-milestone="10"]').count()!==1||powerErrors.length)throw Error('V8 power rendering failed '+powerErrors.join('\n'));await page.screenshot({path:'work/v8-public-power-320.png'});console.log(`PASS V8 ${url}: actual seven-step ritual/career/cultivation/manual certification at 320px, ${ready.power.practiceDays} real practice days`);await page.close();
 for(const storyPath of ['library','family','circle','fairwork']){
  let reached=false;
  // Natural death at exactly 68 also precedes the age-68 three-day callback.
  for(let attempt=0;attempt<8&&!reached;attempt++){
   const page=await browser.newPage({viewport:{width:320,height:844}}),errors=[];
   page.on('pageerror',e=>errors.push(e.message));page.on('requestfailed',r=>errors.push(r.url()));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(`${r.status()} ${r.url()}`);});
   await startV8(page,{url});
   if(storyPath==='fairwork'){
    const due=await playV8Until(page,{eventId:'v8.delayed-payment',storyPath,focus:'bonds'});
    if(v8Decision(due)?.id!=='v8.delayed-payment'||due.v8.wagesDue!==10)throw Error('Delivered wages missing');
    await page.locator('[data-choice-id="part"]').evaluate(b=>{b.click();b.click();});const paid=await v8Snapshot(page);
    if(paid.gold!==due.gold+5||paid.v8.wagesDue!==5)throw Error('Duplicate/incorrect wage payment');
    const follow=await playV8Until(page,{eventId:'v8.payment-followup',storyPath,focus:'bonds'});
    if(v8Decision(follow)?.id!=='v8.payment-followup')throw Error('Payment callback skipped');
    await page.locator('[data-choice-id="collect"]').click();const closed=await v8Snapshot(page);
    if(closed.gold!==due.gold+10||closed.v8.wagesDue!==0)throw Error('Receivable did not reconcile');
    await page.screenshot({path:'work/v8-public-wages-320.png'});console.log(`PASS V8 ${url}: delivered work, partial/final wages, stale double tap and real ledger at 320px`);
   }
   const ended=await finishV8(page,{storyPath,policy:0,focus:storyPath==='library'?'study':'bonds'});
   if(errors.length)throw Error(errors.join('\n'));
   reached=ended.run.endingId===`v8.${storyPath}`;
   if(!reached&&!(storyPath==='library'&&ended.age<=68&&!ended.v8.flags.schoolLegacy))throw Error('Chained epilogue missing '+JSON.stringify({storyPath,age:ended.age,ending:ended.run.endingId,knowledge:ended.v8.knowledge,flags:ended.v8.flags}));
   if(reached){await page.screenshot({path:`work/v8-public-${storyPath}-ending-320.png`});console.log(`PASS V8 ${url}: conditional ${storyPath} natural ending, genuine archive, no active save`);}
   else console.log(`PASS V8 ${url}: natural lifespan ${ended.age} ends before completing the age-68 library opportunity`);
   await page.close();
  }
  if(!reached)throw Error('No genuine eligible library lifespan observed in eight births');
 }
}finally{await browser.close();}
