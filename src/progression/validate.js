import { careers,getCareer,statKeys } from '../data/careers.js';
import { locations } from '../world/locations.js';
const integer=(value,max=1e9)=>Number.isSafeInteger(value)&&value>=0&&value<=max;
const object=value=>value&&typeof value==='object'&&!Array.isArray(value);
export function validateProgression(state){
 const p=state.progression,a=p?.awakening;
 if(!object(p)||!object(a)||!integer(a.step,7)||typeof a.paused!=='boolean'||!Number.isFinite(p.fatigue)||p.fatigue<0||p.fatigue>100||!Number.isFinite(p.focus)||p.focus<0||p.focus>100)throw Error('Invalid progression');
 if(p.activeCareerId!==null&&!getCareer(p.activeCareerId))throw Error('Invalid career');
 if(!object(p.records)||!object(p.practice)||!Object.entries(p.practice).every(([key,xp])=>statKeys.includes(key)&&integer(xp)))throw Error('Invalid skill progress');
 if(p.trainingWindow!==null&&!integer(p.trainingWindow)||!integer(p.trainingCount,1000))throw Error('Invalid training window');
 if(p.legacyCareer!==null&&typeof p.legacyCareer!=='string')throw Error('Invalid old career');
 for(const [id,r]of Object.entries(p.records)){
  if(!getCareer(id)||!object(r)||!integer(r.xp)||!integer(r.mastery,100)||!integer(r.arcStep,3)||typeof r.advanced!=='boolean'||!integer(r.trainingBonus,3)||!integer(r.payBonus,3)||r.trainingBonus+r.payBonus!==r.arcStep)throw Error('Invalid career progress');
  if(r.advanced&&(state.time.absoluteDay-state.time.birthAbsoluteDay<18*360||r.arcStep!==3||r.xp<120||r.mastery<60))throw Error('Invalid promotion');
 }
 if(p.activeCareerId&&(!p.records[p.activeCareerId]||state.time.absoluteDay-state.time.birthAbsoluteDay<12*360||a.step!==7))throw Error('Career before awakening');
 if(a.venue!==null&&(!object(a.venue)||!locations[a.venue.locationId]||typeof a.venue.name!=='string'))throw Error('Invalid ceremony venue');
 if(a.step>0&&!a.venue)throw Error('Missing ceremony venue');
 if(a.step<4&&a.result!==null || a.step>=4&&!a.result)throw Error('Missing awakening result');
 if(a.result!==null){
  const r=a.result;
  if(!object(r)||r.version!==1||!integer(r.measuredAt,Number.MAX_SAFE_INTEGER)||r.measuredAt>state.time.absoluteDay||!getCareer(r.topId)||!['เริ่มต้น','มั่นคง','โดดเด่น','พิเศษ'].includes(r.tier)||!object(r.scores)||Object.keys(r.scores).length!==careers.length)throw Error('Invalid awakening');
  for(const c of careers){const score=r.scores[c.id];if(!object(score)||!['score','statPart','memoryPart','trainingPart','background','variation'].every(key=>Number.isFinite(score[key])&&score[key]>=0&&score[key]<=1e6)||score.variation>=1)throw Error('Invalid affinity scores');}
 }
}
