import { chromium } from '@playwright/test';
import { existsSync } from 'node:fs';
const url=process.argv[2] || 'http://127.0.0.1:4173/';
const executablePath=process.env.CHROMIUM_PATH || (existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined);
const browser=await chromium.launch({executablePath,args:['--no-sandbox']});
try {
 for(const width of [1440,390]) {
  const page=await browser.newPage({viewport:{width,height:900}}), failures=[];
  page.on('pageerror',error=>failures.push(error.message));
  page.on('requestfailed',request=>failures.push(request.url()));
  page.on('response',response=>{if(response.status()>=400 && !response.url().endsWith('favicon.ico'))failures.push(`${response.status()} ${response.url()}`);});
  const response=await page.goto(url);if(response.status()!==200)throw Error('HTML failed');
  await page.getByRole('button',{name:'ก้าวสู่ชีวิตใหม่'}).waitFor();
  const style=await page.evaluate(()=>({background:getComputedStyle(document.body).backgroundImage,color:getComputedStyle(document.body).color,overflow:document.documentElement.scrollWidth>innerWidth,css:[...document.styleSheets].length}));
  if(!style.css || style.background==='none' || style.overflow)throw Error('Missing styling or overflow: '+JSON.stringify(style));
  await page.getByRole('button',{name:'ก้าวสู่ชีวิตใหม่'}).click();await page.getByRole('heading',{name:'บันทึกกำเนิด',exact:true}).waitFor();
  await page.getByRole('button',{name:'เส้นทางชีวิต',exact:true}).click();await page.locator('.choice-card').first().click();
  await page.reload();await page.waitForFunction(()=>document.querySelector('#lblDay').textContent==='2');
  if(await page.locator('#charAvatar svg').count()!==1)throw Error('Portrait missing');
  if(failures.length)throw Error(failures.join('\n'));
  await page.screenshot({path:`/tmp/reborn-${width}.png`,fullPage:true});
  console.log(`PASS ${url} width ${width}: CSS, images, JS, birth, portrait, choice, reload`);
  await page.close();
 }
} finally {await browser.close();}
