import type {State} from './state';
import {byId,type Core} from '../systems/spells';

export type Condition={kind:'flag';id:string}|{kind:'anyFlag';ids:string[]}|{kind:'knownCore';core:Core};
export function satisfies(state:State,condition:Condition):boolean {
 switch(condition.kind){
  case 'flag':return !!state.flags[condition.id];
  case 'anyFlag':return condition.ids.some(id=>!!state.flags[id]);
  case 'knownCore':return state.known.some(id=>byId[id]?.core===condition.core);
 }
}
