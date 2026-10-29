import { advanceYears,advanceDays,resolveMajor,availableYearActivities } from './yearly.js';
import { statKeys } from '../data/careers.js';
import { beginOrResumeAwakening } from '../progression/awakening.js';
import { selectCareer, train, restFromTraining, workCareer, promote } from '../progression/engine.js';
import { upgradeState } from './migrate.js';
import { currentEvent, applyLifeChoice, choiceDays, storyToken } from './life.js';
import { travel } from '../world/travel.js';
import { useService } from '../world/economy.js';
import { chooseLegacy,legacyDays } from './legacy.js';
import {Scenes} from '../data/scenes.js';
import {guardDecisionTime,pendingDecision} from './decisions.js';
import {isV7} from './development.js';
import {dress} from '../character/wardrobe.js';
import {buyEquipment,sellEquipment,equipEquipment} from '../character/equipment.js';
export function dispatch(input,action){
 if(input.run?.status==='ended')throw Error('ชีวิตนี้จบแล้ว เริ่มชีวิตใหม่เพื่อเล่นต่อ');
 if(action.token!==storyToken(input))throw Error('รายการนี้เปลี่ยนไปแล้ว กรุณาเลือกจากหน้าปัจจุบัน');
 const state=upgradeState(input);
 if(isV7(state)&&pendingDecision(state)&&!['majorChoice','readNext','setPacing','dailyLife','yearFocus','pauseAwakening','beginAwakening','dress','equipEquipment'].includes(action.type))throw Error('มีการตัดสินใจสำคัญรออยู่ กรุณาตัดสินใจก่อนทำกิจกรรม');
 if(action.type==='legacyChoice'){
  const choice=Scenes[state.currentSceneId]?.choices?.find(c=>c.id===action.choiceId);if(choice)guardDecisionTime(state,legacyDays(state,choice));chooseLegacy(state,action.choiceId);
 }
 else if(action.type==='setPacing'){
  if(!['yearly','detailed'].includes(action.view))throw Error('มุมมองไม่ถูกต้อง');if(isV7(state)&&state.age<3&&action.view==='detailed')throw Error('วัยนี้ใช้เรื่องราวตามเดือนและการดูแลของครอบครัว');state.yearly.view=action.view;
 }else if(action.type==='yearFocus'){
  if(!availableYearActivities(state).some(a=>a.id===action.focus))throw Error('กิจกรรมยังไม่เหมาะกับวัย');if(action.stat!==undefined&&!statKeys.includes(action.stat))throw Error('หัวข้อฝึกไม่ถูกต้อง');state.yearly.focus=action.focus;if(action.stat)state.yearly.stat=action.stat;
 }else if(action.type==='advanceYears')advanceYears(state,action.years);
 else if(action.type==='advanceDays')advanceDays(state,action.days);
 else if(action.type==='majorChoice')resolveMajor(state,action.decisionId,action.choiceId);
 else if(action.type==='readNext'){
  const event=currentEvent(state);if(state.life.mode!=='annual'||state.life.page>=event.pages.length-1)throw Error('ไม่มีหน้าถัดไป');state.life.page++;
 }else if(action.type==='lifeChoice'&&state.life.mode==='annual'){
  if(isV7(state)&&state.age<3)throw Error('วัยนี้ใช้เรื่องราวตามเดือนและการดูแลของครอบครัว');guardDecisionTime(state,choiceDays(state));applyLifeChoice(state,action.choiceId);
 }
 else if(action.type==='beginAwakening'){if(state.life.mode==='legacy')state.life.legacySceneId=state.currentSceneId;beginOrResumeAwakening(state);}
 else if(action.type==='pauseAwakening'){const a=state.progression.awakening;if(state.age<12||a.step>=7||a.paused)throw Error('ไม่มีพิธีที่กำลังดำเนินอยู่');a.paused=true;state.life.page=0;}
 else if(action.type==='chooseCareer')selectCareer(state,action.careerId);
 else if(action.type==='train')train(state,action.stat);
 else if(action.type==='trainingRest')restFromTraining(state);
 else if(action.type==='careerJob')workCareer(state);
 else if(action.type==='promoteCareer')promote(state);
 else if(action.type==='travel'){if(isV7(state))throw Error('เลือกการเดินทางจากเรื่องราวหน้าหลัก');travel(state,action.destination,action.method);}
 else if(action.type==='journeyChoice'){
  if(!['caravan','walk','stay'].includes(action.method))throw Error('วิธีเดินทางไม่ถูกต้อง');
  if(action.method!=='stay')travel(state,action.destination,action.method);
 }
 else if(action.type==='service')useService(state,action.serviceId);
 else if(action.type==='dress')dress(state,action.slot,action.itemId);
 else if(action.type==='buyEquipment')buyEquipment(state,action.itemId);
 else if(action.type==='sellEquipment')sellEquipment(state,action.itemId);
 else if(action.type==='equipEquipment')equipEquipment(state,action.slot,action.itemId);
 else if(action.type==='legacyArc'&&state.age>=12){state.yearly.view='detailed';if(state.progression.awakening.step<7)state.progression.awakening.paused=true;state.life.mode='legacy';state.currentSceneId=state.life.legacySceneId??'scene_childhood_hub_2';}
 else if(action.type==='dailyLife'){state.yearly.view='yearly';state.life.legacySceneId=state.currentSceneId;state.life.mode='annual';state.life.page=0;}
 else throw Error('ทำรายการนี้ไม่ได้');
 state.life.revision++;return state;
}
