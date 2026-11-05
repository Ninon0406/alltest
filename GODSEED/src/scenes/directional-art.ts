import type {ActorAnimation} from './actor-art';
export const facings=['south','west','east','north'] as const;
export type Facing=typeof facings[number];
export const directionalWalk=Object.fromEntries(facings.map((direction,row)=>[direction,{frames:Array.from({length:6},(_,i)=>row*8+i),frameRate:10,repeat:-1}])) as Record<Facing,ActorAnimation>;
export const directionalIdle=Object.fromEntries(facings.map((direction,row)=>[direction,{frames:[row*3,row*3+1,row*3+2,row*3+1],frameRate:3,repeat:-1}])) as Record<Facing,ActorAnimation>;
/** Dominant motion axis; preserve direction on a zero-length leg. Never game input. */
export function facingFor(dx:number,dy:number,previous:Facing='east'):Facing {
 if(Math.abs(dx)<.01&&Math.abs(dy)<.01)return previous;
 return Math.abs(dy)>Math.abs(dx)?dy>0?'south':'north':dx<0?'west':'east';
}
/** Approximately 70 source pixels/second, with bounded short/long leg timing. */
export function walkDuration(dx:number,dy:number){return Math.max(200,Math.min(900,Math.round(Math.hypot(dx,dy)*14)));}
