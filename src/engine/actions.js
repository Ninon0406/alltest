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
 else if(action.type==='travel')travel(state,action.destination,action.method);
 else if(action.type==='service')useService(state,action.serviceId);
 else if(action.type==='legacyArc'&&state.age>=12){state.life.mode='legacy';state.currentSceneId=state.life.legacySceneId??'scene_childhood_hub_2';}
 else if(action.type==='dailyLife'){state.life.legacySceneId=state.currentSceneId;state.life.mode='annual';state.life.page=0;}
 else throw Error('ทำรายการนี้ไม่ได้');
 state.life.revision++;return state;
}
