// Explicit native files and public UI only. Never inject progress or upload save bytes.
import {chromium,expect} from '../../../node_modules/@playwright/test/index.mjs';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {clickLife,takeLife} from '../../../tests/life-helpers.ts';
import {winEcho} from '../../../tests/echo-helpers.ts';
import {exportFile,exportedState} from '../../../tests/file-helpers.ts';
const version=JSON.parse(await readFile(new URL('../../../package.json',import.meta.url))).version;
if(!['0.12.0','0.12.1'].includes(version))throw Error('This evidence script is scoped to the Session22 releases');
const [url,mode='public']=process.argv.slice(2),dir=new URL(version==='0.12.1'?'./hotfix/':'./',import.meta.url),hash=b=>createHash('sha256').update(b).digest('hex');
if(!url||!['local','public'].includes(mode))throw Error('URL [local|public]');await mkdir(dir,{recursive:true});
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
async function observed(width,height){
 const context=await browser.newContext({viewport:{width,height},hasTouch:width<1280}),page=await context.newPage();page.setDefaultTimeout(20_000);
 const errors=[],uploads=[],references=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());});page.on('request',r=>{if(!['GET','HEAD'].includes(r.method()))uploads.push(r.url());if(r.url().includes('/reference/'))references.push(r.url());});
 await page.addInitScript(()=>{window.__saveAudit=[];for(const [proto,methods] of [[Storage.prototype,['getItem','setItem','clear','removeItem']],[IDBFactory.prototype,['open','deleteDatabase']]])for(const key of methods){const fn=proto[key];proto[key]=function(...args){window.__saveAudit.push(key);return fn.apply(this,args);};}const c=Object.getOwnPropertyDescriptor(Document.prototype,'cookie');if(c)Object.defineProperty(Document.prototype,'cookie',{...c,get(){window.__saveAudit.push('cookie-read');return c.get.call(this);},set(v){window.__saveAudit.push('cookie-write');c.set.call(this,v);}});});
 const nativeImport=async buffer=>{if(!await page.getByRole('button',{name:'โหลดเกมจากไฟล์',exact:true}).count())await clickLife(page,'บันทึก');const chooser=page.waitForEvent('filechooser');await page.getByRole('button',{name:'โหลดเกมจากไฟล์',exact:true}).click();await(await chooser).setFiles({name:'GODSEED_Explicit.godseed',mimeType:'application/json',buffer});await expect(page.getByRole('heading',{name:'ตรวจสอบไฟล์เซฟก่อนโหลด',exact:true})).toBeVisible();await clickLife(page,'ยืนยันโหลดไฟล์นี้');};
 const audit=async()=>{const storage=await page.evaluate(()=>window.__saveAudit);expect(storage).toEqual([]);expect(errors).toEqual([]);expect(uploads).toEqual([]);expect(references).toEqual([]);return {persistentStorageCalls:storage.length,saveUploads:uploads.length,referenceRequests:references.length,consoleErrors:errors};};
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto(url);await expect(page.locator('.edition')).toContainText(version);await expect(page.locator('#canvas')).toHaveAttribute('data-render-status','ready');const titlePng=await page.evaluate(()=>performance.getEntriesByType('resource').map(r=>r.name).filter(url=>url.endsWith('.png')));expect(titlePng.some(url=>url.includes('art-v15'))).toBe(false);return {page,context,nativeImport,audit,titlePngCount:titlePng.length,canvas:page.locator('#canvas')};
}
let finalFile,activeFile;
try{
 const f=await observed(390,844),page=f.page;
 try{
  const legacy=[];for(const file of ['/tmp/gs20-published-0.9.godseed','/tmp/gs21-published-0.10.godseed','/tmp/gs21-published-0.11.godseed','/tmp/gs22-published-0.11.1.godseed',...version==='0.12.1'?['/tmp/gs22-published-0.12.0.godseed']:[]]){
   const bytes=await readFile(file),body=JSON.parse(bytes);await f.nativeImport(bytes);expect(await exportedState(page)).toEqual(body.state);legacy.push({version:body.gameVersion,fileSha256:hash(bytes),stateSha256:hash(JSON.stringify(body.state)),exactImport:true});await page.reload();await expect(page.getByRole('button',{name:'เริ่มการเดินทาง',exact:true})).toBeVisible();
  }
  await f.nativeImport(await readFile('/tmp/gs22-published-0.11.1.godseed'));
  await takeLife(page,'CHE_HUB');await expect(f.canvas).toHaveAttribute('data-npc','eira-v3');await page.screenshot({path:new URL(mode+'-cold-eira-390.png',dir).pathname,fullPage:true});
  await takeLife(page,'CHE_CALL_PROMISE','CHE_PROMISE_LISTEN','CHE_PACK_TAKE','CHE_RECIPE_CRAFT');await page.getByLabel('แก่นธาตุ',{exact:true}).selectOption('LIGHT');await clickLife(page,'ผสมและค้นพบเวท');await takeLife(page,'CHE_RECIPE_LIGHT','CHE_ROAD_WATER','CHE_WATER_HAND','CHE_ARCH_READ','CHE_LISTEN_PAUSE','CHE_SIGNAL_TEAM','CH2101');
  await expect(f.canvas).toHaveAttribute('data-stage-layers','3');await expect(f.canvas).toHaveAttribute('data-npc','echo-knot-v15');await clickLife(page,'วายุดารานำวิถี · MP 10');
  activeFile=await exportFile(page);const active=JSON.parse(activeFile).state;expect(active.battle.echo).toEqual({core:'WIND',exitOpened:true});expect(active.flags.echo_trial_resolved).not.toBe(true);
  await page.reload();await expect(page.getByRole('button',{name:'เริ่มการเดินทาง',exact:true})).toBeVisible();await f.nativeImport(activeFile);expect(await exportedState(page)).toEqual(active);
  await page.screenshot({path:new URL(mode+'-battle-390.png',dir).pathname,fullPage:true});await clickLife(page,'ถอยออกมาเตรียมตัว');await takeLife(page,'CH2101');await winEcho(page);
  const won=await exportedState(page);expect(won.flags.battle_B04_done).toBe(true);expect(won.inventory.CORE_ECHO).toBe(1);expect(won.rewarded.filter(id=>id==='win:B04_ECHO_KNOT')).toHaveLength(1);
  await takeLife(page,'CHE_RESULT_SAMPLE','CHE_SAMPLE_TAKE','CHE_RECORD_CARE','CHE_MAREN_STAY','CHE_LUMI_PAUSE','CHE_CLOSE_PIERCE');const rewarded=await exportedState(page);expect(rewarded.flags.echo_expedition_complete).toBe(true);
  await clickLife(page,'ผสมเวท');await page.getByLabel('แก่นธาตุ',{exact:true}).selectOption('ECHO');await page.getByLabel('รูปแบบ',{exact:true}).selectOption('CHAIN');await page.getByLabel('ตัวปรับ',{exact:true}).selectOption('PIERCE');await clickLife(page,'ผสมและค้นพบเวท');
  const crafted=await exportedState(page);expect(crafted.known).toContain('SPELL_ECHO_CHAIN_PIERCE');expect(crafted.equipped).toContain('SPELL_ECHO_CHAIN_PIERCE');for(const part of ['CORE_ECHO','FORM_CHAIN','MOD_PIERCE'])expect(crafted.inventory[part]).toBe(rewarded.inventory[part]-1);
  await takeLife(page,'CH0210','CH0210','CH0210','CH0202','CH0404');await clickLife(page,'เสียงสะท้อนสายใยทะลวง · MP 17');const cast=await exportedState(page);expect(cast.battle.enemyHp).toBeLessThan(35);expect(JSON.parse(await f.canvas.getAttribute('data-spell-target')).kind).toBe('npc');await page.screenshot({path:new URL(mode+'-earned-echo-spell-390.png',dir).pathname,fullPage:true});
  await clickLife(page,'วายุดารานำวิถี · MP 10');if(await page.getByRole('button',{name:'ประกายพื้นฐาน · MP 0',exact:true}).count())await clickLife(page,'ประกายพื้นฐาน · MP 0');await takeLife(page,'CH0401','CH0503');
  const final=await exportedState(page);finalFile=await exportFile(page);await page.reload();await expect(page.getByRole('button',{name:'เริ่มการเดินทาง',exact:true})).toBeVisible();await f.nativeImport(finalFile);expect(await exportedState(page)).toEqual(final);
  await clickLife(page,'ความทรงจำ');await expect(page.locator('#content')).toContainText('เสียงที่ยอมฟังเสียงอื่น · สำเร็จ');await page.screenshot({path:new URL(mode+'-conclusion-390.png',dir).pathname,fullPage:true});
  // A malformed explicit local file must preserve the active RAM snapshot.
  await clickLife(page,'บันทึก');await page.getByLabel('โหลดเกมจากไฟล์',{exact:true}).setInputFiles({name:'broken.godseed',mimeType:'application/json',buffer:Buffer.from('{broken')});await expect(page.getByRole('heading',{name:'ตรวจสอบไฟล์เซฟก่อนโหลด',exact:true})).toHaveCount(0);expect(await exportedState(page)).toEqual(final);
  const stateSha256=hash(JSON.stringify(final));if(mode==='public')expect(stateSha256).toBe(JSON.parse(await readFile(new URL('local-echo.json',dir))).stateSha256);
  const result={result:'PASS',url,version,sourceCommit:process.env.GODSEED_SOURCE_COMMIT||JSON.parse(await readFile(new URL('verification.json',import.meta.url))).sourceCommit||'PENDING',at:new Date().toISOString(),legacy,coldTitlePngCount:f.titlePngCount,gladeNotLoadedOnTitle:true,coldImportedVillageEiraCorrect:true,activeEchoNativeFileRoundTrip:true,conditionalFlee:true,realB04Victory:true,coherentQuestConclusion:true,rewardMaterialsCraftAndEquipEchoChainPierce:true,earnedEchoSpellActuallyDamagesEnemy:true,malformedFilePreservesRAM:true,refreshStartsBlank:true,stateSha256,sameStateAsLocal:mode==='public',...await f.audit(),hardware:'NOT_TESTED'};
  await writeFile(new URL(mode+'-echo.json',dir),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
 }finally{await f.context.close();}
 const viewports=[];for(const [width,height] of [[360,800],[390,844],[430,932],[844,390],[768,1024],[820,1180],[1024,768],[1366,768],[1440,900],[1920,1080]]){
  const f=await observed(width,height);try{await f.nativeImport(activeFile);await expect(f.page.locator('.battle-intent')).toContainText('ทวนธาตุวายุ');expect(JSON.parse(await f.canvas.getAttribute('data-player-anchor'))).toMatchObject({x:130,y:219,feetY:239,depth:239});expect(await f.page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);await f.page.screenshot({path:new URL(mode+'-layout-'+width+'.png',dir).pathname,fullPage:true});viewports.push({width,height,input:width<1280?'touch':'keyboard',result:'PASS',...await f.audit()});}finally{await f.context.close();}
 }
 await writeFile(new URL(mode+'-layouts.json',dir),JSON.stringify({result:'PASS',url,at:new Date().toISOString(),viewports,hardware:'NOT_TESTED'},null,2)+'\n');console.log(JSON.stringify({result:'PASS',viewports:viewports.length}));
}finally{await browser.close();}
