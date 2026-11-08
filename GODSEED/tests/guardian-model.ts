import {fresh,type State} from '../src/engine/state';
import {choose,craft,fight} from '../src/systems/game';
import {byId} from '../src/systems/spells';
export const take=(s:State,...ids:string[])=>ids.reduce((s,id)=>choose(s,id),s);
/** Real reducers only: no injected flags, items or spells in story witnesses. */
export function guardianReady(seed=179,gentle=false){
 let s=take(fresh('ผู้ฟังหน้าประตู',seed),'CH0001','CH0101','CH0202','CH0401');s=craft(s,'WIND','ORB','SEEK');
 s=take(s,'CH0201','CH0301','CH03B1','CH0204','CH0701','CH1401','CH0205','CH0802','CH0903','CH1301','CH0208','CH1801','CHV6_BOX_LOOK','CHV6_BOX_HAND','CH1802','CHV6_NOTES_MARK','CHV6_NOTES_COPY','CH1803','CHV6_LIGHT_HAND','CHV6_LIGHT_RECORD','CH1810','CHV6_VOW_SHARE','CHV6_REHEARSE_SLOW','CH1903','CHV6_CLOSE_SHARE','CHV6_SHARED_REMEMBER','CHV6_MORNING_FINISH','CHE_HUB','CHE_CALL_PROMISE','CHE_PROMISE_LISTEN','CHE_PACK_TAKE');
 s=craft(s,'LIGHT','ORB','SEEK');s=take(s,'CHE_RECIPE_LIGHT','CHE_ROAD_WATER','CHE_WATER_HAND','CHE_ARCH_READ','CHE_LISTEN_PAUSE','CHE_SIGNAL_TEAM','CH2102','CHE_BYPASS_WAIT','CHE_RESULT_RECORD','CHE_RECORD_CARE','CHE_MAREN_STAY','CHE_LUMI_PAUSE','CHE_CLOSE_PIERCE',
 'CHG_HUB','CHG_CALL_LUMI','CHG_LUMI_PROMISE','CHG_KIT_TAKE');
 s=craft(s,'BLOOM','RING','HEAL');
 return take(s,'CHG_CRAFT_MAREN','CHG_MAREN_REST','CHG_PASSAGE_SAMPLE','CHG_READ_PATTERN',gentle?'CHG_PACT_GENTLE':'CHG_PACT_STANDARD');
}
/** Policy reads the actual turn/HP/MP. Does not change state outside reducers. */
export function guardianAction(s:State){
 if(!s.battle)throw Error('No active guardian');
 const heal=byId.SPELL_BLOOM_RING_HEAL;
 if(s.hp<=30&&s.inventory.IT_POTION_DEW)return 'IT_POTION_DEW';
 if(s.hp<=75&&(s.battle.enemyHp>100&&s.battle.turn%3!==2||s.battle.enemyHp>50&&s.battle.turn%3===1)&&s.equipped.includes(heal.id)&&s.mp>=heal.mp)return heal.id;
 if(s.battle.enemyHp<=50&&s.battle.turn%2===0)return 'GUARD';
 if(s.mp<10&&s.inventory.IT_MANA_LEAF)return 'IT_MANA_LEAF';
 const attack=['SPELL_LIGHT_ORB_SEEK','SPELL_WIND_ORB_SEEK'].find(id=>s.equipped.includes(id)&&s.mp>=byId[id].mp);
 return attack||'GUARD';
}
export function winGuardian(s:State){const actions:string[]=[],phases=new Set<number>();for(let i=0;s.battle&&i<160;i++){phases.add(s.battle.enemyHp>100?1:s.battle.enemyHp>50?2:3);const action=guardianAction(s);actions.push(action);s=fight(s,action);}return {state:s,actions,phases:[...phases]};}
