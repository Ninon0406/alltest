import {test,expect} from '@playwright/test';
import {start,snapshot,openOverlay,closeOverlay} from './helpers.js';
for(const width of [320,360,390,768,1024,1366,1920])test(`compact dashboard and in-page overlays at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:900});const errors=[];page.on('pageerror',e=>errors.push(e.message));await start(page);const before=await snapshot(page);
 const visible=await page.locator('#displayAge').boundingBox();expect(visible.y).toBeLessThan(150);await expect(page.locator('#displayPower')).toHaveText('Lv. 1 / 100');await expect(page.locator('.play-scene .pixel-sprite')).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth&&document.documentElement.scrollHeight<=innerHeight+1)).toBe(true);
 for(const name of ['แผนที่และบริการ','อาชีพและการฝึก','กระเป๋า','บันทึกชีวิตรายปี']){await openOverlay(page,name);expect(await snapshot(page)).toEqual(before);expect(await page.getByRole('dialog').evaluate(e=>e.getBoundingClientRect().width<=innerWidth)).toBe(true);await closeOverlay(page);}
 await openOverlay(page,'ตัวเลือก');await page.getByRole('combobox',{name:'ขนาดตัวอักษร'}).selectOption('125');await closeOverlay(page);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.screenshot({path:`/tmp/reborn-ui-${width}.png`});expect(errors).toEqual([]);
});
