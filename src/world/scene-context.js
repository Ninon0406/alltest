import {locations} from './locations.js';
import {pendingDecision} from '../engine/decisions.js';
import {calendar} from '../engine/time.js';
import {isV7} from '../engine/development.js';
import {storyRooms,roomKinds,interiorId} from '../data/interiors.js';
export function sceneContext(state){
 const location=locations[state.world.currentLocationId];if(!location)throw Error('ไม่พบตำแหน่งฉาก');
 let kind='outdoor',reason='routine';
 if(isV7(state)&&state.yearly.view==='yearly'&&state.life.mode==='annual'&&state.run?.status!=='ended'){
  const decision=pendingDecision(state),awakening=state.progression.awakening;
  if(decision?.kind==='awakening'&&(!awakening.venue||awakening.venue.locationId===location.id)){kind='ceremony';reason='awakening';}
  else if(decision?.kind==='development'){kind=storyRooms[decision.id]??'outdoor';reason=decision.id;}
  else if(calendar(state).ageMonths<36){kind='home';reason='care';}
 }
 return {locationId:location.id,kind,reason,assetId:kind==='outdoor'?location.id:interiorId(location,kind),label:roomKinds[kind]??'ภายนอก',path:kind==='outdoor'?`assets/scenes/${location.id}.png`:`assets/scenes/interiors/${interiorId(location,kind)}.png`};
}
