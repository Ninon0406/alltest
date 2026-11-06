// Real deployed UI: touch viewports and desktop keyboard. No game-state injection.
import {chromium,expect} from '../../../node_modules/@playwright/test/index.mjs';
import {writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const url=process.argv[2];if(!url)throw Error('URL required');
const folder=fileURLToPath(new URL('./',import.meta.url));
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
const results=[];
try{
 for(const [width,height] of [[390,844],[844,390],[820,1180],[1024,768],[1366,768]]){
  const touch=width!==1366,context=await browser.newContext({viewport:{width,height},hasTouch:touch});
  const page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
  await page.emulateMedia({reducedMotion:'reduce'});await page.goto(url);
  const canvas=page.locator('#canvas');await expect(canvas).toHaveAttribute('data-render-status','ready');await expect(page.locator('.edition')).toContainText('0.8.0');
  const act=async name=>{const b=page.getByRole('button',{name,exact:true});if(touch)await b.tap();else{await b.focus();await page.keyboard.press('Enter');}await expect(page.locator('#content')).toHaveAttribute('aria-busy','false');};
  for(const name of ['เริ่มการเดินทาง','ลุกขึ้นสำรวจรอบตัว','เดินตามป้ายไม้ไปที่จัตุรัส','ไปโรงช่างของคุโร','ขอเรียนการผสมเวท','ทดลองสูตรแรกจากของที่มี'])await act(name);
  await expect(canvas).toHaveAttribute('data-workshop-art','atelier-v11');
  expect(JSON.parse(await canvas.getAttribute('data-player-anchor'))).toMatchObject({x:291,y:212});
  const layout=await page.evaluate(()=>{const r=document.querySelector('#canvas canvas').getBoundingClientRect();return{viewportWidth:innerWidth,documentWidth:document.documentElement.scrollWidth,canvasLeft:r.left,canvasRight:r.right,canvasWidth:r.width,canvasHeight:r.height};});
  expect(layout.documentWidth).toBeLessThanOrEqual(width+1);expect(layout.canvasLeft).toBeGreaterThanOrEqual(-1);expect(layout.canvasRight).toBeLessThanOrEqual(width+1);expect(layout.canvasWidth).toBeGreaterThan(150);expect(layout.canvasHeight).toBeGreaterThan(80);expect(errors).toEqual([]);
  await page.screenshot({path:folder+`public-layout-${width}.png`,fullPage:true});
  await act('ผสมและค้นพบเวท');await expect(canvas).toHaveAttribute('data-stage','village');await act('สมุดเวท');await expect(page.locator('#content')).toContainText('วายุดารานำวิถี');expect(errors).toEqual([]);
  results.push({width,height,controls:touch?'touch':'keyboard-enter',craft:'WIND_ORB_SEEK',tutorialAnchor:{x:291,y:212},firstCraftReturnsToVillage:true,discoveredSpellInBook:true,layout,consoleErrors:errors});await context.close();
 }
 const result={result:'PASS',url,version:'0.8.0',viewports:results,hardware:'NOT_TESTED',scope:'Chromium viewport and input emulation, actual deployed UI; no physical device/FPS acceptance'};
 await writeFile(folder+'public-layout.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
}finally{await browser.close();}
