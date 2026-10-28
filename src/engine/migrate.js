import { normalize } from './time.js';
import { locations, homeLocation } from '../world/locations.js';
export function upgradeState(input,{fresh=false}={}) {
 const state=structuredClone(input);
 if(!state.time)state.time={birthAbsoluteDay:0,absoluteDay:Math.max(0,Math.floor(state.age))*360+Math.max(0,Math.floor(state.day)-1)%360,lifespanYears:state.birth?.lifespan??90};
 state.chronicle??=[];state.journal??=[];state.morale??=100;
 state.life??={mode:fresh?'annual':'legacy',completed:[],randomYears:[],page:0,revision:0};
 state.world??={currentLocationId:state.birth?.locationId??homeLocation(state.location),visited:[],ledger:[],inventory:{}};
 if(!locations[state.world.currentLocationId])throw Error('ไม่พบสถานที่ในบันทึก');
 if(!state.world.visited.includes(state.world.currentLocationId))state.world.visited.push(state.world.currentLocationId);
 state.location=locations[state.world.currentLocationId].name;
 return normalize(state);
}
