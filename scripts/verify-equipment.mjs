import {chromium} from '@playwright/test';
import {existsSync} from 'node:fs';
import {mkdir} from 'node:fs/promises';
import {equipmentPlaythrough} from './equipment-playthrough.mjs';
import {checkPublishedEquipment} from './published-equipment-check.mjs';
const classicURL=new URL(process.argv[2]??'http://127.0.0.1:4185/');classicURL.searchParams.set('classic','1');const url=classicURL.href;
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||(existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined),args:['--no-sandbox']});
try{await mkdir('work',{recursive:true});for(const width of [1366,320,360]){
 const page=await browser.newPage({viewport:{width,height:900}}),errors=[];page.setDefaultTimeout(30000);page.on('dialog',d=>d.accept());page.on('pageerror',e=>errors.push(e.message));page.on('requestfailed',r=>errors.push(r.url()));page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('favicon.ico'))errors.push(`${r.status()} ${r.url()}`);});
 await page.goto(url);await page.getByRole('button',{name:'ก้าวสู่ชีวิตใหม่',exact:true}).click();if(await checkPublishedEquipment(page)!==6)throw Error('Missing equipment assets');await equipmentPlaythrough(page,{screenshot:`work/equipment-${width}`});if(errors.length)throw Error(errors.join('\n'));
 console.log(`PASS ${url} ${width}: six published PNGs, actual birth-to-12/travel/shop, atomic payment, owned sprite layers, exact timed training/work bonuses, half-price resale, no active storage and fresh rebirth`);await page.close();
}}finally{await browser.close();}
