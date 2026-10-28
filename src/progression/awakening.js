import { careers } from '../data/careers.js';
import { seededRandom } from '../engine/random.js';
import { locations } from '../world/locations.js';
export function affinityScore(state,career){
 const statPart=Object.entries(career.weights).reduce((sum,[key,w])=>sum+Math.max(0,state.stats[key])*w,0);
 const memoryPart=Math.min(5,Math.max(0,state.childhoodMemory[career.memory]??0)*.2);
 const trainingPart=Math.min(3,(state.progression.practice[career.primary]??0)/40);
 const background=career.backgrounds.includes(state.birth?.archetypeId)?2:0;
 const idSeed=[...career.id].reduce((sum,c)=>Math.imul(sum,31)+c.charCodeAt(0)|0,17);
 const variation=seededRandom((state.birth?.seed??0)^idSeed)();
 return {score:Math.round((statPart+memoryPart+trainingPart+background+variation)*100)/100,statPart,memoryPart,trainingPart,background,variation};
}
export function measureAwakening(state){
 const scores=Object.fromEntries(careers.map(c=>[c.id,affinityScore(state,c)]));
 const top=careers.toSorted((a,b)=>scores[b.id].score-scores[a.id].score)[0];
 const score=scores[top.id].score;
 return {version:1,measuredAt:state.time.absoluteDay,scores,topId:top.id,tier:score>=28?'พิเศษ':score>=21?'โดดเด่น':score>=15?'มั่นคง':'เริ่มต้น'};
}
export function beginOrResumeAwakening(state){
 if(state.age<12)throw Error('พิธีเปิดเมื่ออายุครบ 12 ปี');
 const a=state.progression.awakening;
 if(a.step>=7)throw Error('ผ่านพิธีแล้ว ผลเดิมยังคงอยู่');
 if(a.venue&&a.venue.locationId!==state.world.currentLocationId)throw Error(`กลับไป ${locations[a.venue.locationId].name} เพื่อทำพิธีที่ค้างไว้ก่อน`);
 a.paused=false;state.life.mode='annual';state.life.page=0;
}
export function advanceAwakening(state){
 const a=state.progression.awakening;
 if(a.step===0)a.venue={locationId:state.world.currentLocationId,name:`ศาลาประชุม${state.location}`};
 if(a.venue.locationId!==state.world.currentLocationId)throw Error('กรุณากลับสถานที่ประกอบพิธีก่อน');
 if(a.step===3&&!a.result)a.result=measureAwakening(state);
 a.step++;
}
