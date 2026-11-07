import {expect,type Page} from '@playwright/test';
import {takeLife,clickLife,completeOpening} from './life-helpers.ts';
export async function enterEcho(page:Page,url='/',light=true){
 await completeOpening(page,url);await takeLife(page,'CHE_HUB','CHE_CALL_PROMISE','CHE_PROMISE_LISTEN','CHE_PACK_TAKE');
 if(light){await takeLife(page,'CHE_RECIPE_CRAFT');await page.getByLabel('แก่นธาตุ').selectOption('LIGHT');await clickLife(page,'ผสมและค้นพบเวท');await takeLife(page,'CHE_RECIPE_LIGHT');}
 else await takeLife(page,'CHE_RECIPE_READY');
 await expect(page.locator('#canvas')).toHaveAttribute('data-location','glade');
}
export async function reachEchoTrial(page:Page){await takeLife(page,'CHE_ROAD_WATER','CHE_WATER_HAND','CHE_ARCH_READ','CHE_LISTEN_PAUSE','CHE_SIGNAL_TEAM');}
export async function winEcho(page:Page){
 for(let i=0;i<40;i++){
  const battle=page.getByRole('button',{name:'ประกายพื้นฐาน · MP 0',exact:true});if(!await battle.count())return;
  const core=await page.locator('#canvas').getAttribute('data-echo-core'),name=core==='LIGHT'?'วายุดารานำวิถี · MP 10':'อรุณดารานำวิถี · MP 11',sp=page.getByRole('button',{name,exact:true});
  await clickLife(page,await sp.isEnabled()?name:'ตั้งรับ · ฟื้น MP 6');
 }
 throw Error('Echo battle did not finish within 40 actual actions');
}
