import {expect,type Page} from '@playwright/test';
import {enterEcho,reachEchoTrial} from './echo-helpers';
import {takeLife,clickLife} from './life-helpers';
import {exportedState,reloadFromFile} from './file-helpers';
import {guardianAction} from './guardian-model';
import {fight} from '../src/systems/game';
import {byId} from '../src/systems/spells';
import type {State} from '../src/engine/state';
export async function enterGuardian(page:Page,url='/',gentle=false){
 await enterEcho(page,url);await reachEchoTrial(page);await takeLife(page,'CH2102','CHE_BYPASS_WAIT','CHE_RESULT_RECORD','CHE_RECORD_CARE','CHE_MAREN_STAY','CHE_LUMI_PAUSE','CHE_CLOSE_PIERCE',
 'CHG_HUB','CHG_CALL_LUMI','CHG_LUMI_PROMISE','CHG_KIT_TAKE','CHG_CRAFT_OPEN');await page.getByLabel('แก่นธาตุ').selectOption('BLOOM');await page.getByLabel('รูปแบบ').selectOption('RING');await page.getByLabel('ตัวปรับ').selectOption('HEAL');await clickLife(page,'ผสมและค้นพบเวท');
 await takeLife(page,'CHG_CRAFT_MAREN','CHG_MAREN_REST','CHG_PASSAGE_SAMPLE','CHG_READ_PATTERN',gentle?'CHG_PACT_GENTLE':'CHG_PACT_STANDARD');
}
export const battleLabel=(a:string)=>a==='GUARD'?'ตั้งรับ · ฟื้น MP 6':a==='BASIC_PULSE'?'ประกายพื้นฐาน · MP 0':a==='IT_POTION_DEW'?null:a==='IT_MANA_LEAF'?null:byId[a].name+' · MP '+byId[a].mp;
export async function guardianTurn(page:Page,s:State,a=guardianAction(s)){
 const label=battleLabel(a);if(label)await clickLife(page,label);else {const button=page.getByRole('button',{name:a==='IT_POTION_DEW'?/^น้ำค้างฟื้นพลัง ·/:/^ใบฟื้นเวท ·/});await button.tap();await expect(page.locator('#content')).toHaveAttribute('aria-busy','false');}return fight(s,a);
}
export async function finishGuardian(page:Page,s:State,files=false){
 const phases=new Set<number>();
 for(let n=0;s.battle&&n<160;n++){const phase=s.battle.enemyHp>100?1:s.battle.enemyHp>50?2:3;if(!phases.has(phase)){phases.add(phase);await expect(page.locator('#canvas')).toHaveAttribute('data-guardian-phase',String(phase));if(files){expect(await exportedState(page)).toEqual(s);await reloadFromFile(page);expect(await exportedState(page)).toEqual(s);}}
 s=await guardianTurn(page,s);}
 expect(s.scene).toBe('S23_DECISION');expect(phases.size).toBe(3);expect(await exportedState(page)).toEqual(s);return s;
}
