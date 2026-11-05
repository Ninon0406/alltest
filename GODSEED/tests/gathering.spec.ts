import {test,expect,type Page} from '@playwright/test';
test.use({hasTouch:true});
const tap=async(page:Page,name:string)=>{await page.getByRole('button',{name,exact:true}).tap();await expect(page.locator('#content')).toHaveAttribute('aria-busy','false',{timeout:12_000});};
for(const [width,height] of [[390,844],[820,1180],[1024,768],[1366,768]])test(`visible gathering props and saved reward ${width}`,async({page})=>{
 await page.setViewportSize({width,height});await page.emulateMedia({reducedMotion:'reduce'});const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');const canvas=page.locator('#canvas');await expect(canvas).toHaveAttribute('data-render-status','ready');
 for(const name of ['เริ่มการเดินทาง','ลุกขึ้นสำรวจรอบตัว'])await tap(page,name);
 await expect(canvas).toHaveAttribute('data-gathering-props','CH0102');await page.screenshot({path:`test-results/gather-feather-${width}.png`,fullPage:true});
 await tap(page,'เก็บขนนกสีฟ้าที่ข้างทางก่อน');await expect(canvas).toHaveAttribute('data-gathering-props','');
 await page.reload();await tap(page,'เล่นต่อจากความทรงจำ');await expect(canvas).toHaveAttribute('data-gathering-props','');
 await tap(page,'แวะสวนดอกไม้ของยายมาเรน');await expect(canvas).toHaveAttribute('data-gathering-props','CH0601,CH0603');await page.screenshot({path:`test-results/gather-garden-${width}.png`,fullPage:true});
 await tap(page,'ช่วยรดน้ำและเก็บเมล็ด');await tap(page,'กระเป๋า');await expect(page.locator('#content').getByText(/เมล็ด|พฤกษา/).first()).toBeVisible();expect(errors).toEqual([]);
});
test('missing gathering atlas keeps old choices and saving playable',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});await page.route('**/assets/art-v6/gathering.png',r=>r.abort());await page.goto('/');await expect(page.locator('#canvas')).toHaveAttribute('data-render-status','degraded');
 for(const name of ['เริ่มการเดินทาง','ลุกขึ้นสำรวจรอบตัว','เก็บขนนกสีฟ้าที่ข้างทางก่อน'])await tap(page,name);
 await expect(page.getByRole('heading',{name:'จัตุรัสของเรื่องราว',exact:true})).toBeVisible();await page.reload();await tap(page,'เล่นต่อจากความทรงจำ');await expect(page.getByRole('heading',{name:'จัตุรัสของเรื่องราว',exact:true})).toBeVisible();
});
