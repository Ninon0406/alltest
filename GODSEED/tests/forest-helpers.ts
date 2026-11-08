import {expect,type Page} from '@playwright/test';
import {enterGuardian,finishGuardian} from './guardian-helpers';
import {takeLife,clickLife} from './life-helpers';
import {exportFile,exportedState,loadFile} from './file-helpers';
import {scenes} from '../src/content/story';
let chapterFile:Buffer|undefined;
/** One real opening→guardian→conclusion run. Subsequent cases explicitly import
 * that UI-exported file; nothing injects flags, inventory or browser storage. */
export async function chapterStart(page:Page){
 if(!chapterFile){await enterGuardian(page);await takeLife(page,'CH2201');await finishGuardian(page,await exportedState(page));await takeLife(page,'CH2301','CH2401','CHG_FAMILY_STAY','CH2701',...Array<string>(7).fill('CH0210'));chapterFile=await exportFile(page);}
 else{await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');await loadFile(page,chapterFile);}
}
export async function enterForest(page:Page){
 await chapterStart(page);await takeLife(page,'CHA2_HUB','CHA2_CALL_PACK','CHA2_PACK_TAKE','CHA2_RECIPE_OPEN');
 await page.getByLabel('แก่นธาตุ').selectOption('BLOOM');await page.getByLabel('รูปแบบ').selectOption('WARD');await page.getByLabel('ตัวปรับ').selectOption('GUARD');await clickLife(page,'ผสมและค้นพบเวท');
 await takeLife(page,'CHA2_RECIPE_LEAVE','CHA2_GOODBYE_PROMISE','CHA2_EDGE_MARK','CHA2_MARK_NOTE','CHA2_ROOT_SOIL','CHA2_DRY_HAND','CHA2_BROOK_SAMPLE','CHA2_PIP_WAIT','CHA2_HOLLOW_TRACE','CHA2_RING_BLOOM');
 await expect(page.locator('#canvas')).toHaveAttribute('data-stage','forest_road');await expect(page.locator('#canvas')).toHaveAttribute('data-stage-layers','3');await expect(page.locator('#canvas')).toHaveAttribute('data-forest-root-frame','2');
}
export async function tapChoice(page:Page,id:string){const c=Object.values(scenes).flatMap(s=>s.choices).find(c=>c.id===id)!;const b=page.getByRole('button',{name:c.label,exact:true});await b.scrollIntoViewIfNeeded();await b.tap();}
