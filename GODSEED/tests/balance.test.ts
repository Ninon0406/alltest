import {describe,expect,it} from 'vitest';
import {fresh,type State} from '../src/engine/state';
import {choose,craft,fight} from '../src/systems/game';
import {byId} from '../src/systems/spells';

type Strategy='story-wind'|'story-support-pulse'|'zero-mp-fixture';
type Encounter='BT_TRAINING'|'B01_FOREST_SPROUT';
const windId='SPELL_WIND_ORB_SEEK';
const windCost=byId[windId].mp;
const strategies:ReadonlyArray<{id:Strategy;label:string}>=[
 {id:'story-wind',label:'story-crafted WIND with GUARD fallback'},
 {id:'story-support-pulse',label:'story-crafted support-only BLOOM with BASIC_PULSE'},
 {id:'zero-mp-fixture',label:'explicit zero-MP fixture with WIND and GUARD fallback'}
];

function storyCraftedStart(seed:number,supportOnly:boolean):State {
 let state=fresh('ผู้ทดสอบสมดุล',seed);
 // Both routes use authored choices and actually consume their ingredients.
 // The support route gathers BLOOM/RING/HEAL before making its first spell.
 const path=supportOnly
  ?['CH0001','CH0101','CH0203','CH0601','CH0203','CH0603','CH0202','CH0401']
  :['CH0001','CH0101','CH0202','CH0401'];
 for(const choice of path)state=choose(state,choice);
 state=supportOnly?craft(state,'BLOOM','RING','HEAL'):craft(state,'WIND','ORB','SEEK');
 expect(state.known).toEqual([supportOnly?'SPELL_BLOOM_RING_HEAL':windId]);
 return state;
}

function enterEncounter(state:State,encounter:Encounter):State {
 const path=encounter==='BT_TRAINING'?['CH0202','CH0404']:['CH0205','CH0801','CH0901'];
 for(const choice of path)state=choose(state,choice);
 expect(state.battle?.id).toBe(encounter);
 return state;
}

describe('100-seed playable-route balance regression',()=>{
 for(const encounter of ['BT_TRAINING','B01_FOREST_SPROUT'] as const){
  for(const strategy of strategies){
   it(`${encounter}: ${strategy.label}`,()=>{
    let victories=0,maxTurns=0,minEndingHp=100;
    for(let seed=1;seed<=100;seed++){
     let state=enterEncounter(storyCraftedStart(seed,strategy.id==='story-support-pulse'),encounter);
     // Only this scenario injects state: the otherwise authored WIND route
     // starts with zero MP to verify that GUARD can restore a playable turn.
     if(strategy.id==='zero-mp-fixture')state.mp=0;
     let turns=0;
     while(state.battle&&turns<30){
      const action=strategy.id==='story-support-pulse'
       ?'BASIC_PULSE'
       :state.mp<windCost?'GUARD':windId;
      state=fight(state,action);
      turns++;
     }
     const context=`${encounter}, ${strategy.label}, seed ${seed}`;
     expect(state.battle,context).toBeUndefined();
     expect(state.scene,context).toBe(encounter==='BT_TRAINING'?'S04_KORO':'S10_FOREST_RESULT');
     expect(state.rewarded,context).toContain(`win:${encounter}`);
     expect(turns,context).toBeLessThan(30);
     expect(state.hp,context).toBeGreaterThan(0);
     victories++;
     maxTurns=Math.max(maxTurns,turns);
     minEndingHp=Math.min(minEndingHp,state.hp);
    }
    expect(victories).toBe(100);
    console.log('BALANCE_AUDIT',JSON.stringify({encounter,strategy:strategy.id,seeds:100,victories,maxTurns,minEndingHp}));
   });
  }
 }
});
