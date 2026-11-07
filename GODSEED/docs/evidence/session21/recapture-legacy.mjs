// Recreate genuine manual exports after an executor replacement removed /tmp.
// Historical compiled clients and assets are served unchanged from this repo.
import {createServer} from 'node:http';
import {execFileSync} from 'node:child_process';
import {readFile,writeFile,mkdir,stat} from 'node:fs/promises';
import {resolve,extname} from 'node:path';
import {createHash} from 'node:crypto';
import {chromium,expect} from '../../../node_modules/@playwright/test/index.mjs';
import {completeOpening,clickLife,takeLife} from '../../../tests/life-helpers.ts';
import {exportFile} from '../../../tests/file-helpers.ts';
const root=resolve(new URL('../../../../',import.meta.url).pathname),dir=new URL('./',import.meta.url);
const versions={'009':{ref:'825bfa5',version:'0.9.0',file:'/tmp/gs20-published-0.9.godseed'},'010':{ref:'f2396f4',version:'0.10.0',file:'/tmp/gs21-published-0.10.godseed'}};
const html=Object.fromEntries(Object.entries(versions).map(([id,v])=>[id,execFileSync('git',['show',v.ref+':index.html'],{cwd:root})]));
const server=createServer(async(req,res)=>{try{const path=new URL(req.url,'http://localhost').pathname,match=path.match(/^\/(009|010)\/(.*)$/);if(!match)throw Error('not found');let bytes,type;if(!match[2]||match[2]==='index.html'){bytes=html[match[1]];type='text/html';}else{const file=resolve(root,match[2]);if(!file.startsWith(root+'/assets/'))throw Error('not asset');bytes=await readFile(file);type={'.js':'text/javascript','.css':'text/css','.png':'image/png','.svg':'image/svg+xml'}[extname(file)]||'application/octet-stream';}res.writeHead(200,{'Content-Type':type,'Cache-Control':'no-store'});res.end(bytes);}catch{res.writeHead(404);res.end('not found');}});
await new Promise(r=>server.listen(4299,'127.0.0.1',r));const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']}),records=[];
try{
 for(const [id,v] of Object.entries(versions)){
  const context=await browser.newContext({viewport:{width:390,height:844},hasTouch:true}),page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  try{const url=`http://127.0.0.1:4299/${id}/`;
   if(id==='010')await completeOpening(page,url);
   else{await page.emulateMedia({reducedMotion:'reduce'});await page.goto(url);await clickLife(page,'เริ่มการเดินทาง');await takeLife(page,'CH0001','CH0101','CH0202','CH0401');await clickLife(page,'ทดลองสูตรแรกจากของที่มี');await clickLife(page,'ผสมและค้นพบเวท');await takeLife(page,'CH0204','CH0701','CH1401','CH0207','CH1502');for(let i=0;i<3;i++)await clickLife(page,'ตั้งรับ · ฟื้น MP 6');}
   await expect(page.locator('.edition')).toContainText(v.version);const file=await exportFile(page),body=JSON.parse(file);expect(body.gameVersion).toBe(v.version);if(id==='009')expect(body.state.battle.status.RUNE_WARD).toBe(2);else expect(body.state.flags.arc1_opening_complete).toBe(true);expect(errors).toEqual([]);await writeFile(v.file,file,{mode:0o600});records.push({version:v.version,sourceCommit:v.ref,genuineUIExport:true,compiledClientUnmodified:true,fileSha256:createHash('sha256').update(file).digest('hex'),stateSha256:createHash('sha256').update(JSON.stringify(body.state)).digest('hex'),bytes:(await stat(v.file)).size,localFile:v.file,consoleErrors:errors});
  }finally{await context.close();}
 }
 const report={result:'PASS',at:new Date().toISOString(),reason:'Executor replacement removed temporary private files; regenerated via original historical compiled clients, not fabricated state. These are new exports and do not reuse prior hashes. Save bytes remain only in/tmp, never committed/uploaded.',records};await writeFile(new URL('legacy-recapture.json',dir),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report));
}finally{await browser.close();await new Promise(r=>server.close(r));}
