import {test,expect} from '@playwright/test';
for(const [w,h] of [[360,800],[390,844],[430,932],[768,1024],[820,1180],[1024,768],[1366,768],[1440,900],[1920,1080],[844,390]])test(`real loop and save ${w}x${h}`,async({page})=>{
 await page.setViewportSize({width:w,height:h});const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
 await page.goto('/');if(w===360)await page.screenshot({path:'test-results/title-360.png',fullPage:true});await page.getByRole('button',{name:'ลดการเคลื่อนไหว'}).click();await page.getByRole('button',{name:'เริ่มการเดินทาง'}).click();
 const click=async(name:string)=>{await page.getByRole('button',{name,exact:true}).click();await expect(page.getByRole('button',{name:'ข้ามแอนิเมชัน',exact:true})).toBeHidden();await expect(page.locator('#content')).toHaveAttribute('aria-busy','false');};
 for(const n of ['ลุกขึ้นสำรวจรอบตัว','เก็บขนนกสีฟ้าที่ข้างทางก่อน','ไปโรงช่างของคุโร','ขอเรียนการผสมเวท','ทดลองสูตรแรกจากของที่มี','ผสมและค้นพบเวท'])await click(n);
 await expect(page.getByRole('heading',{name:'จัตุรัสของเรื่องราว'})).toBeVisible();
 await page.getByRole('button',{name:'สมุดเวท',exact:true}).click();await expect(page.getByRole('heading',{name:'วายุดารานำวิถี'})).toBeVisible();
 await page.reload();await page.getByRole('button',{name:'เล่นต่อจากความทรงจำ'}).click();
 for(const n of ['เดินทางสู่ชายป่า','เก็บขนนกกับละอองเมฆข้างทาง','ลองใช้เวทให้มันถอย'])await click(n);
 await expect(page.getByRole('heading',{name:'ต้นอ่อนหลงทาง'})).toBeVisible();if([360,768,1366].includes(w))await page.screenshot({path:`test-results/battle-${w}.png`,fullPage:true});
 for(let i=0;i<10&&await page.getByRole('button',{name:'วายุดารานำวิถี · MP 10',exact:true}).count();i++){
 const b=page.getByRole('button',{name:'วายุดารานำวิถี · MP 10',exact:true});if(await b.isEnabled())await click('วายุดารานำวิถี · MP 10');else await click('ตั้งรับ · ฟื้น MP 6');
 if(w===360&&i===0){const hud=await page.locator('#hud').innerText(),enemy=await page.getByText(/HP ศัตรู/).innerText();await page.reload();await page.getByRole('button',{name:'เล่นต่อจากความทรงจำ'}).click();await expect(page.locator('#hud')).toHaveText(hud);await expect(page.getByText(/HP ศัตรู/)).toHaveText(enemy);}
 }
 await expect(page.getByRole('heading',{name:'เสียงบนใบไม้'})).toBeVisible();for(const n of ['ลอกลายโน้ตเก็บไว้','เก็บชิ้นส่วนโน้ตเรืองแสง'])await click(n);
 await expect(page.getByText(/จบช่วงทดลองเมล็ดแรก/)).toBeVisible();await page.getByRole('button',{name:'กระเป๋า',exact:true}).click();await expect(page.getByText('โน้ตบนใบไม้ × 1')).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.screenshot({path:`test-results/loop-${w}x${h}.png`,fullPage:true});expect(errors).toEqual([]);
});
test('project Pages subpath loads actual production assets and accepts keyboard/touch without duplicate action',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(r.url());});
 // A slow real PNG must not turn an early Enter on a disabled button into
 // an assumed game start. Keep the real keyboard/subpath/double-click path.
 await page.route('**/assets/art-v4/hero-walk.png',async route=>{await new Promise(resolve=>setTimeout(resolve,500));await route.continue();});
 await page.goto('http://127.0.0.1:4191/alltest/');
 await expect(page.locator('#canvas')).toHaveAttribute('data-render-status','ready');
 const start=page.getByRole('button',{name:'เริ่มการเดินทาง'});await expect(start).toBeEnabled();await start.focus();await page.keyboard.press('Enter');
 await page.getByRole('button',{name:'ลุกขึ้นสำรวจรอบตัว',exact:true}).click();await page.getByRole('button',{name:'ข้ามแอนิเมชัน',exact:true}).click();
 await expect(page.getByRole('heading',{name:'เส้นทางสู่หมู่บ้าน'})).toBeVisible();
 await page.getByRole('button',{name:'เก็บขนนกสีฟ้าที่ข้างทางก่อน',exact:true}).dblclick();await expect(page.getByRole('heading',{name:'จัตุรัสของเรื่องราว'})).toBeVisible();
 await page.getByRole('button',{name:'กระเป๋า',exact:true}).click();await expect(page.getByText('ขนนกสายลม × 1')).toBeVisible();
 await page.reload();await page.getByRole('button',{name:'เล่นต่อจากความทรงจำ'}).click();await expect(page.getByRole('heading',{name:'จัตุรัสของเรื่องราว'})).toBeVisible();expect(errors).toEqual([]);
});
test('touch controls commit one choice and expose an animated world',async({browser})=>{
 const context=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true});const page=await context.newPage();await page.goto('http://127.0.0.1:4190/');await page.getByRole('button',{name:'เริ่มการเดินทาง'}).tap();await expect(page.locator('canvas')).toBeVisible();await page.getByRole('button',{name:'ลุกขึ้นสำรวจรอบตัว',exact:true}).tap();await expect(page.getByRole('heading',{name:'เส้นทางสู่หมู่บ้าน'})).toBeVisible();await context.close();
});
