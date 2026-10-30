import {test,expect} from '@playwright/test';
import {startV8,v8Snapshot} from '../../scripts/v8-playthrough.mjs';
import {waitForCharacterImages} from '../../scripts/published-character-check.mjs';
for(const width of [320,360,390,768,1024,1366,1920])test(`V8 primary life action and local scene at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:844});await page.emulateMedia({reducedMotion:'reduce'});await startV8(page,{seed:0});await page.getByRole('button',{name:'ข้ามไปเหตุการณ์ถัดไป',exact:true}).click();await waitForCharacterImages(page);await page.locator('.location-image').evaluate(image=>image.decode());
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);const action=await page.locator('.v8-choice:not([disabled])').first().boundingBox();expect(action.height).toBeGreaterThanOrEqual(44);expect(action.y+action.height).toBeLessThanOrEqual(844);expect((await page.locator('.v8-age').boundingBox()).y).toBeLessThan(120);
 const scene=await page.locator('.play-scene').boundingBox();expect(scene.height).toBeLessThanOrEqual(200);expect(await page.locator('.play-scene').getAttribute('data-location-id')).toBe((await v8Snapshot(page)).world.currentLocationId);await page.screenshot({path:`work/v8-${width}.png`});
});
