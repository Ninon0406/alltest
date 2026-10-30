import { chromium } from '@playwright/test';
import { existsSync } from 'node:fs';
import {reachAge,selectCareer,openOverlay,closeOverlay} from '../tests/browser/helpers.js';
import {schoolEvents} from '../src/data/events/school.js';
import {catalogById} from '../src/data/appearance-v2.js';
const classicURL=new URL(process.argv[2]??'http://127.0.0.1:4185/');classicURL.searchParams.set('classic','1');const url=classicURL.href;
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||(existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined),args:['--no-sandbox']});
try{
 for(const width of [1366,360]){
  const page=await browser.newPage({viewport:{width,height:900}}),errors=[];page.setDefaultTimeout(30000);page.on('dialog',d=>d.accept());page.on('pageerror',e=>errors.push(e.message));page.on('requestfailed',r=>errors.push(r.url()));
  await page.goto(url);await page.getByRole('button',{name:'ก้าวสู่ชีวิตใหม่'}).click();
  await reachAge(page,6,{settleAtTarget:false});if(await page.locator('.play-scene').getAttribute('data-context')!=='classroom')throw Error('School room failed');
  await reachAge(page,12,{settleAtTarget:false});if(await page.locator('.play-scene').getAttribute('data-context')!=='ceremony')throw Error('Ceremony room failed');
  const ritualNode=(await page.evaluate(()=>Game.snapshot)).world.currentLocationId;if(await page.locator('.play-scene').getAttribute('data-location-id')!==ritualNode)throw Error('Room relocated ritual');
  await reachAge(page,12);if(await page.locator('.play-scene').getAttribute('data-context')!=='outdoor')throw Error('Room did not close after ceremony');
  const state=()=>page.evaluate(()=>Game.snapshot);
  const childhood=await state();if(!schoolEvents.every(e=>childhood.story.completed.includes(e.id)))throw Error('School preparation chain failed');
  const result=(await state()).progression.awakening.result;
  const original=await state(),extra=original.wardrobe.owned.find(id=>id.startsWith('upper_')&&id!==original.wardrobe.equipped.upper);
  await openOverlay(page,'กระเป๋า');await page.locator('.wardrobe>summary').click();await page.getByRole('button',{name:`สวม${catalogById[extra].label}`,exact:true}).click();const dressed=await state();
  if(dressed.wardrobe.equipped.upper!==extra||JSON.stringify(dressed.appearance)!==JSON.stringify(original.appearance)||JSON.stringify(dressed.stats)!==JSON.stringify(original.stats)||dressed.time.absoluteDay!==original.time.absoluteDay||dressed.gold!==original.gold)throw Error('Clothing changed identity/stats/time/money');await closeOverlay(page);
  await page.getByRole('button',{name:'อาชีพและการฝึก',exact:true}).click();await selectCareer(page,'ผู้ดูแลธรรมชาติ');
  const before=(await state()).gold;
  await page.getByRole('button',{name:/^ดูแลสวนและแบ่งผลผลิต/}).click();if((await state()).gold!==before+8)throw Error('Career salary failed');
  await page.getByRole('button',{name:'เริ่มฝึกฟรี',exact:true}).click();await page.keyboard.press('Escape');
  if(JSON.stringify((await state()).progression.awakening.result)!==JSON.stringify(result))throw Error('Awakening changed in the same run');
  await reachAge(page,13);await page.getByRole('button',{name:'อาชีพและการฝึก',exact:true}).click();
  if((await state()).progression.records.farmer.arcStep!==1)throw Error('Career story failed');
  if(!await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth))throw Error('Career overflow');
  await page.keyboard.press('Escape');await reachAge(page,20);const teen=await state();if(!['teen.application','teen.funding','teen.review'].every(id=>teen.story.completed.includes(id))||!teen.story.flags.school_enrolled||!teen.world.ledger.some(e=>e.source==='story:teen.funding'&&e.amount===-4)||!Object.values(teen.story.learning??{}).some(n=>n>0))throw Error('Teen story progression failed');if(JSON.stringify(teen.progression.awakening.result)!==JSON.stringify(result))throw Error('Story rerolled ceremony');
  if(errors.length)throw Error(errors.join('\n'));
  await page.screenshot({path:`/tmp/reborn-career-${width}.png`});console.log(`PASS ${url} ${width}: real classroom/ceremony/outdoor context and childhood/career/job/training through age 20, owned clothing with stable inherited identity and zero time/stat cost, teen support`);await page.close();
 }
}finally{await browser.close();}
