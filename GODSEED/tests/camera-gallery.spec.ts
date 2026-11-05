import {test,expect} from '@playwright/test';
test.use({hasTouch:true});
for(const [width,height] of [[390,844],[820,1180],[1024,768],[1366,768]])test(`camera gallery six genuine stages ${width}`,async({page})=>{
 test.setTimeout(180_000);await page.setViewportSize({width,height});await page.emulateMedia({reducedMotion:'reduce'});const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');const canvas=page.locator('#canvas');await expect(canvas).toHaveAttribute('data-render-status','ready');
 const tap=async(name:string)=>{const b=page.getByRole('button',{name,exact:true});if(!await b.isVisible()&&await page.locator('.other-routes summary').isVisible())await page.locator('.other-routes summary').tap();await b.tap();await expect(page.locator('#content')).toHaveAttribute('aria-busy','false');};
 const photo=async(stage:string)=>{await expect(canvas).toHaveAttribute('data-stage',stage);await tap('ลดการเคลื่อนไหว');await page.waitForTimeout(100);const c=JSON.parse((await canvas.getAttribute('data-camera-shot'))!);expect(c.zoom).toBe(1.08);expect(c.left).toBeGreaterThanOrEqual(0);expect(c.right).toBeLessThanOrEqual(480);await canvas.screenshot({path:`test-results/gallery-${stage}-${width}.png`});await tap('ลดการเคลื่อนไหว');};
 await tap('เริ่มการเดินทาง');await tap('ลุกขึ้นสำรวจรอบตัว');await photo('village');for(const n of ['เดินตามป้ายไม้ไปที่จัตุรัส','แวะสวนดอกไม้ของยายมาเรน'])await tap(n);await photo('garden');
 for(const n of ['ช่วยรดน้ำและเก็บเมล็ด','ไปโรงช่างของคุโร'])await tap(n);await photo('workshop');for(const n of ['ขอเรียนการผสมเวท','ทดลองสูตรแรกจากของที่มี','ผสมและค้นพบเวท','ไปโรงช่างของคุโร','ฝึกต่อสู้กับภูตจำลอง'])await tap(n);
 await tap('ลดการเคลื่อนไหว');const shot=page.waitForFunction(()=>{const d=document.querySelector<HTMLElement>('#canvas')?.dataset;if(d?.actionPhase!=='action'||!d.cameraShot)return null;const c=JSON.parse(d.cameraShot);return c.x>5?c:null;},null,{polling:'raf'});
 await page.getByRole('button',{name:'วายุดารานำวิถี · MP 10',exact:true}).tap();const h=await shot;expect((await h.jsonValue()).right).toBeLessThanOrEqual(480);await h.dispose();await expect(page.locator('#content')).toHaveAttribute('aria-busy','false');await tap('ลดการเคลื่อนไหว');await tap('ยุติการฝึก');
 for(const n of ['ขอเรียนการผสมเวท','ออกไปหาของเพิ่มเติมก่อน','เข้าหอสมุดของไอรา'])await tap(n);await photo('archive');for(const n of ['ขอดูจารึกเสียงสะท้อน','จดพิกัดโบราณสถาน','สำรวจลำธารสีหยก'])await tap(n);await photo('stream');
 for(const n of ['กลับหมู่บ้าน','เดินทางสู่ชายป่า'])await tap(n);await photo('forest');
 const castFrame=async(name:string,stage:string,side:number)=>{
  await tap('ลดการเคลื่อนไหว');
  const seen=page.waitForFunction(side=>{const d=document.querySelector<HTMLElement>('#canvas')?.dataset;if(d?.actionPhase!=='action'||!d.cameraShot)return null;const c=JSON.parse(d.cameraShot);return c.x*side>5?c:null;},side,{polling:'raf'});
  await page.getByRole('button',{name,exact:true}).tap();const h=await seen,c=await h.jsonValue();await h.dispose();expect(c.left).toBeGreaterThanOrEqual(0);expect(c.right).toBeLessThanOrEqual(480);
  await canvas.screenshot({path:`test-results/combat-camera-${stage}-${side}-${width}.png`});await expect(page.locator('#content')).toHaveAttribute('aria-busy','false');expect(JSON.parse((await canvas.getAttribute('data-camera-shot'))!).x).toBe(0);await tap('ลดการเคลื่อนไหว');
 };
 const win=async(enemy:string)=>{for(let turn=0;turn<16&&await page.getByRole('heading',{name:enemy,exact:true}).count();turn++){const b=page.getByRole('button',{name:'วายุดารานำวิถี · MP 10',exact:true});await tap(await b.isEnabled()?'วายุดารานำวิถี · MP 10':'ตั้งรับ · ฟื้น MP 6');}await expect(page.getByRole('heading',{name:enemy,exact:true})).toHaveCount(0);};
 for(const n of ['เข้าไปตามทางแสง','ลองใช้เวทให้มันถอย'])await tap(n);await castFrame('วายุดารานำวิถี · MP 10','forest',1);await win('ต้นอ่อนหลงทาง');
 for(const n of ['ลอกลายโน้ตเก็บไว้','เก็บชิ้นส่วนโน้ตเรืองแสง','แวะสวนดอกไม้ของยายมาเรน','ค้นหาน้ำค้างเยียวยา','ผสมเวท'])await tap(n);
 await page.getByLabel('แก่นธาตุ',{exact:true}).selectOption('BLOOM');await page.getByLabel('รูปแบบ',{exact:true}).selectOption('RING');await page.getByLabel('ตัวปรับ',{exact:true}).selectOption('HEAL');await tap('ผสมและค้นพบเวท');
 for(let n=0;n<4;n++)await tap('พักผ่อนที่ม้านั่ง');for(const n of ['สำรวจลำธารสีหยก','ตรวจดูหมอกใต้สะพาน'])await tap(n);
 await castFrame('วายุดารานำวิถี · MP 10','stream',1);await castFrame('พฤกษาวงแหวนชีวา · MP 14','stream',-1);expect(JSON.parse((await canvas.getAttribute('data-spell-target'))!).kind).toBe('player');await win('วิญญาณละอองธารา');
 await expect(page.getByRole('heading',{name:'ทำนองในสายน้ำ',exact:true})).toBeVisible();expect(errors).toEqual([]);
});
