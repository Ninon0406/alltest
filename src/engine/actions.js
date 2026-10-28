import { beginOrResumeAwakening } from '../progression/awakening.js';
import { selectCareer, train, restFromTraining, workCareer, promote } from '../progression/engine.js';
import { upgradeState } from './migrate.js';
import { currentEvent, applyLifeChoice, storyToken } from './life.js';
import { travel } from '../world/travel.js';
import { useService } from '../world/economy.js';
export function dispatch(input,action){
 if(action.token!==storyToken(input))throw Error('รายการนี้เปลี่ยนไปแล้ว กรุณาเลือกจากหน้าปัจจุบัน');
 const state=upgradeState(input);
 if(action.type==='readNext'){
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
 else if(action.type==='legacyArc'&&state.age>=12){if(state.progression.awakening.step<7)state.progression.awakening.paused=true;state.life.mode='legacy';state.currentSceneId=state.life.legacySceneId??'scene_childhood_hub_2';}
 else if(action.type==='dailyLife'){state.life.legacySceneId=state.currentSceneId;state.life.mode='annual';state.life.page=0;}
 else throw Error('ทำรายการนี้ไม่ได้');
 state.life.revision++;return state;
}
