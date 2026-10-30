import { Scenes } from '../data/scenes.js';
import {appearanceSnapshot} from '../character/inheritance.js';
import {catalogById} from '../data/appearance-v2.js';
import {wornEquipment} from '../character/equipment-stats.js';
import {powerTitle} from '../progression/power-model.js';
import {v8Endings,v8EndingId} from '../data/v8-endings.js';
import {naturalEndDay} from '../engine/v8-model.js';
export const ARCHIVE_KEY='reborn_finished_lives_v1',ARCHIVE_LIMIT=100;
const endings=new Set([...Object.values(Scenes).filter(s=>s.isEnding).map(s=>s.endingId),...Object.keys(v8Endings)]);
const cut=(value,max=300)=>String(value??'').slice(0,max);
const valid=r=>r&&typeof r.runId==='string'&&endings.has(r.endingId)&&typeof r.name==='string'&&typeof r.epilogue==='string'&&r.epilogue.length<=1200&&Number.isFinite(Date.parse(r.startedAt))&&Number.isFinite(Date.parse(r.finishedAt))&&Number.isSafeInteger(r.age)&&r.age>=0&&Number.isSafeInteger(r.powerLevel)&&r.powerLevel>=1&&r.powerLevel<=100&&Number.isFinite(r.activePlayMs)&&r.activePlayMs>=0&&Array.isArray(r.events)&&r.events.length<=12;
export function completedSummary(state,finishedAt){
 if(state.v8){
  const ending=v8Endings[state.run?.endingId];
  if(state.run?.status!=='ended'||!ending||state.v8.finishedAtDay!==state.time.absoluteDay||state.time.absoluteDay!==naturalEndDay(state)||state.run.endingId!==v8EndingId(state))throw Error('ชีวิตนี้ยังไม่ถึงฉากจบ');
  return {runId:state.run.id,endingId:state.run.endingId,title:ending.title,name:cut(state.name,80),race:cut(state.race,80),age:state.age,career:cut(state.career,100),powerLevel:state.power.level,powerTier:state.progression.awakening.step===7?powerTitle(state):'ยังไม่ปลุกพลัง',gold:state.gold,unpaidWages:state.v8.wagesDue??0,earnedGold:state.world.ledger.reduce((n,e)=>n+Math.max(0,e.amount),0),visitedCount:state.world.visited.length,activePlayMs:state.run.activeMs,startedAt:state.run.startedAt,finishedAt,epilogue:ending.text,events:state.journal.filter(e=>e.majorDecision).map(e=>cut(e.title)).slice(-8),achievements:[state.v8.relationship==='partner'?'มีคู่ชีวิต':state.v8.relationship==='friend'?'เลือกมิตรภาพ':'เลือกชีวิตอิสระ'],appearance:appearanceSnapshot(state.appearance),equipment:wornEquipment(state).map(item=>({id:item.id,label:item.label}))};
 }
 const scene=Scenes[state.currentSceneId];
 if(state.run?.status!=='ended'||!scene?.isEnding||state.run.endingId!==scene.endingId)throw Error('ชีวิตนี้ยังไม่ถึงฉากจบ');
 const appearance=appearanceSnapshot(state.appearance);
 return {runId:state.run.id,endingId:scene.endingId,title:cut(scene.title),name:cut(state.name,80),race:cut(state.race,80),age:state.age,career:cut(state.career,100),powerLevel:state.power?.level??1,powerTier:powerTitle(state),gold:state.gold,earnedGold:state.world.ledger.reduce((n,e)=>n+Math.max(0,e.amount),0),visitedCount:state.world.visited.length,activePlayMs:state.run.activeMs,startedAt:state.run.startedAt,finishedAt,epilogue:cut(scene.text,1200),events:[...new Set(state.journal.filter(e=>e.majorDecision||!e.automatic).map(e=>cut(e.title)))].slice(-12),achievements:state.traits.slice(-12).map(t=>cut(t)),appearance,equipment:[...Object.values(state.wardrobe?.equipped??{}).filter(id=>catalogById[id]).map(id=>({id,label:catalogById[id].label})),...wornEquipment(state).map(item=>({id:item.id,label:item.label}))]};
}
export function readArchive(storage){
 const raw=storage.getItem(ARCHIVE_KEY);if(!raw)return [];
 if(raw.length>1000000)throw Error('ประวัติชีวิตมีขนาดเกินขอบเขต ข้อมูลเดิมยังอยู่');
 const data=JSON.parse(raw);if(data.version!==1||!Array.isArray(data.lives)||data.lives.length>ARCHIVE_LIMIT||!data.lives.every(valid))throw Error('อ่านประวัติชีวิตไม่ได้ ข้อมูลเดิมยังอยู่');
 return data.lives;
}
export function archiveCompleted(storage,summary){
 if(!valid(summary))throw Error('ประวัติต้องมาจากชีวิตที่จบแล้ว');
 const lives=readArchive(storage);if(lives.some(r=>r.runId===summary.runId))return lives;
 const next=[...lives,summary].slice(-ARCHIVE_LIMIT);storage.setItem(ARCHIVE_KEY,JSON.stringify({version:1,lives:next}));return next;
}
