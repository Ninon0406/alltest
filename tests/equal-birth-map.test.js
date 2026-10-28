import { it,expect } from 'vitest';
import { archetypes,eligibleLocations,selectOrigin } from '../src/data/archetypes.js';
import { seededRandom } from '../src/engine/random.js';
import { generateBirth } from '../src/character/rebirth.js';
import { advanceTime } from '../src/engine/time.js';
import { dispatch } from '../src/engine/actions.js';
import { storyToken } from '../src/engine/life.js';
import { locations,routes } from '../src/world/locations.js';
import { findRoute } from '../src/world/travel.js';
it('samples 100,000 equal eligible archetypes with uniform conditional birthplaces',()=>{
 const random=seededRandom(0x51ee77),counts=Object.fromEntries(archetypes.map(a=>[a.id,0])),local={};
 for(let i=0;i<100000;i++){const {archetype,location}=selectOrigin(random);counts[archetype.id]++;const key=archetype.id+':'+location.id;local[key]=(local[key]??0)+1;}
 expect(archetypes).toHaveLength(20);
 for(const a of archetypes){expect(a.weight).toBe(1);expect(Math.abs(counts[a.id]/100000-.05)).toBeLessThan(.003);const pool=eligibleLocations(a);expect(pool.length).toBeGreaterThan(0);for(const l of pool)expect(Math.abs(local[a.id+':'+l.id]/counts[a.id]-1/pool.length)).toBeLessThan(.035);}
 console.log('100000 origin rolls:',JSON.stringify(counts));
});
it('has 20 unique functional locations and reachable routes without free teleportation',()=>{
 expect(Object.keys(locations)).toHaveLength(20);const state=generateBirth(1);advanceTime(state,12*360);
 for(const l of Object.values(locations)){expect(l.description.length).toBeGreaterThan(20);expect(l.services.length).toBeGreaterThan(0);if(l.id!==state.world.currentLocationId)expect(findRoute(state,l.id)?.days).toBeGreaterThan(0);}
 for(const route of routes){expect(locations[route.from].neighbors).toContain(route.to);expect(locations[route.to].neighbors).toContain(route.from);}
 const baby=generateBirth(1);expect(findRoute(baby,'market')).toBeNull();
});
it('charges travel time and money atomically, rejects stale purchases and negative wallets',()=>{
 let state=generateBirth(5);advanceTime(state,12*360);state.world.currentLocationId='dawn';state.world.visited=['dawn'];state.location=locations.dawn.name;state.gold=30;
 const before=structuredClone(state);state=dispatch(state,{type:'travel',destination:'market',token:storyToken(state)});expect(state.time.absoluteDay-before.time.absoluteDay).toBe(1);expect(state.world.currentLocationId).toBe('market');expect(state.world.ledger).toHaveLength(1);expect(before.world.currentLocationId).toBe('dawn');
 const action={type:'service',serviceId:'food',token:storyToken(state)};state=dispatch(state,action);expect(state.gold).toBe(28);expect(state.world.inventory.bread).toBe(1);expect(()=>dispatch(state,action)).toThrow();
 state=dispatch(state,{type:'service',serviceId:'sell',token:storyToken(state)});expect(state.gold).toBe(29);expect(state.world.inventory.bread).toBeUndefined();
 state.gold=0;const snapshot=structuredClone(state);expect(()=>dispatch(state,{type:'service',serviceId:'food',token:storyToken(state)})).toThrow();expect(state).toEqual(snapshot);
});
it('keeps work and free rest playable and blocks unpaid or underage trips',()=>{
 let state=generateBirth(5);state.world.currentLocationId='dawn';state.world.visited=['dawn'];state.location=locations.dawn.name;
 expect(()=>dispatch(state,{type:'service',serviceId:'work',token:storyToken(state)})).toThrow();advanceTime(state,12*360);state.gold=0;
 expect(()=>dispatch(state,{type:'travel',destination:'capital',token:storyToken(state)})).toThrow();
 state=dispatch(state,{type:'service',serviceId:'work',token:storyToken(state)});expect(state.gold).toBe(4);state=dispatch(state,{type:'service',serviceId:'rest',token:storyToken(state)});expect(state.stamina).toBeLessThanOrEqual(state.maxStamina);
});
it('offers a slower free walking route to avoid trapping a penniless traveler',()=>{
 let state=generateBirth(3);advanceTime(state,12*360);state.gold=0;state.world.currentLocationId='observatory';state.world.visited=['observatory'];state.location=locations.observatory.name;
 expect(()=>dispatch(state,{type:'travel',destination:'library',token:storyToken(state)})).toThrow();
 const before=state.time.absoluteDay;state=dispatch(state,{type:'travel',destination:'library',method:'walk',token:storyToken(state)});expect(state.gold).toBe(0);expect(state.time.absoluteDay-before).toBe(4);
});
it('rejects exhausted journeys atomically and allows free recovery at every location',()=>{
 let state=generateBirth(5);advanceTime(state,12*360);state.world.currentLocationId='library';state.world.visited=['library'];state.stamina=0;state.gold=0;const before=structuredClone(state);
 expect(()=>dispatch(state,{type:'travel',destination:'starfall',method:'walk',token:storyToken(state)})).toThrow(/ความอึด/);expect(state).toEqual(before);
 state=dispatch(state,{type:'service',serviceId:'rest',token:storyToken(state)});expect(state.stamina).toBe(20);state=dispatch(state,{type:'travel',destination:'starfall',method:'walk',token:storyToken(state)});expect(state.world.currentLocationId).toBe('starfall');
 const baby=generateBirth(8);expect(()=>dispatch(baby,{type:'service',serviceId:'rest',token:storyToken(baby)})).toThrow();
});
