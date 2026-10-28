import { chromium } from '@playwright/test';
import { existsSync } from 'node:fs';
const url=process.argv[2]??'http://127.0.0.1:4185/';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||(existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined),args:['--no-sandbox']});
try{
 for(const width of [1366,360]){
  const page=await browser.newPage({viewport:{width,height:900}}),errors=[];page.on('dialog',d=>d.accept());page.on('pageerror',e=>errors.push(e.message));page.on('requestfailed',r=>errors.push(r.url()));
  await page.goto(url);await page.getByRole('button',{name:'ก้าวสู่ชีวิตใหม่'}).click();await page.getByRole('button',{name:'เส้นทางชีวิต',exact:true}).click();
  const state=()=>page.evaluate(()=>Game.snapshot);
  let count=0;
  while((await state()).age<12||(await state()).progression.awakening.step<7){
   if(await page.locator('.major-option').count())await page.locator('.major-option').first().click();
   else await page.getByRole('button',{name:'ใช้ชีวิตต่อ 5 ปี',exact:true}).click();
   if(++count>20)throw Error('Yearly progression stalled');
  }
  const result=(await state()).progression.awakening.result;
  await page.getByRole('button',{name:'อาชีพและการฝึก',exact:true}).click();await page.getByRole('button',{name:'เลือกอาชีพ ผู้ดูแลธรรมชาติ',exact:true}).click();
  const before=(await state()).gold;
  await page.getByRole('button',{name:/^ดูแลสวนและแบ่งผลผลิต/}).click();if((await state()).gold!==before+8)throw Error('Career salary failed');
  await page.getByRole('button',{name:'เริ่มฝึกฟรี',exact:true}).click();await page.getByRole('button',{name:'เส้นทางชีวิต',exact:true}).click();
  if(JSON.stringify((await state()).progression.awakening.result)!==JSON.stringify(result))throw Error('Awakening changed in the same run');
  await page.getByRole('button',{name:'ใช้ชีวิตต่อ 1 ปี',exact:true}).click();await page.locator('.major-option').first().click();await page.getByRole('button',{name:'อาชีพและการฝึก',exact:true}).click();
  if((await state()).progression.records.farmer.arcStep!==1)throw Error('Career story failed');
  if(!await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth))throw Error('Career overflow');
  if(errors.length)throw Error(errors.join('\n'));
  await page.screenshot({path:`/tmp/reborn-career-${width}.png`});console.log(`PASS ${url} ${width}: paced birth-to-12 plan, rare milestones, one-decision awakening, career, salary, training, in-memory continuity, career episode`);await page.close();
 }
}finally{await browser.close();}
