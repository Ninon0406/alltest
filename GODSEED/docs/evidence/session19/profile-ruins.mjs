// Diagnostic only: desktop Chromium CPU throttling is not a mobile acceptance gate.
// Supply a manually exported 0.8+ file with ruins_open; no game state is injected.
import {chromium,expect} from '../../../node_modules/@playwright/test/index.mjs';
import {loadFile} from '../../../tests/file-helpers.ts';
import {readFile,writeFile} from 'node:fs/promises';
const [url,filePath,prefix='profile-preview']=process.argv.slice(2);
if(!url||!filePath)throw Error('Usage: node profile-ruins.mjs URL MANUAL_SAVE_FILE [PREFIX]');
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
const context=await browser.newContext({viewport:{width:390,height:844},hasTouch:true}),page=await context.newPage(),errors=[];
page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
const stable=()=>expect(page.locator('#content')).toHaveAttribute('aria-busy','false',{timeout:18_000});
const act=async name=>{const b=page.getByRole('button',{name,exact:true});if(!await b.isVisible()&&await page.locator('.other-routes summary').isVisible())await page.locator('.other-routes summary').tap();await b.tap();await stable();};
const pngResources=()=>page.evaluate(()=>performance.getEntriesByType('resource').filter(r=>/\.png(?:\?|$)/.test(r.name)).map(r=>({url:new URL(r.name).pathname,encodedBytes:r.encodedBodySize,transferBytes:r.transferSize})));
const sampleFrames=()=>page.evaluate(()=>new Promise(resolve=>{
 const intervals=[];let first,last;function frame(t){if(first===undefined)first=t;if(last!==undefined)intervals.push(t-last);last=t;if(t-first<8000){requestAnimationFrame(frame);return;}
 const sorted=[...intervals].sort((a,b)=>a-b),q=p=>sorted[Math.min(sorted.length-1,Math.floor(sorted.length*p))];
 resolve({sampleMs:t-first,intervals:intervals.length,meanMs:intervals.reduce((a,b)=>a+b,0)/intervals.length,p50Ms:q(.5),p95Ms:q(.95),p99Ms:q(.99),intervalsOver50Ms:intervals.filter(v=>v>50).length});}requestAnimationFrame(frame);
}));
try{
 const cdp=await context.newCDPSession(page);await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});await cdp.send('Performance.enable');
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto(url);await expect(page.locator('.edition')).toContainText('0.9.0');await expect(page.locator('#canvas')).toHaveAttribute('data-render-status','ready');const title=await pngResources();
 await loadFile(page,await readFile(filePath));await act('เข้าโบราณสถานเสียงสะท้อน');await expect(page.locator('#canvas')).toHaveAttribute('data-ruins-art','shrine-v12');
 const motion=async reduced=>{if(await page.locator('#motion').getAttribute('aria-pressed')!==String(reduced))await act('ลดการเคลื่อนไหว');};
 const samples=[];for(const [cpuRate,reducedMotion] of [[1,false],[4,false],[4,true]]){await cdp.send('Emulation.setCPUThrottlingRate',{rate:cpuRate});await motion(reducedMotion);samples.push({cpuRate,reducedMotion,...await sampleFrames()});}
 await cdp.send('Emulation.setCPUThrottlingRate',{rate:1});await motion(true);
 const metrics=async()=>{await cdp.send('HeapProfiler.collectGarbage');const {metrics}=await cdp.send('Performance.getMetrics');return Object.fromEntries(metrics.filter(m=>['JSHeapUsedSize','Nodes','Documents','LayoutObjects'].includes(m.name)).map(m=>[m.name,m.value]));};
 await act('กลับไปเตรียมของ');await act('เข้าโบราณสถานเสียงสะท้อน');const before=await metrics(),warm=await pngResources();
 const warmRevisitSamples=[];for(let i=1;i<=20;i++){await act('กลับไปเตรียมของ');await act('เข้าโบราณสถานเสียงสะท้อน');if([5,10,20].includes(i))warmRevisitSamples.push({revisits:i,metrics:await metrics()});}
 const after=await metrics(),final=await pngResources();expect(errors).toEqual([]);
 const result={result:'PASS_DIAGNOSTIC',url,version:'0.9.0',browser:browser.version(),viewport:{width:390,height:844},titlePngs:title.length,titlePngEncodedBytes:title.reduce((s,r)=>s+r.encodedBytes,0),samples,revisits:20,newPngRequestsOnWarmRevisits:final.length-warm.length,warmRevisitSamples,memory:{before,after,delta:Object.fromEntries(Object.keys(before).map(k=>[k,after[k]-before[k]]))},consoleErrors:errors,scope:'8-second stable ruins samples in headless desktop Chromium at CPU1/4. Loopback byte counts are not internet timings. GC heap samples do not prove absence of leaks. No real mobile GPU/FPS/thermal or animation/VFX load acceptance.'};
 await writeFile(new URL(prefix+'.json',import.meta.url),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
}finally{await browser.close();}
