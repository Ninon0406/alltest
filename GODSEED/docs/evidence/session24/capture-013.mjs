// Native export from the currently published 0.13 UI, before 0.14 is deployed.
import {chromium,expect} from '../../../node_modules/@playwright/test/index.mjs';
import {createServer} from '../../../node_modules/vite/dist/node/index.js';
import {writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const ssr=await createServer({root:new URL('../../../',import.meta.url).pathname,configFile:false,optimizeDeps:{entries:[],noDiscovery:true},server:{middlewareMode:true,hmr:false,ws:false},appType:'custom'});
const {enterGuardian}=await ssr.ssrLoadModule('/tests/guardian-helpers.ts'),{takeLife}=await ssr.ssrLoadModule('/tests/life-helpers.ts'),{exportFile}=await ssr.ssrLoadModule('/tests/file-helpers.ts');
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
try{
 const page=await browser.newPage({viewport:{width:390,height:844},hasTouch:true}),errors=[],posts=[];page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(!['GET','HEAD'].includes(r.method()))posts.push(r.url());});
 const url='https://ninon0406.github.io/alltest/';await enterGuardian(page,url);await expect(page.locator('.edition')).toContainText('0.13.0');await takeLife(page,'CH2201');
 const bytes=await exportFile(page),body=JSON.parse(bytes.toString());expect(body.gameVersion).toBe('0.13.0');expect(body.checkpoint.batchId).toBeUndefined();expect(body.state.battle.id).toBe('B05_MEMORY_GUARDIAN');expect(body.state.battle.guardian.supplies).toBeDefined();expect(errors).toEqual([]);expect(posts).toEqual([]);
 await writeFile('/tmp/gs24-published-0.13.godseed',bytes);await page.screenshot({path:new URL('published-013-guardian-390.png',import.meta.url).pathname,fullPage:true});
 const hash=b=>createHash('sha256').update(b).digest('hex');const receipt={result:'PASS',url,at:new Date().toISOString(),gameVersion:body.gameVersion,formatVersion:body.formatVersion,scene:body.state.scene,battle:body.state.battle.id,oldFile2HasNoBatchId:true,fileSha256:hash(bytes),stateSha256:hash(JSON.stringify(body.state)),saveBytes:'private /tmp only; not committed or uploaded',consoleErrors:errors,saveUploads:posts};await writeFile(new URL('legacy-013-capture.json',import.meta.url),JSON.stringify(receipt,null,2)+'\n');console.log(JSON.stringify(receipt));
}finally{await browser.close();await ssr.close();}
