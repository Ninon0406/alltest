import {chromium} from '@playwright/test';
import {existsSync} from 'node:fs';
import {reachAge} from '../tests/browser/helpers.js';
const url=process.argv[2]??'http://127.0.0.1:4185/';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||(existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined),args:['--no-sandbox']});
try{
 const context=await browser.newContext(),page=await context.newPage(),errors=[];context.setDefaultTimeout(30000);
 page.on('dialog',d=>d.accept());page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>{const original=Storage.prototype.setItem;window.archiveWrites=[];Storage.prototype.setItem=function(k,v){window.archiveWrites.push(k);return original.call(this,k,v);};});
 await page.goto(url);await page.getByRole('button',{name:'ก้าวสู่ชีวิตใหม่',exact:true}).click();
 const first=await page.evaluate(()=>Game.snapshot),other=await context.newPage();other.on('dialog',d=>d.accept());await other.goto(url);await other.getByRole('button',{name:'ก้าวสู่ชีวิตใหม่',exact:true}).click();
 if((await other.evaluate(()=>Game.snapshot)).run.id===first.run.id)throw Error('Tabs share run identity');
 await page.bringToFront();
 await reachAge(page,60);
 if((await page.evaluate(()=>window.archiveWrites)).length)throw Error('Active run persisted');
 await page.keyboard.press('Escape');await page.getByText('อ่านเรื่องราวและเส้นทางเพิ่มเติม',{exact:true}).click();await page.getByRole('button',{name:'เปิดเรื่องราวเส้นทางเดิม',exact:true}).click();
 for(const name of [/เลือกเส้นทาง 'ชาวบ้านสันโดษ/,/พัฒนาสวนเกษตรเวทมนตร์/,/ใช้ชีวิตบั้นปลายอย่างมีความสุข/])await page.getByRole('button',{name}).click();
 await page.waitForFunction(()=>document.querySelector('.terminal-summary')?.textContent.includes('เก็บสรุปชีวิตที่จบแล้วในประวัติเรียบร้อย'),null,{timeout:30000});
 await page.evaluate(()=>Game.render());const result=await page.evaluate(()=>({writes:window.archiveWrites,lives:JSON.parse(localStorage.getItem('reborn_finished_lives_v1')).lives,old:localStorage.getItem('reborn_save')}));
 if(result.writes.length!==1||result.writes[0]!=='reborn_finished_lives_v1'||result.lives.length!==1||result.lives[0].age!==60||result.old!==null||'state' in result.lives[0])throw Error('Incorrect terminal-only archive');
 const photo=result.lives[0].appearance;if(photo?.version!==2||!['face','hair','hairColor','eyes','skin'].every(k=>photo[k]===first.appearance[k])||JSON.stringify(photo.parents)!==JSON.stringify(first.appearance.parents)||'seed' in photo)throw Error('Terminal inherited identity changed or stored a seed');
 await page.reload();await page.locator('#birthScreen').waitFor();if(await page.evaluate(()=>Game.snapshot!==null))throw Error('Run resumed');await page.getByRole('button',{name:'ประวัติชีวิต',exact:true}).click();await page.getByRole('dialog').getByText(first.name,{exact:false}).first().waitFor();
 if(errors.length)throw Error(errors.join('\n'));
 console.log(`PASS ${url}: independent tabs, zero active writes, genuine peaceful ending, exactly one summary, no resume after reload`);
}finally{await browser.close();}
