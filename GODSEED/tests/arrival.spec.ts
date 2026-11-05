import {test,expect,type Page} from '@playwright/test';
test.use({hasTouch:true});
const stable=async(page:Page)=>expect(page.locator('#content')).toHaveAttribute('aria-busy','false',{timeout:12_000});
const tap=async(page:Page,name:string)=>{await page.getByRole('button',{name,exact:true}).tap();await stable(page);};
test('arrival stops the gait during the camera return and imported saves reset staging',async({page},info)=>{
 test.setTimeout(60_000);await page.setViewportSize({width:390,height:844});await page.emulateMedia({reducedMotion:'no-preference'});
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/');const canvas=page.locator('#canvas');await expect(canvas).toHaveAttribute('data-render-status','ready');
 for(const name of ['เริ่มการเดินทาง','ลุกขึ้นสำรวจรอบตัว','บันทึก'])await tap(page,name);
 const download=page.waitForEvent('download');await tap(page,'ส่งออกเซฟ');const file=await download,stream=await file.createReadStream(),chunks:Buffer[]=[];for await(const chunk of stream!)chunks.push(Buffer.from(chunk));
 await tap(page,'เรื่องราว');await tap(page,'เก็บขนนกสีฟ้าที่ข้างทางก่อน');
 const arrival=page.waitForFunction(()=>{const d=document.querySelector<HTMLElement>('#canvas')?.dataset;return d?.actionPhase==='action'&&d.pathPhase==='interaction'&&d.targetAnchor==='fountain_front'?{pose:d.playerAction,animation:d.idleAnimation}:null;},null,{polling:'raf'});
 await page.getByRole('button',{name:'ไปหาลูมิที่บ่อน้ำ',exact:true}).tap();const h=await arrival;expect(await h.jsonValue()).toEqual({pose:'idle',animation:'hero-idle-north'});await h.dispose();await stable(page);
 expect(JSON.parse((await canvas.getAttribute('data-player-anchor'))!)).toMatchObject({x:254,y:211});await page.screenshot({path:info.outputPath('arrival-idle-390.png'),fullPage:true});
 // Import a genuine earlier export from the same run/map. Retaining the
 // fountain position here would stage the old S01 narrative incorrectly.
 await tap(page,'บันทึก');page.once('dialog',d=>d.accept());await page.getByLabel('นำเข้าเซฟ',{exact:true}).setInputFiles({name:'earlier-s01.json',mimeType:'application/json',buffer:Buffer.concat(chunks)});await stable(page);
 await expect(page.getByRole('heading',{name:'เส้นทางสู่หมู่บ้าน',exact:true})).toBeVisible();expect(JSON.parse((await canvas.getAttribute('data-player-anchor'))!)).toMatchObject({x:154,y:219});expect(errors).toEqual([]);
});
