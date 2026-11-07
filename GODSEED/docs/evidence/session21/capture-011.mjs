// Run against published0.11.0 before the0.11.1 renderer fix is deployed.
import {chromium,expect} from '../../../node_modules/@playwright/test/index.mjs';
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {clickLife,takeLife,learnBothPaths} from '../../../tests/life-helpers.ts';
import {loadFile,exportFile} from '../../../tests/file-helpers.ts';
const url=process.argv[2],browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']}),page=await browser.newPage({viewport:{width:390,height:844},hasTouch:true});
try{
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto(url);await expect(page.locator('.edition')).toContainText('0.11.0');await loadFile(page,await readFile('/tmp/gs21-published-0.10.godseed'));await learnBothPaths(page);await takeLife(page,'CH0210','CH0210','CH0207','CH1502');await clickLife(page,'ตั้งรับ · ฟื้น MP 6');await clickLife(page,'สำรวจจังหวะ · MP 4');
 const file=await exportFile(page),body=JSON.parse(file);expect(body.gameVersion).toBe('0.11.0');expect(body.state.battle.pathActions).toEqual({rootGuardUsed:true,scouted:true});expect(body.state.battle.playerStatus.TRAIL_FOCUS).toBe(2);await writeFile('/tmp/gs21-published-0.11.godseed',file,{mode:0o600});
 const result={result:'PASS',url,version:'0.11.0',at:new Date().toISOString(),genuineUIExport:true,activeFocus:2,bothPathActions:true,fileSha256:createHash('sha256').update(file).digest('hex'),stateSha256:createHash('sha256').update(JSON.stringify(body.state)).digest('hex'),saveLocation:'Only /tmp/gs21-published-0.11.godseed; no save bytes committed or uploaded'};await writeFile(new URL('legacy011-capture.json',import.meta.url),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
}finally{await browser.close();}
