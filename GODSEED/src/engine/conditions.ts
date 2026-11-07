import type {State} from './state';
import {byId,type Core} from '../systems/spells';
import {pathStartAvailability,type LifePathId} from '../systems/life-paths';

export type Condition={kind:'flag';id:string}|{kind:'anyFlag';ids:string[]}|{kind:'knownCore';core:Core}|{kind:'pathStart';id:LifePathId}|{kind:'trust';npc:string;min:number};
export function satisfies(state:State,condition:Condition):boolean {
 switch(condition.kind){
  case 'flag':return !!state.flags[condition.id];
  case 'anyFlag':return condition.ids.some(id=>!!state.flags[id]);
  case 'knownCore':return state.known.some(id=>byId[id]?.core===condition.core);
  case 'pathStart':return pathStartAvailability(state,condition.id).enabled;
  case 'trust':return (state.trust[condition.npc]||0)>=condition.min;
 }
}
