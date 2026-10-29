import {test,expect} from '@playwright/test';
import {start,snapshot,openOverlay,closeOverlay} from './helpers.js';
import {equipmentPlaythrough} from '../../scripts/equipment-playthrough.mjs';
test('real equipment purchases, owned sprite layers, training/work, resale and refresh use one actual life',async({page})=>{
 test.setTimeout(90000);await start(page);const baby=await snapshot(page);await openOverlay(page,'กระเป๋า');await page.locator('.equipment>summary').click();await expect(page.locator('.equipment')).toContainText('ยังไม่มีอุปกรณ์');await expect(page.locator('.equipment button')).toHaveCount(0);expect(await snapshot(page)).toEqual(baby);await closeOverlay(page);
 await equipmentPlaythrough(page);
});
