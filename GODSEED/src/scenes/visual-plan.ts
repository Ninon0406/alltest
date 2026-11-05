import type {State} from '../engine/state';
export type Outcome='none'|'win'|'lose'|'flee'|'surrender';
export function outcomeFor(before?:State,next?:State,command?:string):Outcome {
 if(!before?.battle||!next||next.battle)return 'none';
 if(command==='FLEE')return 'flee';
 if(command==='SURRENDER')return 'surrender';
 return next.scene==='S28_RECOVER'?'lose':'win';
}
export function poseFor(cue:string){
 return ({walk:'walk',run:'run',pick:'pick_up',talk:'interact',cast:'cast',craft:'craft',guard:'guard',rest:'rest'} as Record<string,string>)[cue]||'interact';
}
