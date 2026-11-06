import {chromium,expect} from '../../../node_modules/@playwright/test/index.mjs';
import {loadFile} from '../../../tests/file-helpers.ts';
import {readFile,writeFile} from 'node:fs/promises';
const url=process.argv[2],prefix=process.argv[3]||'public';if(!url)throw Error('URL required');
const file=await readFile('/tmp/gs19-published-0.8.godseed'),folder=new URL('./',import.meta.url);
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});const rows=[];
try{
 for(const [width,height] of [[360,800],[390,844],[430,932],[844,390],[768,1024],[820,1180],[1024,768],[1366,768],[1440,900],[1920,1080]]){
  const touch=width<1280,context=await browser.newContext({viewport:{width,height},hasTouch:touch}),page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
  await page.emulateMedia({reducedMotion:'reduce'});await page.goto(url);const canvas=page.locator('#canvas');await expect(canvas).toHaveAttribute('data-render-status','ready');await expect(page.locator('.edition')).toContainText('0.9.0');await loadFile(page,file);
  const act=async name=>{const b=page.getByRole('button',{name,exact:true});if(!await b.isVisible()&&await page.locator('.other-routes summary').isVisible()){if(touch)await page.locator('.other-routes summary').tap();else await page.locator('.other-routes summary').click();}if(touch)await b.tap();else{await b.focus();await page.keyboard.press('Enter');}await expect(page.locator('#content')).toHaveAttribute('aria-busy','false');};
  await act('เข้าโบราณสถานเสียงสะท้อน');await expect(canvas).toHaveAttribute('data-ruins-art','shrine-v12');await act('แก้รูนตามบันทึกหอสมุด');await expect(canvas).toHaveAttribute('data-altar-state','open');await expect(page.getByRole('heading',{name:'แผ่นจารึกแห่งคำสัญญา',exact:true})).toBeVisible();
  const layout=await page.evaluate(()=>{const r=document.querySelector('#canvas canvas').getBoundingClientRect();return{viewportWidth:innerWidth,documentWidth:document.documentElement.scrollWidth,canvasLeft:r.left,canvasRight:r.right,canvasWidth:r.width,canvasHeight:r.height};});
  expect(layout.documentWidth).toBeLessThanOrEqual(width+1);expect(layout.canvasLeft).toBeGreaterThanOrEqual(-1);expect(layout.canvasRight).toBeLessThanOrEqual(width+1);expect(layout.canvasWidth).toBeGreaterThan(150);expect(layout.canvasHeight).toBeGreaterThan(80);expect(errors).toEqual([]);
  await page.screenshot({path:new URL(`${prefix}-layout-${width}.png`,folder).pathname,fullPage:true});await act('บันทึกภาพจารึกกลับไปให้ไอรา');await expect(page.locator('#content')).toContainText('สำเนาจารึก');expect(errors).toEqual([]);rows.push({width,height,controls:touch?'touch':'keyboard-enter',legacy080File:true,runeAndQuest:true,layout,consoleErrors:errors});await context.close();
 }
 const result={result:'PASS',url,version:'0.9.0',viewports:rows,hardware:'NOT_TESTED',scope:'Chromium viewport and input emulation; no physical device/FPS acceptance'};await writeFile(new URL(prefix+'-layout.json',folder),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
}finally{await browser.close();}
