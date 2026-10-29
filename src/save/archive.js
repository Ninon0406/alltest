import { Scenes } from '../data/scenes.js';
import {appearanceSnapshot} from '../character/inheritance.js';
import {catalogById} from '../data/appearance-v2.js';
import {wornEquipment} from '../character/equipment-stats.js';
export const ARCHIVE_KEY='reborn_finished_lives_v1',ARCHIVE_LIMIT=100;
const endings=new Set(Object.values(Scenes).filter(s=>s.isEnding).map(s=>s.endingId));
const cut=(value,max=300)=>String(value??'').slice(0,max);
const valid=r=>r&&typeof r.runId==='string'&&endings.has(r.endingId)&&typeof r.name==='string'&&typeof r.epilogue==='string'&&r.epilogue.length<=1200&&Number.isFinite(Date.parse(r.startedAt))&&Number.isFinite(Date.parse(r.finishedAt))&&Number.isSafeInteger(r.age)&&r.age>=0&&Number.isSafeInteger(r.powerLevel)&&r.powerLevel>=1&&r.powerLevel<=100&&Number.isFinite(r.activePlayMs)&&r.activePlayMs>=0&&Array.isArray(r.events)&&r.events.length<=12;
export function completedSummary(state,finishedAt){
 const scene=Scenes[state.currentSceneId];
 if(state.run?.status!=='ended'||!scene?.isEnding||state.run.endingId!==scene.endingId)throw Error('ชีวิตนี้ยังไม่ถึงฉากจบ');
 const appearance=appearanceSnapshot(state.appearance);
 return {runId:state.run.id,endingId:scene.endingId,title:cut(scene.title),name:cut(state.name,80),race:cut(state.race,80),age:state.age,career:cut(state.career,100),powerLevel:state.power?.level??1,powerTier:'ผู้เริ่มรับรู้พลัง',gold:state.gold,earnedGold:state.world.ledger.reduce((n,e)=>n+Math.max(0,e.amount),0),visitedCount:state.world.visited.length,activePlayMs:state.run.activeMs,startedAt:state.run.startedAt,finishedAt,epilogue:cut(scene.text,1200),events:[...new Set(state.journal.filter(e=>e.majorDecision||!e.automatic).map(e=>cut(e.title)))].slice(-12),achievements:state.traits.slice(-12).map(t=>cut(t)),appearance,equipment:[...Object.values(state.wardrobe?.equipped??{}).filter(id=>catalogById[id]).map(id=>({id,label:catalogById[id].label})),...wornEquipment(state).map(item=>({id:item.id,label:item.label}))]};
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
