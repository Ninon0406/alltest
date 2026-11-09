import {expect,type Page} from '@playwright/test';
import {chapterStart} from './forest-helpers';
import {takeLife,clickLife} from './life-helpers';
import {exportFile,exportedState,loadFile} from './file-helpers';
import {fight} from '../src/systems/game';
const files=new Map<string,Buffer>(),studyFiles=new Map<string,Buffer>();
/** Files originate from public UI actions, never an injected State or invented flag. */
export async function graduateAlchemist(page:Page,branch:'care'|'path'|'record'='care'){
 const file=files.get(branch);if(file){await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');await loadFile(page,file);return;}
 await studyAlchemist(page,branch);
 await takeLife(page,'CHALC_SAMPLE_CAST','CHALC_COMPARE_LIMIT','CHALC_RANK1','CHALC_TRIAL_START');
 let s=await exportedState(page);for(let i=0;s.battle&&i<40;i++){const id=s.mp>=10?'SPELL_WIND_ORB_SEEK':'BASIC_PULSE';await clickLife(page,id==='BASIC_PULSE'?'ประกายพื้นฐาน · MP 0':'วายุดารานำวิถี · MP 10');s=fight(s,id);}expect(await exportedState(page)).toEqual(s);expect(s.scene).toBe('ALC_RESULT');
 await takeLife(page,'CHALC_RESULT_NOTE','CHALC_RANK2');files.set(branch,await exportFile(page));
}
export async function studyAlchemist(page:Page,branch:'care'|'path'|'record'='care'){
 const file=studyFiles.get(branch);if(file){await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');await loadFile(page,file);return;}
 await chapterStart(page);const decision={care:'CHA2_DECIDE_CARE',path:'CHA2_DECIDE_PATH',record:'CHA2_DECIDE_RECORD'},back={care:'CHA2_CARE_RETURN',path:'CHA2_PATH_RETURN',record:'CHA2_RECORD_RETURN'};
 await takeLife(page,'CHA2_HUB','CHA2_CALL_PACK','CHA2_PACK_TAKE','CHA2_RECIPE_LEAVE','CHA2_GOODBYE_PROMISE','CHA2_EDGE_PIP','CHA2_PIP_WAIT','CHA2_HOLLOW_TRACE','CHA2_RING_HAND','CHA2_TRIAL_PATIENCE','CHA2_PATIENCE_PASS','CHA2_RESULT_COMPARE','CHA2_TRACE_OBSERVE','CHA2_LEGACY_LIMIT',decision[branch],back[branch],'CHA2_RETURN_MAREN','CHA2_MAREN_LISTEN','CHA2_EIRA_SHARE','CHA2_EPILOGUE_FINISH');
 await takeLife(page,'CHALC_HUB','CHALC_CALL_MEET','CHALC_MEET_ASK','CHALC_TABLE_LIMIT','CHALC_START','CHALC_GARDEN_SOURCE','CHALC_SOURCE_EDGE','CHALC_WASH_SLOW','CHALC_LEAF_CHECK','CHALC_MEASURE','CHALC_CRAFT');
 await page.getByLabel('แก่นธาตุ').selectOption('WATER');await page.getByLabel('รูปแบบ').selectOption('RING');await page.getByLabel('ตัวปรับ').selectOption('HEAL');await clickLife(page,'ผสมและค้นพบเวท');
 await takeLife(page,'CHALC_RECIPE_TEST');studyFiles.set(branch,await exportFile(page));
}
export async function alchemistPack(page:Page,branch:'care'|'path'|'record'='care'){
 await graduateAlchemist(page,branch);const ways={care:['CHALC_RETURN_ROOT','CHALC_ROOT_SPACE'],path:['CHALC_RETURN_SIGN','CHALC_SIGN_WALK'],record:['CHALC_RETURN_NOTES','CHALC_NOTES_LIMIT']};await takeLife(page,...ways[branch],'CHALC_PLAN_PACK');
}
