import {test,expect} from '@playwright/test';
import {start,snapshot,reachAge,openOverlay,closeOverlay,decide} from './helpers.js';
test('actual care, school and ritual contexts change room while preserving the map node and clock',async({page})=>{
 await start(page);const initial=await snapshot(page);await expect(page.locator('.play-scene')).toHaveAttribute('data-context','home');await expect.poll(()=>page.locator('.play-scene .location-image').evaluate(i=>i.complete&&i.naturalWidth===320)).toBe(true);
 await reachAge(page,6,{settleAtTarget:false});await expect(page.locator('.play-scene')).toHaveAttribute('data-context','classroom');const school=await snapshot(page);
 await openOverlay(page,'แผนที่และบริการ');expect(await snapshot(page)).toEqual(school);await closeOverlay(page);await decide(page);await expect(page.locator('.play-scene')).toHaveAttribute('data-context','outdoor');
 await reachAge(page,12,{settleAtTarget:false});await expect(page.locator('.play-scene')).toHaveAttribute('data-context','ceremony');const before=await snapshot(page);await decide(page);const after=await snapshot(page);
 expect(after.time.absoluteDay).toBe(before.time.absoluteDay+1);expect(after.progression.awakening.step).toBe(1);expect(after.world.currentLocationId).toBe(initial.world.currentLocationId);await page.locator('.major-option').last().click();await expect(page.locator('.play-scene')).toHaveAttribute('data-context','outdoor');expect(await page.evaluate(()=>localStorage.length)).toBe(0);
});
test('an explicit walk updates the canonical outdoor scene once and opens the map without returning to a room',async({page})=>{
 await start(page);await reachAge(page,4);const before=await snapshot(page);await page.getByRole('button',{name:'วางแผนเดินทาง',exact:true}).click();const destination=await page.getByRole('combobox',{name:'จุดหมายการเดินทาง'}).inputValue();await page.getByRole('button',{name:/^เดินเท้ากับผู้ร่วมทาง/}).click();
 const after=await snapshot(page);expect(after.world.currentLocationId).toBe(destination);expect(after.time.absoluteDay).toBeGreaterThan(before.time.absoluteDay);await expect(page.locator('.play-scene')).toHaveAttribute('data-location-id',destination);await expect(page.locator('.play-scene')).toHaveAttribute('data-context','outdoor');
 await openOverlay(page,'แผนที่และบริการ');expect(await snapshot(page)).toEqual(after);await closeOverlay(page);expect((await snapshot(page)).world.currentLocationId).toBe(destination);
});
test('missing interior files show a matching procedural room without changing life or replacing it with another node',async({page})=>{
 await page.route('**/assets/scenes/interiors/*.png',route=>route.abort());await start(page);const before=await snapshot(page);await expect(page.locator('.scene-art-fallback svg')).toHaveAttribute('aria-label','บ้านครอบครัว');await expect(page.locator('.play-scene')).toHaveAttribute('data-location-id',before.world.currentLocationId);
 await closeOverlay(page);expect(await snapshot(page)).toEqual(before);expect(await page.evaluate(()=>localStorage.length)).toBe(0);
});
