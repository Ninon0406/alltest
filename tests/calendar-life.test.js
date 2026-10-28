import { it,expect } from 'vitest';
import { generateBirth } from '../src/character/rebirth.js';
import { initialCharacter } from '../src/character/initial.js';
import { upgradeState } from '../src/engine/migrate.js';
import { advanceTime, calendar, normalize } from '../src/engine/time.js';
import { currentEvent, storyToken } from '../src/engine/life.js';
import { dispatch } from '../src/engine/actions.js';
import { allLifeEvents } from '../src/data/events/childhood.js';
import { decodeSave,readSave,writeSave } from '../src/save/storage.js';
function choose(state,index=0){const event=currentEvent(state);while(state.life.page<event.pages.length-1)state=dispatch(state,{type:'readNext',token:storyToken(state)});return dispatch(state,{type:'lifeChoice',choiceId:event.choices[index].id,token:storyToken(state)});}
it('has one 360-day clock and birthday chronicles, not 30-click aging',()=>{
 const state=generateBirth(2);advanceTime(state,30);expect(state.age).toBe(0);expect(state.day).toBe(31);advanceTime(state,329);expect(state.age).toBe(0);advanceTime(state,1);expect(state.age).toBe(1);expect(state.day).toBe(1);expect(state.chronicle).toHaveLength(1);expect(calendar(state).worldYear).toBe(1002);
 state.age=900;normalize(state);expect(state.age).toBe(1);
 advanceTime(state,30);expect(state.age).toBe(1);expect(state.chronicle).toHaveLength(1);
});
it('migrates old ages without rerolling identity, backs up raw save and clamps overflowing resources',()=>{
 const old={...structuredClone(initialCharacter),age:6,day:4,hp:180,mana:70,traits:['จิตวิญญาณข้ามภพ','ลักษณะเดิม']};
 const raw=JSON.stringify({version:2,state:old}),values=new Map([['reborn_save',raw]]);
 const storage={getItem:key=>values.get(key)??null,setItem:(key,value)=>values.set(key,value)};
 const state=readSave(storage);expect(state.age).toBe(6);expect(state.day).toBe(4);expect(state.name).toBe(old.name);expect(state.traits).toEqual(old.traits);expect(state.hp).toBe(100);expect(state.mana).toBe(50);expect(values.get('reborn_save_backup_before_v3')).toBe(raw);expect(values.get('reborn_save')).toBe(raw);
 writeSave(storage,state);expect(decodeSave(values.get('reborn_save'))).toEqual(state);expect(values.get('reborn_save_backup_before_v3')).toBe(raw);
});
it('presents at least ten selected infant decisions and guarantees ten random events before age ten for 100 lives',()=>{
 for(let seed=0;seed<100;seed++){
  let state=generateBirth(seed);let steps=0;
  while(state.age<12){const event=currentEvent(state);expect(state.age).toBeGreaterThanOrEqual(event.minAge??0);expect(state.age).toBeLessThanOrEqual(event.maxAge??99999);state=choose(state,seed%2);if(++steps>100)throw Error('soft lock');}
  expect(state.age).toBe(12);expect(state.journal.filter(e=>e.age===0&&e.eventId?.startsWith('infant.'))).toHaveLength(10);expect(state.life.randomYears.filter(age=>age<10)).toHaveLength(10);expect(state.chronicle).toHaveLength(12);expect(state.hp).toBeLessThanOrEqual(state.maxHp);
  expect(state.journal.some(e=>e.age===11)).toBe(true);expect(state.life.mode).toBe('annual');
 }
});
it('enforces pagination, stale action protection and immutable transactions',()=>{
 const state=generateBirth(10),before=structuredClone(state),event=currentEvent(state);
 expect(()=>dispatch(state,{type:'lifeChoice',choiceId:event.choices[0].id,token:storyToken(state)})).toThrow();expect(state).toEqual(before);
 const action={type:'readNext',token:storyToken(state)},next=dispatch(state,action);expect(()=>dispatch(next,action)).toThrow();expect(state).toEqual(before);
});
it('validates unique authored event choices and save boundaries',()=>{
 const ids=allLifeEvents.flatMap(e=>[e.id,...e.choices.map(c=>c.id)]);expect(new Set(ids).size).toBe(ids.length);
 for(const e of allLifeEvents){expect(e.pages.length).toBeGreaterThan(0);for(const c of e.choices)expect(c.effects.length).toBeGreaterThan(0);}
 const state=generateBirth(5);state.time.absoluteDay=-1;expect(()=>decodeSave(JSON.stringify({version:3,state}))).toThrow();
 expect(()=>upgradeState({...initialCharacter,world:{currentLocationId:'missing'}})).toThrow();
});
export {choose};
it('reserves a real random interruption at a birthday boundary even after external activities',()=>{
 let state=generateBirth(12);advanceTime(state,4*360+359);
 state=choose(state);expect(state.age).toBe(4);expect(currentEvent(state).category).toBe('random');
 state=choose(state);expect(state.age).toBe(5);expect(state.life.randomYears).toContain(4);
});
it('retains ending gallery when another life replaces the active save',async()=>{
 const {readGallery,storeGallery}=await import('../src/save/gallery.js');const values=new Map(),storage={getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,v)};
 storeGallery(storage,['end_peasant','invalid']);storeGallery(storage,['end_hero','end_peasant']);expect(readGallery(storage)).toEqual(['end_peasant','end_hero']);writeSave(storage,generateBirth(2));expect(readGallery(storage)).toEqual(['end_peasant','end_hero']);
});
it('allows legacy chapters to pause for daily life and resume without losing their place',()=>{
 let state=upgradeState({...structuredClone(initialCharacter),age:20,currentSceneId:'scene_path_mage_hub'});
 state=dispatch(state,{type:'dailyLife',token:storyToken(state)});expect(state.life.mode).toBe('annual');state=dispatch(state,{type:'legacyArc',token:storyToken(state)});expect(state.currentSceneId).toBe('scene_path_mage_hub');expect(state.life.mode).toBe('legacy');
});
