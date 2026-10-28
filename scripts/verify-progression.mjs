import { chromium } from '@playwright/test';
import { existsSync } from 'node:fs';
const url=process.argv[2]??'http://127.0.0.1:4185/';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||(existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined),args:['--no-sandbox']});
try{
 for(const width of [1366,360]){
  const page=await browser.newPage({viewport:{width,height:900}}),errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('requestfailed',r=>errors.push(r.url()));
  await page.goto(url);await page.getByRole('button',{name:'ก้าวสู่ชีวิตใหม่'}).click();await page.getByRole('button',{name:'เส้นทางชีวิต',exact:true}).click();
  const state=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('reborn_save')).state);
  let count=0;
  while((await state()).age<12||(await state()).progression.awakening.step<7){
   if(await page.getByRole('button',{name:'อ่านต่อ',exact:true}).count())await page.getByRole('button',{name:'อ่านต่อ',exact:true}).click();
   await page.locator('.choice-card').first().click();if(++count>100)throw Error('Progression stalled');
  }
  const result=(await state()).progression.awakening.result;
  await page.getByRole('button',{name:'อาชีพและการฝึก',exact:true}).click();await page.getByRole('button',{name:'เลือกอาชีพ ผู้ดูแลธรรมชาติ',exact:true}).click();
  const before=(await state()).gold;
  await page.getByRole('button',{name:/^ดูแลสวนและแบ่งผลผลิต/}).click();if((await state()).gold!==before+8)throw Error('Career salary failed');
  await page.getByRole('button',{name:'เริ่มฝึกฟรี',exact:true}).click();await page.reload();
  if(JSON.stringify((await state()).progression.awakening.result)!==JSON.stringify(result))throw Error('Awakening changed on reload');
  await page.locator('.choice-card').first().click();await page.getByRole('button',{name:'อาชีพและการฝึก',exact:true}).click();
  if((await state()).progression.records.farmer.arcStep!==1)throw Error('Career story failed');
  if(!await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth))throw Error('Career overflow');
  if(errors.length)throw Error(errors.join('\n'));
  await page.screenshot({path:`/tmp/reborn-career-${width}.png`});console.log(`PASS ${url} ${width}: genuine birth-to-12 story, seven-stage awakening, career, salary, training, reload, career episode`);await page.close();
 }
}finally{await browser.close();}
