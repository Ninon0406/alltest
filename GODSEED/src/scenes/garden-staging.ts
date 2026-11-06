import type {State} from '../engine/state';
import {choicePaths} from './cinematic-paths';
import {gardenBed} from './garden-map';
import {scenes} from '../content/story';
export {gardenBed} from './garden-map';
/** Source-pixel staging: stand outside the bed; pour toward its near edge.
 * Presentation only. Rewards/day/trust stay in the transaction reducer. */
export const wateringFrames=[0,1,2,1,2,3];
export function gardenPresentation(state:State|null){
 if(!state||state.battle||scenes[state.scene]?.stage!=='garden')return undefined;
 return {bed:gardenBed,frame:state.flags.garden_tended?2:0};
}
export function wateringPlan(stage:string,command?:string){
 if(stage!=='garden'||command!=='CH0601')return undefined;
 return {actor:choicePaths.CH0601.points.at(-1)!,bed:gardenBed,facing:'east' as const};
}
