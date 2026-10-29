import {test,expect} from '@playwright/test';
import {start,snapshot,reachAge,openOverlay,closeOverlay} from './helpers.js';
import {catalogById} from '../../src/data/appearance-v2.js';
test('family portraits and trait descriptions use the actual inherited identity without advancing or persisting life',async({page})=>{
 await start(page);const original=await snapshot(page);expect(original.appearance.version).toBe(2);await openOverlay(page,'บันทึกตัวละคร');
 await expect(page.locator('.family-portraits figure')).toHaveCount(3);
 await expect(page.locator('[data-family-role="mother"]')).toContainText(original.birth.parents.mother);await expect(page.locator('[data-family-role="father"]')).toContainText(original.birth.parents.father);
 await expect(page.locator('.family-portraits [data-appearance-version="2"]')).toHaveCount(3);await page.locator('.family-traits>summary').click();await expect(page.locator('.family-traits>p')).toHaveCount(5);
 expect(await page.locator('.family-traits>p').allTextContents()).toEqual(expect.arrayContaining([expect.stringContaining('เค้าหน้า'),expect.stringContaining('สีผิว')]));
 await expect.poll(()=>page.locator('.family-room').evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
 for(const img of await page.locator('.family-traits img').all()){await img.scrollIntoViewIfNeeded();await expect.poll(()=>img.evaluate(i=>i.complete&&i.naturalWidth===64&&i.naturalHeight===80)).toBe(true);}
 expect(await page.getByRole('dialog').evaluate(d=>d.scrollWidth<=d.clientWidth)).toBe(true);expect(await snapshot(page)).toEqual(original);
 await closeOverlay(page);await openOverlay(page,'แผนที่และบริการ');await closeOverlay(page);await openOverlay(page,'บันทึกตัวละคร');expect((await snapshot(page)).appearance).toEqual(original.appearance);expect(await page.evaluate(()=>localStorage.length)).toBe(0);
});
test('owned clothing changes the live sprite with zero time or stat cost and keeps the wardrobe open',async({page})=>{
 await start(page);await openOverlay(page,'กระเป๋า');await page.locator('.wardrobe>summary').click();await expect(page.locator('.wardrobe-item')).toHaveCount(5);await expect(page.locator('.wardrobe button')).toHaveCount(0);await closeOverlay(page);
 await reachAge(page,3);const before=await snapshot(page),extra=before.wardrobe.owned.find(id=>id.startsWith('upper_')&&id!==before.wardrobe.equipped.upper),hat=before.wardrobe.owned.find(id=>id.startsWith('hats_'));
 await openOverlay(page,'กระเป๋า');await page.locator('.wardrobe>summary').click();await page.getByRole('button',{name:`สวม${catalogById[extra].label}`,exact:true}).click();
 await expect(page.locator('.wardrobe')).toHaveAttribute('open','');await expect(page.locator('.scene-character image[data-slot="upper"]')).toHaveAttribute('href',new RegExp(catalogById[extra].path+'$'));
 const dressed=await snapshot(page);expect(dressed.wardrobe.equipped.upper).toBe(extra);expect(dressed.time).toEqual(before.time);expect(dressed.gold).toBe(before.gold);expect(dressed.stats).toEqual(before.stats);expect(dressed.appearance).toEqual(before.appearance);expect(dressed.wardrobe.owned).toEqual(before.wardrobe.owned);
 await page.getByRole('button',{name:`สวม${catalogById[hat].label}`,exact:true}).click();await expect(page.locator('.scene-character image[data-slot="hats"]')).toHaveAttribute('href',new RegExp(catalogById[hat].path+'$'));
 await page.getByRole('button',{name:'ถอดหมวกเก็บในกระเป๋า',exact:true}).click();await expect(page.locator('.scene-character image[data-slot="hats"]')).toHaveCount(0);
 expect((await snapshot(page)).wardrobe.owned).toHaveLength(5);expect((await snapshot(page)).time).toEqual(before.time);expect(await page.evaluate(()=>localStorage.length)).toBe(0);
});
