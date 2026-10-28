import { it,expect } from 'vitest';
import { careers,getCareer } from '../src/data/careers.js';
import { careerEvents } from '../src/data/events/careers.js';
import { awakeningEvents } from '../src/data/events/awakening.js';
import { generateBirth } from '../src/character/rebirth.js';
import { advanceTime } from '../src/engine/time.js';
import { currentEvent } from '../src/engine/life.js';
import { affinityScore } from '../src/progression/awakening.js';
import { eligibleCareers,missingRequirements,trainingQuote,jobQuote } from '../src/progression/engine.js';
import { decodeSave,readSave,writeSave } from '../src/save/storage.js';
import { simulateCareer,takeAction,takeChoice,readyToTrain } from '../scripts/progression-simulation.mjs';
function ageTwelve(){const s=generateBirth(8);advanceTime(s,12*360);return s;}
function awaken(){let s=ageTwelve();while(s.progression.awakening.step<7)s=takeChoice(s);return s;}
it('defines 20 unique base families, 20 real promotions and 3 distinct story episodes per family',()=>{
 expect(careers).toHaveLength(20);expect(new Set(careers.map(c=>c.id)).size).toBe(20);expect(new Set(careers.map(c=>c.advanced.id)).size).toBe(20);
 expect(careerEvents).toHaveLength(60);expect(awakeningEvents).toHaveLength(7);
 const ids=[...careerEvents,...awakeningEvents].flatMap(e=>[e.id,...e.choices.map(c=>c.id)]);expect(new Set(ids).size).toBe(ids.length);
 for(const c of careers){expect(careerEvents.filter(e=>e.careerId===c.id).map(e=>e.minAge)).toEqual([12,13,16]);expect(c.wage).toBeGreaterThan(0);expect(c.advanced.trainingBonus).toBeGreaterThan(0);}
});
it('gates ceremony by age and preserves birth, appearance and hidden abilities',()=>{
 const baby=generateBirth(1);expect(()=>takeAction(baby,{type:'beginAwakening'})).toThrow();
 let s=ageTwelve();const birth=structuredClone(s.birth),face=structuredClone(s.appearance);
 while(s.progression.awakening.step<7)s=takeChoice(s);
 expect(s.birth).toEqual(birth);expect(s.appearance).toEqual(face);expect(s.progression.awakening.result.scores).toHaveProperty('mage');expect(s.progression.awakening.venue.locationId).toBe(s.world.currentLocationId);
});
it('keeps measured results stable across reload and subsequent learning',()=>{
 let s=ageTwelve();while(s.progression.awakening.step<4)s=takeChoice(s);
 const result=structuredClone(s.progression.awakening.result);s.stats.int+=10;s.progression.practice.int=30;
 let raw;writeSave({setItem:(_,v)=>{raw=v;}},s);s=decodeSave(raw);expect(s.progression.awakening.result).toEqual(result);
 while(s.progression.awakening.step<7)s=takeChoice(s);
 expect(s.progression.awakening.result).toEqual(result);expect(()=>takeAction(s,{type:'beginAwakening'})).toThrow();
});
it('scores development and background separately with bounded deterministic variation',()=>{
 const s=ageTwelve(),mage=getCareer('mage'),a=affinityScore(s,mage);expect(a.variation).toBeGreaterThanOrEqual(0);expect(a.variation).toBeLessThan(1);expect(affinityScore(s,mage)).toEqual(a);
 s.stats.int+=10;expect(affinityScore(s,mage).statPart).toBeGreaterThan(a.statPart);
 s.birth.archetypeId='mage';expect(affinityScore(s,mage).background).toBe(2);
 s.progression.practice.int=80;expect(affinityScore(s,mage).trainingPart).toBe(2);s.childhoodMemory.curiosity=-5;expect(affinityScore(s,mage).memoryPart).toBe(0);
});
it('can pause and resume without rerolling and blocks travel during the active ceremony',()=>{
 let s=takeChoice(ageTwelve());const venue=structuredClone(s.progression.awakening.venue),before=structuredClone(s);
 expect(()=>takeAction(s,{type:'travel',destination:'market'})).toThrow(/พิธี/);expect(s).toEqual(before);
 s=takeAction(s,{type:'pauseAwakening'});expect(currentEvent(s).category).toBe('activity');
 s=takeAction(s,{type:'beginAwakening'});expect(s.progression.awakening.venue).toEqual(venue);expect(s.progression.awakening.step).toBe(1);
 s=takeAction(s,{type:'pauseAwakening'});s.world.currentLocationId=venue.locationId==='dawn'?'market':'dawn';expect(()=>takeAction(s,{type:'beginAwakening'})).toThrow(/กลับไป/);
});
it('offers a free ordinary path and real earnings to a penniless low-stat character',()=>{
 let s=awaken();for(const key of Object.keys(s.stats))s.stats[key]=1;s.gold=0;
 expect(eligibleCareers(s).map(c=>c.id)).toEqual(['farmer']);expect(missingRequirements(s,getCareer('mage')).length).toBeGreaterThan(0);
 expect(()=>takeAction(s,{type:'chooseCareer',careerId:'mage'})).toThrow();s=takeAction(s,{type:'chooseCareer',careerId:'farmer'});s=takeAction(s,{type:'careerJob'});expect(s.gold).toBe(8);expect(s.progression.records.farmer.xp).toBe(6);expect(s.world.ledger.at(-1).source).toBe('career:farmer');
});
it('has fatigue limits, declining repeat training rewards and real recovery',()=>{
 let s=ageTwelve(),xp=[];for(let i=0;i<4;i++){xp.push(trainingQuote(s).xp);s=takeAction(s,{type:'train',stat:'wis'});}
 expect(xp).toEqual([8,8,7,7]);expect(s.progression.fatigue).toBe(80);const before=structuredClone(s);expect(()=>takeAction(s,{type:'train',stat:'wis'})).toThrow();expect(s).toEqual(before);
 s=takeAction(s,{type:'trainingRest'});expect(s.progression.fatigue).toBe(40);expect(s.stamina).toBeLessThanOrEqual(s.maxStamina);s=takeAction(s,{type:'train',stat:'wis'});expect(s.stats.wis).toBeGreaterThan(before.birth.initial.stats.wis);
});
it('respects birthday interruptions for pre-awakening training',()=>{
 const s=generateBirth(1);advanceTime(s,8*360+359);expect(()=>takeAction(s,{type:'train',stat:'int'})).toThrow(/วันเกิด/);
});
it('rejects malformed progression and retains exact pre-v4 save backups',()=>{
 const state=generateBirth(2);delete state.progression;const raw=JSON.stringify({version:3,state}),values=new Map([['reborn_save',raw],['reborn_save_backup_before_v3','original']]);
 const storage={getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,v)};const migrated=readSave(storage);expect(migrated.birth).toEqual(state.birth);expect(values.get('reborn_save_backup_before_v4')).toBe(raw);expect(values.get('reborn_save_backup_before_v3')).toBe('original');writeSave(storage,migrated);expect(decodeSave(values.get('reborn_save'))).toEqual(migrated);
 for(const mutate of [s=>s.progression.fatigue=-1,s=>s.progression.activeCareerId='unknown',s=>s.progression.awakening.step=8,s=>s.progression.awakening.result={},s=>s.progression.practice.int=-5]){const bad=generateBirth(3);mutate(bad);expect(()=>decodeSave(JSON.stringify({version:4,state:bad}))).toThrow();}
});
it('plays all 20 families to their advanced path under both real story choice policies',()=>{
 for(const c of careers)for(const policy of [0,1]){
  let {state:s,seen}=simulateCareer(c,{policy,seed:8});const r=s.progression.records[c.id],max=s[c.advanced.resource];
  expect(s.age).toBeGreaterThanOrEqual(18);expect(r.advanced).toBe(true);expect(r.arcStep).toBe(3);expect(r.trainingBonus+r.payBonus).toBe(3);expect([...seen.events].filter(id=>id.startsWith(`career.${c.id}.`))).toHaveLength(3);
  const pay=c.wage+r.payBonus+c.advanced.payBonus;expect(jobQuote(s).gold).toBe(pay);s=readyToTrain(s);const gold=s.gold;s=takeAction(s,{type:'careerJob'});expect(s.gold).toBe(gold+pay);expect(()=>takeAction(s,{type:'promoteCareer'})).toThrow();expect(s[c.advanced.resource]).toBe(max);
  let raw;writeSave({setItem:(_,v)=>{raw=v;}},s);expect(decodeSave(raw)).toEqual(s);
 }
},30000);
it('retains career mastery when switching rather than granting repeated promotion bonuses',()=>{
 let {state:s}=simulateCareer(getCareer('farmer'));const record=structuredClone(s.progression.records.farmer);const other=eligibleCareers(s).find(c=>c.id!=='farmer');s=takeAction(s,{type:'chooseCareer',careerId:other.id});s=takeAction(s,{type:'chooseCareer',careerId:'farmer'});expect(s.progression.records.farmer).toEqual(record);expect(s.career).toBe(getCareer('farmer').advanced.label);
});
it('pauses an unfinished ceremony when entering a preserved legacy chapter',()=>{
 let s=takeChoice(ageTwelve());s=takeAction(s,{type:'legacyArc'});expect(s.life.mode).toBe('legacy');expect(s.progression.awakening.paused).toBe(true);s=takeAction(s,{type:'dailyLife'});expect(currentEvent(s).category).toBe('activity');s=takeAction(s,{type:'beginAwakening'});expect(currentEvent(s).category).toBe('awakening');expect(s.progression.awakening.step).toBe(1);
});
