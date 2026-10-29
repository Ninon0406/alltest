import { chromium } from '@playwright/test';
import { existsSync } from 'node:fs';
import {reachAge,selectCareer} from '../tests/browser/helpers.js';
import {schoolEvents} from '../src/data/events/school.js';
const url=process.argv[2]??'http://127.0.0.1:4185/';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||(existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined),args:['--no-sandbox']});
try{
 for(const width of [1366,360]){
  const page=await browser.newPage({viewport:{width,height:900}}),errors=[];page.setDefaultTimeout(30000);page.on('dialog',d=>d.accept());page.on('pageerror',e=>errors.push(e.message));page.on('requestfailed',r=>errors.push(r.url()));
  await page.goto(url);await page.getByRole('button',{name:'ก้าวสู่ชีวิตใหม่'}).click();
  await reachAge(page,12);
  const state=()=>page.evaluate(()=>Game.snapshot);
  const childhood=await state();if(!schoolEvents.every(e=>childhood.story.completed.includes(e.id)))throw Error('School preparation chain failed');
  const result=(await state()).progression.awakening.result;
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
  await page.screenshot({path:`/tmp/reborn-career-${width}.png`});console.log(`PASS ${url} ${width}: manual childhood/school preparation through age 12, seven awakening steps, career, salary, training, in-memory continuity, teen education/support through age 20`);await page.close();
 }
}finally{await browser.close();}
