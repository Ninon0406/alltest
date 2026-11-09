import type {State} from '../src/engine/state';
import {craft,fight} from '../src/systems/game';
import {finishForest,forestReady,take} from './forest-model';
export {take};
export function alchemistTrial(seed=179,branch:'care'|'path'|'record'='care'){
 let s=take(finishForest(forestReady(seed),branch),'CHALC_HUB','CHALC_CALL_MEET','CHALC_MEET_ASK','CHALC_TABLE_LIMIT','CHALC_START','CHALC_GARDEN_SOURCE','CHALC_SOURCE_EDGE','CHALC_WASH_SLOW','CHALC_LEAF_CHECK','CHALC_MEASURE');
 if(!s.known.includes('SPELL_WATER_RING_HEAL'))s=craft(s,'WATER','RING','HEAL');
 s=take(s,'CHALC_RECIPE_TEST','CHALC_SAMPLE_CAST','CHALC_COMPARE_LIMIT','CHALC_RANK1','CHALC_TRIAL_START');
 return s;
}
export function alchemistReady(seed=179,branch:'care'|'path'|'record'='care'){
 let s=alchemistTrial(seed,branch);
 for(let i=0;s.battle&&i<60;i++)s=fight(s,s.mp>=10?'SPELL_WIND_ORB_SEEK':'BASIC_PULSE');
 if(s.battle||s.scene!=='ALC_RESULT')throw Error('Actual alchemist trial did not finish');
 return take(s,'CHALC_RESULT_NOTE','CHALC_RANK2');
}
export function finishAlchemy(s:State,branch:'care'|'path'|'record'='care',delivery:'field'|'teach'='field'){
 const route={care:['CHALC_RETURN_ROOT','CHALC_ROOT_SPACE'],path:['CHALC_RETURN_SIGN','CHALC_SIGN_WALK'],record:['CHALC_RETURN_NOTES','CHALC_NOTES_LIMIT']};
 return take(s,...route[branch],'CHALC_PLAN_PACK',delivery==='field'?'CHALC_PACK_FIELD':'CHALC_PACK_TEACH',delivery==='field'?'CHALC_DELIVER_CHECK':'CHALC_TEACH_LIMIT','CHALC_FINISH');
}
export const startPractice=(s:State)=>take(s,'CH0202','CH0404');
