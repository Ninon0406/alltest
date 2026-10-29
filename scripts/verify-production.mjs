import {chromium} from '@playwright/test';
import {existsSync} from 'node:fs';
import {oneMonth,closeOverlay} from '../tests/browser/helpers.js';
const url=process.argv[2]||'http://127.0.0.1:4185/';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||(existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined),args:['--no-sandbox']});
try{
 for(const width of [320,360,390,768,1024,1366,1920]){
  const page=await browser.newPage({viewport:{width,height:900}}),failures=[];page.on('dialog',d=>d.accept());page.on('pageerror',e=>failures.push(e.message));page.on('requestfailed',r=>failures.push(r.url()));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))failures.push(`${r.status()} ${r.url()}`);});
  await page.goto(url);await page.getByRole('button',{name:'ก้าวสู่ชีวิตใหม่',exact:true}).click();await page.locator('.pixel-sprite').waitFor();await closeOverlay(page);
  const metrics=await page.evaluate(()=>({css:document.styleSheets.length,age:document.getElementById('displayAge').getBoundingClientRect().y,power:document.getElementById('displayPower').textContent,overflow:document.documentElement.scrollWidth>innerWidth||document.documentElement.scrollHeight>innerHeight+1}));
  if(!metrics.css||metrics.age>150||metrics.overflow||metrics.power!=='Lv. 1 / 100')throw Error('Dashboard failed: '+JSON.stringify(metrics));
  await oneMonth(page);const state=await page.evaluate(()=>Game.snapshot);if(state.age!==0||state.time.absoluteDay!==30)throw Error('Month calendar failed');if(await page.locator('#calendarProgress').getAttribute('aria-valuenow')!=='30')throw Error('Progress is detached from calendar');
  const image=await page.locator('.play-scene .location-image').evaluate(img=>({loaded:img.complete&&img.naturalWidth===320,src:img.currentSrc}));if(!image.loaded||!image.src.includes('/assets/scenes/'))throw Error('Local PNG did not load');
  if(width===320){const files=await page.evaluate(async()=>{const manifest=await(await fetch(new URL('assets/scenes/manifest.json',location.href))).json();for(const entry of manifest.images){const img=new Image();img.src=new URL('assets/scenes/'+entry.file,location.href);await img.decode();if(img.naturalWidth!==320||img.naturalHeight!==160)throw Error('Invalid scene image');}return manifest.images.length;});if(files!==20)throw Error('Missing published PNGs');}
  await page.screenshot({path:`/tmp/reborn-ui-${width}.png`});
  for(const name of ['แผนที่และบริการ','อาชีพและการฝึก','กระเป๋า','บันทึกชีวิตรายปี']){
   const button=page.getByRole('button',{name,exact:true});if(await button.isVisible())await button.click();else{await page.getByRole('button',{name:'เพิ่มเติม',exact:true}).click();await page.getByRole('dialog').getByRole('button',{name,exact:true}).click();}
   await page.getByRole('dialog').waitFor();if((await page.evaluate(()=>Game.snapshot)).run.id!==state.run.id)throw Error('Overlay reset run');
   if(name==='แผนที่และบริการ'){await page.locator('.world-map').waitFor();await page.screenshot({path:`/tmp/reborn-map-${width}.png`});}
   await page.keyboard.press('Escape');
  }
  await page.reload();await page.locator('#birthScreen').waitFor();if(await page.evaluate(()=>Game.snapshot!==null||localStorage.getItem('reborn_save')!==null))throw Error('Active run restored/persisted');if(failures.length)throw Error(failures.join('\n'));
  console.log(`PASS ${url} ${width}: CSS/JS, compact age/level/scene, month calendar/progress, 20 local PNGs, map/career/bag/journal overlays, refresh=no run`);await page.close();
 }
}finally{await browser.close();}
