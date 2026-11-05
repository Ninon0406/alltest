import {test,expect,type Page} from '@playwright/test';
import {exportFile,exportedState,loadFile} from './file-helpers';
test.use({hasTouch:true});
const tap=async(page:Page,name:string)=>{await page.getByRole('button',{name,exact:true}).tap();await expect(page.locator('#content')).toHaveAttribute('aria-busy','false');};
async function start(page:Page){await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');await expect(page.locator('#canvas')).toHaveAttribute('data-render-status','ready');await tap(page,'เริ่มการเดินทาง');await tap(page,'ลุกขึ้นสำรวจรอบตัว');}
for(const [width,height] of [[390,844],[844,390],[820,1180],[1024,768],[1366,768]])test(`manual download, empty reload, preview and file upload ${width}`,async({page})=>{
 await page.setViewportSize({width,height});await start(page);const file=await exportFile(page),original=JSON.parse(file.toString()).state;
 await page.reload();await expect(page.getByRole('button',{name:'เริ่มการเดินทาง',exact:true})).toBeVisible();await expect(page.getByRole('button',{name:'โหลดเกมจากไฟล์',exact:true})).toHaveCount(1);await expect(page.getByRole('button',{name:'เล่นต่อจากความทรงจำ',exact:true})).toHaveCount(0);
 await page.getByLabel('โหลดเกมจากไฟล์',{exact:true}).setInputFiles({name:'my.godseed',mimeType:'application/json',buffer:file});await expect(page.getByRole('heading',{name:'ตรวจสอบไฟล์เซฟก่อนโหลด',exact:true})).toBeVisible();await expect(page.getByText(/HP 100\/100/).last()).toBeVisible();await page.screenshot({path:`test-results/manual-preview-${width}.png`,fullPage:true});
 await tap(page,'ยืนยันโหลดไฟล์นี้');expect(await exportedState(page)).toEqual(original);await tap(page,'เก็บขนนกสีฟ้าที่ข้างทางก่อน');const after=await exportedState(page);expect(after.inventory.CORE_WIND).toBe(1);expect(after.revision).toBe(original.revision+1);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
test('corrupt, oversized and wrong extension files preserve current RAM and cancelled preview changes nothing',async({page})=>{
 await start(page);const file=await exportFile(page),original=JSON.parse(file.toString()).state;await tap(page,'บันทึก');
 for(const [name,data,message] of [['bad.godseed','{broken','อ่านไฟล์เซฟไม่ได้'],['bad.html','{}','กรุณาเลือกไฟล์'],['big.godseed',' '.repeat(1_000_001),'ขนาดใหญ่']] as const){await page.getByLabel('โหลดเกมจากไฟล์',{exact:true}).setInputFiles({name,mimeType:'application/json',buffer:Buffer.from(data)});await expect(page.locator('#notice')).toContainText(message);expect(await exportedState(page)).toEqual(original);}
 const altered=JSON.parse(file.toString());altered.state.hp=3;await page.getByLabel('โหลดเกมจากไฟล์',{exact:true}).setInputFiles({name:'changed.godseed',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(altered))});await expect(page.locator('#notice')).toContainText('เสียหาย');expect(await exportedState(page)).toEqual(original);
 await page.getByLabel('โหลดเกมจากไฟล์',{exact:true}).setInputFiles({name:'good.godseed',mimeType:'application/json',buffer:file});await tap(page,'ยกเลิกการโหลด');expect(await exportedState(page)).toEqual(original);
});
test('legacy raw V1 file is previewed and migrated only after explicit confirmation',async({page})=>{
 await start(page);const original=await exportedState(page),old:Record<string,unknown>={...original,version:1};delete old.xp;delete old.recoveryScene;await page.reload();await page.getByPlaceholder('อาเรน').fill('ชื่อที่ยังไม่เริ่ม');const buffer=Buffer.from(JSON.stringify(old));await page.getByLabel('โหลดเกมจากไฟล์',{exact:true}).setInputFiles({name:'legacy.json',mimeType:'application/json',buffer});await tap(page,'ยกเลิกการโหลด');await expect(page.getByPlaceholder('อาเรน')).toHaveValue('ชื่อที่ยังไม่เริ่ม');await loadFile(page,buffer,'legacy.json');expect(await exportedState(page)).toEqual(original);expect(JSON.parse(buffer.toString()).version).toBe(1);
});
test('dirty exit warns and download never silently exits or asserts disk success',async({page})=>{
 await start(page);await tap(page,'เมนูหลัก');await expect(page.getByText('ความคืบหน้าที่ยังไม่ได้บันทึกเป็นไฟล์จะหายไป ต้องการบันทึกก่อนหรือไม่?',{exact:true})).toBeVisible();await tap(page,'กลับไปเล่นต่อ');await expect(page.getByRole('heading',{name:'เส้นทางสู่หมู่บ้าน',exact:true})).toBeVisible();
 await tap(page,'เริ่มเกมใหม่');const download=page.waitForEvent('download');await tap(page,'บันทึกเกมเป็นไฟล์');expect((await download).suggestedFilename()).toMatch(/\.godseed$/);await expect(page.locator('#notice')).toContainText('ยังยืนยันไม่ได้');await expect(page.getByRole('heading',{name:'ก่อนออกจากเรื่องราว',exact:true})).toBeVisible();await tap(page,'กลับไปเล่นต่อ');const before=await exportedState(page);await tap(page,'เก็บขนนกสีฟ้าที่ข้างทางก่อน');await tap(page,'เริ่มเกมใหม่');await tap(page,'ออกโดยไม่บันทึก');const next=await exportedState(page);expect(next.runId).not.toBe(before.runId);expect(next.scene).toBe('S00_WAKE');
});
test('no browser progress storage and no save upload during the genuine craft/combat loop',async({page})=>{
 await page.addInitScript(()=>{
  const audit:string[]=[];Object.defineProperty(window,'saveStorageAudit',{value:audit});
  Storage.prototype.setItem=function(){audit.push('Storage.setItem');throw Error('Progress storage prohibited');};
  for(const key of ['open','deleteDatabase'] as const)indexedDB[key]=function(){audit.push('indexedDB.'+key);throw Error('Progress storage prohibited');} as never;
  const descriptor=Object.getOwnPropertyDescriptor(Document.prototype,'cookie');if(descriptor?.set)Object.defineProperty(document,'cookie',{get:()=>'',set:()=>{audit.push('cookie');throw Error('Cookies prohibited');}});
 });
 const uploaded:string[]=[];page.on('request',request=>{if(request.method()!=='GET'&&request.method()!=='HEAD')uploaded.push(request.url());});await start(page);
 for(const name of ['เก็บขนนกสีฟ้าที่ข้างทางก่อน','ไปโรงช่างของคุโร','ขอเรียนการผสมเวท','ทดลองสูตรแรกจากของที่มี','ผสมและค้นพบเวท','ไปโรงช่างของคุโร','ฝึกต่อสู้กับภูตจำลอง','วายุดารานำวิถี · MP 10','ยุติการฝึก'])await tap(page,name);
 const file=await exportFile(page);await page.reload();await loadFile(page,file);expect(await page.evaluate(()=>(window as unknown as {saveStorageAudit:string[]}).saveStorageAudit)).toEqual([]);expect(uploaded).toEqual([]);
});
test('export is disabled during a cinematic; refresh warns and never writes a hidden file',async({page})=>{
 await start(page);await tap(page,'ลดการเคลื่อนไหว');const downloads:string[]=[];page.on('download',file=>downloads.push(file.suggestedFilename()));await page.getByRole('button',{name:'เก็บขนนกสีฟ้าที่ข้างทางก่อน',exact:true}).tap();await expect(page.getByRole('button',{name:'บันทึกเกมเป็นไฟล์',exact:true})).toBeDisabled();await expect(page.locator('#content')).toHaveAttribute('aria-busy','true');await tap(page,'ข้ามแอนิเมชัน');
 const dialog=page.waitForEvent('dialog');const reload=page.reload();const warning=await dialog;expect(warning.type()).toBe('beforeunload');await warning.accept();await reload;await expect(page.getByRole('button',{name:'เริ่มการเดินทาง',exact:true})).toBeVisible();expect(downloads).toEqual([]);
});
