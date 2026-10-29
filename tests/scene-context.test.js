import {it,expect} from 'vitest';
import {createRun} from '../src/engine/run.js';
import {sceneContext} from '../src/world/scene-context.js';
import {locations} from '../src/world/locations.js';
import {pendingDecision} from '../src/engine/decisions.js';
import {findRoute,revealedLocations} from '../src/world/travel.js';
import {interiorId,interiorThemes} from '../src/data/interiors.js';
import {interiorArt} from '../src/ui/interior-art.js';
import {act,simulateV7} from '../scripts/v7-simulation.mjs';
import {verifyInteriorAssets} from '../scripts/verify-interior-assets.mjs';
const choose=(s,index=0)=>{const d=pendingDecision(s);return act(s,{type:'majorChoice',decisionId:d.id,choiceId:d.choices[index].id});};
it('projects care into the current home without changing any state, time, identity, money or position',()=>{
 let s=createRun(8,{id:'context-test',startedAt:'2026-10-29T00:00:00Z'});const before=structuredClone(s);
 const c=sceneContext(s);expect(c).toMatchObject({kind:'home',locationId:s.world.currentLocationId});expect(c.path).toContain('/interiors/');expect(sceneContext(s)).toEqual(c);expect(s).toEqual(before);
 s=choose(s);s=act(s,{type:'advanceDays',days:30});expect(sceneContext(s).kind).toBe('home');expect(s.time.absoluteDay).toBe(30);
});
it('follows actual school decisions and leaves the room when resolved or using the optional reader',()=>{
 for(const age of [6,7]){
  let s=simulateV7(8,{targetAge:age}).state;expect(sceneContext(s).kind).toBe('classroom');const node=s.world.currentLocationId,time=s.time.absoluteDay,world=structuredClone(s.world);
  s=choose(s);expect(sceneContext(s).kind).toBe('outdoor');expect(s.world).toEqual(world);expect(s.time.absoluteDay).toBe(time);expect(sceneContext(s).locationId).toBe(node);
 }
 let s=simulateV7(8,{targetAge:6}).state;s=act(s,{type:'setPacing',view:'detailed'});expect(sceneContext(s).kind).toBe('outdoor');
});
it('keeps the seven-stage ceremony at its actual venue across pause, travel and resume without rerolling',()=>{
 let s=simulateV7(8,{targetAge:12}).state;const venue=s.world.currentLocationId;
 for(let step=0;step<4;step++){expect(sceneContext(s)).toMatchObject({kind:'ceremony',locationId:venue});s=choose(s);}
 const measured=structuredClone(s.progression.awakening.result);s=choose(s,2);expect(sceneContext(s).kind).toBe('outdoor');
 const destination=[...revealedLocations(s)].find(id=>findRoute(s,id,'walk')?.days<=4);s=act(s,{type:'journeyChoice',destination,method:'walk'});const away=structuredClone(s);expect(sceneContext(s).locationId).toBe(destination);expect(sceneContext(s).kind).toBe('outdoor');expect(()=>act(s,{type:'beginAwakening'})).toThrow(/กลับไป/);expect(s).toEqual(away);
 s=act(s,{type:'journeyChoice',destination:venue,method:'walk'});s=act(s,{type:'beginAwakening'});
 for(let step=4;step<7;step++){expect(sceneContext(s).kind).toBe('ceremony');s=choose(s);}
 expect(sceneContext(s).kind).toBe('outdoor');expect(s.progression.awakening.result).toEqual(measured);expect(s.world.currentLocationId).toBe(venue);
});
it('changes node/background only after a real paid-in-time journey and keeps stay purely stationary',()=>{
 let s=choose(simulateV7(8,{targetAge:4}).state);const start=structuredClone(s),destination=[...revealedLocations(s)].find(id=>findRoute(s,id,'walk')?.days<=4),route=findRoute(s,destination,'walk');
 s=act(s,{type:'journeyChoice',destination,method:'stay'});expect(s.world).toEqual(start.world);expect(sceneContext(s)).toEqual(sceneContext(start));
 s=act(s,{type:'journeyChoice',destination,method:'walk'});expect(s.time.absoluteDay).toBe(start.time.absoluteDay+route.days);expect(s.gold).toBe(start.gold);expect(s.stamina).toBe(start.stamina-route.days*2);expect(sceneContext(s)).toMatchObject({kind:'outdoor',locationId:destination,assetId:destination});
});
it('reaches the canonical Starfall AI hall from a genuine seeded life and otherwise uses regional bindings',()=>{
 let seed=0;while(seed<1000&&createRun(seed,{id:'find-home',startedAt:'2026-10-29T00:00:00Z'}).world.currentLocationId!=='starfall')seed++;
 expect(seed).toBeLessThan(1000);const s=simulateV7(seed,{targetAge:12}).state;expect(sceneContext(s).assetId).toBe('starfall-ceremony');expect(s.world.currentLocationId).toBe('starfall');
 for(const l of Object.values(locations))for(const kind of ['home','classroom','ceremony'])expect(interiorId(l,kind)).toMatch(l.id==='starfall'&&kind==='ceremony'?/^starfall-ceremony$/:new RegExp('^'+interiorThemes[l.parent].id+'-'));
});
it('verifies sixteen real unique images, sixty node/room bindings and all thirty authored context entries',async()=>{
 expect(await verifyInteriorAssets()).toMatchObject({interiorPngFiles:16,canonicalNodes:20,nodeRoomBindings:60});
 const fallbacks=Object.keys(interiorThemes).flatMap(region=>['home','classroom','ceremony'].map(kind=>interiorArt(region,kind)));expect(new Set(fallbacks).size).toBe(15);
});
