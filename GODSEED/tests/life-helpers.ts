import {expect,type Page} from '@playwright/test';
import {scenes} from '../src/content/story.ts';
import {exportedState} from './file-helpers.ts';

export const choiceLabel=(id:string)=>Object.values(scenes).flatMap(s=>s.choices).find(c=>c.id===id)!.label;
export async function clickLife(page:Page,name:string){
 const button=page.getByRole('button',{name,exact:true});
 if(!await button.isVisible()&&await page.locator('.other-routes summary').isVisible())await page.locator('.other-routes summary').click();
 if((page.viewportSize()?.width||0)>=1280){await button.focus();await page.keyboard.press('Enter');}else await button.tap();
 await expect(page.locator('#content')).toHaveAttribute('aria-busy','false',{timeout:20_000});
}
export async function takeLife(page:Page,...ids:string[]){for(const id of ids)await clickLife(page,choiceLabel(id));}
/** Earn every flag, item and spell through the public UI. No injected save/state. */
export async function completeOpening(page:Page,url='/'){
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto(url);await clickLife(page,'เริ่มการเดินทาง');
 await takeLife(page,'CH0001','CH0101','CH0202','CH0401');await clickLife(page,'ทดลองสูตรแรกจากของที่มี');await clickLife(page,'ผสมและค้นพบเวท');
 await takeLife(page,'CH0201','CH0301','CH03B1','CH0204','CH0701','CH1401','CH0205','CH0802','CH0903','CH1301','CH0208',
  'CH1801','CHV6_BOX_LOOK','CHV6_BOX_HAND','CH1802','CHV6_NOTES_MARK','CHV6_NOTES_COPY','CH1803','CHV6_LIGHT_HAND','CHV6_LIGHT_RECORD',
  'CH1810','CHV6_VOW_SHARE','CHV6_REHEARSE_SLOW','CH1903','CHV6_CLOSE_SHARE','CHV6_SHARED_REMEMBER','CHV6_MORNING_FINISH');
}
export async function winTraining(page:Page){
 for(let i=0;i<30;i++){
  if(!await page.getByRole('button',{name:'ประกายพื้นฐาน · MP 0',exact:true}).count())return;
  const spell=page.getByRole('button',{name:'วายุดารานำวิถี · MP 10',exact:true});
  await clickLife(page,await spell.isEnabled()?'วายุดารานำวิถี · MP 10':'ประกายพื้นฐาน · MP 0');
 }
 throw Error('Training did not finish in 30 actions');
}
export async function learnBothPaths(page:Page){
 await takeLife(page,'CHLP_HUB','CHLP_START_EXPLORER','CHLP_E_BEGIN','CHLP_E_SURVEY_FEET','CHLP_E_MARK_RIBBON','CHLP_E_ACK_MAP','CHLP_E_TRIAL_START');
 await winTraining(page);await takeLife(page,'CHLP_E_RANK2_SHARE','CHLP_E_HOME_CROSS','CHLP_START_NATURE','CHLP_N_BEGIN','CHLP_N_SOURCE_CLEAR','CHLP_N_WATER_BUCKET','CHLP_N_ACK_PATIENCE','CHLP_N_TRIAL_START');
 await winTraining(page);await takeLife(page,'CHLP_N_RANK2_REFUGE','CHLP_N_HOME_CROSS','CHLP_SHARED_LESSON','CHLP_SHARED_GUIDE');
 const state=await exportedState(page);expect(state.flags.lp_explorer_rank2).toBe(true);expect(state.flags.lp_nature_rank2).toBe(true);expect(state.flags.lp_shared_guide).toBe(true);return state;
}
