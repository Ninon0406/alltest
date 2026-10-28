import { advanceYears,resolveMajor,availableYearActivities } from './yearly.js';
import { statKeys } from '../data/careers.js';
import { beginOrResumeAwakening } from '../progression/awakening.js';
import { selectCareer, train, restFromTraining, workCareer, promote } from '../progression/engine.js';
import { upgradeState } from './migrate.js';
import { currentEvent, applyLifeChoice, storyToken } from './life.js';
import { travel } from '../world/travel.js';
import { useService } from '../world/economy.js';
import { chooseLegacy } from './legacy.js';
export function dispatch(input,action){
 if(input.run?.status==='ended')throw Error('ชีวิตนี้จบแล้ว เริ่มชีวิตใหม่เพื่อเล่นต่อ');
 if(action.token!==storyToken(input))throw Error('รายการนี้เปลี่ยนไปแล้ว กรุณาเลือกจากหน้าปัจจุบัน');
 const state=upgradeState(input);
 if(action.type==='legacyChoice')chooseLegacy(state,action.choiceId);
 else if(action.type==='setPacing'){
  if(!['yearly','detailed'].includes(action.view))throw Error('มุมมองไม่ถูกต้อง');state.yearly.view=action.view;
 }else if(action.type==='yearFocus'){
  if(!availableYearActivities(state).some(a=>a.id===action.focus))throw Error('กิจกรรมยังไม่เหมาะกับวัย');if(action.stat!==undefined&&!statKeys.includes(action.stat))throw Error('หัวข้อฝึกไม่ถูกต้อง');state.yearly.focus=action.focus;if(action.stat)state.yearly.stat=action.stat;
 }else if(action.type==='advanceYears')advanceYears(state,action.years);
 else if(action.type==='majorChoice')resolveMajor(state,action.decisionId,action.choiceId);
 else if(action.type==='readNext'){
  const event=currentEvent(state);if(state.life.mode!=='annual'||state.life.page>=event.pages.length-1)throw Error('ไม่มีหน้าถัดไป');state.life.page++;
 }else if(action.type==='lifeChoice'&&state.life.mode==='annual')applyLifeChoice(state,action.choiceId);
 else if(action.type==='beginAwakening'){if(state.life.mode==='legacy')state.life.legacySceneId=state.currentSceneId;beginOrResumeAwakening(state);}
 else if(action.type==='pauseAwakening'){const a=state.progression.awakening;if(state.age<12||a.step>=7||a.paused)throw Error('ไม่มีพิธีที่กำลังดำเนินอยู่');a.paused=true;state.life.page=0;}
 else if(action.type==='chooseCareer')selectCareer(state,action.careerId);
 else if(action.type==='train')train(state,action.stat);
 else if(action.type==='trainingRest')restFromTraining(state);
 else if(action.type==='careerJob')workCareer(state);
 else if(action.type==='promoteCareer')promote(state);
 else if(action.type==='travel')travel(state,action.destination,action.method);
 else if(action.type==='service')useService(state,action.serviceId);
 else if(action.type==='legacyArc'&&state.age>=12){state.yearly.view='detailed';if(state.progression.awakening.step<7)state.progression.awakening.paused=true;state.life.mode='legacy';state.currentSceneId=state.life.legacySceneId??'scene_childhood_hub_2';}
 else if(action.type==='dailyLife'){state.yearly.view='yearly';state.life.legacySceneId=state.currentSceneId;state.life.mode='annual';state.life.page=0;}
 else throw Error('ทำรายการนี้ไม่ได้');
 state.life.revision++;return state;
}
