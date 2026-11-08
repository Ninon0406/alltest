import type {State} from '../src/engine/state';
import {choose,craft,fight,equip} from '../src/systems/game';
import {guardianReady,winGuardian,take} from './guardian-model';
export {take};
export function chapterOneComplete(seed=179,route:'family'|'community'|'archive'='family'){
 const won=winGuardian(choose(guardianReady(seed),'CH2201')).state;
 const paths={family:['CH2301','CH2401','CHG_FAMILY_STAY'],community:['CH2302','CH2501','CHG_COMMUNITY_PATH'],archive:['CH2303','CH2601','CHG_ARCHIVE_QUESTION']};
 return take(won,...paths[route],'CH2701');
}
export function forestReady(seed=179,route:'family'|'community'|'archive'='family'){
 let s=take(chapterOneComplete(seed,route),'CHA2_HUB','CHA2_CALL_PACK','CHA2_PACK_TAKE');
 s=craft(s,'BLOOM','WARD','GUARD');s=craft(s,'WATER','ORB','SEEK');
 // The fifth discovery does not auto-equip over an existing slot.
 s=equip(s,'SPELL_WATER_ORB_SEEK',1);
 return take(s,'CHA2_RECIPE_LEAVE','CHA2_GOODBYE_PROMISE','CHA2_EDGE_MARK','CHA2_MARK_NOTE','CHA2_ROOT_SOIL','CHA2_DRY_WATER','CHA2_BROOK_SAMPLE','CHA2_PIP_WAIT','CHA2_HOLLOW_TRACE','CHA2_RING_BLOOM');
}
export function finishForest(s:State,branch:'care'|'path'|'record'='care',combat=false){
 s=choose(s,combat?'CHA2_TRIAL_FIGHT':'CHA2_TRIAL_PATIENCE');
 if(combat){for(let n=0;s.battle&&n<80;n++)s=fight(s,s.hp<=30&&s.inventory.IT_POTION_DEW?'IT_POTION_DEW':s.mp>=10?'SPELL_WIND_ORB_SEEK':'GUARD');if(s.battle||s.scene!=='A2_TRIAL_RESULT')throw Error('Forest trial did not finish');}
 else s=choose(s,'CHA2_PATIENCE_PASS');
 const decision={care:'CHA2_DECIDE_CARE',path:'CHA2_DECIDE_PATH',record:'CHA2_DECIDE_RECORD'},back={care:'CHA2_CARE_RETURN',path:'CHA2_PATH_RETURN',record:'CHA2_RECORD_RETURN'};
 return take(s,'CHA2_RESULT_REST','CHA2_TRACE_OBSERVE','CHA2_LEGACY_LIMIT',decision[branch],back[branch],'CHA2_RETURN_MAREN','CHA2_MAREN_LISTEN','CHA2_EIRA_SHARE','CHA2_EPILOGUE_FINISH');
}
