import { seededRandom } from '../engine/random.js';
import {validInheritedAppearance} from './inheritance.js';
export const appearanceLimits = {face:3,hair:4,hairColor:6,eyes:5,skin:5};
export function createAppearance(state) {
  const seed = state.birth?.seed ?? [...`${state.name}|${state.race}`].reduce((hash,c)=>Math.imul(hash^c.charCodeAt(0),16777619)>>>0,2166136261);
  const random=seededRandom(seed ^ 0xa71a5);
  return {version:1,...Object.fromEntries(Object.entries(appearanceLimits).map(([key,limit])=>[key,Math.floor(random()*limit)]))};
}
export function validAppearance(value) {
  if(value?.version===2)return validInheritedAppearance(value);
  return value?.version===1 && Object.entries(appearanceLimits).every(([key,limit])=>Number.isInteger(value[key]) && value[key]>=0 && value[key]<limit);
}
export function ensureAppearance(state) { if(!state.appearance)state.appearance=createAppearance(state);return state.appearance; }
