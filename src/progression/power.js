import {train,currentCareer} from './engine.js';
import {powerTrainingMissing,powerPracticeQuote,powerCost,powerReady,powerDecision} from './power-model.js';
import {recordAction,normalize} from '../engine/time.js';
export function trainPower(state){
 const missing=powerTrainingMissing(state);if(missing.length)throw Error(missing.join(' · '));
 const q=powerPracticeQuote(state),p=state.power,old=p.level,next={...p};
 // Reuse the exact real training cost, fatigue, focus, skill XP and calendar transaction.
 if(next.window!==q.window){next.window=q.window;next.count=0;}next.count++;next.practiceDays+=q.days;next.xp+=q.xp;
 while(next.level<9&&next.xp>=powerCost(next.level)){next.xp-=powerCost(next.level);next.level++;}
 if(next.level===9)next.xp=Math.min(next.xp,powerCost(9));
 train(state,currentCareer(state).primary,{powerXp:q.xp,powerFrom:old,powerTo:next.level});
 Object.assign(p,next);
}
export function resolvePower(state,choiceId){
 const d=powerDecision(state),choice=d?.choices.find(c=>c.id===choiceId);
 if(!choice||choice.disabled)throw Error(choice?.unavailable??'บททดสอบพลังเปลี่ยนไปแล้ว');
 const p=state.power;
 if(choiceId==='later')p.deferred=true;
 else{
  if(p.practiceDays<210)throw Error('ต้องมีบทฝึกประสานพลังจริงอย่างน้อย 210 วัน');
  if(choiceId==='steady'){state.stamina-=15;state.progression.focus-=10;state.maxStamina+=5;}
  else {state.mana-=10;state.progression.focus-=15;state.maxMana+=5;}
  p.level=10;p.xp=0;p.certification=choiceId;
 }
 if(state.yearly.focus==='cultivate')state.yearly.focus='balanced';
 recordAction(state,`${d.title} — ${choice.label}`,0,{majorDecision:d.id,choiceId,powerLevel:p.level});normalize(state);
}
export function resumePower(state){
 if(!powerReady(state)||!state.power.deferred)throw Error('ไม่มีบททดสอบพลังที่พักไว้');
 state.power.deferred=false;
}
