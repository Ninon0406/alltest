import {exportFile,loadFile,reloadFromFile} from '../tests/file-helpers.ts';
import {chromium,expect} from '@playwright/test';import {fileURLToPath} from 'node:url';import path from 'node:path';import {readFile, readdir, mkdir} from 'node:fs/promises';import {createHash} from 'node:crypto';
const game=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');const root=path.dirname(game);
const target=process.argv[2];if(!target)throw Error('URL required');
const browser=await chromium.launch({executablePath:process.env.CI?undefined:(process.env.CHROMIUM_PATH||'/usr/bin/chromium'),args:['--no-sandbox']});const page=await browser.newPage({viewport:{width:390,height:844},hasTouch:true});const errors=[],referenceRequests=[];page.on('request',r=>{if(r.url().includes('/reference/'))referenceRequests.push(r.url());});page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
try{
 await page.emulateMedia({reducedMotion:'reduce'});
 const res=await page.goto(target);const html=await res.text();const local=await readFile(path.join(root,'index.html'),'utf8');const script=local.match(/src="([^\"]+\.js)"/)[1];if(!html.includes(script))throw Error('Public HTML is not current GODSEED');const bytes=Buffer.from(await page.evaluate(async url=>Array.from(new Uint8Array(await (await fetch(url)).arrayBuffer())),new URL(script,target).href));const expected=await readFile(path.join(root,script.replace(/^\.\//,'')));const hash=b=>createHash('sha256').update(b).digest('hex');if(hash(bytes)!==hash(expected))throw Error('Public JS hash mismatch');
 const canvas=page.locator('#canvas');await expect(canvas).toHaveAttribute('data-render-status','ready');await expect(canvas).toHaveAttribute('data-stage-layers','3');
 const artFiles=(await Promise.all(['art-v2','art-v3','art-v4','art-v5','art-v6','art-v7','art-v8','art-v9','art-v10','art-v11','art-v12','art-v13'].map(async folder=>(await readdir(path.join(game,'public/assets',folder))).filter(name=>name.endsWith('.png')).map(name=>folder+'/'+name)))).flat();
 for(const name of artFiles){const assetUrl=new URL('assets/'+name,target).href;const remote=Buffer.from(await page.evaluate(async url=>Array.from(new Uint8Array(await (await fetch(url)).arrayBuffer())),assetUrl));const local=await readFile(path.join(game,'public/assets',name));if(hash(remote)!==hash(local))throw Error('Public art hash mismatch: '+name);}
 if(process.argv.includes('--assets-only')){expect(referenceRequests).toEqual([]);expect(errors).toEqual([]);console.log(JSON.stringify({url:target,result:'PASS',assetsOnly:true,jsSha256:hash(bytes),layeredArtFiles:artFiles.length,developmentReferenceRequests:referenceRequests.length,consoleErrors:errors}));}
 else{
 await expect(page.getByRole('button',{name:'ลดการเคลื่อนไหว'})).toHaveAttribute('aria-pressed','true');await page.getByRole('button',{name:'เริ่มการเดินทาง'}).tap();const click=async(name)=>{await expect(page.locator('#content')).toHaveAttribute('aria-busy','false');const button=page.getByRole('button',{name,exact:true});if(!await button.isVisible()&&await page.locator('.other-routes summary').isVisible())await page.locator('.other-routes summary').tap();await button.tap();await expect(page.getByRole('button',{name:'ข้ามแอนิเมชัน',exact:true})).toBeHidden();await expect(page.locator('#content')).toHaveAttribute('aria-busy','false');};
 await click('นั่งพักใต้ต้นเมล็ด');await expect(canvas).toHaveAttribute('data-location','under_tree');await expect(canvas).toHaveAttribute('data-player-action','rest');await expect(canvas).toHaveAttribute('data-leaf-fall','active');
 await mkdir(path.join(game,'test-results'),{recursive:true});await page.screenshot({path:path.join(game,'test-results/public-tree-390.png'),fullPage:true});
 await reloadFromFile(page);await expect(canvas).toHaveAttribute('data-player-action','rest');
 for(const name of ['ลุกขึ้นสำรวจรอบตัว','เก็บขนนกสีฟ้าที่ข้างทางก่อน','ไปหาลูมิที่บ่อน้ำ'])await click(name);
 await expect(canvas).toHaveAttribute('data-location','village_center');await expect(canvas).toHaveAttribute('data-idle-animation','hero-idle-north');
 await page.screenshot({path:path.join(game,'test-results/public-fountain-390.png'),fullPage:true});
 for(const name of ['ช่วยดูว่ากล่องดนตรีเสียตรงไหน','บอกลูมิว่าจะช่วยตามหาทำนอง','ไปโรงช่างของคุโร','ขอเรียนการผสมเวท','ทดลองสูตรแรกจากของที่มี','ผสมและค้นพบเวท','เดินทางสู่ชายป่า','เก็บขนนกกับละอองเมฆข้างทาง','ลองใช้เวทให้มันถอย'])await click(name);
 await mkdir(path.join(game,'test-results'),{recursive:true});await page.screenshot({path:path.join(game,'test-results/public-battle-390.png'),fullPage:true});
 for(let i=0;i<12&&await page.getByRole('button',{name:'วายุดารานำวิถี · MP 10',exact:true}).count();i++){const b=page.getByRole('button',{name:'วายุดารานำวิถี · MP 10',exact:true});await click(await b.isEnabled()?'วายุดารานำวิถี · MP 10':'ตั้งรับ · ฟื้น MP 6');}
 for(const name of ['ลอกลายโน้ตเก็บไว้','เก็บชิ้นส่วนโน้ตเรืองแสง'])await click(name);await expect(page.getByText(/จบช่วงทดลองเมล็ดแรก/)).toBeVisible();
 for(const name of ['แวะใต้ต้นเมล็ด','นั่งพักใต้ต้นเมล็ด'])await click(name);await reloadFromFile(page);await expect(page.getByRole('heading',{name:'ความทรงจำใต้ต้นเมล็ด',exact:true})).toBeVisible();await expect(canvas).toHaveAttribute('data-player-action','rest');await click('เดินกลับจัตุรัส');
 await reloadFromFile(page);await expect(page.getByText(/จบช่วงทดลองเมล็ดแรก/)).toBeVisible();for(const name of ['ไปโรงช่างของคุโร','นำเบาะแสจากป่าให้คุโรดู','ทดลองสูตรแรกจากของที่มี'])await click(name);
 await page.getByLabel('แก่นธาตุ',{exact:true}).selectOption('FIRE');await page.getByLabel('รูปแบบ',{exact:true}).selectOption('ORB');await page.getByLabel('ตัวปรับ',{exact:true}).selectOption('SPLIT');await click('ผสมและค้นพบเวท');
 for(const name of ['ออกไปหาของเพิ่มเติมก่อน','ไปโรงช่างของคุโร','ฝึกต่อสู้กับภูตจำลอง'])await click(name);
 await expect(page.getByRole('heading',{name:'ภูตฝึกเวทจำลอง',exact:true})).toBeVisible();await expect(page.getByText('HP ศัตรู 35/35',{exact:true})).toBeVisible();await expect(canvas).toHaveAttribute('data-npc','training-v2');await expect(canvas).toHaveAttribute('data-stage-layers','3');
 const fire=page.getByRole('button',{name:'เพลิงดาราพันประกาย · MP 11',exact:true});if(!await fire.isEnabled())await click('ตั้งรับ · ฟื้น MP 6');await click('เพลิงดาราพันประกาย · MP 11');
 await page.screenshot({path:path.join(game,'test-results/public-training-390.png'),fullPage:true});
 for(let i=0;i<12&&await page.getByRole('heading',{name:'ภูตฝึกเวทจำลอง',exact:true}).count();i++)await click('ประกายพื้นฐาน · MP 0');
 await expect(page.getByRole('heading',{name:'โรงช่างที่กลิ่นเหล็กกับดอกไม้',exact:true})).toBeVisible();
 // Continue the same real run through the newly authored archive/stream content.
 for(const name of ['ช่วยยกกล่องเครื่องมือ','ออกไปหาของเพิ่มเติมก่อน','เข้าหอสมุดของไอรา','ช่วยจัดหนังสือก่อน','จดพิกัดโบราณสถาน','เข้าหอสมุดของไอรา','ขอดูจารึกเสียงสะท้อน','ศึกษาเวทเสียงสะท้อน'])await click(name);
 const makeRecipe=async(core,form,mod)=>{await click('ผสมเวท');await page.getByLabel('แก่นธาตุ',{exact:true}).selectOption(core);await page.getByLabel('รูปแบบ',{exact:true}).selectOption(form);await page.getByLabel('ตัวปรับ',{exact:true}).selectOption(mod);await click('ผสมและค้นพบเวท');};
 await makeRecipe('ECHO','ORB','LINGER');
 for(const name of ['แวะสวนดอกไม้ของยายมาเรน','ช่วยรดน้ำและเก็บเมล็ด','สำรวจลำธารสีหยก','เก็บน้ำหยกกับน้ำค้าง','ปล่อยกระดิ่งไว้และจำจังหวะเสียง'])await click(name);
 await makeRecipe('WATER','RING','HEAL');
 for(let n=0;n<4;n++)await click('พักผ่อนที่ม้านั่ง');
 for(const name of ['สำรวจลำธารสีหยก','ตรวจดูหมอกใต้สะพาน'])await click(name);
 await expect(canvas).toHaveAttribute('data-npc','wisp-v3');await expect(page.getByText('HP ศัตรู 52/52',{exact:true})).toBeVisible();
 await click('เสียงสะท้อนดาราเนิ่นนาน · MP 14');const storedHud=await page.locator('#hud').innerText(),storedEnemy=await page.getByText(/HP ศัตรู/).innerText();
 await reloadFromFile(page);await expect(page.locator('#hud')).toHaveText(storedHud);await expect(page.getByText(/HP ศัตรู/)).toHaveText(storedEnemy);
 await click('ธาราวงแหวนชีวา · MP 14');await click('วายุดารานำวิถี · MP 10');
 await page.screenshot({path:path.join(game,'test-results/public-stream-390.png'),fullPage:true});
 for(let n=0;n<16&&await page.getByRole('heading',{name:'วิญญาณละอองธารา',exact:true}).count();n++)await click('ประกายพื้นฐาน · MP 0');
 await expect(page.getByRole('heading',{name:'ทำนองในสายน้ำ',exact:true})).toBeVisible();
 for(const name of ['ช่วยนำกระดิ่งออกจากรากไม้','สำรวจลำธารสีหยก'])await click(name);
 await expect(canvas).toHaveAttribute('data-stream-mist','clear');
 for(const name of ['กลับหมู่บ้าน','เข้าหอสมุดของไอรา'])await click(name);
 await expect(canvas).toHaveAttribute('data-npc','eira-v3');await expect(page.getByText(/เธอช่วยให้ลำธารกลับมาใสแล้ว/)).toBeVisible();
 await page.screenshot({path:path.join(game,'test-results/public-archive-390.png'),fullPage:true});
 await page.getByRole('button',{name:'บันทึก',exact:true}).tap();
 const file=await exportFile(page);const envelope=JSON.parse(file.toString());
 const canonical=value=>Array.isArray(value)?'['+value.map(canonical).join(',')+']':value!==null&&typeof value==='object'?'{'+Object.entries(value).sort(([a],[b])=>a<b?-1:a>b?1:0).map(([k,v])=>JSON.stringify(k)+':'+canonical(v)).join(',')+'}':JSON.stringify(value);
 if(envelope.format!=='GODSEED_SAVE'||hash(Buffer.from(canonical(Object.fromEntries(Object.entries(envelope).filter(([key])=>key!=='checksum')))))!==envelope.checksum||!envelope.state.flags.slice_complete||!envelope.state.flags.training_won||envelope.state.version!==2||!envelope.state.flags.stream_clean||!envelope.state.flags.battle_B02_done||!envelope.state.flags.archive_read||!envelope.state.known.includes('SPELL_ECHO_ORB_LINGER')||!envelope.state.known.includes('SPELL_WATER_RING_HEAL'))throw Error('Public exported checksum or progress mismatch');
 await loadFile(page,file);await expect(page.getByRole('heading',{name:'หอสมุดของไอรา',exact:true})).toBeVisible();
 expect(referenceRequests).toEqual([]);expect(errors).toEqual([]);console.log(JSON.stringify({url:target,result:'PASS',checksumExport:true,importRoundTrip:true,trainingAndFire:true,archiveAndStream:true,waterAndEcho:true,layeredArtFiles:artFiles.length,developmentReferenceRequests:referenceRequests.length,originalTrainingSpirit:true,jsSha256:hash(bytes),consoleErrors:errors,flow:'touch/start/craft/forest/clue/explicit-file-reload/fire-craft/practice/win/archive/echo/water/stream/explicit-file-reload/win/memory/export/import'}));
 }
}finally{await browser.close();}
