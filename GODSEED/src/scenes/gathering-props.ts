import type {State} from '../engine/state';
import {scenes} from '../content/story';
import {choicePaths} from './cinematic-paths';

/** Targets share the actual pickup route's endpoint. No duplicated map pixels. */
export const gatheringCatalog=[
 {choice:'CH0102',scene:'S01_FIRST_STEPS',kind:0},
 {choice:'CH0601',scene:'S06_GARDEN',kind:1},
 {choice:'CH0603',scene:'S06_GARDEN',kind:2},
] as const;
export function gatheringProps(state:State|null){
 if(!state||state.battle)return [];
 return gatheringCatalog.filter(entry=>{
  if(entry.scene!==state.scene)return false;
  const choice=scenes[state.scene].choices.find(c=>c.id===entry.choice)!;
  return choice.daily?state.gathered[entry.choice]!==Math.floor(state.ticks/3):!state.choices.includes(entry.choice);
 }).map(entry=>{const point=choicePaths[entry.choice].points.at(-1)!;return {...entry,x:point.x,y:point.y+20};});
}
