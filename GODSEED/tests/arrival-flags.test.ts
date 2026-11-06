import {describe,it,expect} from 'vitest';
import {fresh,type State} from '../src/engine/state';
import {scenes} from '../src/content/story';
import {choose,craft,fight} from '../src/systems/game';
import {createBattle} from '../src/systems/combat';
import {encodeSave,decodeSave} from '../src/engine/save-file';

const arrivalFlag='test_arrived_after_battle';
function ready(){let s=fresh('ผู้กลับจากการต่อสู้',1);for(const id of ['CH0001','CH0101','CH0202','CH0401'])s=choose(s,id);return craft(s,'WIND','ORB','SEEK');}
function forest(){let s=ready();for(const id of ['CH0205','CH0801'])s=choose(s,id);return s;}
function win(start:State){let s=start;for(let turn=0;s.battle&&turn<40;turn++)s=fight(s,'BASIC_PULSE');expect(s.battle).toBeUndefined();return s;}
function withEntryFlag<T>(sceneId:string,run:()=>T):T{const scene=scenes[sceneId],old=scene.entryFlags;scene.entryFlags=[...(old||[]),arrivalFlag];try{return run();}finally{if(old)scene.entryFlags=old;else delete scene.entryFlags;}}

describe('destination entry flags belong to actual battle arrival',()=>{
 it('does not grant result flags while selecting a fight or after fleeing/defeat',()=>withEntryFlag('S10_FOREST_RESULT',()=>{
  const active=choose(forest(),'CH0901');expect(active.scene).toBe('S09_FOREST');expect(active.flags[arrivalFlag]).toBeUndefined();
  const escaped=fight(active,'FLEE');expect(escaped.scene).toBe('S09_FOREST');expect(escaped.flags[arrivalFlag]).toBeUndefined();
  const weak=structuredClone(active);weak.hp=1;const lost=fight(weak,'BASIC_PULSE');expect(lost.scene).toBe('S28_RECOVER');expect(lost.flags[arrivalFlag]).toBeUndefined();
  expect(choose(lost,'CH2801').flags[arrivalFlag]).toBeUndefined();
 }));
 it('grants the destination flags after winning an existing active battle',async()=>{
  // A stable saved battle can predate the new arrival flags; it must still arrive correctly.
  const initial=forest();initial.battle=createBattle('B01_FOREST_SPROUT','S09_FOREST','S10_FOREST_RESULT');
  const saved=(await decodeSave(await encodeSave(initial))).state;
  withEntryFlag('S10_FOREST_RESULT',()=>{const done=win(saved);expect(done.scene).toBe('S10_FOREST_RESULT');expect(done.flags[arrivalFlag]).toBe(true);});
 });
 it('does not grant destination flags when surrendering a training encounter',()=>{
  const atKoro=choose(ready(),'CH0202');
  withEntryFlag('S04_KORO',()=>{const active=choose(atKoro,'CH0404');expect(active.flags[arrivalFlag]).toBeUndefined();const out=fight(active,'SURRENDER');expect(out.scene).toBe('S04_KORO');expect(out.flags[arrivalFlag]).toBeUndefined();});
 });
 it('retains entry flags on ordinary story arrivals',()=>{
  const s=choose(choose(ready(),'CH0204'),'CH0701');expect(s.scene).toBe('S14_RESEARCH');expect(s.flags.archive_read).toBe(true);
 });
});
