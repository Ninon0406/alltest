// Real published 0.11.1 UI export, captured before this batch's deployment.
import {chromium,expect} from '../../../node_modules/@playwright/test/index.mjs';
import {writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {completeOpening} from '../../../tests/life-helpers.ts';
import {exportFile} from '../../../tests/file-helpers.ts';
const url=process.argv[2],browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']}),page=await browser.newPage({viewport:{width:390,height:844},hasTouch:true});
try{
 await completeOpening(page,url);await expect(page.locator('.edition')).toContainText('0.11.1');
 await page.screenshot({path:new URL('before-public-0111.png',import.meta.url).pathname,fullPage:true});
 const bytes=await exportFile(page),body=JSON.parse(bytes);expect(body.gameVersion).toBe('0.11.1');expect(body.state.flags.arc1_opening_complete).toBe(true);
 await writeFile('/tmp/gs22-published-0.11.1.godseed',bytes,{mode:0o600});
 const result={result:'PASS',url,version:body.gameVersion,at:new Date().toISOString(),genuineUIExport:true,stateSha256:createHash('sha256').update(JSON.stringify(body.state)).digest('hex'),fileSha256:createHash('sha256').update(bytes).digest('hex'),saveBytes:'Only /tmp/gs22-published-0.11.1.godseed; never committed or uploaded'};
 await writeFile(new URL('legacy-capture.json',import.meta.url),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));
}finally{await browser.close();}
