// Explicit native files and public UI only. Never inject progress or upload save bytes.
import {chromium,expect} from '../../../node_modules/@playwright/test/index.mjs';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {clickLife,takeLife} from '../../../tests/life-helpers.ts';
import {createServer} from '../../../node_modules/vite/dist/node/index.js';
const ssr=await createServer({root:new URL('../../../',import.meta.url).pathname,configFile:false,optimizeDeps:{entries:[],noDiscovery:true},server:{middlewareMode:true},appType:'custom'});
const {finishGuardian}=await ssr.ssrLoadModule('/tests/guardian-helpers.ts');
import {reachEchoTrial} from '../../../tests/echo-helpers.ts';
import {exportFile,exportedState} from '../../../tests/file-helpers.ts';
const version=JSON.parse(await readFile(new URL('../../../package.json',import.meta.url))).version;
if(version!=='0.13.0')throw Error('This evidence script is scoped to the Session23 release');
const [url,mode='public']=process.argv.slice(2),dir=new URL('./',import.meta.url),hash=b=>createHash('sha256').update(b).digest('hex');
if(!url||!['local','public'].includes(mode))throw Error('URL [local|public]');await mkdir(dir,{recursive:true});
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
async function observed(width,height){
 const context=await browser.newContext({viewport:{width,height},hasTouch:width<1280}),page=await context.newPage();page.setDefaultTimeout(20_000);
 const errors=[],uploads=[],references=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url());});page.on('request',r=>{if(!['GET','HEAD'].includes(r.method()))uploads.push(r.url());if(r.url().includes('/reference/'))references.push(r.url());});
 await page.addInitScript(()=>{window.__saveAudit=[];for(const [proto,methods] of [[Storage.prototype,['getItem','setItem','clear','removeItem']],[IDBFactory.prototype,['open','deleteDatabase']]])for(const key of methods){const fn=proto[key];proto[key]=function(...args){window.__saveAudit.push(key);return fn.apply(this,args);};}const c=Object.getOwnPropertyDescriptor(Document.prototype,'cookie');if(c)Object.defineProperty(Document.prototype,'cookie',{...c,get(){window.__saveAudit.push('cookie-read');return c.get.call(this);},set(v){window.__saveAudit.push('cookie-write');c.set.call(this,v);}});});
 const nativeImport=async buffer=>{if(!await page.getByRole('button',{name:'โหลดเกมจากไฟล์',exact:true}).count())await clickLife(page,'บันทึก');const chooser=page.waitForEvent('filechooser');await page.getByRole('button',{name:'โหลดเกมจากไฟล์',exact:true}).click();await(await chooser).setFiles({name:'GODSEED_Explicit.godseed',mimeType:'application/json',buffer});await expect(page.getByRole('heading',{name:'ตรวจสอบไฟล์เซฟก่อนโหลด',exact:true})).toBeVisible();await clickLife(page,'ยืนยันโหลดไฟล์นี้');};
 const audit=async()=>{const storage=await page.evaluate(()=>window.__saveAudit);expect(storage).toEqual([]);expect(errors).toEqual([]);expect(uploads).toEqual([]);expect(references).toEqual([]);return {persistentStorageCalls:storage.length,saveUploads:uploads.length,referenceRequests:references.length,consoleErrors:errors};};
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto(url);await expect(page.locator('.edition')).toContainText(version);await expect(page.locator('#canvas')).toHaveAttribute('data-render-status','ready');const titlePng=await page.evaluate(()=>performance.getEntriesByType('resource').map(r=>r.name).filter(url=>url.endsWith('.png')));expect(titlePng.some(url=>url.includes('art-v15')||url.includes('art-v16'))).toBe(false);return {page,context,nativeImport,audit,titlePngCount:titlePng.length,canvas:page.locator('#canvas')};
}
let activeFile;
try{
 const f=await observed(390,844),page=f.page;
 try{
  const legacy=[];for(const file of ['/tmp/gs20-published-0.9.godseed','/tmp/gs21-published-0.10.godseed','/tmp/gs21-published-0.11.godseed','/tmp/gs22-published-0.11.1.godseed','/tmp/gs22-published-0.12.0.godseed','/tmp/gs23-published-0.12.1.godseed']){
   const bytes=await readFile(file),body=JSON.parse(bytes);await f.nativeImport(bytes);expect(await exportedState(page)).toEqual(body.state);legacy.push({version:body.gameVersion,fileSha256:hash(bytes),stateSha256:hash(JSON.stringify(body.state)),exactImport:true});await f.audit();await page.reload();await expect(page.getByRole('button',{name:'เริ่มการเดินทาง',exact:true})).toBeVisible();
  }
  await f.nativeImport(await readFile('/tmp/gs23-published-0.12.1.godseed'));
  await takeLife(page,'CHE_HUB');await expect(f.canvas).toHaveAttribute('data-npc','eira-v3');await takeLife(page,'CHE_CALL_PROMISE','CHE_PROMISE_LISTEN','CHE_PACK_TAKE','CHE_RECIPE_CRAFT');await page.getByLabel('แก่นธาตุ',{exact:true}).selectOption('LIGHT');await clickLife(page,'ผสมและค้นพบเวท');await takeLife(page,'CHE_RECIPE_LIGHT');await reachEchoTrial(page);
  await takeLife(page,'CH2102','CHE_BYPASS_WAIT','CHE_RESULT_RECORD','CHE_RECORD_CARE','CHE_MAREN_STAY','CHE_LUMI_PAUSE','CHE_CLOSE_PIERCE','CHG_HUB','CHG_CALL_LUMI','CHG_LUMI_PROMISE','CHG_KIT_TAKE','CHG_CRAFT_OPEN');await page.getByLabel('แก่นธาตุ').selectOption('BLOOM');await page.getByLabel('รูปแบบ').selectOption('RING');await page.getByLabel('ตัวปรับ').selectOption('HEAL');await clickLife(page,'ผสมและค้นพบเวท');
  await takeLife(page,'CHG_CRAFT_MAREN','CHG_MAREN_REST','CHG_PASSAGE_SAMPLE','CHG_READ_PATTERN','CHG_PACT_STANDARD','CH2201');await expect(f.canvas).toHaveAttribute('data-npc','guardian-v16');await expect(f.canvas).toHaveAttribute('data-guardian-phase','1');activeFile=await exportFile(page);await page.screenshot({path:new URL(mode+'-guardian-390.png',dir).pathname,fullPage:true});
  await finishGuardian(page,await exportedState(page),true);const won=await exportedState(page),decisionFile=await exportFile(page);expect(won.flags.battle_B05_done).toBe(true);expect(won.rewarded.filter(id=>id==='win:B05_MEMORY_GUARDIAN')).toHaveLength(1);
  const conclusions=[];let final;
  for(const [a,b,c,flag,route] of [['CH2301','CH2401','CHG_FAMILY_STAY','chapter1_family','family'],['CH2302','CH2501','CHG_COMMUNITY_PATH','chapter1_community','community'],['CH2303','CH2601','CHG_ARCHIVE_QUESTION','chapter1_archive','archive']]){
   await f.nativeImport(decisionFile);await takeLife(page,a,b,c);const end=await exportedState(page);expect(end.flags.chapter1_complete).toBe(true);expect(end.flags[flag]).toBe(true);await expect(f.canvas).toHaveAttribute('data-chapter-resolution',route);await page.screenshot({path:new URL(mode+'-'+route+'-390.png',dir).pathname,fullPage:true});await takeLife(page,'CH2701');final=await exportedState(page);expect(final.flags.guardian_chapter_reward).toBe(true);
   const saved=await exportFile(page);await f.audit();await page.reload();await expect(page.getByRole('button',{name:'เริ่มการเดินทาง',exact:true})).toBeVisible();await f.nativeImport(saved);expect(await exportedState(page)).toEqual(final);await takeLife(page,'CHG_REVISIT','CH2701');expect((await exportedState(page)).inventory).toEqual(final.inventory);final=await exportedState(page);conclusions.push({route,chapterComplete:true,sharedGiftOnce:true,roundTrip:true,stateSha256:hash(JSON.stringify(final))});
  }
  await clickLife(page,'ความทรงจำ');await expect(page.locator('#content')).toContainText('บทเพลงที่เลือกเดินทางต่อ · สำเร็จ');await clickLife(page,'บันทึก');await page.getByLabel('โหลดเกมจากไฟล์',{exact:true}).setInputFiles({name:'broken.godseed',mimeType:'application/json',buffer:Buffer.from('{broken')});await expect(page.getByRole('heading',{name:'ตรวจสอบไฟล์เซฟก่อนโหลด',exact:true})).toHaveCount(0);expect(await exportedState(page)).toEqual(final);
  const stateSha256=hash(JSON.stringify(final));if(mode==='public')expect(stateSha256).toBe(JSON.parse(await readFile(new URL('local-guardian.json',dir))).stateSha256);
  const result={result:'PASS',url,version,at:new Date().toISOString(),sourceCommit:process.env.GODSEED_SOURCE_COMMIT||'uncommitted-candidate',legacy,coldTitlePngCount:f.titlePngCount,guardianAndGladeNotLoadedOnTitle:true,coldEiraActorCorrect:true,earnedHealingRecipe:true,allThreeGuardianPhases:true,nativeFilesAcrossAllPhases:true,firstWinRewardOnce:true,conclusions,malformedFilePreservesRAM:true,refreshStartsBlank:true,stateSha256,sameStateAsLocal:mode==='public',...await f.audit(),hardware:'NOT_TESTED'};
  await writeFile(new URL(mode+'-guardian.json',dir),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
 }finally{await f.context.close();}
 const viewports=[];for(const [width,height] of [[360,800],[390,844],[430,932],[844,390],[768,1024],[820,1180],[1024,768],[1366,768],[1440,900],[1920,1080]]){
  const f=await observed(width,height);try{await f.nativeImport(activeFile);await expect(f.page.locator('.battle-intent')).toContainText('กางผนึก');expect(JSON.parse(await f.canvas.getAttribute('data-player-anchor'))).toMatchObject({x:130,y:219,feetY:239,depth:239});expect(await f.page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);const before=await exportedState(f.page);await clickLife(f.page,'ตั้งรับ · ฟื้น MP 6');const after=await exportedState(f.page);expect(after.revision).toBe(before.revision+1);expect(after.battle.status.GUARDIAN_SEAL).toBe(2);await f.page.screenshot({path:new URL(mode+'-layout-'+width+'.png',dir).pathname,fullPage:true});viewports.push({width,height,input:width<1280?'touch':'keyboard',result:'PASS',...await f.audit()});}finally{await f.context.close();}
 }
 await writeFile(new URL(mode+'-layouts.json',dir),JSON.stringify({result:'PASS',url,at:new Date().toISOString(),viewports,hardware:'NOT_TESTED'},null,2)+'\n');console.log(JSON.stringify({result:'PASS',viewports:viewports.length}));
}finally{await browser.close();await ssr.close();}
