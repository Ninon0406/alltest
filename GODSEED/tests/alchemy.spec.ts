import {test,expect} from '@playwright/test';
test.use({hasTouch:true});
for(const [width,height] of [[390,844],[820,1180],[1024,768],[1366,768]])test(`recipe preview, filtered book and empty loadout ${width}`,async({page})=>{
 test.setTimeout(60000);await page.setViewportSize({width,height});await page.emulateMedia({reducedMotion:'reduce'});const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/');
 const click=async(name:string)=>{await page.getByRole('button',{name,exact:true}).tap();await expect(page.locator('#content')).toHaveAttribute('aria-busy','false');};
 for(const label of ['เริ่มการเดินทาง','ลุกขึ้นสำรวจรอบตัว','เดินตามป้ายไม้ไปที่จัตุรัส','ไปโรงช่างของคุโร','ขอเรียนการผสมเวท','ทดลองสูตรแรกจากของที่มี'])await click(label);
 await expect(page.getByRole('heading',{name:'เวทยังไม่ค้นพบ',exact:true})).toBeVisible();await page.getByLabel('แก่นธาตุ',{exact:true}).selectOption('FIRE');await page.getByLabel('ตัวปรับ',{exact:true}).selectOption('HEAL');await expect(page.getByRole('button',{name:'ผสมและค้นพบเวท',exact:true})).toBeDisabled();await expect(page.getByLabel('ตัวอย่างสูตร')).toContainText('เยียวยา');
 await page.getByLabel('แก่นธาตุ',{exact:true}).selectOption('WIND');await page.getByLabel('ตัวปรับ',{exact:true}).selectOption('SEEK');await click('ผสมและค้นพบเวท');
 for(const label of ['แวะสวนดอกไม้ของยายมาเรน','ช่วยรดน้ำและเก็บเมล็ด','แวะสวนดอกไม้ของยายมาเรน','ค้นหาน้ำค้างเยียวยา','ผสมเวท'])await click(label);
 await expect(page.getByRole('button',{name:'ผสมและค้นพบเวท',exact:true})).toBeDisabled();await expect(page.getByLabel('ตัวอย่างสูตร')).toContainText('รู้จักเวทนี้แล้ว');
 await page.getByLabel('แก่นธาตุ',{exact:true}).selectOption('BLOOM');await page.getByLabel('รูปแบบ',{exact:true}).selectOption('RING');await page.getByLabel('ตัวปรับ',{exact:true}).selectOption('HEAL');await click('ผสมและค้นพบเวท');await click('สมุดเวท');
 await page.getByLabel('กรองประเภท',{exact:true}).selectOption('heal');await expect(page.getByRole('heading',{name:'พฤกษาวงแหวนชีวา',exact:true})).toBeVisible();await expect(page.getByRole('heading',{name:'วายุดารานำวิถี',exact:true})).toHaveCount(0);
 await click('ถอดเวทช่อง 1');await expect(page.getByRole('heading',{name:'สมุดเวทมนตร์',exact:true})).toBeVisible();await expect(page.getByLabel('กรองประเภท',{exact:true})).toHaveValue('heal');await expect(page.getByText('ช่อง 1: พฤกษาวงแหวนชีวา',{exact:true})).toBeVisible();await click('ถอดเวทช่อง 1');
 await page.getByLabel('กรอง MP',{exact:true}).selectOption('10');await expect(page.getByText('ยังไม่มีเวทที่ตรงกับตัวกรอง',{exact:true})).toBeVisible();await page.screenshot({path:`test-results/alchemy-${width}.png`,fullPage:true});
 await page.reload();await click('เล่นต่อจากความทรงจำ');await click('สมุดเวท');await expect(page.getByText('ช่อง 1: ว่าง',{exact:true})).toBeVisible();await expect(page.getByRole('heading',{name:'วายุดารานำวิถี',exact:true})).toBeVisible();
 for(const label of ['เรื่องราว','ไปโรงช่างของคุโร','ฝึกต่อสู้กับภูตจำลอง'])await click(label);for(let n=0;n<9;n++)await click('ประกายพื้นฐาน · MP 0');await expect(page.getByRole('heading',{name:'โรงช่างที่กลิ่นเหล็กกับดอกไม้',exact:true})).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);expect(errors).toEqual([]);
});
